'use client';

import React from 'react';
import { Scale, Award, Users, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import HeroSection from './HeroSection';
import StorySection from './StorySection';
import VisionMissionValues from './VisionMissionValues';
import ServicesOverview from './ServicesOverview';
import TeamSection from './TeamSection';
import CTASection from './CTASection';
import LegalCTASection from '../home/LegalCTASection';

interface Achievement {
  number: string;
  label: string;
  icon: React.ReactNode;
}

export default function AboutUs() {
  const t = useTranslations('aboutUs');
  
  const achievements: Achievement[] = [
    { number: '500+', label: t('achievements.satisfiedClients'), icon: <Users className="w-12 h-12" /> },
    { number: '15+', label: t('achievements.yearsExperience'), icon: <Award className="w-12 h-12" /> },
    { number: '98%', label: t('achievements.successRate'), icon: <TrendingUp className="w-12 h-12" /> },
    { number: '25+', label: t('achievements.expertLawyers'), icon: <Scale className="w-12 h-12" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir="rtl">
      <HeroSection achievements={achievements} />
      <StorySection />
      <VisionMissionValues />
      <ServicesOverview />
      
      <LegalCTASection />

    </div>
  );
}

