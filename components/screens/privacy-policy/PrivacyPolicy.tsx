'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Shield, FileText, Cookie, Globe, Users, Clock, Key, Mail, AlertCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  const t = useTranslations('privacyPolicy');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const sections = [
    {
      id: 'about',
      icon: Users,
      title: t('sections.about.title'),
      content: t('sections.about.content'),
    },
    {
      id: 'comments',
      icon: FileText,
      title: t('sections.comments.title'),
      content: t('sections.comments.content'),
    },
    {
      id: 'media',
      icon: Globe,
      title: t('sections.media.title'),
      content: t('sections.media.content'),
    },
    {
      id: 'cookies',
      icon: Cookie,
      title: t('sections.cookies.title'),
      content: t('sections.cookies.content'),
    },
    {
      id: 'embedded',
      icon: Globe,
      title: t('sections.embedded.title'),
      content: t('sections.embedded.content'),
    },
    {
      id: 'dataSharing',
      icon: Users,
      title: t('sections.dataSharing.title'),
      content: t('sections.dataSharing.content'),
    },
    {
      id: 'dataRetention',
      icon: Clock,
      title: t('sections.dataRetention.title'),
      content: t('sections.dataRetention.content'),
    },
    {
      id: 'userRights',
      icon: Key,
      title: t('sections.userRights.title'),
      content: t('sections.userRights.content'),
    },
    {
      id: 'dataLocation',
      icon: Globe,
      title: t('sections.dataLocation.title'),
      content: t('sections.dataLocation.content'),
    },
    {
      id: 'dataDeletion',
      icon: Mail,
      title: t('sections.dataDeletion.title'),
      content: t('sections.dataDeletion.content'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-secondary/95 to-secondary/90" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className=" mx-auto p-[5%]  ">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/20 mb-6">
            <Shield className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <h1
            className="text-primary font-bold mb-4"
            style={{
              fontSize: 'clamp(2rem, 4vw, 6rem)',
            }}
          >
            {t('title')}
          </h1>
          <p
            className="text-white/80   mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 3rem)',
            }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2
                        className="text-primary font-bold mb-3 md:mb-4"
                        style={{
                          fontSize: 'clamp(1.25rem, 2vw, 3rem)',
                        }}
                      >
                        {section.title}
                      </h2>
                      <div
                        className="text-white/90 leading-relaxed whitespace-pre-line"
                        style={{
                          fontSize: 'clamp(0.95rem, 1.25vw, 2rem)',
                          lineHeight: '1.8',
                        }}
                      >
                        {section.content}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 md:mt-12 bg-primary/10 border border-primary/30 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-12 h-12   text-primary flex-shrink-0 mt-1" />
              <div>
                <h3
                  className="text-primary font-bold mb-2"
                  style={{
                    fontSize: 'clamp(1.1rem, 1.75vw, 3rem)',
                  }}
                >
                  {t('disclaimer.title')}
                </h3>
                <p
                  className="text-white/90 leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.95rem, 1.25vw, 2rem)',
                    lineHeight: '1.8',
                  }}
                >
                  {t('disclaimer.content')}
                </p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-8 text-center">
            <p
              className="text-white/60"
              style={{
                fontSize: 'clamp(0.875rem, 1.1vw, 3rem)',
              }}
            >
              {t('lastUpdated')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

