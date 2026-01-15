'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Grid } from 'swiper/modules';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import SectorCardSkeleton from '@/components/SectorCardSkeleton';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';

interface Sector {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface SectorSliderContentProps {
  sectors: Sector[];
  isLoading?: boolean;
}

export default function SectorSliderContent({ sectors, isLoading = false }: SectorSliderContentProps) {
  const t = useTranslations("servicesSlider");

  return (
    <section className="w-full bg-gray-50 p-[5%]">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-row flex-wrap items-center justify-between mb-12 gap-4">
          {/* Title & Subtitle */}
          <div className="flex-1 min-w-[200px]">
            <h2 className="text-[clamp(2rem,5vw,6rem)] font-bold text-gray-900">
              {t("title")} <span className="text-[#1c4a75]">{t("titleHighlight")}</span>
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
          {isLoading ? (
            // Show skeleton loaders
            Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`} className='p-4'>
                <SectorCardSkeleton />
              </SwiperSlide>
            ))
          ) : (
            sectors.map((sector) => (
              <SwiperSlide key={sector.id} className='p-4'>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-[clamp(180px,25vw,300px)] w-full">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-[clamp(1.5rem,2.5vw,3.5rem)] font-bold text-[#0e9185] mb-2">
                      {sector.title}
                    </h3>
                    <p className="text-[clamp(1rem,2vw,2rem)] text-gray-700 leading-relaxed flex-grow overflow-hidden">
                      {sector.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
}

