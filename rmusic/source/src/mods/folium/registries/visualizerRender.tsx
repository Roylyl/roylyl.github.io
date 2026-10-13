import React, { useMemo } from 'react';
import type { VisualizerSharedProps } from '@/components/visualizer/definition';
import VisualizerShell from '@/components/visualizer/VisualizerShell';

import { useFoliumStageContext } from '../stageContext';
import { FoliumMountHost } from '../FoliumMountHost';
import type { StoredFoliumVisualizer } from './visualizers';

// src/mods/folium/registries/visualizerRender.tsx
// The render half of a mod visualizer mode, loaded lazily like every builtin
// renderer: the host shell (background, back button, stage layer slots), the
// mod's own mount, and the shared bottom subtitle layer.

const FoliumVisualizerStage: React.FC<{
    id: string;
    modId: string;
    stored: StoredFoliumVisualizer;
    props: VisualizerSharedProps;
}> = ({ id, modId, stored, props }) => {
    const transparent = Boolean(props.background?.transparent);
    const surface = useMemo(
        () => ({ transparent, hostBackground: stored.hostBackground && !transparent }),
        [transparent, stored.hostBackground],
    );
    const ctx = useFoliumStageContext({
        lines: props.lines,
        currentTime: props.currentTime,
        currentLineIndex: props.currentLineIndex,
        paused: Boolean(props.paused),
        theme: props.theme,
        isDaylight: Boolean(props.isDaylight),
        songTitle: props.songTitle ?? null,
        songArtist: props.songArtist ?? null,
        songAlbum: props.songAlbum ?? null,
        staticMode: Boolean(props.staticMode),
        seed: props.seed,
        isPreview: Boolean(props.isPreviewMode),
        coverUrl: props.coverUrl ?? null,
        subtitleTheme: props.subtitleTheme,
        display: {
            showText: props.showText,
            lyricsFontScale: props.lyricsFontScale,
            subtitleFontScale: props.subtitleFontScale,
            subtitleOverlayOpacity: props.subtitleOverlayOpacity,
            subtitleOverlayBackground: props.subtitleOverlayBackground,
            subtitleUpcomingLyricsBlur: props.subtitleUpcomingLyricsBlur,
            showHarmonySubtitle: props.showHarmonySubtitle,
            harmonySubtitleBackground: props.harmonySubtitleBackground,
            showSubtitleTranslation: props.showSubtitleTranslation,
            hideTranslationSubtitle: props.hideTranslationSubtitle,
            subtitleContentMode: props.subtitleContentMode,
            isPlayerChromeHidden: props.isPlayerChromeHidden,
            isPanelOpen: props.isPanelOpen,
            visualizerOpacity: props.visualizerOpacity,
        },
        surface,
        settings: stored.settingsAccess,
        audio: { audioPower: props.audioPower, audioBands: props.audioBands },
    });
    return (
        <FoliumMountHost
            modId={modId}
            where={`visualizer ${id}`}
            entryKind="visualizer"
            entryId={id}
            mount={stored.def.mount}
            ctx={ctx}
            className="absolute inset-0"
        />
    );
};

const FoliumVisualizerRender: React.FC<{
    id: string;
    modId: string;
    stored: StoredFoliumVisualizer;
    props: VisualizerSharedProps;
}> = ({ id, modId, stored, props }) => (
    <VisualizerShell
        theme={props.theme}
        audioPower={props.audioPower}
        audioBands={props.audioBands}
        sharedProps={props}
        renderBackground={stored.hostBackground}
    >
        <FoliumVisualizerStage id={id} modId={modId} stored={stored} props={props} />
    </VisualizerShell>
);

export default FoliumVisualizerRender;
