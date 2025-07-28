import React from 'react';
import Layout from '../../../components/Layout';
import { Locale } from '../../../types';
import { getLocalizedContent } from '../../../lib/i18n';
import { getAdmissions, getAcademicPrograms } from '../../../lib/sanity';

interface AdmissionsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function AdmissionsPage({ params }: AdmissionsPageProps) {
  const { locale } = await params;
  const admissions = await getAdmissions(locale);
  const programs = await getAcademicPrograms(locale);

  return (
    <Layout locale={locale}>
      {/* Hero Section */}
      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {getLocalizedContent(admissions.title, locale)}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {getLocalizedContent(admissions.description, locale)}
          </p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {getLocalizedContent({
              en: 'Admission Process',
              ar: 'عملية القبول',
              fr: 'Processus d\'Admission',
              lg: 'Enkola y\'Okuyingizibwa'
            }, locale)}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissions.process.map((step) => (
              <div key={step.step} className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-800">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {getLocalizedContent(step.title, locale)}
                </h3>
                <p className="text-gray-600">
                  {getLocalizedContent(step.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Programs & Fees */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {getLocalizedContent({
              en: 'Academic Programs & Fees',
              ar: 'البرامج الأكاديمية والرسوم',
              fr: 'Programmes Académiques et Frais',
              lg: 'Pulogulaamu z\'Ebyenjigiriza n\'Emisolo'
            }, locale)}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program) => (
              <div key={program._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {getLocalizedContent(program.name, locale)}
                </h3>
                <p className="text-gray-600 mb-4">
                  {getLocalizedContent(program.description, locale)}
                </p>
                <p className="text-green-600 font-medium mb-4">
                  {getLocalizedContent({
                    en: `Age Range: ${getLocalizedContent(program.ageRange, locale)}`,
                    ar: `الفئة العمرية: ${getLocalizedContent(program.ageRange, locale)}`,
                    fr: `Tranche d'âge: ${getLocalizedContent(program.ageRange, locale)}`,
                    lg: `Emyaka: ${getLocalizedContent(program.ageRange, locale)}`
                  }, locale)}
                </p>

                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {getLocalizedContent({
                      en: 'School Fees (Per Term)',
                      ar: 'الرسوم المدرسية (لكل فصل)',
                      fr: 'Frais Scolaires (Par Trimestre)',
                      lg: 'Emisolo gy\'Essomero (Buli Kiseera)'
                    }, locale)}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{getLocalizedContent({
                        en: 'Tuition',
                        ar: 'الرسوم الدراسية',
                        fr: 'Frais de scolarité',
                        lg: 'Emisolo gy\'okusoma'
                      }, locale)}:</span>
                      <span className="font-medium">UGX {program.fees.tuition.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{getLocalizedContent({
                        en: 'Registration',
                        ar: 'التسجيل',
                        fr: 'Inscription',
                        lg: 'Okwewandiisa'
                      }, locale)}:</span>
                      <span className="font-medium">UGX {program.fees.registration.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{getLocalizedContent({
                        en: 'Uniform',
                        ar: 'الزي المدرسي',
                        fr: 'Uniforme',
                        lg: 'Engoye z\'essomero'
                      }, locale)}:</span>
                      <span className="font-medium">UGX {program.fees.uniform.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{getLocalizedContent({
                        en: 'Books',
                        ar: 'الكتب',
                        fr: 'Livres',
                        lg: 'Ebitabo'
                      }, locale)}:</span>
                      <span className="font-medium">UGX {program.fees.books.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {getLocalizedContent({
                  en: 'Requirements',
                  ar: 'المتطلبات',
                  fr: 'Exigences',
                  lg: 'Ebyetaagisa'
                }, locale)}
              </h2>
              <ul className="space-y-3">
                {admissions.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {getLocalizedContent({
                  en: 'Required Documents',
                  ar: 'الوثائق المطلوبة',
                  fr: 'Documents Requis',
                  lg: 'Ebiwandiiko Ebyetaagisa'
                }, locale)}
              </h2>
              <ul className="space-y-3">
                {admissions.documents.map((document, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">📄</span>
                    <span className="text-gray-700">{document}</span>
                  </li>
                ))}
              </ul>
            </div>
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
