'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SectorCardSkeleton from '@/components/SectorCardSkeleton';

import 'swiper/css';

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

function SectorCard({ sector }: { sector: Sector }) {
  return (
    <div className="group bg-white p-[3%] rounded-2xl overflow-hidden shadow-md transition-all duration-300 flex flex-row h-full">
      {/* Image */}
      <div className="relative rounded-2xl w-1/2 min-w-[200px] flex-shrink-0">
        <Image
          src={sector.image}
          alt={sector.title}
          fill
          className="object-cover shadow-lg bg-center rounded-2xl"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-grow flex flex-col justify-center">
        <h3 className="text-[clamp(1.5rem,2.5vw,2.5rem)] font-bold text-[#265e8e] mb-2">
          {sector.title}
        </h3>
        <p className="text-[clamp(1rem,2vw,2rem)] text-gray-700 leading-relaxed line-clamp-3 md:line-clamp-4">
          {sector.description}
        </p>
      </div>
    </div>
  );
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
              {t("title")} <span className="text-[#265e8e]">{t("titleHighlight")}</span>
            </h2>
            <p className="mt-2 text-[clamp(1rem,2.5vw,3rem)] text-gray-900">
              {t("subtitle")}
            </p>
          </div>

        </div>

        {/* Rows Swipers */}
        <div className="space-y-8">
          {/* Row 1 - Left to Right */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            loop
            allowTouchMove={false}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
            speed={8000}
            slidesPerView={1}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              1024: { slidesPerView: 1.5 },
              1280: { slidesPerView: 2 },
              1600: { slidesPerView: 2.5 },
              1920: { slidesPerView: 3 },
            }}
          >
            {(isLoading ? Array.from({ length: 6 }) : sectors)?.map((item, index) => (
              <SwiperSlide key={isLoading ? `skeleton-row1-${index}` : `row1-${(item as Sector).id}`} className="p-2">
                {isLoading ? <SectorCardSkeleton /> : <SectorCard sector={item as Sector} />}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Row 2 - Right to Left */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            loop
            allowTouchMove={false}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false, reverseDirection: true }}
            speed={8000}
            slidesPerView={1}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1.2 },
              1024: { slidesPerView: 1.5 },
              1280: { slidesPerView: 2 },
              1600: { slidesPerView: 2.5 },
              1920: { slidesPerView: 3 },
            }}
          >
            {(isLoading ? Array.from({ length: 6 }) : [...sectors].reverse())?.map((item, index) => (
              <SwiperSlide key={isLoading ? `skeleton-row2-${index}` : `row2-${(item as Sector).id}`} className="p-2">
                {isLoading ? <SectorCardSkeleton /> : <SectorCard sector={item as Sector} />}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

