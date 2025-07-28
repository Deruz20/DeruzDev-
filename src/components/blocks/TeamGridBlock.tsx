'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getLocalizedContent } from '../../lib/i18n';
import { Locale } from '../../types';

interface TeamGridBlockProps {
  block: {
    title: { en: string; ar: string; fr: string; lg: string };
    teamMembers: Array<{
      name: { en: string; ar: string; fr: string; lg: string };
      position: { en: string; ar: string; fr: string; lg: string };
      bio: { en: string; ar: string; fr: string; lg: string };
      image: string;
    }>;
  };
  locale: Locale;
}

export default function TeamGridBlock({ block, locale }: TeamGridBlockProps) {
  return (
    <section className="py-24 bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {block.teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={getLocalizedContent(member.name, locale)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {getLocalizedContent(member.name, locale)}
                  </h3>
                  
                  <p className="text-green-600 font-semibold mb-3">
                    {getLocalizedContent(member.position, locale)}
                  </p>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {getLocalizedContent(member.bio, locale)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
