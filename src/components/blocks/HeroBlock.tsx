'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getLocalizedContent } from '../../lib/i18n';
import { Locale } from '../../types';

interface HeroBlockProps {
  block: {
    title: { en: string; ar: string; fr: string; lg: string };
    subtitle: { en: string; ar: string; fr: string; lg: string };
    backgroundImage: { asset: { url: string } };
    ctaButtons: Array<{
      text: { en: string; ar: string; fr: string; lg: string };
      link: string;
      style: 'primary' | 'secondary';
    }>;
  };
  locale: Locale;
}

export default function HeroBlock({ block, locale }: HeroBlockProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={block.backgroundImage?.asset?.url || '/images/eb9ebd41-ee27-4fd3-9738-98501eb67004-1_all_182.jpg'}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {getLocalizedContent(block.title, locale)}
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {getLocalizedContent(block.subtitle, locale)}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {block.ctaButtons?.map((button, index) => (
            <Link
              key={index}
              href={button.link}
              className={`
                px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl
                ${button.style === 'primary' 
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-lg' 
                  : 'bg-transparent border-2 border-white hover:bg-white hover:text-green-800 text-white'
                }
              `}
            >
              {getLocalizedContent(button.text, locale)}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
