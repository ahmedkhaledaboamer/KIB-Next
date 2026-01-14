'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Grid } from 'swiper/modules';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
export default function ServicesSlider() {
  const t = useTranslations("servicesSlider");
  
  const services = [
    { id: 1, title: t("services.fintechPermit.title"), description: t("services.fintechPermit.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/30804-elementor-io-optimized.webp' },
    { id: 2, title: t("services.amlRules.title"), description: t("services.amlRules.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/1100-elementor-io-optimized.webp' },
    { id: 3, title: t("services.offPlanRules.title"), description: t("services.offPlanRules.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/2149311465-elementor-io-optimized.webp' },
    { id: 4, title: t("services.buildingLaw.title"), description: t("services.buildingLaw.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/33848-min.webp' },
    { id: 5, title: t("services.medLiab.title"), description: t("services.medLiab.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/55875-elementor-io-optimized.webp' },
    { id: 6, title: t("services.medicalData.title"), description: t("services.medicalData.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/962-elementor-io-optimized.webp' },
    { id: 7, title: t("services.techPermit.title"), description: t("services.techPermit.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/962-elementor-io-optimized.webp' },
    { id: 8, title: t("services.dataPrivacy.title"), description: t("services.dataPrivacy.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/2151915116.webp' },
    { id: 22, title: t("services.fintechPermit.title"), description: t("services.fintechPermit.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/30804-elementor-io-optimized.webp' },
    { id: 33, title: t("services.amlRules.title"), description: t("services.amlRules.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/1100-elementor-io-optimized.webp' },
    { id: 54, title: t("services.offPlanRules.title"), description: t("services.offPlanRules.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/2149311465-elementor-io-optimized.webp' },
    { id: 34, title: t("services.buildingLaw.title"), description: t("services.buildingLaw.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/33848-min.webp' },
    { id: 87, title: t("services.medLiab.title"), description: t("services.medLiab.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/55875-elementor-io-optimized.webp' },
    { id: 77, title: t("services.medicalData.title"), description: t("services.medicalData.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/962-elementor-io-optimized.webp' },
    { id: 88, title: t("services.techPermit.title"), description: t("services.techPermit.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/962-elementor-io-optimized.webp' },
    { id: 99, title: t("services.dataPrivacy.title"), description: t("services.dataPrivacy.description"), image: 'https://shazmlc.com/wp-content/uploads/2025/12/2151915116.webp' },
  ];

  return (
    <section className="w-full bg-gray-50 p-[5%]">
      <div className="mx-auto">

       {/* Header */}
<div className="flex flex-row flex-wrap items-center justify-between mb-12 gap-4">
  {/* Title & Subtitle */}
  <div className="flex-1 min-w-[200px]">
    <h2 className="text-[clamp(2rem,5vw,6rem)] font-bold text-gray-900">
      {t("title")} <span className="text-[#0e9185]">{t("titleHighlight")}</span>
    </h2>
    <p className="mt-2 text-[clamp(1rem,2.5vw,3rem)] text-gray-900">
      {t("subtitle")}
    </p>
  </div>

  {/* Arrows */}
  <div className="flex gap-3 mt-2 md:mt-0">
    <button className="services-prev cursor-pointer w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#0e9185] text-white flex items-center justify-center hover:bg-orange-600 transition-shadow shadow-md hover:shadow-lg">
    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />

    </button>
    <button className="services-next cursor-pointer w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#0e9185] text-white flex items-center justify-center hover:bg-orange-600 transition-shadow shadow-md hover:shadow-lg">
    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  </div>
</div>


        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay, Grid]}
          slidesPerView={1}
          grid={{ rows: 2, fill: 'row' }}
          spaceBetween={16}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation={{ prevEl: '.services-prev', nextEl: '.services-next' }}
          breakpoints={{
            320: { slidesPerView: 1, grid: { rows: 2 } },
            480: { slidesPerView: 1, grid: { rows: 2 } },
            640: { slidesPerView: 2, grid: { rows: 2 } },
            1024: { slidesPerView: 2, grid: { rows: 2 } },
            1280: { slidesPerView: 3, grid: { rows: 2 } },
            1600: { slidesPerView: 4, grid: { rows: 2 } },
            1920: { slidesPerView: 4, grid: { rows: 2 } },
          }}
          className="services-swiper"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id} className='p-4'>
          <div className="group bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 flex flex-col h-full">
  {/* Image */}
  <div className="relative h-[clamp(180px,25vw,300px)] w-full">
    <Image
      src={service.image}
      alt={service.title}
      fill
      unoptimized
      className="object-cover"
    />
  </div>

  {/* Content */}
  <div className="p-5 flex-grow flex flex-col">
    <h3 className="text-[clamp(1.5rem,2.5vw,3.5rem)] font-bold text-[#0e9185] mb-2">
      {service.title}
    </h3>
    <p className="text-[clamp(1rem,2vw,2rem)] text-gray-700 leading-relaxed flex-grow overflow-hidden">
      {service.description}
    </p>
  </div>
</div>


            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
