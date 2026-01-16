'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function StorySection() {
  const t = useTranslations('aboutUs.story');
  
  return (
    <section className="p-[5%]">
      <div className=" ">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-7xl font-bold text-slate-800 mb-6">{t('title')}</h2>
            <div className="prose prose-lg text-slate-600 space-y-4">
              <p className="leading-relaxed text-4xl">
                {t('paragraph1')}
              </p>
              <p className="leading-relaxed text-4xl">
                {t('paragraph2')}
              </p>
              <p className="leading-relaxed text-4xl">
                {t('paragraph3')}
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/images/story.webp"
                alt={t('imageAlt')}
                className="w-full h-[800px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-400 rounded-2xl blur-2xl opacity-50"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-teal-400 rounded-2xl blur-2xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

