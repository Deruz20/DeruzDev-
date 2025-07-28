import React from 'react';
import Layout from '../../../components/Layout';
import { Locale } from '../../../types';
import { getLocalizedContent } from '../../../lib/i18n';
import { getExpansion } from '../../../lib/sanity';

interface ExpansionPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function ExpansionPage({ params }: ExpansionPageProps) {
  const { locale } = await params;
  const expansion = await getExpansion(locale);

  return (
    <Layout locale={locale}>
      {/* Hero Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {getLocalizedContent(expansion.title, locale)}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {getLocalizedContent(expansion.description, locale)}
          </p>
        </div>
      </section>

      {/* Boarding Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {getLocalizedContent({
                  en: 'Boarding Facilities',
                  ar: 'مرافق الإقامة',
                  fr: 'Installations d\'Internat',
                  lg: 'Ebifo by\'Okusula'
                }, locale)}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {getLocalizedContent(expansion.boardingInfo, locale)}
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {getLocalizedContent({
                  en: 'Boarding Application',
                  ar: 'طلب الإقامة',
                  fr: 'Demande d\'Internat',
                  lg: 'Okusaba Okusula'
                }, locale)}
              </h3>
              <p className="text-gray-600 mb-6">
                {getLocalizedContent({
                  en: 'Apply for boarding accommodation for your child',
                  ar: 'تقدم بطلب للحصول على سكن داخلي لطفلك',
                  fr: 'Demandez un hébergement en internat pour votre enfant',
                  lg: 'Saba okusula kw\'omwana wo'
                }, locale)}
              </p>
              <button className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                {getLocalizedContent({
                  en: 'Apply for Boarding',
                  ar: 'تقدم للإقامة',
                  fr: 'Postuler pour l\'Internat',
                  lg: 'Saba Okusula'
                }, locale)}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Future Growth Plans */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getLocalizedContent({
                en: 'Future Growth Plans',
                ar: 'خطط النمو المستقبلي',
                fr: 'Plans de Croissance Future',
                lg: 'Enteekateeka z\'Okukula mu Biseera by\'omu Maaso'
              }, locale)}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {getLocalizedContent({
                  en: 'Development Plans',
                  ar: 'خطط التطوير',
                  fr: 'Plans de Développement',
                  lg: 'Enteekateeka z\'Okukulaakulanya'
                }, locale)}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {getLocalizedContent(expansion.futureGrowthPlans, locale)}
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {getLocalizedContent({
                  en: 'Timeline',
                  ar: 'الجدول الزمني',
                  fr: 'Calendrier',
                  lg: 'Omutendera gw\'Ebiseera'
                }, locale)}
              </h3>
              <p className="text-lg text-gray-600">
                {getLocalizedContent(expansion.timeline, locale)}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {getLocalizedContent({
                  en: 'Benefits of Expansion',
                  ar: 'فوائد التوسع',
                  fr: 'Avantages de l\'Expansion',
                  lg: 'Emiganyulo gy\'Okugaza'
                }, locale)}
              </h3>
              <div className="space-y-4">
                {expansion.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-600 mr-3 text-xl">✓</span>
                    <span className="text-gray-700 text-lg">{getLocalizedContent(benefit, locale)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support the Expansion */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {getLocalizedContent({
              en: 'Support Our Expansion',
              ar: 'ادعم توسعنا',
              fr: 'Soutenez Notre Expansion',
              lg: 'Tuyambe Okugaza Kwaffe'
            }, locale)}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {getLocalizedContent({
              en: 'Your donations help us build better facilities and serve more students in our community',
              ar: 'تبرعاتكم تساعدنا في بناء مرافق أفضل وخدمة المزيد من الطلاب في مجتمعنا',
              fr: 'Vos dons nous aident à construire de meilleures installations et à servir plus d\'étudiants dans notre communauté',
              lg: 'Ebyawaayo byammwe bituyamba okuzimba ebifo ebisinga obulungi n\'okuweereza abayizi abangi mu kitundu kyaffe'
            }, locale)}
          </p>
          <div className="space-x-4">
            <a
              href={`/${locale}/donate`}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              {getLocalizedContent({
                en: 'Donate Now',
                ar: 'تبرع الآن',
                fr: 'Faire un Don',
                lg: 'Waayo Kaakano'
              }, locale)}
            </a>
            <a
              href={`/${locale}/contact`}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              {getLocalizedContent({
                en: 'Learn More',
                ar: 'اعرف المزيد',
                fr: 'En Savoir Plus',
                lg: 'Manya Ebisingawo'
              }, locale)}
            </a>
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
