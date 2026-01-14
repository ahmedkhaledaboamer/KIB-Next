"use client";

import { useTranslations } from 'next-intl';

export default function Legal() {
    const t = useTranslations("legal");
    
    const services = [
      {
        title: { highlight: t("services.contractReview.title"), rest: t("services.contractReview.titleRest") },
        description: t("services.contractReview.description"),
        image: 'https://shazmlc.com/wp-content/uploads/2025/12/AI-Powered-Contract-Analysis.webp',
        imagePosition: 'left',
      },
      {
        title: { highlight: t("services.smartContracts.title"), rest: t("services.smartContracts.titleRest") },
        description: t("services.smartContracts.description"),
        image: 'https://shazmlc.com/wp-content/uploads/2025/12/2149369111-min.webp',
        imagePosition: 'right',
      },
      {
        title: { highlight: t("services.legalConsults.title"), rest: t("services.legalConsults.titleRest") },
        description: t("services.legalConsults.description"),
        image: 'https://shazmlc.com/wp-content/uploads/2025/12/Virtual-Legal-Consultations.webp',
        imagePosition: 'left',
      },
      {
        title: { highlight: t("services.caseStrategy.title"), rest: t("services.caseStrategy.titleRest") },
        description: t("services.caseStrategy.description"),
        image: 'https://shazmlc.com/wp-content/uploads/2025/12/Data-Driven-Case-Strategy.webp',
        imagePosition: 'right',
      },
    ];
  
    return (
      <main className="min-h-screen p-[5%] bg-gradient-to-b from-gray-50 to-white">
        <div className=" max-w-10xl  xl-max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-28 px-4">
  <h1
    className="font-bold mb-6 leading-tight"
    style={{
      fontSize: "clamp(2rem, 6vw, 8rem)", 
    }}
  >
    {t("title")} 
  </h1>
  
  <p
    className="text-gray-700 font-medium mx-auto"
    style={{
      fontSize: "clamp(1.25rem, 2.5vw, 3rem)",  
      maxWidth: "70ch",  
      lineHeight: 1.3,
    }}
  >
    {t("subtitle")}
  </p>
</div>

  
          {/* Sections */}
          <div className="space-y-[clamp(2rem,5vw,8rem)]">
  {services.map((service, index) => (
    <div
      key={index}
      className={`flex flex-col lg:flex-row items-center gap-[clamp(1rem,3vw,5rem)] lg:gap-[clamp(2rem,4vw,8rem)]
        ${service.imagePosition === 'right' ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Image */}
      <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl h-[clamp(12rem,25vw,40rem)] group relative">
        <img
          src={service.image}
          alt={service.title.highlight + service.title.rest}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex-1 w-full text-center   mt-6 lg:mt-0">
        <h2 className="text-[clamp(2rem,5vw,6rem)] font-bold text-gray-900 leading-snug mb-4">
          <span className="text-[#0e9185]">{service.title.highlight}</span>
          {service.title.rest}
        </h2>
        <p className="text-[clamp(1rem,2.5vw,4rem)] text-gray-700 font-medium leading-relaxed">
          {service.description}
        </p>
      </div>
    </div>
  ))}
</div>

        </div>
      </main>
    );
  }
  