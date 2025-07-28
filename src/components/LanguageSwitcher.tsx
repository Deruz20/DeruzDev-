'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, localeFlags } from '../lib/i18n';
import { Locale } from '../types';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <span className="text-lg">{localeFlags[currentLocale]}</span>
        <span>{localeNames[currentLocale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  locale === currentLocale ? 'bg-green-50 text-green-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{localeFlags[locale]}</span>
                <span>{localeNames[locale]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
