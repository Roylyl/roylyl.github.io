import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.ts';
import zhCN from './locales/zh-CN.ts';
import zhTW from './locales/zh-TW.ts';
import { resolveMissingTranslation } from './missingTranslation';

/*
 * Hardcoded Chinese fallback dictionary.
 * Flattened at build-time from zh-CN.ts so every key has a Chinese fallback
 * baked directly into the JS bundle — no dependency on i18next resource loading.
 */
function flattenLocale(obj: Record<string, any>, prefix = ''): Record<string, string> {
  let result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      result = { ...result, ...flattenLocale(value, path) };
    } else {
      result[path] = String(value);
    }
  }
  return result;
}

const ZH_FALLBACKS: Record<string, string> = flattenLocale(zhCN);

export type AppLanguagePreference = 'system' | 'en' | 'zh-CN' | 'zh-TW';
export const APP_LANGUAGE_STORAGE_KEY = 'folia_app_language';

const isSupportedManualLanguage = (value: string | null | undefined): value is Exclude<AppLanguagePreference, 'system'> => (
  value === 'en' || value === 'zh-CN' || value === 'zh-TW'
);

const normalizeSupportedLanguage = (value: string | null | undefined): Exclude<AppLanguagePreference, 'system'> => {
  if (!value) {
    return 'en';
  }

  const language = value.toLowerCase().replaceAll('_', '-');
  if (language.startsWith('zh')) {
    return /(?:^|-)hant(?:-|$)|(?:^|-)(tw|hk|mo)(?:-|$)/.test(language)
      && !language.includes('hans') ? 'zh-TW' : 'zh-CN';
  }

  return 'en';
};

export const readStoredAppLanguagePreference = (): AppLanguagePreference => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const saved = localStorage.getItem(APP_LANGUAGE_STORAGE_KEY);
  if (saved === 'system' || isSupportedManualLanguage(saved)) {
    return saved;
  }

  return 'system';
};

const initialLanguagePreference = readStoredAppLanguagePreference();

const syncDocumentLanguage = (value: string | null | undefined) => {
  if (typeof document === 'undefined') {
    return;
  }

  document.documentElement.lang = normalizeSupportedLanguage(value);
};

const detectSystemLanguage = (): Exclude<AppLanguagePreference, 'system'> => {
  return normalizeSupportedLanguage(typeof navigator !== 'undefined' ? navigator.language : 'en');
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      'zh-CN': {
        translation: zhCN
      },
      'zh-TW': {
        translation: zhTW
      }
    },
    fallbackLng: 'en',
    parseMissingKeyHandler: (key: string, defaultValue?: string): string => (
      resolveMissingTranslation(ZH_FALLBACKS, key, defaultValue)
    ),
    supportedLngs: ['en', 'zh-CN', 'zh-TW'],
    lng: initialLanguagePreference === 'system' ? detectSystemLanguage() : initialLanguagePreference,
    detection: {
      order: ['navigator'],
      caches: [],
      lookupLocalStorage: 'i18nextLng'
    },
    interpolation: {
      escapeValue: false
    }
  });

/*
 * The Electron main process keeps its own tiny locale table for the tray menu and
 * native dialogs, and only learns the language through this IPC call. Pushing on every
 * `languageChanged` plus once at startup means a `system` preference reaches the tray
 * too, instead of only manual switches made in Settings.
 */
const pushLocaleToMainProcess = (value: string | null | undefined) => {
  if (typeof window === 'undefined') {
    return;
  }

  void window.electron?.setAppLocale?.(normalizeSupportedLanguage(value) === 'zh-TW' ? 'zh-CN' : normalizeSupportedLanguage(value) as 'en' | 'zh-CN');
};

i18n.on('languageChanged', lng => {
  syncDocumentLanguage(lng);
  pushLocaleToMainProcess(lng);
});

syncDocumentLanguage(i18n.resolvedLanguage ?? i18n.language);
pushLocaleToMainProcess(i18n.resolvedLanguage ?? i18n.language);

export const applyAppLanguagePreference = async (
  preference: AppLanguagePreference
): Promise<Exclude<AppLanguagePreference, 'system'>> => {
  if (typeof window !== 'undefined') {
    if (preference === 'system') {
      localStorage.setItem(APP_LANGUAGE_STORAGE_KEY, preference);
      localStorage.removeItem('i18nextLng');
    } else {
      localStorage.setItem(APP_LANGUAGE_STORAGE_KEY, preference);
    }
  }

  const nextLanguage = preference === 'system' ? detectSystemLanguage() : preference;
  await i18n.changeLanguage(nextLanguage);
  if (typeof window !== 'undefined') {
    await window.electron?.setAppLocale?.(nextLanguage === 'zh-TW' ? 'zh-CN' : nextLanguage);
  }
  return nextLanguage;
};

if (typeof window !== 'undefined') {
  window.addEventListener('languagechange', () => {
    if (readStoredAppLanguagePreference() === 'system') {
      void i18n.changeLanguage(detectSystemLanguage());
    }
  });
}

export default i18n;
