'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { useTranslations } from 'next-intl';

interface Partner {
  title: string;
  icon: string;
  image: string;
}

interface PartnersSectionProps {
  fields: Partner[];
  repeatCount?: number; 
}

export default function PartnersSection({ fields, repeatCount = 3 }: PartnersSectionProps) {
  const t = useTranslations('partnersSection');
  const partners = fields ?? [];
   const repeatedPartners = Array(repeatCount).fill(partners).flat();

  return (
    <div className="bg-[#ecf0f0] py-[5%] overflow-hidden">
      <div className="mx-auto  ">
        {/* Header Section */}
        <div className="text-center mb-[clamp(2rem,8vw,4rem)]">
          <div className="flex items-center justify-center gap-2 mb-[clamp(1rem,3vw,1.5rem)]">
             <span className="text-[clamp(1.5rem,4vw,3.125rem)] font-bold uppercase tracking-wide font-semibold" style={{ color: '#FD9908' }}>
            {t('title')}
            </span>
          </div>
          
          <h2 className="text-[clamp(1.5rem,3.5vw,3.125rem)] font-bold mb-[clamp(1rem,4vw,2rem)] leading-tight px-4" style={{ color: '#181d27' }}>
          {t('subtitle')}
          </h2>
        </div>

        {/* Row 1 - Left to Right */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          loop
          allowTouchMove={false}
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false }}
          speed={8000}
          slidesPerView={2}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1440: { slidesPerView: 5 },
            1920: { slidesPerView: 6 },
          }}
          className="overflow-visible mb-[clamp(1rem,3vw,2rem)]"
        >
          {repeatedPartners.map((partner, index) => (
            <SwiperSlide key={`row1-${index}`} className="flex justify-center">
              <PartnerCard title={partner.title} image={partner.image} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Row 2 - Right to Left */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          loop
          allowTouchMove={false}
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: false, reverseDirection: true }}
          speed={8000}
          slidesPerView={2}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1440: { slidesPerView: 5 },
            1920: { slidesPerView: 6 },
          }}
          className="overflow-visible"
        >
          {repeatedPartners.map((partner, index) => (
            <SwiperSlide key={`row2-${index}`} className="flex justify-center">
              <PartnerCard title={partner.title} image={partner.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

interface PartnerCardProps {
  title: string;
  image: string;
}

function PartnerCard({ title, image }: PartnerCardProps) {
  return (
    <div className="group relative h-[clamp(10rem,25vw,18rem)] w-[clamp(12rem,30vw,24rem)] cursor-pointer flex-shrink-0">
      {/* Default Square Card with Icon */}
      <div className="absolute inset-0 backdrop-blur-sm rounded-[clamp(0.75rem,2vw,1.25rem)] transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 flex flex-col items-center justify-center gap-[clamp(0.5rem,1.5vw,0.75rem)] shadow-lg" style={{ backgroundColor: '#ffffff' }}>
        {/* Icon Circle (static for now, could use icon later) */}
        <div className="w-[clamp(3rem,8vw,4.5rem)] h-[clamp(3rem,8vw,4.5rem)] rounded-full flex items-center justify-center"  style={{ 
            backgroundImage:  `url("${image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
           }}>
           
        </div>
        {/* Title */}
        <span className="text-[clamp(1rem,2.5vw,2.5rem)] font-semibold text-[#181d27] text-center px-2">{title}</span>
      </div>
      
      {/* Hover Card with Background Image */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-[clamp(0.75rem,2vw,1.25rem)] overflow-hidden shadow-2xl">
        <div 
          className="w-full h-full backdrop-blur-sm flex items-center justify-center relative" 
          style={{ 
            backgroundImage:  `url("${image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
           }}
        >
          {/* Dark Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
          
          {/* Logo/Name at center */}
          <div className="text-center z-10 px-4">
            <span className="text-[clamp(1rem,2vw,1.875rem)] font-bold text-white drop-shadow-lg">
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}