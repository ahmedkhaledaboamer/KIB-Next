'use client';

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('aboutUs.cta');
  
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">{t('title')}</h2>
        <p className="text-xl mb-8 text-amber-50">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
            <Phone className="w-5 h-5" />
            {t('callUs')}
          </button>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl">
            <Mail className="w-5 h-5" />
            {t('emailUs')}
          </button>
        </div>

        <div className="mt-12 pt-12 border-t border-amber-400/30 flex flex-col md:flex-row gap-6 justify-center items-center text-amber-50">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            <span>{t('location')}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5" />
            <span dir="ltr">{t('phone')}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <span>{t('email')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

