import { useSyncExternalStore } from 'react';

type SafeAreaInsets = { top: number; right: number; bottom: number; left: number; };
const zeroInsets: SafeAreaInsets = { top: 0, right: 0, bottom: 0, left: 0 };
let snapshot = zeroInsets;
let probe: HTMLDivElement | null = null;
const listeners = new Set<() => void>();

const measure = () => {
    if (typeof document === 'undefined' || !document.documentElement) return snapshot;
    if (!probe) {
        probe = document.createElement('div');
        probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none;width:0;height:0;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px);';
        probe.setAttribute('aria-hidden', 'true');
        probe.dataset.rmusicSafeAreaProbe = '';
        document.documentElement.append(probe);
    }
    const style = getComputedStyle(probe);
    const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rmusic-viewport-gap')) || 0;
    const next = { top: parseFloat(style.paddingTop) || 0, right: parseFloat(style.paddingRight) || 0,
        bottom: Math.max(parseFloat(style.paddingBottom) || 0, gap), left: parseFloat(style.paddingLeft) || 0 };
    if (Object.keys(next).some(key => next[key as keyof SafeAreaInsets] !== snapshot[key as keyof SafeAreaInsets])) snapshot = next;
    return snapshot;
};
const notify = () => { const before = snapshot; measure(); if (before !== snapshot) listeners.forEach(listener => listener()); };
const subscribe = (listener: () => void) => {
    listeners.add(listener);
    if (listeners.size === 1) {
        window.addEventListener('resize', notify);
        window.visualViewport?.addEventListener('resize', notify);
        window.addEventListener('orientationchange', notify);
        window.addEventListener('pageshow', notify);
        document.addEventListener('visibilitychange', notify);
        document.addEventListener('rmusic-viewportchange', notify);
        // Re-read after mounting: iOS may publish the installed-app insets after
        // the first render, and returning from another app need not resize it.
        notify();
    }
    return () => {
        listeners.delete(listener);
        if (!listeners.size) {
            window.removeEventListener('resize', notify);
            window.visualViewport?.removeEventListener('resize', notify);
            window.removeEventListener('orientationchange', notify);
            window.removeEventListener('pageshow', notify);
            document.removeEventListener('visibilitychange', notify);
            document.removeEventListener('rmusic-viewportchange', notify);
        }
    };
};

const read = () => measure();
export const useSafeAreaInsets = (): SafeAreaInsets => useSyncExternalStore(subscribe, read, () => zeroInsets);
