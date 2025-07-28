'use client';

import React from 'react';
import HeroBlock from './HeroBlock';
import TextBlock from './TextBlock';
import FeatureGridBlock from './FeatureGridBlock';
import TeamGridBlock from './TeamGridBlock';
import ImageGalleryBlock from './ImageGalleryBlock';
import { Locale } from '../../types';

type LocalizedText = {
  en: string;
  ar: string;
  fr: string;
  lg: string;
};

type BlockType = {
  _type: string;
  title?: LocalizedText;
  subtitle?: LocalizedText;
  content?: LocalizedText;
  alignment?: 'left' | 'center' | 'right';
  backgroundImage?: { asset: { url: string } };
  ctaButtons?: Array<{
    text: LocalizedText;
    link: string;
    style: 'primary' | 'secondary';
  }>;
  features?: Array<{
    title: LocalizedText;
    description: LocalizedText;
    icon: string;
    image?: { asset: { url: string } };
  }>;
  teamMembers?: Array<{
    name: LocalizedText;
    position: LocalizedText;
    bio: LocalizedText;
    image: string;
  }>;
  images?: Array<{
    asset: { url: string };
    alt: LocalizedText;
  }>;
  layout?: 'grid' | 'masonry' | 'carousel';
};

interface BlockRendererProps {
  blocks: BlockType[];
  locale: Locale;
}

export default function BlockRenderer({ blocks, locale }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div>
      {blocks.map((block, index) => {
        switch (block._type) {
          case 'heroBlock':
            return <HeroBlock key={index} block={block as Parameters<typeof HeroBlock>[0]['block']} locale={locale} />;
          case 'textBlock':
            return <TextBlock key={index} block={block as Parameters<typeof TextBlock>[0]['block']} locale={locale} />;
          case 'featureGridBlock':
            return <FeatureGridBlock key={index} block={block as Parameters<typeof FeatureGridBlock>[0]['block']} locale={locale} />;
          case 'teamGridBlock':
            return <TeamGridBlock key={index} block={block as Parameters<typeof TeamGridBlock>[0]['block']} locale={locale} />;
          case 'imageGalleryBlock':
            return <ImageGalleryBlock key={index} block={block as Parameters<typeof ImageGalleryBlock>[0]['block']} locale={locale} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
