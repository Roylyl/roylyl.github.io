import { create } from 'zustand';
import type { LibraryWallLook } from '../utils/libraryWallLook';
import type { LibraryWallSeamStyle } from '../utils/libraryWallSeamStyle';

const readAll = () => ({
    look: 'solid' as LibraryWallLook,
    windowsPerBlock: 3,
    collectionStackEdges: true,
    seamClear: true,
    seamStyle: 'paper' as LibraryWallSeamStyle,
    backdropLyrics: true,
    backdropBlur: true,
});

export type LibraryWallLookState = {
    look: LibraryWallLook;
    /** 部分透明时每块（12 个 slot）开几个窗；档位不是部分透明时保留原值，切回来照旧。 */
    windowsPerBlock: number;
    /** 集合磁贴（专辑 / 歌单 / 文件夹 / 每日推荐）右下边缘的叠页边；关掉时集合就是普通海报（曲目数仍在标签里）。 */
    collectionStackEdges: boolean;
    /**
     * 信息条始终透明：缝（首页窄缝 / 书脊、集合与歌手页的信息条、面板）不画实色纸，透出后面的 visualizer。
     * 开着时实色墙也不算完全遮挡（visualizer 不卸载），seamStyle 不生效。
     */
    seamClear: boolean;
    /** 信息条实色模式的预设（seamClear 开着时不生效，值保留）。 */
    seamStyle: LibraryWallSeamStyle;
    /** 透出的 visualizer（窗、透明的缝）画不画歌词文字；只影响首页墙后面，播放页照常。 */
    backdropLyrics: boolean;
    /** 透出的 visualizer 加模糊（visualizer 那一层的 CSS filter，只在有透出时生效）。 */
    backdropBlur: boolean;
    /** 非法值回默认档后再写入。 */
    setLook: (look: LibraryWallLook) => void;
    /** 先钳到 1–6 再写入。 */
    setWindowsPerBlock: (windowsPerBlock: number) => void;
    setCollectionStackEdges: (enabled: boolean) => void;
    setSeamClear: (enabled: boolean) => void;
    /** 非法值回默认（主题纸色）后再写入。 */
    setSeamStyle: (style: LibraryWallSeamStyle) => void;
    setBackdropLyrics: (enabled: boolean) => void;
    setBackdropBlur: (enabled: boolean) => void;
    /** 从存储重新读一遍（存储被别处改写、或测试模拟重启时用）。 */
    hydrate: () => void;
};

// Fixed R music wall appearance; older saved preferences cannot override it.
export const useLibraryWallLookStore = create<LibraryWallLookState>(set => ({
    ...readAll(),
    setLook: () => set(readAll()),
    setWindowsPerBlock: () => set(readAll()),
    setCollectionStackEdges: () => set(readAll()),
    setSeamClear: () => set(readAll()),
    setSeamStyle: () => set(readAll()),
    setBackdropLyrics: () => set(readAll()),
    setBackdropBlur: () => set(readAll()),
    hydrate: () => set(readAll()),
}));
