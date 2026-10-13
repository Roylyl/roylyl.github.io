import type { Theme } from '../types';

export const MIN_FONT_WEIGHT = 100;
export const MAX_FONT_WEIGHT = 900;
export const FONT_WEIGHT_STEP = 10;

export const normalizeFontWeight = (fontWeight: unknown): number | null => {
    if (typeof fontWeight !== 'number' || !Number.isFinite(fontWeight)) return null;

    const clamped = Math.min(MAX_FONT_WEIGHT, Math.max(MIN_FONT_WEIGHT, fontWeight));
    return Math.round(clamped / FONT_WEIGHT_STEP) * FONT_WEIGHT_STEP;
};

export const resolveThemeFontWeight = (
    theme: Pick<Theme, 'fontWeight'> | null | undefined,
    fallback: number,
) => normalizeFontWeight(theme?.fontWeight) ?? fallback;

const SUGAR_SERIF_FAMILY = '"獅尾四季春加糖SC"';

export const BUILTIN_FONT_STACKS: Record<Theme['fontStyle'], string> = {
    sans: '"Inter", "Noto Sans CJK SC", "Noto Sans JP", "Source Han Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial, sans-serif',
    serif: `${SUGAR_SERIF_FAMILY}, "Iowan Old Style", "Noto Serif CJK SC", "Noto Serif JP", "Source Han Serif SC", "Songti SC", "STSong", "Georgia", serif`,
    mono: '"IBM Plex Mono", "Sarasa Mono SC", "Noto Sans Mono CJK SC", "Noto Sans Mono", "SFMono-Regular", Consolas, monospace',
};

const normalizeFontFamilyName = (fontFamily: string) => fontFamily.trim().replace(/^['"]|['"]$/g, '').trim();

export const normalizeFontFamilyStack = (fontFamilies: Array<string | null | undefined> | null | undefined) => {
    const seen = new Set<string>();
    const stack: string[] = [];

    fontFamilies?.forEach(fontFamily => {
        const normalized = normalizeFontFamilyName(fontFamily ?? '');
        if (!normalized) return;

        const key = normalized.toLocaleLowerCase();
        if (seen.has(key)) return;

        seen.add(key);
        stack.push(normalized);
    });

    return stack;
};

export const getBuiltinThemeFontStack = (fontStyle: Theme['fontStyle']) => {
    return BUILTIN_FONT_STACKS[fontStyle] ?? BUILTIN_FONT_STACKS.sans;
};

export const RMUSIC_FONT_STACK = '"Microsoft YaHei", "微软雅黑", "PingFang SC", "Noto Sans CJK SC", sans-serif';

export const resolveThemeFontStack = (_theme: Pick<Theme, 'fontStyle' | 'fontFamily' | 'fontFamilyStack'>) => RMUSIC_FONT_STACK;
export const resolveThemeTranslationFontStack = (_theme: Pick<Theme, 'fontStyle' | 'fontFamily' | 'fontFamilyStack'>) => RMUSIC_FONT_STACK;
