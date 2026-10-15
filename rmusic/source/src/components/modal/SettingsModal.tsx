import React, { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion, type MotionValue } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import type { DualTheme, Theme, LyricData, SongResult } from '../../types';
import type { ThemeCacheSongKey } from '../../services/themeCache';
import type { SettingsModalState, SettingsSubviewId, VisualizerSettingsSection } from '../../stores/useSettingsModalStore';
import { shouldIgnoreAppKeyboardShortcut } from '../../utils/appCombinationShortcuts';
import { copyRmusicPlaybackDiagnostics } from '../../services/rmusicPlaybackDiagnostics';
import { setStatusMessage } from '../../stores/useStatusMessageStore';
import { onAudioCached } from '../../services/audioCache';
import { getCacheUsageByCategory, clearCacheByCategory, clearAllCaches } from '../../services/db';
import VisPlayground from '../visualizer/VisPlayground';
import ThemePark from './ThemePark';
import GlobalLyricOffsetModal from './settings/GlobalLyricOffsetModal';
import { settingsCardClassFor, settingsToggleOffClassFor } from './settings/settingsCardClasses';
import AppearanceSettingsSubview from './settings/AppearanceSettingsSubview';
import GeneralSettingsSubview from './settings/GeneralSettingsSubview';
import PlaybackSettingsSubview from './settings/PlaybackSettingsSubview';
import StorageSettingsSection from './settings/StorageSettingsSection';
import { SettingsAnchorProvider, useSettingsAnchorList, useSettingsAnchorStore } from './settings/navigation/SettingsAnchorContext';
import SettingsSidebarChips from './settings/navigation/SettingsSidebarChips';
import SettingsSidebarWide from './settings/navigation/SettingsSidebarWide';
import SettingsSectionHeader from './settings/SettingsSectionHeader';
import { buildSettingsNavGroups, findSettingsNavItem, type SettingsSectionId } from './settings/navigation/settingsNavModel';
import { sectionForSettingsSubview } from './settings/navigation/settingsLastSection';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useSettingsInitialAnchor } from '../../hooks/useSettingsInitialAnchor';
import { selectVisualizerSettingsSnapshot, useVisualizerSettingsStore } from '../../stores/useVisualizerSettingsStore';
import { selectVisualizerAssetSnapshot, useVisualizerAssetStore } from '../../stores/useVisualizerAssetStore';
import { selectTypographySettingsSnapshot, useTypographySettingsStore } from '../../stores/useTypographySettingsStore';
import { selectPlayerChromeSettingsSnapshot, usePlayerChromeSettingsStore } from '../../stores/usePlayerChromeSettingsStore';
import { selectThemeSettingsSnapshot, useThemeSettingsStore } from '../../stores/useThemeSettingsStore';
import { useSettingsModalStore } from '../../stores/useSettingsModalStore';
import { selectAudioSettingsSnapshot, useAudioSettingsStore } from '../../stores/useAudioSettingsStore';

