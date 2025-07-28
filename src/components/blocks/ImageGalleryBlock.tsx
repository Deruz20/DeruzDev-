'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getLocalizedContent } from '../../lib/i18n';
import { Locale } from '../../types';

interface ImageGalleryBlockProps {
  block: {
    title: { en: string; ar: string; fr: string; lg: string };
    images: Array<{
      asset: { url: string };
      alt: { en: string; ar: string; fr: string; lg: string };
    }>;
    layout: 'grid' | 'masonry' | 'carousel';
  };
  locale: Locale;
}

export default function ImageGalleryBlock({ block, locale }: ImageGalleryBlockProps) {
  const defaultImages = [
    { src: '/images/pupils_in_class.jpg', alt: 'Students in class' },
    { src: '/images/pupil_1.jpg', alt: 'Student learning' },
    { src: '/images/debate_1.jpg', alt: 'School debate' },
    { src: '/images/4064.jpg', alt: 'School activities' },
    { src: '/images/DSC_0007.JPG', alt: 'School life' },
    { src: '/images/eb9ebd41-ee27-4fd3-9738-98501eb67004-1_all_182.jpg', alt: 'Students' }
  ];

  const imagesToShow = block.images?.length > 0 ? block.images : defaultImages.map(img => ({
    asset: { url: img.src },
    alt: { en: img.alt, ar: img.alt, fr: img.alt, lg: img.alt }
  }));

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {getLocalizedContent(block.title, locale)}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {imagesToShow.map((image, index) => (
            <motion.div
              key={index}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={image.asset.url}
                alt={getLocalizedContent(image.alt, locale)}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
