export const locales = ['en', 'pt', 'fi', 'es', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const rtlLocales: Locale[] = ['ar'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Portugues',
  fi: 'Suomi',
  es: 'Espanol',
  ar: 'العربية',
};

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
