'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Grid } from 'swiper/modules';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import { services } from '@/data/servicesData';

export default function ServicesSlider() {
  const t = useTranslations("servicesSlider");

  return (
    <section className="w-full bg-gray-50 p-[5%]">
      <div className="mx-auto">

       {/* Header */}
<div className="flex flex-row flex-wrap items-center justify-between mb-12 gap-4">
  {/* Title & Subtitle */}
  <div className="flex-1 min-w-[200px]">
    <h2 className="text-[clamp(2rem,5vw,6rem)] font-bold text-gray-900">
      {t("title")} <span className="text-orange-500">{t("titleHighlight")}</span>
    </h2>
    <p className="mt-2 text-[clamp(1rem,2.5vw,3rem)] text-gray-900">
      {t("subtitle")}
    </p>
  </div>

  {/* Arrows */}
  <div className="flex gap-3 mt-2 md:mt-0">
    <button className="services-prev cursor-pointer w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-shadow shadow-md hover:shadow-lg">
    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />

    </button>
    <button className="services-next cursor-pointer w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-shadow shadow-md hover:shadow-lg">
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
    <h3 className="text-[clamp(1.5rem,2.5vw,3.5rem)] font-bold text-orange-500 mb-2">
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
