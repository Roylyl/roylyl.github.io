import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { useTranslation } from 'react-i18next';

// Load optional dialogs when opened, sharing successful loads across openings.
// A failed native module import may stay cached until navigation; keep the player
// available and offer an explicit reload instead of a retry that cannot succeed.
export function deferDialog<P extends object>(load: () => Promise<{ default: ComponentType<P> }>) {
    let loaded: ComponentType<P> | null = null;
    let pending: Promise<ComponentType<P>> | null = null;
    const resolve = () => pending ??= load().then(module => {
        loaded = module.default;
        return loaded;
    }).catch(error => { pending = null; throw error; });

    return function DeferredDialog(props: P) {
        const { t } = useTranslation();
        const [component, setComponent] = useState<ComponentType<P> | null>(() => loaded);
        const [failed, setFailed] = useState(false);
        useEffect(() => {
            if (component) return;
            let cancelled = false;
            setFailed(false);
            void resolve().then(value => {
                if (!cancelled) setComponent(() => value);
            }, () => { if (!cancelled) setFailed(true); });
            return () => { cancelled = true; };
        }, [component]);
        if (component) {
            const Dialog = component;
            return <Dialog {...props} />;
        }
        const close = 'onClose' in props && typeof props.onClose === 'function'
            ? props.onClose : 'onCancel' in props && typeof props.onCancel === 'function' ? props.onCancel : null;
        return <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-black/70 p-6 text-center text-white backdrop-blur-sm" role="status">
            {failed ? <>
                <p>{t('ui.dialogLoadFailed')}</p>
                <button className="min-h-11 rounded-xl border px-5 py-2" onClick={() => window.location.reload()}>{t('ui.dialogReload')}</button>
            </> : <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-label={t('ui.dialogLoading')} />}
            {close && <button className="min-h-11 rounded-xl border px-5 py-2" onClick={() => close()}>{t('ui.close')}</button>}
        </div>;
    };
}
