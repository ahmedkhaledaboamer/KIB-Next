'use client';

import React from 'react';
import { BookOpen, Shield, Scale, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function ServicesOverview() {
  const t = useTranslations('aboutUs.services');
  
  const services: Service[] = [
    {
      title: t('legalConsultations.title'),
      description: t('legalConsultations.description'),
      icon: <BookOpen className="w-12 h-12" />
    },
    {
      title: t('contractDrafting.title'),
      description: t('contractDrafting.description'),
      icon: <Shield className="w-12 h-12" />
    },
    {
      title: t('litigationArbitration.title'),
      description: t('litigationArbitration.description'),
      icon: <Scale className="w-12 h-12" />
    },
    {
      title: t('intellectualProperty.title'),
      description: t('intellectualProperty.description'),
      icon: <Award className="w-12 h-12" />
    }
  ];

  return (
    <section className="p-[5%]">
      <div className=" ">
        <div className="text-center mb-16">
          <h2 className="text-7xl font-bold text-slate-800 mb-4">{t('title')}</h2>
          <p className="text-4xl text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-2"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-5xl font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 text-2xl leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

