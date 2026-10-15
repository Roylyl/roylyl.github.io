import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from './i18n/config';
import './index.css';
import App from './App';
import AppSplashGate from './components/AppSplashGate';
import { initializeLocalCoverRuntime } from './services/localCoverRuntime';
import { installNativeDragGuard } from './utils/nativeDragGuard';
import { installLibrarySuiteChromeCommands } from './library/app/installLibrarySuiteChromeCommands';
import { loadRmusicCatalog, RMUSIC_SERVER } from './services/rmusicCatalog';
import { saveNavidromeConfig, setNavidromeEnabled } from './services/navidromeService';
import { setNavidromeEnabledState } from './stores/useLibraryStore';
import { useSearchNavigationStore } from './stores/useSearchNavigationStore';
import { useHomeLayoutSettingsStore } from './stores/useHomeLayoutSettingsStore';
import { useLibrarySuiteStore } from './library/core/state/useLibrarySuiteStore';
import { usePlaybackEntryViewStore } from './stores/usePlaybackEntryViewStore';
import { useStageSettingsStore } from './stores/useStageSettingsStore';
import './stores/useMotionSettingsStore';
import { installRmusicViewport } from './services/rmusicViewport';

// R music keeps Folia's Web UI, visualizers and native audio transport. Its only
// remote library is Roylyl/Music, so no desktop or account service is booted here.
installNativeDragGuard();
installRmusicViewport();
installLibrarySuiteChromeCommands();
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('R music could not find the application root');
const root = ReactDOM.createRoot(rootElement);

async function bootRmusic() {
    saveNavidromeConfig({ serverUrl: RMUSIC_SERVER, username: 'Roylyl', passwordHash: '' }, 'server');
    setNavidromeEnabled(true);
    setNavidromeEnabledState(true);
    useHomeLayoutSettingsStore.setState({
        showHomeTabPlaylist: false, showHomeTabRadio: false,
        showHomeTabAlbums: false, showHomeTabLocal: false,
    });
    useSearchNavigationStore.getState().setHomeViewTab('navidrome');
    // Keep the user's browsing mode across reloads; new installations use cards.
    let savedSuite: string | null = null;
    try { savedSuite = localStorage.getItem('library_suite'); } catch { /* Storage may be unavailable. */ }
    if (savedSuite !== 'grid' && savedSuite !== 'bravais') {
        useLibrarySuiteStore.getState().setSuite('grid');
    }
    usePlaybackEntryViewStore.getState().closePlaybackEntryViewPrompt();
    useStageSettingsStore.setState({
        enableNowPlayingStage: false, enablePlayerCapStage: false,
    });
    await loadRmusicCatalog();
    initializeLocalCoverRuntime();
    root.render(<React.StrictMode><AppSplashGate><App /></AppSplashGate></React.StrictMode>);
}
let booting = false;
let started = false;
const retryBoot = async () => {
    if (booting || started) return;
    booting = true;
    const language = i18n.resolvedLanguage || i18n.language;
    const copy = language === 'zh-TW'
        ? { title: '曲庫暫時無法載入', hint: '請檢查網路連線後重試，連線恢復時會自動再試一次。', retry: '重新載入曲庫', busy: '正在載入…' }
        : language.startsWith('zh')
            ? { title: '曲库暂时无法加载', hint: '请检查网络后重试，连接恢复时会自动再试一次。', retry: '重新加载曲库', busy: '正在加载…' }
            : { title: 'The library could not load', hint: 'Check your connection and retry. We will also retry when you reconnect.', retry: 'Retry loading library', busy: 'Loading…' };
    const retryButton = rootElement.querySelector('button');
    if (retryButton) { retryButton.disabled = true; retryButton.textContent = copy.busy; }
    try {
        await bootRmusic();
        started = true;
        rootElement.removeAttribute('role');
        window.removeEventListener('online', retryBoot);
    } catch (error) {
        console.error('[R music] Library startup failed', error);
        document.getElementById('app-splash')?.remove();
        const panel = document.createElement('section');
        panel.className = 'flex min-h-full flex-col items-center justify-center gap-4 px-6 text-center';
        panel.setAttribute('role', 'alert');
        const title = document.createElement('h1');
        title.className = 'text-xl font-semibold';
        title.textContent = copy.title;
        const hint = document.createElement('p');
        hint.className = 'max-w-sm text-sm text-white/75';
        hint.textContent = copy.hint;
        const button = document.createElement('button');
        button.className = 'min-h-11 rounded-xl bg-white px-5 py-3 text-zinc-900';
        button.type = 'button';
        button.textContent = copy.retry;
        button.addEventListener('click', () => { void retryBoot(); });
        panel.append(title, hint, button);
        rootElement.replaceChildren(panel);
    } finally {
        booting = false;
    }
};
window.addEventListener('online', retryBoot);
void retryBoot();
