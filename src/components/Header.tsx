'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import { Locale } from '../types';
import { getLocalizedContent } from '../lib/i18n';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const navigation = [
    {
      name: {
        en: 'Home',
        ar: 'الرئيسية',
        fr: 'Accueil',
        lg: 'Amaka'
      },
      href: `/${locale}`
    },
    {
      name: {
        en: 'About',
        ar: 'حول',
        fr: 'À propos',
        lg: 'Ebikwata ku ffe'
      },
      href: `/${locale}/about`
    },
    {
      name: {
        en: 'Admissions',
        ar: 'القبول',
        fr: 'Admissions',
        lg: 'Okuyingizibwa'
      },
      href: `/${locale}/admissions`
    },
    {
      name: {
        en: 'Donate',
        ar: 'تبرع',
        fr: 'Faire un don',
        lg: 'Waayo'
      },
      href: `/${locale}/donate`
    },
    {
      name: {
        en: 'Contact',
        ar: 'اتصل',
        fr: 'Contact',
        lg: 'Tusisinkane'
      },
      href: `/${locale}/contact`
    }
  ];

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-3">
              <Image
                src="/images/logo-final.png"
                alt="Budda Islamic Junior School"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-green-800">
                {getLocalizedContent({
                  en: 'Budda Islamic Junior School',
                  ar: 'مدرسة بودا الإسلامية الابتدائية',
                  fr: 'École Primaire Islamique Budda',
                  lg: 'Essomero lya Budda Islamic Junior'
                }, locale)}
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-green-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {getLocalizedContent(item.name, locale)}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </nav>
    </header>
  );
}
