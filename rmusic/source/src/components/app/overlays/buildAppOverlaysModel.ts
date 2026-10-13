import type React from 'react';
import type { MotionValue } from 'framer-motion';
import type FloatingPlayerControls from '../../FloatingPlayerControls';
import type SearchWorkspace from '../search/SearchWorkspace';
import type DevDebugOverlay from '../../DevDebugOverlay';
import type MemoryMonitorWindow from '../../debug/MemoryMonitorWindow';
import { PlayerState } from '../../../types';
import type { SongResult, UnifiedSong, LyricData } from '../../../types';
import { resolvePlaybackNeighbors } from '../../../utils/playbackNeighbors';
import { getPlaybackSongKey } from '../../../utils/appPlaybackGuards';
import { focusLatticeCurrentSong } from '../../../stores/useLatticeControlsStore';
import { setPlayerState } from '../../../stores/usePlaybackStore';
import { setIsDevDebugOverlayVisible, setIsMemoryMonitorVisible } from '../../../stores/useAppChromeStore';
import type { SlotContextFromApp } from '../../FloatingPlayerControls';
import type { PlayerControlSlotActionId } from '../../../types/playerControlSlots';

// src/components/app/overlays/buildAppOverlaysModel.ts

type SearchOverlayProps = React.ComponentProps<typeof SearchWorkspace>;
type FloatingControlsProps = React.ComponentProps<typeof FloatingPlayerControls>;
type DebugOverlayProps = React.ComponentProps<typeof DevDebugOverlay>;
type MemoryMonitorProps = React.ComponentProps<typeof MemoryMonitorWindow>;

export type AppOverlaysModel = {
    searchOverlay?: SearchOverlayProps | null;
    debugOverlay?: DebugOverlayProps | null;
    memoryMonitor?: MemoryMonitorProps | null;
    floatingControls?: FloatingControlsProps | null;
};

// What the model needs that this file can read for itself: store state, the per-frame motion
// signals, and its own translated labels. Keeping these out of the caller's argument list is the
// whole point of useAppOverlaysModel below - App.tsx had to name all 25 of them.
type AppOverlaysAmbient = {

    currentView: FloatingControlsProps['currentView'];
    isSearchOpen: boolean;
    isDaylight: boolean;
    isDevDebugOverlayVisible: boolean;
    isMemoryMonitorVisible: boolean;
    memoryMonitorShortcutLabel: string;
    currentTime: MotionValue<number>;
    lyricCurrentTime: MotionValue<number>;
    currentSong: SongResult | null;
    playerState: PlayerState;
    duration: number;
    audioSrc: string | null;
    lyrics: LyricData | null;
    activePlaybackContext: 'main' | 'stage';
    isPlayerChromeHidden: boolean;
    noTrackText: string;
    playQueue: SongResult[];
    isFmMode: boolean;
    prevTrackLabel: string;
    nextTrackLabel: string;
    playerControlSlotPrimary: PlayerControlSlotActionId;
    playerControlSlotSecondary: PlayerControlSlotActionId;
    playerControlSlotContext: SlotContextFromApp;
    onCommitPlayerBottomBarOffset: (offsetPx: number) => void;
};

// What only the caller can supply: controller callbacks and values App.tsx computes.
export type AppOverlaysDeps = {
    theme: any;
    closeSearchView: () => void;
    handleSearchOverlaySubmit: SearchOverlayProps['onSubmitSearch'];
    handleSearchLoadMore: () => Promise<void>;
    handleSearchResultPlay: (track: UnifiedSong) => void;
    handleSearchResultAddToQueue: (track: UnifiedSong) => void;
    handleSearchResultArtistOpen: SearchOverlayProps['onOpenArtist'];
    handleSearchResultAlbumOpen: SearchOverlayProps['onOpenAlbum'];
    /** 搜索结果按当前本地曲库目录重算展示（见 SearchWorkspace 的同名 prop）。 */
    resolveSearchResultDisplay: NonNullable<SearchOverlayProps['resolveTrackDisplay']>;
    devDebugSnapshot: any;
    effectiveLoopMode: 'off' | 'all' | 'one' | 'shuffle';
    canToggleCurrentPlayback: boolean;
    isNowPlayingControlDisabled: boolean;
    stageActiveEntryKind: string | null;
    syncStageLyricsClock: (timeSec: number, endTimeSec: number, nextPlayerState: PlayerState, startTimeSec?: number) => void;
    stageLyricsClockRef: React.MutableRefObject<{ startTimeSec: number }>;
    togglePlay: FloatingControlsProps['onTogglePlay'];
    toggleLoop: FloatingControlsProps['onToggleLoop'];
    navigateFromPlayerCapsule: () => void;
    shouldHidePlayerProgressBar: boolean;
    onSeekMainAudio: (time: number) => void;
    onStagePlayerSeek: () => Promise<unknown>;
    isNowPlayingStageActive: boolean;
    handlePrevTrack: () => void;
    handleNextTrack: () => void;
    shuffleQueue: () => void;
    handleLike: () => void;
    isDisplaySongLiked: boolean;
    invokeCommandById: (commandId: string) => void;
    canInvokeCommandById: (commandId: string) => boolean;

};

type BuildAppOverlaysModelParams = AppOverlaysAmbient & AppOverlaysDeps;

