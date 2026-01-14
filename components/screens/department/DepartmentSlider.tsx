'use client';

import React, { useRef } from 'react';
import { Users, Briefcase, TrendingUp, HeadphonesIcon, Shield, Truck, FileText, Scale, ArrowLeft, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import DepartmentCard from '@/components/DepartmentCard';
import DepartmentCardSkeleton from '@/components/DepartmentCardSkeleton';

interface Member {
  id?: string;
  name: string;
  position: string;
  description: string;
  image: string;
  email: string;
  phone: string;
  location: string;
}

interface Props {
  title: string;
  titleColor: string;
  members: Member[];
  icon: React.ReactNode;
  isLoading?: boolean;
}

function DepartmentSlider({ title, titleColor, members, icon, isLoading = false }: Props) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section  className="py-[clamp(3rem,10vw,6rem)] relative px-[clamp(2%,5vw,5%)]">
      {/* Header */}
      <div className="mb-[clamp(2rem,6vw,4rem)] flex flex-row items-center justify-between gap-[clamp(1rem,3vw,2rem)] flex-wrap">
  {/* Left */}
  <div className="flex items-start gap-[clamp(1rem,2.5vw,2rem)] flex-1 min-w-[200px]">
    <div className={`w-1 h-[clamp(4rem,10vw,6rem)] bg-gradient-to-b ${titleColor} rounded-full`} />

    <div>
      <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)] mb-[clamp(0.5rem,1vw,1rem)]">
        <div className="p-[clamp(0.5rem,1.5vw,1rem)] rounded-xl bg-slate-900 shadow-lg text-white">
          {icon}
        </div>
        <span className="uppercase tracking-widest text-[clamp(1rem,1.5vw,1rem)] text-gray-400">
          Department
        </span>
      </div>
      <h2 className={`font-bold text-[clamp(1.5rem,5vw,4rem)] bg-gradient-to-r ${titleColor} text-transparent bg-clip-text`}>
        {title}
      </h2>
    </div>
  </div>

  {/* Right - Navigation */}
  <div className="flex gap-[clamp(0.5rem,2vw,1rem)]">
    <button
      ref={prevRef}
      aria-label="Previous"
      className={`
        w-[clamp(2.5rem,6vw,3rem)]
        h-[clamp(2.5rem,6vw,3rem)]
        flex items-center justify-center
        rounded-full
        border border-gray-300
        bg-gradient-to-tr ${titleColor} bg-opacity-70
        text-white
        hover:scale-105 hover:shadow-lg
        transition-all duration-300
        cursor-pointer
      `}
    >
      <ArrowLeft className="w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)]" />
    </button>
    <button
      ref={nextRef}
      aria-label="Next"
      className={`
        w-[clamp(2.5rem,6vw,3rem)]
        h-[clamp(2.5rem,6vw,3rem)]
        flex items-center justify-center
        rounded-full
        border border-gray-300
        bg-gradient-to-tr ${titleColor} bg-opacity-70
        text-white
        hover:scale-105 hover:shadow-lg
        transition-all duration-300
        cursor-pointer
      `}
    >
      <ArrowRight className="w-[clamp(1rem,3vw,1.25rem)] h-[clamp(1rem,3vw,1.25rem)]" />
    </button>
  </div>
</div>


      {/* Swiper */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
          1536: { slidesPerView: 3 },
        }}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className="px-[clamp(1rem,2vw,2rem)] department-swiper"
      >
        {isLoading ? (
          // Show skeleton loaders
          Array.from({ length: 3 }).map((_, index) => (
            <SwiperSlide key={`skeleton-${index}`}>
              <DepartmentCardSkeleton />
            </SwiperSlide>
          ))
        ) : (
          members.map((member) => (
            <SwiperSlide key={member.id || member.name}>
              <DepartmentCard member={member} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
}

export default DepartmentSlider;
