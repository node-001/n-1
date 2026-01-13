export const locales = ['en', 'pt', 'fi', 'es', 'ar', 'ja', 'ko', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const rtlLocales: Locale[] = ['ar'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
  fi: 'Suomi',
  es: 'Español',
  ar: 'العربية',
  ja: '日本語',
  ko: '한국어',
  de: 'Deutsch',
};

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
