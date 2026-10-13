// Folia uses many preference keys. Scope its existing Storage contract before
// any store loads so R music cannot read, clear or overwrite another player.
const PREFIX = 'rmusic:';
function scopeStorage(property: 'localStorage' | 'sessionStorage') {
    const backing = window[property];
    const keys = () => Array.from({ length: backing.length }, (_, index) => backing.key(index))
        .filter((key): key is string => Boolean(key?.startsWith(PREFIX)));
    const scoped: Storage = {
        get length() { return keys().length; },
        key(index) { return keys()[index]?.slice(PREFIX.length) ?? null; },
        getItem(key) { return backing.getItem(PREFIX + key); },
        setItem(key, value) { backing.setItem(PREFIX + key, String(value)); },
        removeItem(key) { backing.removeItem(PREFIX + key); },
        clear() { keys().forEach(key => backing.removeItem(key)); },
    };
    Object.defineProperty(window, property, { configurable: true, value: scoped });
}
try {
    scopeStorage('localStorage');
    scopeStorage('sessionStorage');
} catch (error) {
    console.warn('[R music] Browser storage is unavailable', error);
}
