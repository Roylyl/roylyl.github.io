import React from 'react';
import FloatingPlayerControls from '../../FloatingPlayerControls';
import SearchWorkspace from '../search/SearchWorkspace';
import DevDebugOverlay from '../../DevDebugOverlay';
import MemoryMonitorWindow from '../../debug/MemoryMonitorWindow';
import NowPlayingToast from './NowPlayingToast';
import type { AppOverlaysModel } from './buildAppOverlaysModel';
import { countRender } from '../../../dev/renderCount';
import { useLatticeControlsStore } from '../../../stores/useLatticeControlsStore';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useSettingsModalStore } from '../../../stores/useSettingsModalStore';
import { useAppViewStore } from '../../../stores/useAppViewStore';
import { useSearchNavigationStore } from '../../../stores/useSearchNavigationStore';
import { useCollectionNavigationStore } from '../../../stores/useCollectionNavigationStore';

// Centralized app-level overlay renderer so App.tsx does not mount leaf overlays directly.
type AppOverlaysProps = {
    model: AppOverlaysModel;
};

const AppOverlays: React.FC<AppOverlaysProps> = ({ model }) => {
    countRender('AppOverlays');
    const isCurrentSongPosterVisible = useLatticeControlsStore(state => state.isCurrentSongPosterVisible);
    const isCompact = useMediaQuery('(max-width: 639px)');
    const settingsOpen = useSettingsModalStore(state => state.settingsModalState.isOpen);
    const panelOpen = useAppViewStore(state => state.isPanelOpen);
    const searchOpen = useSearchNavigationStore(state => state.isSearchOpen);
    const hasCollection = useCollectionNavigationStore(state => Boolean(state.snapshot?.stack.length));
    const {
        searchOverlay,
        debugOverlay,
        memoryMonitor,
        floatingControls,
        nowPlayingToast,
    } = model;
    // The player panel stays open in preferences when leaving the player, but
    // its host is only mounted on that page. Browsing must retain its transport.
    const panelIsVisible = panelOpen && floatingControls?.currentView === 'player';
    const searchIsVisible = Boolean(searchOverlay) && searchOpen && !hasCollection;

    return (
        <>
            {searchOverlay && <SearchWorkspace {...searchOverlay} />}

            {debugOverlay && <DevDebugOverlay {...debugOverlay} />}

            {memoryMonitor && <MemoryMonitorWindow {...memoryMonitor} />}

            {floatingControls
                && !(isCompact && (settingsOpen || panelIsVisible || searchIsVisible))
                && (floatingControls.currentView !== 'lattice' || !isCurrentSongPosterVisible)
                && <FloatingPlayerControls {...floatingControls} />}

            {nowPlayingToast && !(isCompact && (settingsOpen || panelIsVisible || floatingControls))
                && <NowPlayingToast {...nowPlayingToast} />}
        </>
    );
};

export default React.memo(AppOverlays);
