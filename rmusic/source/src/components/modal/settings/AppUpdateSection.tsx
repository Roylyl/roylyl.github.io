import { useState } from 'react';
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
        button: '更新', busy: '正在更新…', latest: '已是最新版本', failed: '更新失敗，請檢查網路後重試。',
    } : {
        title: '应用更新', description: '检查并载入R music的新版本。更新时会重新载入页面。',
        button: '更新', busy: '正在更新…', latest: '已是最新版本', failed: '更新失败，请检查网络后重试。',
    }) : {
        title: 'App updates', description: 'Check for a new version of R music. Installing an update reloads the page.',
        button: 'Update', busy: 'Updating…', latest: 'Up to date', failed: 'Update failed. Check your connection and try again.',
    };
    const [busy, setBusy] = useState(false);
    const [status, setStatus] = useState('');
    const update = async () => {
        if (busy) return;
        setBusy(true);
        setStatus('');
        try {
            const registration = 'serviceWorker' in navigator
                ? await navigator.serviceWorker.getRegistration(import.meta.env.BASE_URL) : undefined;
            if (!registration) {
                // Browser-only sessions without a worker fetch the current page before reloading.
                const response = await fetch(import.meta.env.BASE_URL, { cache: 'reload' });
                if (!response.ok) throw new Error('Update request failed');
                window.location.reload();
                return;
            }
            await registration.update();
            if (registration.installing) await waitForInstall(registration.installing);
            if (registration.waiting) {
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
            } else {
                setStatus(copy.latest);
            }
        } catch {
            setStatus(copy.failed);
        } finally {
            setBusy(false);
        }
    };
    return <section className={`p-4 rounded-xl border space-y-3 ${cardClass}`}>
        <div className="flex items-center justify-between gap-4">
            <div><h3 className="font-semibold">{copy.title}</h3>
                <p className="text-sm opacity-60 mt-1">{copy.description}</p></div>
            <button type="button" disabled={busy} onClick={() => void update()}
                className="shrink-0 flex items-center gap-2 rounded-xl border px-4 py-2 disabled:opacity-50">
                <RefreshCw size={16} className={busy ? 'animate-spin' : undefined} />
                {busy ? copy.busy : copy.button}
            </button>
        </div>
        <p role="status" className="text-sm opacity-70">{status}</p>
    </section>;
}
