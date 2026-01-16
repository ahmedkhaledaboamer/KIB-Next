'use client';

import React from 'react';
import { Scale } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Achievement {
  number: string;
  label: string;
  icon: React.ReactNode;
}

interface HeroSectionProps {
  achievements: Achievement[];
}

export default function HeroSection({ achievements }: HeroSectionProps) {
  const t = useTranslations('aboutUs.hero');
  
  return (
    <section className="relative bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900 text-white h-screen flex items-center justify-center px-[5%] overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/images/about.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>

      {/* Central Content */}
      <div className="w-full  relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Scale className="w-16 h-16 text-amber-400 mx-auto" />
          </div>
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-6xl text-slate-300 mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {achievements.map((achievement, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-center text-amber-400 mb-3">
                {achievement.icon}
              </div>
              <div className="text-7xl font-bold mb-2 text-amber-400">{achievement.number}</div>
              <div className="text-white text-2xl">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}
