'use client';

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Locale } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  locale: Locale;
}

export default function Layout({ children, locale }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
