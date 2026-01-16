'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  expertise: string[];
  bio: string;
}

export default function TeamSection() {
  const t = useTranslations('aboutUs.team');
  
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'الشيخ عبد العزيز بن عبد الله',
      position: 'المؤسس والشريك الأول',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      expertise: ['القانون التجاري', 'العقود الدولية', 'التحكيم'],
      bio: 'خبرة تزيد عن 20 عامًا في القانون التجاري والدولي'
    },
    {
      id: 2,
      name: 'د. فاطمة الزهراني',
      position: 'رئيسة قسم الملكية الفكرية',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      expertise: ['الملكية الفكرية', 'براءات الاختراع', 'العلامات التجارية'],
      bio: 'متخصصة في حماية حقوق الملكية الفكرية للشركات'
    },
    {
      id: 3,
      name: 'المستشار أحمد الخليفي',
      position: 'مدير قسم المنازعات',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      expertise: ['التقاضي', 'التحكيم التجاري', 'حل النزاعات'],
      bio: 'خبير في حل النزاعات التجارية والتحكيم الدولي'
    },
    {
      id: 4,
      name: 'المحامية سارة المرزوقي',
      position: 'مستشارة قانونية أولى',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80',
      expertise: ['قانون الشركات', 'الاندماج والاستحواذ', 'الامتثال'],
      bio: 'متخصصة في الاستشارات القانونية للشركات الناشئة'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('title')}</h2>
          <p className="text-xl text-slate-600">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 right-4 left-4">
                  <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-amber-400 text-sm">{member.position}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.expertise.map((skill, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

