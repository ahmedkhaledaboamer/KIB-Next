'use client';

import React, { useState } from 'react';
import { Target, Globe, Award, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function VisionMissionValues() {
  const t = useTranslations('aboutUs.visionMissionValues');
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'values'>('vision');

  const values = t.raw('valuesList') as string[];
  

  return (
    <section className="p-[5%] bg-white">
      <div className="">
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-8 py-4 rounded-xl font-bold text-3xl transition-all ${
              activeTab === 'vision'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-3xl scale-105'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Target className="w-5 h-5 inline-block ml-2" />
            {t('vision')}
          </button>
          <button
            onClick={() => setActiveTab('mission')}
            className={`px-8 py-4 rounded-xl font-bold text-3xl transition-all ${
              activeTab === 'mission'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-3xl scale-105'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Globe className="w-5 h-5 inline-block ml-2" />
            {t('mission')}
          </button>
          <button
            onClick={() => setActiveTab('values')}
            className={`px-8 py-4 rounded-xl font-bold text-3xl transition-all ${
              activeTab === 'values'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-3xl scale-105'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Award className="w-5 h-5 inline-block ml-2" />
            {t('values')}
          </button>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-12 shadow-xl">
          {activeTab === 'vision' && (
            <div className="animate-fadeIn">
              <h3 className="text-5xl font-bold text-slate-800 mb-6 text-center">{t('vision')}</h3>
              <p className="text-3xl text-slate-600 leading-relaxed text-center   mx-auto">
                {t('visionText')}
              </p>
            </div>
          )}

          {activeTab === 'mission' && (
            <div className="animate-fadeIn">
              <h3 className="text-5xl font-bold text-slate-800 mb-6 text-center">{t('mission')}</h3>
              <p className="text-3xl text-slate-600 leading-relaxed text-center max-w-4xl mx-auto">
                {t('missionText')}
              </p>
            </div>
          )}

          {activeTab === 'values' && (
            <div className="animate-fadeIn">
              <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">{t('values')}</h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {values.map((value, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-3xl transition-shadow">
                    <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <p className="text-slate-700 text-3xl">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

