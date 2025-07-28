'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getLocalizedContent } from '../../lib/i18n';
import { Locale } from '../../types';

interface FeatureGridBlockProps {
  block: {
    title: { en: string; ar: string; fr: string; lg: string };
    features: Array<{
      title: { en: string; ar: string; fr: string; lg: string };
      description: { en: string; ar: string; fr: string; lg: string };
      icon: string;
      image?: { asset: { url: string } };
    }>;
  };
  locale: Locale;
}

const iconMap: { [key: string]: string } = {
  'academic-cap': '🎓',
  'heart': '❤️',
  'users': '👥',
  'book': '📚',
  'star': '⭐',
  'shield': '🛡️'
};

export default function FeatureGridBlock({ block, locale }: FeatureGridBlockProps) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {block.features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center">
                {feature.image?.asset?.url ? (
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={feature.image.asset.url}
                      alt={getLocalizedContent(feature.title, locale)}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-6xl mb-6">
                    {iconMap[feature.icon] || '✨'}
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {getLocalizedContent(feature.title, locale)}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {getLocalizedContent(feature.description, locale)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
