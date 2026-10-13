import { Blinds, Captions, Droplets, GalleryVerticalEnd, Grid2x2, Palette, SquareDashed } from 'lucide-react';
import type { CommandPaletteCommand, CommandPaletteContext } from '../types';
import { createSettingsAnchorCommand, createToggleCommand, defineCommand } from '../commandFactories';
import {
    libraryWallLookPickerSurface,
    libraryWallSeamStylePickerSurface,
    libraryWallWindowsPickerSurface,
} from '../surfaces/libraryWallLookSurface';

// src/components/command-palette/commands/libraryWallLookCommands.ts
// bravais 独有设置的命令（settings 组）：透光档位 picker、每块窗数 picker、集合叠页边开关、信息条始终透明开关、
// 信息条样式 picker、墙后画面的歌词 / 模糊开关，以及跳到界面设置「Bravais 墙面」分组的锚点命令（settings-bravais）。
// 可用性与设置分区（LibraryWallLookSettings）同一个谓词：生效 suite 是 bravais（isBravaisLibraryActive，经 context 透出，
// 这里不 import registry）；窗数命令另要求当前档位是部分透明——别的档位没有「窗数」可调，设置分区里也不显示那一行；
// 信息条样式 picker 另要求信息条不是「始终透明」——透明开着时预设不生效，设置分区里那一组也是禁用的。
// 没有执行键：picker 要进 picker 选值；几个开关与锚点命令也不给（没有现成的前缀空间，打开面板搜得到即可）。
// B6 起透光另由 bravais 的 manifest 声明成外观动作（suite-chrome），那是另一组命令 id。

/** 档位命令的可用性：生效 suite 是 bravais。无 context（契约测试、全部命令列表）时视为可用。 */
export const isLibraryWallLookCommandAvailable = (context?: CommandPaletteContext): boolean => (
    context ? context.settings.isLibraryWallLookAvailable() : true
);

/** 信息条样式 picker 的可用性：bravais 生效，且信息条不是「始终透明」（与设置分区禁用那一组同一个条件）。 */
export const isLibraryWallSeamStyleCommandAvailable = (context?: CommandPaletteContext): boolean => (
    context
        ? context.settings.isLibraryWallLookAvailable() && !context.settings.libraryWallSeamClear()
        : true
);

/** 窗数命令的可用性：bravais 生效，且档位是部分透明。 */
export const isLibraryWallWindowsCommandAvailable = (context?: CommandPaletteContext): boolean => (
    context
        ? context.settings.isLibraryWallLookAvailable() && context.settings.libraryWallLook() === 'partial'
        : true
);

export const libraryWallLookCommands: CommandPaletteCommand[] = [];
