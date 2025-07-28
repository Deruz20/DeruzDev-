import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Locale } from '../../types';
import { getLocalizedContent } from '../../lib/i18n';
import { getHomePage } from '../../lib/sanity';

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const homePage = await getHomePage(locale);

  return (
    <Layout locale={locale}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-green-800 to-green-600">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="School Background"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {getLocalizedContent(homePage.heroTitle, locale)}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {getLocalizedContent(homePage.heroSubtitle, locale)}
          </p>
          <div className="space-x-4">
            <Link
              href={`/${locale}/admissions`}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {getLocalizedContent({
                en: 'Apply Now',
                ar: 'قدم الآن',
                fr: 'Postuler Maintenant',
                lg: 'Saba Kaakano'
              }, locale)}
            </Link>
            <Link
              href={`/${locale}/donate`}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {getLocalizedContent({
                en: 'Support Us',
                ar: 'ادعمنا',
                fr: 'Nous Soutenir',
                lg: 'Tuyambe'
              }, locale)}
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {getLocalizedContent(homePage.missionTitle, locale)}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {getLocalizedContent(homePage.missionDescription, locale)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homePage.principles.map((principle, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-4">{principle.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {getLocalizedContent(principle.title, locale)}
                </h3>
                <p className="text-gray-600">
                  {getLocalizedContent(principle.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {getLocalizedContent({
                en: 'School Life',
                ar: 'الحياة المدرسية',
                fr: 'Vie Scolaire',
                lg: 'Obulamu bw\'Essomero'
              }, locale)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/images/pupils_in_class.jpg', alt: 'Students in class' },
              { src: '/images/pupil_1.jpg', alt: 'Student learning' },
              { src: '/images/debate_1.jpg', alt: 'School debate' },
              { src: '/images/4064.jpg', alt: 'School activities' },
            ].map((image, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {getLocalizedContent(homePage.callToActionTitle, locale)}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {getLocalizedContent(homePage.callToActionDescription, locale)}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            {getLocalizedContent({
              en: 'Contact Us',
              ar: 'اتصل بنا',
              fr: 'Nous Contacter',
              lg: 'Tusisinkane'
            }, locale)}
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ar' },
    { locale: 'fr' },
    { locale: 'lg' },
  ];
}
