'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getLocalizedContent } from '../../lib/i18n';
import { Locale } from '../../types';

interface TextBlockProps {
  block: {
    title: { en: string; ar: string; fr: string; lg: string };
    content: { en: string; ar: string; fr: string; lg: string };
    alignment: 'left' | 'center' | 'right';
  };
  locale: Locale;
}

export default function TextBlock({ block, locale }: TextBlockProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <motion.section 
      className="py-24 bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className={`max-w-4xl ${block.alignment === 'center' ? 'mx-auto' : ''}`}>
          {block.title && (
            <motion.h2 
              className={`text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight ${alignmentClasses[block.alignment]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {getLocalizedContent(block.title, locale)}
            </motion.h2>
          )}
          
          <motion.div 
            className={`text-lg md:text-xl text-gray-700 leading-relaxed space-y-6 ${alignmentClasses[block.alignment]}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {getLocalizedContent(block.content, locale).split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