interface SettingsModalProps {
    onClose: () => void;
    initialTab?: 'help' | 'options';
    initialSubview?: SettingsSubviewId | null;
    initialVisualizerSection?: VisualizerSettingsSection | null;
    initialAnchor?: SettingsModalState['initialAnchor'];
    theme?: Theme;
    themeParkInitialTheme: DualTheme;
    onSaveCustomTheme: (dualTheme: DualTheme) => void;
    onSaveAiTheme: (dualTheme: DualTheme, song: SongResult | null, songKey: ThemeCacheSongKey | null) => void;
    currentLyrics: LyricData | null;
    lyricCurrentTime: MotionValue<number>;
    onAudioOutputDeviceChange: (deviceId: string) => Promise<boolean> | boolean;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    onClose,
    initialTab = 'options',
    initialSubview = null,
    initialVisualizerSection = null,
    initialAnchor = null,
    theme,
    themeParkInitialTheme,
    onSaveCustomTheme,
    onSaveAiTheme,
    currentLyrics,
    lyricCurrentTime,
    onAudioOutputDeviceChange,
}) => {
    const { t } = useTranslation();
    // Track the press origin per overlay so nested subview backdrops do not overwrite each other.
    const overlayMouseDownTargetsRef = useRef(new WeakSet<HTMLDivElement>());

    const {
        enableMediaCache,
        mediaCacheLimitGb,
        handleToggleMediaCache: onToggleMediaCache,
        handleSetMediaCacheLimitGb: onSetMediaCacheLimitGb,
    } = useAudioSettingsStore(useShallow(selectAudioSettingsSnapshot));
    const {
  useCoverColorBg,
  staticMode,
  isDaylight,
  setDaylightPreference: onSetDaylightPreference,
  handleToggleCoverColorBg: onToggleCoverColorBg
} = useThemeSettingsStore(useShallow(selectThemeSettingsSnapshot));
    const {
  transparentPlayerBackground,
  autoHidePlayerChrome,
  autoHideCursorWithPlayerChrome,
  handleToggleAutoHidePlayerChrome: onToggleAutoHidePlayerChrome,
  handleToggleAutoHideCursorWithPlayerChrome: onToggleAutoHideCursorWithPlayerChrome
} = usePlayerChromeSettingsStore(useShallow(selectPlayerChromeSettingsSnapshot));
    const {
        lyricsCustomFontFamily,
        lyricsCustomFontLabel,
    } = useTypographySettingsStore(useShallow(selectTypographySettingsSnapshot));
    const {
        hidePlayerTranslationSubtitle,
        showSubtitleTranslation,
        subtitleContentMode,
        subtitleOverlayOpacity,
        subtitleOverlayBackground,
        subtitleUpcomingLyricsBlur,
        showHarmonySubtitle,
        harmonySubtitleBackground,
        lyricsFontStyle,
        lyricsFontScale,
        subtitleFontScale,
        lyricsFontWeight,
        lyricsFontFallbackFamilies,
        subtitleFontInheritsLyrics,
        subtitleFontStyle,
        subtitleFontWeight,
        subtitleFontFamily,
        subtitleFontFallbackFamilies,
        handleToggleHidePlayerTranslationSubtitle: onToggleHidePlayerTranslationSubtitle,
        handleToggleShowSubtitleTranslation: onToggleShowSubtitleTranslation,
        handleSetSubtitleContentMode: onSubtitleContentModeChange,
        handleSetSubtitleOverlayOpacity: setSubtitleOverlayOpacity,
        handleToggleSubtitleOverlayBackground: onToggleSubtitleOverlayBackground,
        handleToggleSubtitleUpcomingLyricsBlur: onToggleSubtitleUpcomingLyricsBlur,
        handleToggleShowHarmonySubtitle: onToggleShowHarmonySubtitle,
        handleToggleHarmonySubtitleBackground: onToggleHarmonySubtitleBackground,
        handleSetLyricsFontStyle: onLyricsFontStyleChange,
        handleSetLyricsFontScale: onLyricsFontScaleChange,
        handleSetSubtitleFontScale: onSubtitleFontScaleChange,
        handleSetLyricsFontWeight: onLyricsFontWeightChange,
        handleSetLyricsCustomFont: onLyricsCustomFontChange,
        handleUploadLyricsCustomFont: onLyricsCustomFontUpload,
        handleSetLyricsFontFallbackFamilies: onLyricsFontFallbackFamiliesChange,
        handleSetSubtitleFontInheritsLyrics: onSubtitleFontInheritsLyricsChange,
        handleSetSubtitleFontStyle: onSubtitleFontStyleChange,
        handleSetSubtitleFontWeight: onSubtitleFontWeightChange,
        handleSetSubtitleFontFamily: onSubtitleFontFamilyChange,
        handleSetSubtitleFontFallbackFamilies: onSubtitleFontFallbackFamiliesChange,
    } = useTypographySettingsStore(useShallow(selectTypographySettingsSnapshot));

    const {
        handleToggleDisableVisualizerVignette: onToggleDisableVisualizerVignette,
        handleToggleDisableVisualizerGeometricBackground: onToggleDisableVisualizerGeometricBackground,
        handleSetBackgroundOpacity: setBackgroundOpacity,
        handleSetVisualizerOpacity: setVisualizerOpacity,
        handleSetVisualizerBackgroundMode: onVisualizerBackgroundModeChange,
        handleSetVisualizerMode: onVisualizerModeChange,
        handleSetClassicTuning: onClassicTuningChange,
        handleResetClassicTuning: onResetClassicTuning,
        handleSetPartitaTuning: onPartitaTuningChange,
        handleResetPartitaTuning: onResetPartitaTuning,
        handleSetFumeTuning: onFumeTuningChange,
        handleResetFumeTuning: onResetFumeTuning,
        handleSetCladdaghTuning: onCladdaghTuningChange,
        handleResetCladdaghTuning: onResetCladdaghTuning,
        handleSetCappellaTuning: onCappellaTuningChange,
        handleResetCappellaTuning: onResetCappellaTuning,
        handleSetTiltTuning: onTiltTuningChange,
        handleResetTiltTuning: onResetTiltTuning,
        handleSetDioramaTuning: onDioramaTuningChange,
        handleResetDioramaTuning: onResetDioramaTuning,
        handleSetMonetBackgroundTuning: onMonetBackgroundTuningChange,
        handleResetMonetBackgroundTuning: onResetMonetBackgroundTuning,
        handleSetNomandBackgroundTuning: onNomandBackgroundTuningChange,
        handleResetNomandBackgroundTuning: onResetNomandBackgroundTuning,
        handleSetLatentBackgroundTuning: onLatentBackgroundTuningChange,
        handleResetLatentBackgroundTuning: onResetLatentBackgroundTuning,
        handleSetSoraBackgroundTuning: onSoraBackgroundTuningChange,
        handleResetSoraBackgroundTuning: onResetSoraBackgroundTuning,
        handleSetMonetTuning: onMonetTuningChange,
        handleResetMonetTuning: onResetMonetTuning,
        handleSetPendoloTuning: onPendoloTuningChange,
        handleResetPendoloTuning: onResetPendoloTuning,
        handleSetSonnetTuning: onSonnetTuningChange,
        handleResetSonnetTuning: onResetSonnetTuning,
        handleSetTemperaTuning: onTemperaTuningChange,
        handleResetTemperaTuning: onResetTemperaTuning,
        handleSetLumiereTuning: onLumiereTuningChange,
        handleResetLumiereTuning: onResetLumiereTuning,
        handleUploadMonetBackgroundImage: onUploadMonetBackgroundImage,
        handleClearMonetBackgroundImage: onClearMonetBackgroundImage,
        handleUploadMonetPortraitImage: onUploadMonetPortraitImage,
        handleClearMonetPortraitImage: onClearMonetPortraitImage,
        handleAddUrlBackgroundItem: onAddUrlBackgroundItem,
        handleUpdateUrlBackgroundItem: onUpdateUrlBackgroundItem,
        handleDeleteUrlBackgroundItem: onDeleteUrlBackgroundItem,
        handleSetUrlBackgroundSelectedId: onSetUrlBackgroundSelectedId,
        handleImportCustomCappellaEmojiPack: onImportCappellaCustomEmojiPack,
        handleClearCustomCappellaEmojiPack: onClearCappellaCustomEmojiPack,
        handleImportCustomCappellaAvatar: onImportCappellaCustomAvatar,
        handleClearCustomCappellaAvatar: onClearCappellaCustomAvatar,
    } = useVisualizerSettingsStore(useShallow(selectVisualizerSettingsSnapshot));
    const {
        disableVisualizerVignette,
        disableVisualizerGeometricBackground,
        backgroundOpacity,
        visualizerOpacity,
        visualizerBackgroundMode,
        visualizerMode,
        classicTuning,
        cadenzaTuning,
        partitaTuning,
        fumeTuning,
        claddaghTuning,
        cappellaTuning,
        tiltTuning,
        dioramaTuning,
        monetBackgroundTuning,
        nomandBackgroundTuning,
        latentBackgroundTuning,
        soraBackgroundTuning,
        monetTuning,
        pendoloTuning,
        sonnetTuning,
        temperaTuning,
        lumiereTuning,
        urlBackgroundList,
        urlBackgroundSelectedId,
    } = useVisualizerSettingsStore(useShallow(selectVisualizerSettingsSnapshot));
    const {
        cappellaCustomEmojiImages,
        isLoadingCappellaCustomEmojiPack,
        cappellaCustomAvatarImages,
        isLoadingCappellaCustomAvatarPack,
        monetBackgroundImage,
        isLoadingMonetBackgroundImage,
        monetPortraitImage,
        isLoadingMonetPortraitImage,
    } = useVisualizerAssetStore(useShallow(selectVisualizerAssetSnapshot));
    const setIsSubSettingsViewOpen = useSettingsModalStore(state => state.setIsSubSettingsViewOpen);
    // Settings opens on appearance; explicit section links select their destination.
    const [activeSettingsSection, setActiveSettingsSection] = useState<SettingsSectionId>(
        () => sectionForSettingsSubview(initialSubview) ?? (initialTab === 'help' ? 'about' : 'appearance'),
    );
    const handleSelectSettingsSection = setActiveSettingsSection;
    const contentScrollRef = useRef<HTMLDivElement>(null);
    // Matches the md:flex-row split below; the two sidebars are different enough to render separately.
    const isWideSettingsLayout = useMediaQuery('(min-width: 768px)');
    const settingsAnchorStore = useSettingsAnchorStore();
    const settingsAnchors = useSettingsAnchorList(settingsAnchorStore);

    const [showVisPlayground, setShowVisPlayground] = useState(false);
    const [showThemePark, setShowThemePark] = useState(false);
    const [showGlobalLyricOffset, setShowGlobalLyricOffset] = useState(false);


    const shouldCloseModalOnSubviewBack = initialSubview !== null;

    useEffect(() => {
        setShowVisPlayground(initialSubview === 'visualizer');
        setShowThemePark(initialSubview === 'themePark');
        setShowGlobalLyricOffset(initialSubview === 'globalLyricOffset');

        const targetSection = sectionForSettingsSubview(initialSubview);
        if (targetSection) {
            // 这两个是播放页歌词区里的二级面板，关掉后应该落回它们的入口所在分区。
            setActiveSettingsSection(targetSection);
        } else {
            setActiveSettingsSection(initialTab === 'help' ? 'about' : 'appearance');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialSubview, initialTab]);

    // Cache State
    const [cacheSizes, setCacheSizes] = useState({
        playlist: '0 B',
        lyrics: '0 B',
        cover: '0 B',
        media: '0 B',
        analysis: '0 B'
    });
    const [mediaCount, setMediaCount] = useState(0);
    const [isCleaning, setIsCleaning] = useState<string | null>(null);

    const isElectron = typeof window !== 'undefined' && Boolean(window.electron);
    const [cacheDirectory, setCacheDirectory] = useState('');
    const [cacheDirectoryIsDefault, setCacheDirectoryIsDefault] = useState(true);
    const [cacheDirectoryStatus, setCacheDirectoryStatus] = useState<'idle' | 'choosing'>('idle');

    useEffect(() => {
        if (!window.electron?.getCacheDirectory) return;
        let disposed = false;
        void window.electron.getCacheDirectory().then(result => {
            if (!disposed && result?.path) {
                setCacheDirectory(result.path);
                setCacheDirectoryIsDefault(result.isDefault);
            }
        }).catch(() => {
            if (!disposed) setStatusMessage({ type: 'error', text: t('options.cacheReadFailed') });
        });
        return () => { disposed = true; };
    }, [t]);

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const fetchCacheUsage = useCallback(async () => {
        const usage = await getCacheUsageByCategory();
        setCacheSizes({
            playlist: formatBytes(usage.playlist),
            lyrics: formatBytes(usage.lyrics),
            cover: formatBytes(usage.cover),
            media: formatBytes(usage.media),
            analysis: formatBytes(usage.analysis)
        });
        setMediaCount(usage.mediaCount);
    }, []);

    useEffect(() => {
        if (activeSettingsSection !== 'storage') return;
        let disposed = false;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const refresh = () => {
            if (!disposed) void fetchCacheUsage().catch(() => {
                setStatusMessage({ type: 'error', text: t('options.cacheReadFailed') });
            });
        };
        refresh();
        const unsubscribe = onAudioCached(() => {
            if (timer !== undefined) return;
            timer = setTimeout(() => { timer = undefined; refresh(); }, 1000);
        });
        return () => { disposed = true; clearTimeout(timer); unsubscribe(); };
    }, [activeSettingsSection, fetchCacheUsage, t]);

    const handleClear = async (category: 'playlist' | 'lyrics' | 'cover' | 'media' | 'analysis') => {
        if (isCleaning) return;
        setIsCleaning(category);
        try {
            await clearCacheByCategory(category);
            await fetchCacheUsage();
            setStatusMessage({ type: 'success', text: t('options.cacheCleared') });
        } catch {
            setStatusMessage({ type: 'error', text: t('options.cacheClearFailed') });
        } finally {
            setIsCleaning(null);
        }
    };

    const handleClearAllCache = async () => {
        if (isCleaning || !confirm(t('options.confirmClearAll'))) return;
        setIsCleaning('all');
        try {
            await clearAllCaches();
            await fetchCacheUsage();
            setStatusMessage({ type: 'success', text: t('options.cacheCleared') });
        } catch {
            setStatusMessage({ type: 'error', text: t('options.cacheClearFailed') });
        } finally {
            setIsCleaning(null);
        }
    };

    const handleChooseCacheDirectory = async () => {
        if (!(window as any).electron) {
            return;
        }

        setCacheDirectoryStatus('choosing');
        try {
            const result = await (window as any).electron.chooseCacheDirectory();
            if (result?.path) {
                setCacheDirectory(result.path);
                setCacheDirectoryIsDefault(result.isDefault);
            }
        } finally {
            setCacheDirectoryStatus('idle');
        }
    };

    const glassBg = isDaylight ? 'bg-white' : 'bg-[#18181b]';

    const borderColor = isDaylight ? 'border-black/5' : 'border-white/10';

    const errorTextColor = isDaylight ? 'text-red-600' : 'text-red-400';
    const overlayBackground = isDaylight ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.5)';
    const toggleOffBackgroundClass = settingsToggleOffClassFor(isDaylight);
    const accentOutlineColor = theme?.accentColor || (isDaylight ? '#44403c' : '#f4f4f5');
    const settingsCardClass = settingsCardClassFor(isDaylight);

    const settingsIconClass = isDaylight
        ? 'bg-black/[0.04] border-black/10'
        : 'bg-white/8 border-white/10';
    const utilityGhostButtonClass = isDaylight
        ? 'border-black/10 bg-black/[0.025] hover:bg-black/[0.055]'
        : 'border-white/10 bg-white/5 hover:bg-white/10';
    const shellTransition = { duration: 0.24, ease: 'easeOut' as const };
    const panelMotion = {
        initial: { opacity: 0, y: 20, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.985 },
    };
    const handleOverlayMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            overlayMouseDownTargetsRef.current.add(event.currentTarget);
            return;
        }

        overlayMouseDownTargetsRef.current.delete(event.currentTarget);
    };

    // Close only the active overlay layer when its own backdrop is clicked.
    const handleBackdropClose = (event: React.MouseEvent<HTMLDivElement>, onCloseOverlay: () => void) => {
        const wasMouseDownOnOverlay = overlayMouseDownTargetsRef.current.has(event.currentTarget);
        overlayMouseDownTargetsRef.current.delete(event.currentTarget);

        if (event.target !== event.currentTarget || !wasMouseDownOnOverlay) {
            return;
        }

        event.stopPropagation();
        onCloseOverlay();
    };
    const isAnySubviewOpen = showVisPlayground
        || showThemePark
        || showGlobalLyricOffset;

    const closeAllSubviews = () => {
        if (shouldCloseModalOnSubviewBack) {
            onClose();
            return;
        }
        setShowVisPlayground(false);
        setShowThemePark(false);
        setShowGlobalLyricOffset(false);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (shouldIgnoreAppKeyboardShortcut(event)) return;
            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                if (isAnySubviewOpen) {
                    closeAllSubviews();
                } else {
                    onClose();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAnySubviewOpen, shouldCloseModalOnSubviewBack, onClose]);

    useEffect(() => {
        setIsSubSettingsViewOpen(isAnySubviewOpen);

        return () => {
            setIsSubSettingsViewOpen(false);
        };
    }, [isAnySubviewOpen, setIsSubSettingsViewOpen]);

    const closeSubviewOrModal = (closeSubview: () => void) => {
        if (shouldCloseModalOnSubviewBack) {
            onClose();
            return;
        }

        closeSubview();
    };
    const settingsNavGroups = useMemo(
        () => buildSettingsNavGroups(t),
        [t],
    );
    const activeSettingsNavItem = findSettingsNavItem(settingsNavGroups, activeSettingsSection);
    const scrollToAnchor = useCallback((anchorId: string) => {
        const container = contentScrollRef.current;
        const node = settingsAnchors.find(anchor => anchor.id === anchorId)?.node as HTMLElement | undefined;
        if (!container || !node) return;
        const top = node.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
        container.scrollTo({ top: Math.max(0, top - 12), behavior: 'smooth' });
    }, [settingsAnchors]);

    // Switching section swaps the whole column; keeping the old offset would land mid-content and
    // leave the table of contents highlighting a section that is no longer on screen.
    useEffect(() => {
        if (contentScrollRef.current) {
            contentScrollRef.current.scrollTop = 0;
        }
    }, [activeSettingsSection]);

    // A command can ask for one section inside the page, not just the page itself; the scroll waits
    // for that section to register, which is the only moment it exists to scroll to. It runs after
    // the reset above on purpose — that reset fires on the same commit the section changes on, and
    // a scrollTop write would abort the smooth scroll this starts.
    useSettingsInitialAnchor(initialAnchor, settingsAnchors, scrollToAnchor);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shellTransition}
            data-folia-keyboard-window="true"
            data-ponder-page-scope="settings-page"
            className="rmusic-settings-overlay fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 sm:px-5 sm:py-12"
            style={{ backgroundColor: overlayBackground }}
            onMouseDown={handleOverlayMouseDown}
            onClick={(event) => handleBackdropClose(event, onClose)}
        >
            <motion.div
                {...panelMotion}
                transition={shellTransition}
                className={`rmusic-settings-panel ${glassBg} border ${borderColor} p-6 md:p-8 rounded-3xl w-full md:max-w-4xl md:w-[900px] h-[90vh] md:h-[85vh] relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300`}
                onClick={(event) => event.stopPropagation()}
            >
                {/* Decorative background blobs */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div
                        className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] ${isDaylight ? 'opacity-20' : 'opacity-10'}`}
                        style={{ backgroundColor: theme?.accentColor || (isDaylight ? '#60a5fa' : '#3b82f6') }}
                    />
                    <div
                        className={`absolute -bottom-24 -left-24 w-64 h-64 rounded-full blur-[80px] ${isDaylight ? 'opacity-20' : 'opacity-10'}`}
                        style={{ backgroundColor: theme?.secondaryColor || theme?.accentColor || (isDaylight ? '#c084fc' : '#a855f7') }}
                    />
                </div>

                <button
                    onClick={onClose}
                    aria-label={t('ui.close')}
                    className="rmusic-dialog-close absolute top-4 right-4 opacity-70 hover:opacity-100 rounded-full bg-white/5 p-1 transition-colors z-20"
                    style={{ color: 'var(--text-primary)' }}
                >
                    <X size={20} />
                </button>

                <h1 className="text-2xl font-bold mb-6 shrink-0" style={{ color: 'var(--text-primary)' }}>{t('ui.options')}</h1>

                <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative z-10">
                    <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                                key="options-tab"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={shellTransition}
                                className="flex flex-col md:flex-row gap-4 md:gap-6 h-full"
                            >
                                <SettingsAnchorProvider store={settingsAnchorStore}>
                                {isWideSettingsLayout ? (
                                    <SettingsSidebarWide
                                        groups={settingsNavGroups}
                                        activeSectionId={activeSettingsSection}
                                        onSelectSection={handleSelectSettingsSection}
                                        isDaylight={isDaylight}
                                    />
                                ) : (
                                    <SettingsSidebarChips
                                        groups={settingsNavGroups}
                                        activeSectionId={activeSettingsSection}
                                        onSelectSection={handleSelectSettingsSection}
                                        isDaylight={isDaylight}
                                    />
                                )}
                                <div ref={contentScrollRef} className="flex-1 overflow-y-auto custom-scrollbar pl-1 md:pl-2 pr-2 md:pr-4 relative pb-4">
                                    <SettingsSectionHeader
                                        title={activeSettingsNavItem?.label ?? ''}
                                        description={activeSettingsNavItem?.description ?? ''}
                                        showDaylightToggle={activeSettingsSection === 'appearance'}
                                        isDaylight={isDaylight}
                                        onSetDaylightPreference={onSetDaylightPreference}
                                        daylightLabel={t('options.daylightMode')}
                                        utilityGhostButtonClass={utilityGhostButtonClass}
                                    />
                                    <div className="space-y-8">
                                        {activeSettingsSection === 'about' && (<div className="space-y-5 select-text">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-semibold tracking-tight">R music</h2>
                                    <p className="text-sm leading-relaxed opacity-70">{t('options.aboutIntro')}</p>
                                </div>
                                <p className="text-sm leading-relaxed opacity-60">{t('options.aboutFeatures')}</p>
                                <div className="flex flex-wrap gap-3 text-sm">
                                    <button type="button" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                                        onClick={async () => {
                                            const copied = await copyRmusicPlaybackDiagnostics();
                                            setStatusMessage({ type: copied ? 'success' : 'error', text: copied ? t('options.diagnosticsCopied') : t('options.copyFailed') });
                                        }}>{t('options.copyDiagnostics')}</button>
                                    <a href="https://github.com/Roylyl/roylyl.github.io/tree/main/rmusic/source" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">{t('options.sourceCode')}</a>
                                    <a href="https://github.com/Roylyl/Music" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">{t('options.musicRepository')}</a>
                                </div>
                                <div className="pt-5 border-t border-white/10 text-xs leading-relaxed opacity-55 space-y-2">
                                    <p>{t('options.aboutAttribution')} <a href="https://github.com/chthollyphile/folia-major" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Folia</a></p>
                                    <p>{t('options.aboutLicense')} <a href="https://github.com/Roylyl/roylyl.github.io/blob/main/rmusic/source/LICENSE" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{t('options.viewLicense')}</a></p>
                                </div>
                                        </div>)}
                                        {activeSettingsSection === 'appearance' && (
                                            <AppearanceSettingsSubview
                                                accentOutlineColor={accentOutlineColor}
                                                isDaylight={isDaylight}
                                                onOpenVisPlayground={() => setShowVisPlayground(true)}
                                                onToggleAutoHidePlayerChrome={onToggleAutoHidePlayerChrome}
                                                onToggleAutoHideCursorWithPlayerChrome={onToggleAutoHideCursorWithPlayerChrome}
                                                settingsCardClass={settingsCardClass}
                                                theme={theme}
                                                toggleOffBackgroundClass={toggleOffBackgroundClass}
                                                autoHidePlayerChrome={autoHidePlayerChrome}
                                                autoHideCursorWithPlayerChrome={autoHideCursorWithPlayerChrome}
                                            />
                                        )}
                                        {activeSettingsSection === 'general' && (
                                            <GeneralSettingsSubview
                                                isDaylight={isDaylight}
                                                settingsCardClass={settingsCardClass}
                                                theme={theme}
                                                utilityGhostButtonClass={utilityGhostButtonClass}
                                            />
                                        )}
                                        {activeSettingsSection === 'playback' && (
                                            <PlaybackSettingsSubview
                                                isDaylight={isDaylight}
                                                onAudioOutputDeviceChange={onAudioOutputDeviceChange}
                                                onOpenGlobalLyricOffsetSettings={() => setShowGlobalLyricOffset(true)}
                                                settingsCardClass={settingsCardClass}
                                                theme={theme}
                                                utilityGhostButtonClass={utilityGhostButtonClass}
                                            />
                                        )}
                                        {activeSettingsSection === 'storage' && (
                                            <StorageSettingsSection
                                                cacheDirectory={cacheDirectory}
                                                cacheDirectoryIsDefault={cacheDirectoryIsDefault}
                                                cacheDirectoryStatus={cacheDirectoryStatus}
                                                cacheSizes={cacheSizes}
                                                enableMediaCache={enableMediaCache}
                                                errorTextColor={errorTextColor}
                                                isCleaning={isCleaning}
                                                isDaylight={isDaylight}
                                                isElectron={isElectron}
                                                mediaCacheLimitGb={mediaCacheLimitGb}
                                                mediaCount={mediaCount}
                                                onChooseCacheDirectory={handleChooseCacheDirectory}
                                                onClear={handleClear}
                                                onClearAll={handleClearAllCache}
                                                onSetMediaCacheLimitGb={onSetMediaCacheLimitGb}
                                                onToggleMediaCache={onToggleMediaCache}
                                                settingsCardClass={settingsCardClass}
                                                settingsIconClass={settingsIconClass}
                                                theme={theme}
                                                toggleOffBackgroundClass={toggleOffBackgroundClass}
                                                useInsetCacheRows
                                            />
                                        )}
                                    </div>
                                </div>
                                </SettingsAnchorProvider>
                            </motion.div>
                    </AnimatePresence>
                </div>

            </motion.div>
            <AnimatePresence>
                {showVisPlayground && (
                    <VisPlayground
                        theme={theme}
                        isDaylight={isDaylight}
                        visualizerMode={visualizerMode}
                        initialEditSection={initialVisualizerSection ?? 'common'}
                        visualizerOpacity={visualizerOpacity}
                        staticMode={staticMode}
                        backgroundConfig={{
                            mode: visualizerBackgroundMode,
                            transparent: transparentPlayerBackground,
                            common: {
                                useCoverColorBg,
                                opacity: backgroundOpacity,
                                disableVignette: disableVisualizerVignette,
                                disableGeometricBackground: disableVisualizerGeometricBackground,
                            },
                            customImage: monetBackgroundImage,
                            monet: { tuning: monetBackgroundTuning },
                            nomand: { tuning: nomandBackgroundTuning },
                            latent: { tuning: latentBackgroundTuning },
                            sora: { tuning: soraBackgroundTuning },
                            url: {
                                items: urlBackgroundList,
                                selectedId: urlBackgroundSelectedId,
                            },
                        }}
                        backgroundActions={{
                            onModeChange: onVisualizerBackgroundModeChange,
                            common: {
                                onCoverColorChange: onToggleCoverColorBg,
                                onOpacityChange: setBackgroundOpacity,
                                onDisableVignetteChange: onToggleDisableVisualizerVignette,
                                onDisableGeometricChange: onToggleDisableVisualizerGeometricBackground,
                            },
                            customImage: {
                                onUpload: onUploadMonetBackgroundImage,
                                onClear: onClearMonetBackgroundImage,
                                isLoading: isLoadingMonetBackgroundImage,
                            },
                            monet: {
                                onTuningChange: onMonetBackgroundTuningChange,
                                onResetTuning: onResetMonetBackgroundTuning,
                            },
                            nomand: {
                                onTuningChange: onNomandBackgroundTuningChange,
                                onResetTuning: onResetNomandBackgroundTuning,
                            },
                            latent: {
                                onTuningChange: onLatentBackgroundTuningChange,
                                onResetTuning: onResetLatentBackgroundTuning,
                            },
                            sora: {
                                onTuningChange: onSoraBackgroundTuningChange,
                                onResetTuning: onResetSoraBackgroundTuning,
                            },
                            url: {
                                onAdd: onAddUrlBackgroundItem,
                                onUpdate: onUpdateUrlBackgroundItem,
                                onDelete: onDeleteUrlBackgroundItem,
                                onSelect: onSetUrlBackgroundSelectedId,
                            },
                        }}
                        hideTranslationSubtitle={hidePlayerTranslationSubtitle}
                        showSubtitleTranslation={showSubtitleTranslation}
                        subtitleContentMode={subtitleContentMode}
                        subtitleOverlayOpacity={subtitleOverlayOpacity}
                        subtitleOverlayBackground={subtitleOverlayBackground}
                        subtitleUpcomingLyricsBlur={subtitleUpcomingLyricsBlur}
                        showHarmonySubtitle={showHarmonySubtitle}
                        harmonySubtitleBackground={harmonySubtitleBackground}
                        classicTuning={classicTuning}
                        cadenzaTuning={cadenzaTuning}
                        partitaTuning={partitaTuning}
                        fumeTuning={fumeTuning}
                        claddaghTuning={claddaghTuning}
                        cappellaTuning={cappellaTuning}
                        tiltTuning={tiltTuning}
                        dioramaTuning={dioramaTuning}
                        monetTuning={monetTuning}
                        pendoloTuning={pendoloTuning}
                        sonnetTuning={sonnetTuning}
                        temperaTuning={temperaTuning}
                        lumiereTuning={lumiereTuning}
                        cappellaCustomEmojiImages={cappellaCustomEmojiImages}
                        cappellaCustomAvatarImages={cappellaCustomAvatarImages}
                        monetPortraitImage={monetPortraitImage}
                        fontStyle={lyricsFontStyle}
                        fontScale={lyricsFontScale}
                        subtitleFontScale={subtitleFontScale}
                        fontWeight={lyricsFontWeight}
                        customFontFamily={lyricsCustomFontFamily}
                        customFontLabel={lyricsCustomFontLabel}
                        fontFallbackFamilies={lyricsFontFallbackFamilies}
                        subtitleFontInheritsLyrics={subtitleFontInheritsLyrics}
                        subtitleFontStyle={subtitleFontStyle}
                        subtitleFontWeight={subtitleFontWeight}
                        subtitleFontFamily={subtitleFontFamily}
                        subtitleFontFallbackFamilies={subtitleFontFallbackFamilies}
                        onFontStyleChange={onLyricsFontStyleChange}
                        onFontScaleChange={onLyricsFontScaleChange}
                        onSubtitleFontScaleChange={onSubtitleFontScaleChange}
                        onFontWeightChange={onLyricsFontWeightChange}
                        onCustomFontChange={onLyricsCustomFontChange}
                        onUploadCustomFont={onLyricsCustomFontUpload}
                        onFontFallbackFamiliesChange={onLyricsFontFallbackFamiliesChange}
                        onSubtitleFontInheritsLyricsChange={onSubtitleFontInheritsLyricsChange}
                        onSubtitleFontStyleChange={onSubtitleFontStyleChange}
                        onSubtitleFontWeightChange={onSubtitleFontWeightChange}
                        onSubtitleFontFamilyChange={onSubtitleFontFamilyChange}
                        onSubtitleFontFallbackFamiliesChange={onSubtitleFontFallbackFamiliesChange}
                        onVisualizerModeChange={onVisualizerModeChange}
                        onVisualizerOpacityChange={setVisualizerOpacity}
                        onToggleHideTranslationSubtitle={onToggleHidePlayerTranslationSubtitle}
                        onToggleShowSubtitleTranslation={onToggleShowSubtitleTranslation}
                        onSubtitleContentModeChange={onSubtitleContentModeChange}
                        onSubtitleOverlayOpacityChange={setSubtitleOverlayOpacity}
                        onToggleSubtitleOverlayBackground={onToggleSubtitleOverlayBackground}
                        onToggleSubtitleUpcomingLyricsBlur={onToggleSubtitleUpcomingLyricsBlur}
                        onToggleShowHarmonySubtitle={onToggleShowHarmonySubtitle}
                        onToggleHarmonySubtitleBackground={onToggleHarmonySubtitleBackground}
                        onClassicTuningChange={onClassicTuningChange}
                        onResetClassicTuning={onResetClassicTuning}
                        onPartitaTuningChange={onPartitaTuningChange}
                        onResetPartitaTuning={onResetPartitaTuning}
                        onFumeTuningChange={onFumeTuningChange}
                        onResetFumeTuning={onResetFumeTuning}
                        onCladdaghTuningChange={onCladdaghTuningChange}
                        onResetCladdaghTuning={onResetCladdaghTuning}
                        onCappellaTuningChange={onCappellaTuningChange}
                        onResetCappellaTuning={onResetCappellaTuning}
                        onTiltTuningChange={onTiltTuningChange}
                        onResetTiltTuning={onResetTiltTuning}
                        onDioramaTuningChange={onDioramaTuningChange}
                        onResetDioramaTuning={onResetDioramaTuning}
                        onMonetTuningChange={onMonetTuningChange}
                        onResetMonetTuning={onResetMonetTuning}
                        onPendoloTuningChange={onPendoloTuningChange}
                        onResetPendoloTuning={onResetPendoloTuning}
                        onSonnetTuningChange={onSonnetTuningChange}
                        onResetSonnetTuning={onResetSonnetTuning}
                        onTemperaTuningChange={onTemperaTuningChange}
                        onResetTemperaTuning={onResetTemperaTuning}
                        onLumiereTuningChange={onLumiereTuningChange}
                        onResetLumiereTuning={onResetLumiereTuning}
                        onUploadMonetPortraitImage={onUploadMonetPortraitImage}
                        onClearMonetPortraitImage={onClearMonetPortraitImage}
                        isLoadingMonetPortraitImage={isLoadingMonetPortraitImage}
                        onImportCappellaCustomEmojiPack={onImportCappellaCustomEmojiPack}
                        onClearCappellaCustomEmojiPack={onClearCappellaCustomEmojiPack}
                        isLoadingCappellaCustomEmojiPack={isLoadingCappellaCustomEmojiPack}
                        onImportCappellaCustomAvatar={onImportCappellaCustomAvatar}
                        onClearCappellaCustomAvatar={onClearCappellaCustomAvatar}
                        isLoadingCappellaCustomAvatarPack={isLoadingCappellaCustomAvatarPack}
                        onClose={() => closeSubviewOrModal(() => setShowVisPlayground(false))}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showThemePark && (
                    <ThemePark
                        initialTheme={themeParkInitialTheme}
                        isDaylight={isDaylight}
                        visualizerMode={visualizerMode}
                        visualizerTunings={{
                            classic: classicTuning,
                            cadenza: cadenzaTuning,
                            partita: partitaTuning,
                            fume: fumeTuning,
                            claddagh: claddaghTuning,
                            cappella: cappellaTuning,
                            tilt: tiltTuning,
                            diorama: dioramaTuning,
                            monet: monetTuning,
                            pendolo: pendoloTuning,
                            sonnet: sonnetTuning,
                            tempera: temperaTuning,
                            lumiere: lumiereTuning,
                        }}
                        staticMode={staticMode}
                        visualizerOpacity={visualizerOpacity}
                        backgroundConfig={{
                            mode: visualizerBackgroundMode,
                            common: {
                                useCoverColorBg,
                                opacity: backgroundOpacity,
                                disableVignette: disableVisualizerVignette,
                                disableGeometricBackground: disableVisualizerGeometricBackground,
                            },
                            customImage: monetBackgroundImage,
                            monet: { tuning: monetBackgroundTuning },
                            nomand: { tuning: nomandBackgroundTuning },
                            latent: { tuning: latentBackgroundTuning },
                            sora: { tuning: soraBackgroundTuning },
                            url: {
                                items: urlBackgroundList,
                                selectedId: urlBackgroundSelectedId,
                            },
                        }}
                        cappellaCustomEmojiImages={cappellaCustomEmojiImages}
                        cappellaCustomAvatarImages={cappellaCustomAvatarImages}
                        monetPortraitImage={monetPortraitImage}
                        showSubtitleTranslation={showSubtitleTranslation}
                        subtitleContentMode={subtitleContentMode}
                        lyricsFontStyle={lyricsFontStyle}
                        lyricsFontScale={lyricsFontScale}
                        lyricsFontWeight={lyricsFontWeight}
                        lyricsCustomFontFamily={lyricsCustomFontFamily}
                        onSaveCustomTheme={(dualTheme) => {
                            onSaveCustomTheme(dualTheme);
                            setShowThemePark(false);
                        }}
                        onSaveAiTheme={(dualTheme, song, songKey) => {
                            onSaveAiTheme(dualTheme, song, songKey);
                            setShowThemePark(false);
                        }}
                        onClose={() => closeSubviewOrModal(() => setShowThemePark(false))}
                    />
                )}
            </AnimatePresence>

            <GlobalLyricOffsetModal
                isOpen={showGlobalLyricOffset}
                isDaylight={isDaylight}
                lyrics={currentLyrics}
                lyricCurrentTime={lyricCurrentTime}
                onClose={() => closeSubviewOrModal(() => setShowGlobalLyricOffset(false))}
            />
        </motion.div>
    );
};

export default SettingsModal;
