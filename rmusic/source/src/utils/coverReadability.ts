import { getContrastRatio, parseThemeColor, rgbToHex } from './themeColorMath';

/** Protect text even over the darkest/lightest part of a changing cover. */
export const resolveCoverReadability = (primary: string, secondary: string, background: string) => {
    const score = (surface: string) => Math.min(
        getContrastRatio(primary, surface) / 4.5,
        getContrastRatio(secondary, surface) / 3,
    );
    const color = [background, '#ffffff', '#000000'].reduce((best, candidate) =>
        score(candidate) > score(best) ? candidate : best, background);
    const rgb = parseThemeColor(color)!;
    for (let step = 0; step <= 100; step++) {
        const opacity = step / 100;
        const protectedExtremes = [0, 255].map(channel => rgbToHex({
            r: rgb.r * opacity + channel * (1 - opacity),
            g: rgb.g * opacity + channel * (1 - opacity),
            b: rgb.b * opacity + channel * (1 - opacity),
        }));
        if (protectedExtremes.every(surface => score(surface) >= 1)) return { color, opacity };
    }
    return { color, opacity: 1 };
};
