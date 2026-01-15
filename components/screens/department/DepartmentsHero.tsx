'use client';

import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DepartmentsHero() {
  const t = useTranslations('departmentsHero');
  const scrollToSection = () => {
    const section = document.getElementById('departments-section');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-fixed bg-top bg-cover"
        style={{ backgroundImage: "url('/images/rr.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
      <h1
          className="font-bold text-white max-w-5xl"
          style={{ fontSize: 'clamp(2rem, 6vw, 8rem)' }}
        >
          {t('titleHighlight') ? (
            <>
              {t('title')}{' '}
              <span
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
              >
                {t('titleHighlight')}
              </span>
            </>
          ) : (
            t('title')
          )}
        </h1>

        <p
          className="mt-6 text-gray-300  "
          style={{ fontSize: 'clamp(1rem, 2.5vw, 4rem)' }}
        >
          {t('subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button
            onClick={scrollToSection}
            className="rounded-full font-semibold cursor-pointer text-white bg-gradient-to-r from-cyan-500 to-blue-600 transition-transform hover:scale-105"
            style={{
              padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            }}
          >
            {t('buttons.exploreTeams')}
          </button>

          <button
            className="rounded-full border border-white/20 text-white bg-white/10 backdrop-blur transition hover:bg-white/20"
            style={{
              padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            }}
          >
            {t('buttons.contactUs')}
          </button>
        </div>

        {/* Scroll Icon */}
        <button
          onClick={scrollToSection}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 cursor-pointer text-white/70" />
        </button>
      </div>
    </section>
  );
}
