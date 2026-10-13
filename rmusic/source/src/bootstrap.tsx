import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n/config';
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

// R music keeps Folia's Web UI, visualizers and native audio transport. Its only
// remote library is Roylyl/Music, so no desktop or account service is booted here.
installNativeDragGuard();
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
    useLibrarySuiteStore.getState().setSuite('grid');
    usePlaybackEntryViewStore.getState().closePlaybackEntryViewPrompt();
    useStageSettingsStore.setState({
        enableNowPlayingStage: false, enablePlayerCapStage: false,
    });
    await loadRmusicCatalog();
    initializeLocalCoverRuntime();
    root.render(<React.StrictMode><AppSplashGate><App /></AppSplashGate></React.StrictMode>);
}
void bootRmusic().catch(error => {
    console.error('[R music] Library startup failed', error);
    rootElement.textContent = 'R music曲库暂时无法加载，请检查网络后刷新页面。';
    rootElement.setAttribute('role', 'alert');
    document.getElementById('app-splash')?.remove();
});
