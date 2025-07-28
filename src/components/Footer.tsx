'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '../types';
import { getLocalizedContent } from '../lib/i18n';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">
              {getLocalizedContent({
                en: 'Budda Islamic Junior School',
                ar: 'مدرسة بودا الإسلامية الابتدائية',
                fr: 'École Primaire Islamique Budda',
                lg: 'Essomero lya Budda Islamic Junior'
              }, locale)}
            </h3>
            <p className="text-gray-300 mb-4">
              {getLocalizedContent({
                en: 'Providing quality Islamic education that nurtures both academic excellence and spiritual growth.',
                ar: 'تقديم تعليم إسلامي عالي الجودة يغذي التميز الأكاديمي والنمو الروحي.',
                fr: 'Fournir une éducation islamique de qualité qui nourrit l\'excellence académique et la croissance spirituelle.',
                lg: 'Okuwa ebyenjigiriza bya kisilamu ebisinga obulungi ebikuza obukugu mu masomo n\'okukula mu mwoyo.'
              }, locale)}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {getLocalizedContent({
                en: 'Quick Links',
                ar: 'روابط سريعة',
                fr: 'Liens Rapides',
                lg: 'Enkuubo ez\'Amangu'
              }, locale)}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-300 hover:text-white transition-colors">
                  {getLocalizedContent({
                    en: 'About Us',
                    ar: 'حولنا',
                    fr: 'À propos de nous',
                    lg: 'Ebikwata ku ffe'
                  }, locale)}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/admissions`} className="text-gray-300 hover:text-white transition-colors">
                  {getLocalizedContent({
                    en: 'Admissions',
                    ar: 'القبول',
                    fr: 'Admissions',
                    lg: 'Okuyingizibwa'
                  }, locale)}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/donate`} className="text-gray-300 hover:text-white transition-colors">
                  {getLocalizedContent({
                    en: 'Donate',
                    ar: 'تبرع',
                    fr: 'Faire un don',
                    lg: 'Waayo'
                  }, locale)}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {getLocalizedContent({
                en: 'Contact Info',
                ar: 'معلومات الاتصال',
                fr: 'Informations de Contact',
                lg: 'Amakuru g\'Okusisinkana'
              }, locale)}
            </h3>
            <div className="text-gray-300 space-y-2">
              <p>
                {getLocalizedContent({
                  en: 'Budda, Wakiso District, Uganda',
                  ar: 'بودا، مقاطعة واكيسو، أوغندا',
                  fr: 'Budda, District de Wakiso, Ouganda',
                  lg: 'Budda, Disitulikiti ya Wakiso, Uganda'
                }, locale)}
              </p>
              <p>+256 700 123 456</p>
              <p>info@buddaislamic.ac.ug</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>
            © {currentYear} {getLocalizedContent({
              en: 'Budda Islamic Junior School. All rights reserved.',
              ar: 'مدرسة بودا الإسلامية الابتدائية. جميع الحقوق محفوظة.',
              fr: 'École Primaire Islamique Budda. Tous droits réservés.',
              lg: 'Essomero lya Budda Islamic Junior. Eddembe lyonna liriko.'
            }, locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
