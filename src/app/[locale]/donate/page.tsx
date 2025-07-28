import React from 'react';
import Layout from '../../../components/Layout';
import { Locale } from '../../../types';
import { getLocalizedContent } from '../../../lib/i18n';
import { getDonationPage } from '../../../lib/sanity';

interface DonatePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function DonatePage({ params }: DonatePageProps) {
  const { locale } = await params;
  const donationPage = await getDonationPage(locale);

  return (
    <Layout locale={locale}>
      {/* Hero Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {getLocalizedContent(donationPage.title, locale)}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {getLocalizedContent(donationPage.appealMessage, locale)}
          </p>
        </div>
      </section>

      {/* Payment Instructions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getLocalizedContent({
                en: 'How to Donate',
                ar: 'كيفية التبرع',
                fr: 'Comment Faire un Don',
                lg: 'Engeri y\'Okuwaayo'
              }, locale)}
            </h2>
            <p className="text-lg text-gray-600">
              {getLocalizedContent(donationPage.paymentInstructions, locale)}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mobile Money */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">📱</span>
                {getLocalizedContent({
                  en: 'Mobile Money',
                  ar: 'الأموال المحمولة',
                  fr: 'Argent Mobile',
                  lg: 'Ssente za Simu'
                }, locale)}
              </h3>
              <div className="space-y-4">
                {donationPage.mobileMoneyNumbers.map((provider, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-lg">{provider.provider}</span>
                      <span className="text-green-600 font-bold text-xl">{provider.number}</span>
                    </div>
                    <p className="text-gray-600">
                      {getLocalizedContent({
                        en: `Account Name: ${provider.name}`,
                        ar: `اسم الحساب: ${provider.name}`,
                        fr: `Nom du compte: ${provider.name}`,
                        lg: `Erinnya ly'akawunti: ${provider.name}`
                      }, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">🏦</span>
                {getLocalizedContent({
                  en: 'Bank Transfer',
                  ar: 'التحويل المصرفي',
                  fr: 'Virement Bancaire',
                  lg: 'Okusindika Ssente mu Bbanka'
                }, locale)}
              </h3>
              <div className="space-y-4">
                {donationPage.bankDetails.map((bank, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <h4 className="font-semibold text-lg mb-3">{bank.bankName}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {getLocalizedContent({
                            en: 'Account Name:',
                            ar: 'اسم الحساب:',
                            fr: 'Nom du compte:',
                            lg: 'Erinnya ly\'akawunti:'
                          }, locale)}
                        </span>
                        <span className="font-medium">{bank.accountName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {getLocalizedContent({
                            en: 'Account Number:',
                            ar: 'رقم الحساب:',
                            fr: 'Numéro de compte:',
                            lg: 'Ennamba y\'akawunti:'
                          }, locale)}
                        </span>
                        <span className="font-medium">{bank.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {getLocalizedContent({
                            en: 'Branch:',
                            ar: 'الفرع:',
                            fr: 'Succursale:',
                            lg: 'Ettabi:'
                          }, locale)}
                        </span>
                        <span className="font-medium">{bank.branch}</span>
                      </div>
                      {bank.swiftCode && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">SWIFT Code:</span>
                          <span className="font-medium">{bank.swiftCode}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Material Donations */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getLocalizedContent({
                en: 'Material Donations',
                ar: 'التبرعات المادية',
                fr: 'Dons Matériels',
                lg: 'Ebyamaguzi'
              }, locale)}
            </h2>
            <p className="text-lg text-gray-600">
              {getLocalizedContent({
                en: 'We also accept donations of educational materials and supplies',
                ar: 'نحن نقبل أيضاً التبرعات من المواد التعليمية واللوازم',
                fr: 'Nous acceptons également les dons de matériel éducatif et de fournitures',
                lg: 'Tukiriza n\'ebyamaguzi by\'ebyenjigiriza n\'ebikozesebwa'
              }, locale)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationPage.materialDonations.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-lg font-semibold text-gray-900">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Donations */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {getLocalizedContent({
              en: 'Questions About Donations?',
              ar: 'أسئلة حول التبرعات؟',
              fr: 'Questions sur les Dons?',
              lg: 'Ebibuuzo ku Byawaayo?'
            }, locale)}
          </h2>
          <p className="text-xl mb-8">
            {getLocalizedContent({
              en: 'Contact us for more information about how your donation can help our students',
              ar: 'اتصل بنا للحصول على مزيد من المعلومات حول كيف يمكن لتبرعك أن يساعد طلابنا',
              fr: 'Contactez-nous pour plus d\'informations sur la façon dont votre don peut aider nos étudiants',
              lg: 'Tusisinkane okufuna amakuru amangi ku ngeri ekyawaayo kyo gye kisobola okuyamba abayizi baffe'
            }, locale)}
          </p>
          <div className="space-y-2">
            <p className="text-lg">📧 buddaislamicjuniorschool@gmail.com</p>
            <p className="text-lg">📞 +256 700 123 456</p>
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
