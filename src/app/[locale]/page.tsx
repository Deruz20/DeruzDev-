import React from 'react';
import Layout from '../../components/Layout';
import BlockRenderer from '../../components/blocks/BlockRenderer';
import { Locale } from '../../types';
import { getHomePage } from '../../lib/sanity';

interface HomePageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const homePage = await getHomePage(locale);

  const blocks = [
    {
      _type: 'heroBlock',
      title: homePage.heroTitle,
      subtitle: homePage.heroSubtitle,
      backgroundImage: { asset: { url: '/images/eb9ebd41-ee27-4fd3-9738-98501eb67004-1_all_182.jpg' } },
      ctaButtons: [
        {
          text: { en: 'Apply Now', ar: 'قدم الآن', fr: 'Postuler Maintenant', lg: 'Saba Kaakano' },
          link: `/${locale}/admissions`,
          style: 'primary' as const
        },
        {
          text: { en: 'Support Us', ar: 'ادعمنا', fr: 'Nous Soutenir', lg: 'Tuyambe' },
          link: `/${locale}/donate`,
          style: 'secondary' as const
        }
      ]
    },
    {
      _type: 'textBlock',
      title: homePage.missionTitle,
      content: homePage.missionDescription,
      alignment: 'center' as const
    },
    {
      _type: 'featureGridBlock',
      title: { en: 'Our Guiding Principles', ar: 'مبادئنا التوجيهية', fr: 'Nos Principes Directeurs', lg: 'Empisa Zaffe Ezikulembera' },
      features: homePage.principles.map(principle => ({
        title: principle.title,
        description: principle.description,
        icon: principle.icon,
        image: undefined
      }))
    },
    {
      _type: 'imageGalleryBlock',
      title: { en: 'School Life', ar: 'الحياة المدرسية', fr: 'Vie Scolaire', lg: 'Obulamu bw\'Essomero' },
      images: [
        { asset: { url: '/images/pupils_in_class.jpg' }, alt: { en: 'Students in class', ar: 'الطلاب في الفصل', fr: 'Étudiants en classe', lg: 'Abayizi mu kibiina' } },
        { asset: { url: '/images/pupil_1.jpg' }, alt: { en: 'Student learning', ar: 'طالب يتعلم', fr: 'Étudiant apprenant', lg: 'Omuyizi ayiga' } },
        { asset: { url: '/images/debate_1.jpg' }, alt: { en: 'School debate', ar: 'مناقشة مدرسية', fr: 'Débat scolaire', lg: 'Okukubaganya ebirowoozo mu ssomero' } },
        { asset: { url: '/images/4064.jpg' }, alt: { en: 'School activities', ar: 'أنشطة مدرسية', fr: 'Activités scolaires', lg: 'Emirimu gy\'essomero' } }
      ],
      layout: 'grid' as const
    },
    {
      _type: 'textBlock',
      title: homePage.callToActionTitle,
      content: homePage.callToActionDescription,
      alignment: 'center' as const
    }
  ];

  return (
    <Layout locale={locale}>
      <BlockRenderer blocks={blocks} locale={locale} />
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
