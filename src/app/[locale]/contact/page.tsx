import React from 'react';
import Layout from '../../../components/Layout';
import { Locale } from '../../../types';
import { getLocalizedContent } from '../../../lib/i18n';
import { getContactDetails } from '../../../lib/sanity';

interface ContactPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const contactDetails = await getContactDetails(locale);

  return (
    <Layout locale={locale}>
      {/* Hero Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {getLocalizedContent({
              en: 'Contact Us',
              ar: 'اتصل بنا',
              fr: 'Nous Contacter',
              lg: 'Tusisinkane'
            }, locale)}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {getLocalizedContent({
              en: 'Get in touch with us for admissions, inquiries, or any questions about our school',
              ar: 'تواصل معنا للقبول أو الاستفسارات أو أي أسئلة حول مدرستنا',
              fr: 'Contactez-nous pour les admissions, les demandes de renseignements ou toute question sur notre école',
              lg: 'Tusisinkane ku nsonga z\'okuyingizibwa, okubuuza, oba ebibuuzo byonna ebikwata ku ssomero lyaffe'
            }, locale)}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {getLocalizedContent({
                  en: 'Get in Touch',
                  ar: 'تواصل معنا',
                  fr: 'Entrer en Contact',
                  lg: 'Tusisinkane'
                }, locale)}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 rounded-lg p-3">
                      <span className="text-2xl">📍</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {getLocalizedContent({
                        en: 'Address',
                        ar: 'العنوان',
                        fr: 'Adresse',
                        lg: 'Endagiriro'
                      }, locale)}
                    </h3>
                    <p className="text-gray-600">
                      {getLocalizedContent(contactDetails.address, locale)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 rounded-lg p-3">
                      <span className="text-2xl">📞</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {getLocalizedContent({
                        en: 'Phone',
                        ar: 'الهاتف',
                        fr: 'Téléphone',
                        lg: 'Essimu'
                      }, locale)}
                    </h3>
                    <p className="text-gray-600">{contactDetails.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 rounded-lg p-3">
                      <span className="text-2xl">📧</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {getLocalizedContent({
                        en: 'Email',
                        ar: 'البريد الإلكتروني',
                        fr: 'Email',
                        lg: 'Imeeri'
                      }, locale)}
                    </h3>
                    <p className="text-gray-600">{contactDetails.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-green-100 rounded-lg p-3">
                      <span className="text-2xl">🕒</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {getLocalizedContent({
                        en: 'Opening Hours',
                        ar: 'ساعات العمل',
                        fr: 'Heures d\'Ouverture',
                        lg: 'Essaawa z\'Okuggulawo'
                      }, locale)}
                    </h3>
                    <p className="text-gray-600">
                      {getLocalizedContent(contactDetails.openingHours, locale)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {getLocalizedContent({
                  en: 'Send us a Message',
                  ar: 'أرسل لنا رسالة',
                  fr: 'Envoyez-nous un Message',
                  lg: 'Tutumire Obubaka'
                }, locale)}
              </h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getLocalizedContent({
                        en: 'First Name',
                        ar: 'الاسم الأول',
                        fr: 'Prénom',
                        lg: 'Erinnya Erisooka'
                      }, locale)}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {getLocalizedContent({
                        en: 'Last Name',
                        ar: 'اسم العائلة',
                        fr: 'Nom de Famille',
                        lg: 'Erinnya Eryokubiri'
                      }, locale)}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getLocalizedContent({
                      en: 'Email',
                      ar: 'البريد الإلكتروني',
                      fr: 'Email',
                      lg: 'Imeeri'
                    }, locale)}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getLocalizedContent({
                      en: 'Phone Number',
                      ar: 'رقم الهاتف',
                      fr: 'Numéro de Téléphone',
                      lg: 'Ennamba ya Ssimu'
                    }, locale)}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getLocalizedContent({
                      en: 'Subject',
                      ar: 'الموضوع',
                      fr: 'Sujet',
                      lg: 'Omulamwa'
                    }, locale)}
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                    <option value="">
                      {getLocalizedContent({
                        en: 'Select a subject',
                        ar: 'اختر موضوعاً',
                        fr: 'Sélectionnez un sujet',
                        lg: 'Londa omulamwa'
                      }, locale)}
                    </option>
                    <option value="admissions">
                      {getLocalizedContent({
                        en: 'Admissions',
                        ar: 'القبول',
                        fr: 'Admissions',
                        lg: 'Okuyingizibwa'
                      }, locale)}
                    </option>
                    <option value="general">
                      {getLocalizedContent({
                        en: 'General Inquiry',
                        ar: 'استفسار عام',
                        fr: 'Demande Générale',
                        lg: 'Okubuuza Okwa Bulijjo'
                      }, locale)}
                    </option>
                    <option value="donations">
                      {getLocalizedContent({
                        en: 'Donations',
                        ar: 'التبرعات',
                        fr: 'Dons',
                        lg: 'Ebyawaayo'
                      }, locale)}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getLocalizedContent({
                      en: 'Message',
                      ar: 'الرسالة',
                      fr: 'Message',
                      lg: 'Obubaka'
                    }, locale)}
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {getLocalizedContent({
                    en: 'Send Message',
                    ar: 'إرسال الرسالة',
                    fr: 'Envoyer le Message',
                    lg: 'Sindika Obubaka'
                  }, locale)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getLocalizedContent({
                en: 'Find Us',
                ar: 'اعثر علينا',
                fr: 'Nous Trouver',
                lg: 'Tuzuule'
              }, locale)}
            </h2>
          </div>
          
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-600">
                {getLocalizedContent({
                  en: 'Interactive map will be integrated here',
                  ar: 'سيتم دمج الخريطة التفاعلية هنا',
                  fr: 'La carte interactive sera intégrée ici',
                  lg: 'Maapu eyeenyigira ejja kuteekebwa wano'
                }, locale)}
              </p>
            </div>
            <p className="mt-4 text-gray-600">
              {getLocalizedContent({
                en: 'Coordinates: Lat 0.2157, Lng 32.5804',
                ar: 'الإحداثيات: خط العرض 0.2157، خط الطول 32.5804',
                fr: 'Coordonnées: Lat 0.2157, Lng 32.5804',
                lg: 'Ebifo: Lat 0.2157, Lng 32.5804'
              }, locale)}
            </p>
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
