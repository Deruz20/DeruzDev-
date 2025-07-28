import { Locale } from '../types';

export const locales: Locale[] = ['en', 'ar', 'fr', 'lg'];
export const defaultLocale: Locale = 'en';

export const localeNames = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
  lg: 'Luganda'
};

export const localeFlags = {
  en: '🇺🇸',
  ar: '🇸🇦',
  fr: '🇫🇷',
  lg: '🇺🇬'
};

import { LocalizedString } from '../types';

export function getLocalizedContent(content: LocalizedString | string, locale: Locale): string {
  if (typeof content === 'string') return content;
  if (typeof content === 'object' && content !== null && locale in content) {
    return content[locale];
  }
  if (typeof content === 'object' && content !== null && 'en' in content) {
    return content.en;
  }
  return String(content);
}

export function formatDate(date: Date | string, locale: Locale): string {
  if (!date) return '';
  return new Intl.DateTimeFormat(locale).format(new Date(date));
}