// Builds the full overlay model, including detail overlays and floating playback controls.
export const buildAppOverlaysModel = ({
  currentView,
  theme,
  isDaylight,
  closeSearchView,
  handleSearchOverlaySubmit,
  handleSearchLoadMore,
  handleSearchResultPlay,
  handleSearchResultAddToQueue,
  handleSearchResultArtistOpen,
  handleSearchResultAlbumOpen,
  resolveSearchResultDisplay,
  isDevDebugOverlayVisible,
  isMemoryMonitorVisible,
  memoryMonitorShortcutLabel,
  devDebugSnapshot,
  currentTime,
  lyricCurrentTime,
  currentSong,
  playerState,
  duration,
  effectiveLoopMode,
  audioSrc,
  canToggleCurrentPlayback,
  isNowPlayingControlDisabled,
  lyrics,
  activePlaybackContext,
  stageActiveEntryKind,
  syncStageLyricsClock,
  stageLyricsClockRef,
  togglePlay,
  toggleLoop,
  navigateFromPlayerCapsule,
  isPlayerChromeHidden,
  shouldHidePlayerProgressBar,
  onSeekMainAudio,
  onStagePlayerSeek,
  noTrackText,
  playQueue,
  isFmMode,
  isNowPlayingStageActive,
  handlePrevTrack,
  handleNextTrack,
  prevTrackLabel,
  nextTrackLabel,
  playerControlSlotPrimary,
  playerControlSlotSecondary,
  playerControlSlotContext,
  onCommitPlayerBottomBarOffset
}: BuildAppOverlaysModelParams): AppOverlaysModel => ({
    searchOverlay: currentView === 'home'
        ? {
            theme,
            isDaylight,
            onClose: closeSearchView,
            onSubmitSearch: handleSearchOverlaySubmit,
            onLoadMore: handleSearchLoadMore,
            onPlayTrack: handleSearchResultPlay,
            onAddTrackToQueue: handleSearchResultAddToQueue,
            onOpenArtist: handleSearchResultArtistOpen,
            onOpenAlbum: handleSearchResultAlbumOpen,
            resolveTrackDisplay: resolveSearchResultDisplay,
        }
        : null,
    // Not gated on the view, and that was a real hole: the app cold-starts on the home page,
    // so after a restart the chord opened nothing until something had been played - which
    // reads exactly like the switch in Settings having lost its setting. This overlay is the
    // only console the packaged build has, and the pages it could not be opened from are the
    // ones where a problem stops you ever reaching the player.
    debugOverlay: isDevDebugOverlayVisible && devDebugSnapshot
        ? {
            snapshot: devDebugSnapshot,
            currentTime,
            lyricCurrentTime,
            isDaylight,
            onClose: () => setIsDevDebugOverlayVisible(false),
        }
        : null,
    // Independent of the log window on purpose: they answer different questions and are read side
    // by side. Closing either one stops neither the console buffer nor the sampling behind it.
    memoryMonitor: isMemoryMonitorVisible
        ? {
            isDaylight,
            shortcutLabel: memoryMonitorShortcutLabel,
            onClose: () => setIsMemoryMonitorVisible(false),
        }
        : null,
    floatingControls: currentSong
        ? {
            currentSong,
            playerState,
            currentTime,
            lyricCurrentTime,
            duration,
            loopMode: effectiveLoopMode,
            currentView,
            audioSrc,
            canTogglePlay: canToggleCurrentPlayback,
            controlsDisabled: isNowPlayingControlDisabled,
            lyrics,
            onSeek: (time) => {
                if (isNowPlayingControlDisabled) {
                    return;
                }

                if (activePlaybackContext === 'stage' && stageActiveEntryKind === 'lyrics' && !audioSrc) {
                    syncStageLyricsClock(time, duration, playerState, stageLyricsClockRef.current.startTimeSec);
                    currentTime.set(time);
                    if (playerState !== PlayerState.PLAYING) {
                        setPlayerState(PlayerState.PLAYING);
                    }
                    void onStagePlayerSeek();
                } else {
                    onSeekMainAudio(time);
                }
            },
            onTogglePlay: togglePlay,
            onToggleLoop: toggleLoop,
            onNavigateToPlayer: navigateFromPlayerCapsule,
            onFocusLatticeCurrentSong: () => { focusLatticeCurrentSong(); },
            noTrackText,
            primaryColor: 'var(--text-primary)',
            secondaryColor: 'var(--text-secondary)',
            theme,
            isDaylight,
            isHidden: currentView === 'player' && isPlayerChromeHidden,
            hideControlBar: shouldHidePlayerProgressBar,
            slotPrimary: playerControlSlotPrimary,
            slotSecondary: playerControlSlotSecondary,
            slotContext: playerControlSlotContext,
            onCommitBottomBarOffset: onCommitPlayerBottomBarOffset,
            trackNavigation: ((): FloatingControlsProps['trackNavigation'] => {
                const neighbors = resolvePlaybackNeighbors({
                    playQueue,
                    currentSong,
                    loopMode: effectiveLoopMode,
                    isFmMode,
                    isStageActive: isNowPlayingStageActive,
                });

                return {
                    currentTrackKey: getPlaybackSongKey(currentSong),
                    onPrev: handlePrevTrack,
                    onNext: handleNextTrack,
                    canPrev: neighbors.prev.canGo && !isNowPlayingControlDisabled,
                    canNext: neighbors.next.canGo && !isNowPlayingControlDisabled,
                    prevTitle: neighbors.prev.title,
                    nextTitle: neighbors.next.title,
                    prevLabel: prevTrackLabel,
                    nextLabel: nextTrackLabel,
                };
            })(),
        }
        : null,
});
