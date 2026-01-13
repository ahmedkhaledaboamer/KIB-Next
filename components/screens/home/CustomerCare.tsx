'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function CustomerCare() {
  const DEFAULT_CARD_ID = 3;
  const t = useTranslations("customerCare");
  const [activeCard, setActiveCard] = useState<number>(DEFAULT_CARD_ID);

  const cards = [
    {
      id: 1,
      image: '/images/ww.webp',
      title: t("cards.information.title"),
      subtitle: t("cards.information.subtitle"),
      buttonText: t("cards.information.buttonText"),
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800',
      title: t("cards.consultation.title"),
      subtitle: t("cards.consultation.subtitle"),
      buttonText: t("cards.consultation.buttonText"),
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800',
      title: t("cards.virtual.title"),
      subtitle: t("cards.virtual.subtitle"),
      buttonText: t("cards.virtual.buttonText"),
    },
    {
      id: 4,
      image: '/images/ee.webp',
      title: t("cards.support.title"),
      subtitle: t("cards.support.subtitle"),
      buttonText: t("cards.support.buttonText"),
    },
  ];

  return (
    <section className="relative w-full bg-gradient-to-br from-gray-50 to-gray-100 p-[5%]">
      {/* Header */}
      <div className="w-full mx-auto mb-12 text-center">
        <h1 className="text-[clamp(2rem,5vw,6rem)] font-bold">
          {t("title")}{" "}
          <span className="text-orange-500 italic">{t("titleHighlight")}</span>
          <span className="text-teal-800 block">{t("subtitle")}</span>
        </h1>
      </div>

      {/* Cards Container */}
      <div className="mx-auto flex flex-col lg:flex-row items-stretch gap-6 lg:gap-4 h-auto lg:h-[500px]">
        {cards.map((card) => {
          const isActive = activeCard === card.id;

          return (
            <div
              key={card.id}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(DEFAULT_CARD_ID)}
              className={`relative overflow-hidden rounded shadow-2xl cursor-pointer transition-all duration-700 ease-in-out
                flex flex-col
                ${isActive ? 'flex-[2]' : 'flex-1'}
              `}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${card.image})`,
                  transform: isActive ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <div
                  className={`absolute inset-0 transition-all duration-700 ${
                    isActive
                      ? 'bg-gradient-to-t from-black/80 via-black/40 to-black/20'
                      : 'bg-black/50'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="relative flex flex-col justify-end h-full p-6 sm:p-8">
                {/* Title & Subtitle */}
                <div>
                  <h3
                    className="text-white font-bold mb-2 transition-all duration-500"
                    style={{
                      fontSize: "clamp(1rem,3vw,3.5rem)",
                      opacity: isActive ? 1 : 0.85,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-emerald-400 mb-4 transition-all duration-500"
                    style={{
                      fontSize: "clamp(1rem,2.5vw,2.5rem)",
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                    }}
                  >
                    {card.subtitle}
                  </p>
                </div>

                {/* Button */}
                <button
                  className={`bg-white text-gray-800 rounded-lg font-bold transition-all duration-500 w-full sm:w-48 h-12 sm:h-16 flex items-center justify-center`}
                  style={{
                    fontSize: "clamp(1rem,2vw,1.5rem)",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
