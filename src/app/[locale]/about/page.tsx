import React from 'react';
import Image from 'next/image';
import Layout from '../../../components/Layout';
import { Locale } from '../../../types';
import { getLocalizedContent } from '../../../lib/i18n';
import { getSchoolInfo, getTeamMembers } from '../../../lib/sanity';

interface AboutPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const schoolInfo = await getSchoolInfo(locale);
  const teamMembers = await getTeamMembers(locale);

  return (
    <Layout locale={locale}>
      {/* Hero Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {getLocalizedContent({
              en: 'About Our School',
              ar: 'حول مدرستنا',
              fr: 'À propos de notre école',
              lg: 'Ebikwata ku Ssomero Lyaffe'
            }, locale)}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {getLocalizedContent(schoolInfo.mission, locale)}
          </p>
        </div>
      </section>

      {/* School Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {getLocalizedContent({
                  en: 'Our Story',
                  ar: 'قصتنا',
                  fr: 'Notre Histoire',
                  lg: 'Emboozi Yaffe'
                }, locale)}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {getLocalizedContent(schoolInfo.story, locale)}
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {getLocalizedContent({
                      en: 'Our Mission',
                      ar: 'مهمتنا',
                      fr: 'Notre Mission',
                      lg: 'Obugenderevu Bwaffe'
                    }, locale)}
                  </h3>
                  <p className="text-gray-600">
                    {getLocalizedContent(schoolInfo.mission, locale)}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {getLocalizedContent({
                      en: 'Our Vision',
                      ar: 'رؤيتنا',
                      fr: 'Notre Vision',
                      lg: 'Ekiruubirirwa Kyaffe'
                    }, locale)}
                  </h3>
                  <p className="text-gray-600">
                    {getLocalizedContent(schoolInfo.vision, locale)}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/images/school-building.jpg"
                alt="School Building"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getLocalizedContent({
                en: 'Our Team',
                ar: 'فريقنا',
                fr: 'Notre Équipe',
                lg: 'Ttiimu Yaffe'
              }, locale)}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={getLocalizedContent(member.name, locale)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {getLocalizedContent(member.name, locale)}
                  </h3>
                  <p className="text-green-600 font-medium mb-3">
                    {getLocalizedContent(member.position, locale)}
                  </p>
                  <p className="text-gray-600">
                    {getLocalizedContent(member.bio, locale)}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
