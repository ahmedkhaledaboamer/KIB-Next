'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Check, Heart, Trophy, Users } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description?: string;
  stats?: string;
  highlight?: string;
}

const WhyChooseUs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations("whyChooseUs");
  const locale = useLocale();

  const features: Feature[] = useMemo(() => [
    {
      icon: <Users className="w-[clamp(2rem,4vw,4rem)] h-[clamp(2rem,4vw,4rem)] text-orange-500 mx-auto" />,
      title: t("slides.expertTeam.title"),
      stats: t("slides.expertTeam.stats"),
      highlight: "orange"
    },
    {
      icon: <Heart className="w-[clamp(2rem,4vw,4rem)] h-[clamp(2rem,4vw,4rem)] text-orange-500 mx-auto" />,
      title: t("slides.provenApproach.title"),
      stats: t("slides.provenApproach.stats"),
      highlight: "blue"
    },
    {
      icon: <Trophy className="w-[clamp(2rem,4vw,4rem)] h-[clamp(2rem,4vw,4rem)] text-orange-500 mx-auto" />,
      title: t("slides.clientSatisfaction.title"),
      stats: t("slides.clientSatisfaction.stats"),
      highlight: "green"
    }
  ], [t, locale]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [features]);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="min-h-screen p-[5%] flex justify-center items-center">
    <div className="grid grid-cols-1  xl:grid-cols-2 lg:grid-cols-1 gap-[clamp(1rem,2vw,4rem)] items-center flex-col-reverse lg:flex-row">
      {/* Right - Content */}
        <div className="space-y-[clamp(1rem,2vw,2rem)]">
          {/* Title */}
          <div>
            <h2 
              className="font-bold mb-4 text-center lg:text-left text-[#005e57]" 
              style={{ fontSize: "clamp(2rem,4vw,7rem)" }}
            >
              {t("title")}
            </h2>
            <p 
              className="text-center lg:text-left text-gray-800 font-light" 
              style={{ fontSize: "clamp(1.2rem,2vw,3.5rem)" }}
            >
              {t("subtitle")}
            </p>
          </div>

          {/* Features List */}
          <div className="flex flex-row sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
  {[t("features.freeConsultation"), t("features.support24"), t("features.confidential")].map((feat, i) => (
    <div 
      key={i} 
      className="flex items-center gap-2 sm:gap-3"
      style={{ fontSize: "clamp(0.9rem, 2vw, 2rem)" }} 
    >
      <div 
        className="flex-shrink-0 rounded-full flex items-center justify-center bg-orange-500"
        style={{
          width: "clamp(1.5rem, 3vw, 3rem)",
          height: "clamp(1.5rem, 3vw, 3rem)"
        }}
      >
        <Check 
          className="text-white"
          style={{ width: "clamp(0.8rem, 2vw, 1.5rem)", height: "clamp(0.8rem, 2vw, 1.5rem)" }}
        />
      </div>
      <span className="font-semibold">{feat}</span>
    </div>
  ))}
</div>



          {/* Slider */}
          <div className="mt-8 relative overflow-visible">
            <div className="relative overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {features.map((feature, index) => (
                  <div key={index} className="min-w-full flex-shrink-0">
                    <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 rounded-3xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center shadow-2xl">
                      {feature.icon}
                      <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
                        {feature.title}
                      </h2>
                      <div className="text-orange-500 text-5xl md:text-6xl font-bold mb-2">
                        {feature.stats}
                      </div>
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Bullets */}
            <div className="flex justify-center gap-2 mt-8">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    currentSlide === index
                      ? 'w-8 h-3 bg-orange-500 rounded-md'
                      : 'w-3 h-3 bg-gray-400 rounded-full hover:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Left - Image */}
        <div className="relative w-full xl:h-[700px] 2xl:h-[900px] max-w-[1200px] mx-auto lg:mx-0 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="/images/rr.jpg" 
            alt="Professional Lawyer"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;
