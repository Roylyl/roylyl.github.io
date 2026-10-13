import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';

const waitForInstall = (worker: ServiceWorker) => new Promise<void>((resolve, reject) => {
    const finish = (error?: Error) => {
        clearTimeout(timer);
        worker.removeEventListener('statechange', check);
        error ? reject(error) : resolve();
    };
    const check = () => {
        if (worker.state === 'installed' || worker.state === 'activated') finish();
        else if (worker.state === 'redundant') finish(new Error('Installation failed'));
    };
    const timer = setTimeout(() => finish(new Error('Update timed out')), 45000);
    worker.addEventListener('statechange', check);
    check();
});

export default function AppUpdateSection({ cardClass }: { cardClass: string }) {
    const { i18n } = useTranslation();
    const language = i18n.resolvedLanguage || i18n.language;
    const copy = language.startsWith('zh') ? (language === 'zh-TW' ? {
        title: '應用更新', description: '檢查並載入R music的新版本。更新時會重新載入頁面。',
        button: '更新', busy: '正在更新…', checking: '正在檢查更新…', ready: '有新版本可用', unavailable: '目前無法檢查更新', latest: '已是最新版本', failed: '檢查或更新失敗，請檢查網路後重新開啟此頁。',
    } : {
        title: '应用更新', description: '检查并载入R music的新版本。更新时会重新载入页面。',
        button: '更新', busy: '正在更新…', checking: '正在检查更新…', ready: '有新版本可用', unavailable: '当前无法检查更新', latest: '已是最新版本', failed: '检查或更新失败，请检查网络后重新打开此页。',
    }) : {
        title: 'App updates', description: 'Check for a new version of R music. Installing an update reloads the page.',
        button: 'Update', busy: 'Updating…', checking: 'Checking for updates…', ready: 'An update is available', unavailable: 'Update checking is unavailable', latest: 'Up to date', failed: 'Check or update failed. Check your connection and reopen this page.',
    };
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState<'checking' | 'ready' | 'latest' | 'failed' | 'unavailable'>('checking');
    const [readyRegistration, setReadyRegistration] = useState<ServiceWorkerRegistration | null>(null);
    useEffect(() => {
        let cancelled = false;
        let registration: ServiceWorkerRegistration | undefined;
        const inspect = async () => {
            try {
                if (registration?.installing) await waitForInstall(registration.installing);
                if (cancelled) return;
                const ready = registration?.waiting ? registration : null;
                setReadyRegistration(ready);
                setStatus(ready ? 'ready' : 'latest');
            } catch {
                if (!cancelled) setStatus('failed');
            }
        };
        const onUpdateFound = () => { void inspect(); };
        void (async () => {
            try {
                if (!window.isSecureContext || !('serviceWorker' in navigator) || import.meta.env.DEV) {
                    if (!cancelled) setStatus('unavailable');
                    return;
                }
                const scope = new URL(import.meta.env.BASE_URL, window.location.origin);
                registration = await navigator.serviceWorker.getRegistration(scope.href);
                if (cancelled) return;
                // The load-event registration may not have run yet, or site data was cleared.
                // Register our own scope instead of treating a missing registration as unsupported.
                if (!registration || registration.scope !== scope.href) {
                    registration = await navigator.serviceWorker.register(new URL('sw.js', scope).href, {
                        scope: scope.href,
                        updateViaCache: 'none',
                    });
                }
                if (cancelled) return;
                registration.addEventListener('updatefound', onUpdateFound);
                // A previously downloaded update remains installable even while offline.
                if (!registration.waiting && !registration.installing) await registration.update();
                await inspect();
            } catch {
                if (!cancelled) setStatus('failed');
            }
        })();
        return () => {
            cancelled = true;
            registration?.removeEventListener('updatefound', onUpdateFound);
        };
    }, []);
    const update = async () => {
        if (busy || !readyRegistration?.waiting) return;
        setBusy(true);
        try {
            const registration = readyRegistration;
                await new Promise<void>((resolve, reject) => {
                    const done = () => {
                        clearTimeout(timer);
                        navigator.serviceWorker.removeEventListener('controllerchange', done);
                        resolve();
                    };
                    const timer = setTimeout(() => {
                        navigator.serviceWorker.removeEventListener('controllerchange', done);
                        reject(new Error('Activation timed out'));
                    }, 15000);
                    navigator.serviceWorker.addEventListener('controllerchange', done);
                    registration.waiting!.postMessage({ type: 'SKIP_WAITING' });
                });
                window.location.reload();

        } catch {
            setStatus('failed');
        } finally {
            setBusy(false);
        }
    };
    return <section className={`p-4 rounded-xl border space-y-3 ${cardClass}`}>
        <div className="flex items-center justify-between gap-4">
            <div><h3 className="font-semibold">{copy.title}</h3>
                <p className="text-sm opacity-60 mt-1">{copy.description}</p></div>
            {readyRegistration && <button type="button" disabled={busy} onClick={() => void update()}
                className="shrink-0 flex items-center gap-2 rounded-xl border px-4 py-2 disabled:opacity-50">
                <RefreshCw size={16} className={busy ? 'animate-spin' : undefined} />
                {busy ? copy.busy : copy.button}
            </button>}
        </div>
        <p role="status" className="text-sm opacity-70">{copy[status]}</p>
    </section>;
}
