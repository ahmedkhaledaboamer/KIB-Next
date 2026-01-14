"use client";

import { Scale, Heart, Award, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PracticeAreas() {
  const t = useTranslations("practiceAreas");

  const practiceAreas = [
    {
      title: t("areas.commercial.title"),
      icon: Scale,
      color: "blue",
      items: [
        t("areas.commercial.items.maAdvice"),
        t("areas.commercial.items.contractLaw"),
        t("areas.commercial.items.businessLaw"),
        t("areas.commercial.items.bankingLaw"),
        t("areas.commercial.items.intellectualProperty"),
        t("areas.commercial.items.laborLaw"),
      ],
    },
    {
      title: t("areas.familyLaw.title"),
      icon: Heart,
      color: "pink",
      items: [
        t("areas.familyLaw.items.divorceLaw"),
        t("areas.familyLaw.items.childCustody"),
        t("areas.familyLaw.items.adoptionCases"),
        t("areas.familyLaw.items.inheritanceLaw"),
        t("areas.familyLaw.items.guardianshipLaw"),
        t("areas.familyLaw.items.adoptionLaw"),
      ],
    },
    {
      title: t("areas.advocacy.title"),
      icon: Award,
      color: "orange",
      items: [
        t("areas.advocacy.items.whiteCrimes"),
        t("areas.advocacy.items.duiDefense"),
        t("areas.advocacy.items.judicialAppeals"),
        t("areas.advocacy.items.arbitration"),
        t("areas.advocacy.items.familyLaw"),
        t("areas.advocacy.items.criminalLaw"),
      ],
    },
    {
      title: t("areas.protection.title"),
      icon: Shield,
      color: "green",
      items: [
        t("areas.protection.items.financialCrime"),
        t("areas.protection.items.drivingCrimes"),
        t("areas.protection.items.legalAppeals"),
        t("areas.protection.items.criminalLaw"),
        t("areas.protection.items.civilLaw"),
        t("areas.protection.items.internationalLaw"),
      ],
    },
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-600", border: "border-blue-500", dot: "bg-blue-500" },
    pink: { bg: "bg-pink-600", border: "border-pink-500", dot: "bg-pink-500" },
    orange: { bg: "bg-orange-600", border: "border-orange-500", dot: "bg-orange-500" },
    green: { bg: "bg-green-600", border: "border-green-500", dot: "bg-green-500" },
  };

  return (
    <div className="relative w-full overflow-hidden px-[5%]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url(/images/dd.webp)" }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            className="font-bold text-white mb-4 leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 6rem)" }}
          >
            {t("title")} <span className="text-orange-500">{t("titleHighlight")}</span>
          </h1>
          <p
            className="text-gray-100 font-light"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 3rem)" }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-[clamp(1rem,2vw,2rem)] w-full">
          {practiceAreas.map((area, index) => {
            const Icon = area.icon;
            const colors = colorClasses[area.color as keyof typeof colorClasses];

            return (
              <div
                key={index}
                className={`flex flex-col rounded-2xl bg-black/40 backdrop-blur-md shadow-2xl border border-white/10 transition-all duration-300 overflow-hidden hover:shadow-xl hover:border-opacity-50`}
              >
                {/* Icon */}
                <div className="p-6 pb-4 flex-shrink-0 flex flex-col items-start">
                  <div
                    className={`${colors.bg} w-[clamp(3rem,6vw,6rem)] h-[clamp(3rem,6vw,6rem)] rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="w-[clamp(2rem,4vw,4rem)] h-[clamp(2rem,4vw,4rem)] text-white" />
                  </div>
                  <div className={`h-[2px] w-full ${colors.bg} rounded-full mb-4`} />
                  <h3
                    className="font-bold text-white  "
                    style={{ fontSize: "clamp(1.5rem,3vw,4rem)" }}
                  >
                    {area.title}
                  </h3>
                </div>

                {/* Items */}
                <div className="flex flex-col px-6 pb-6 gap-[clamp(0.5rem,1vw,1rem)]">
                  {area.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3">
                      <div
                        className={`${colors.dot} w-[clamp(0.5rem,1vw,0.75rem)] h-[clamp(0.5rem,1vw,0.75rem)] rounded-full`}
                      />
                      <span
                        className="text-gray-100 font-medium"
                        style={{ fontSize: "clamp(0.875rem,1.5vw,2rem)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
