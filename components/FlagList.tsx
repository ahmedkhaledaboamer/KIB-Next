 
"use client";

 import { useMemo } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";

interface FlagListProps {
  flags?: Array<{ src: string; alt: string }>;
  autoplayDelay?: number;
  speed?: number;
}

export default function FlagList({
  flags,
  autoplayDelay = 1000,
  speed = 2000,  
}: FlagListProps = {}) {
   const flagList = useMemo(() => {
    const baseFlags = flags && flags.length > 0 
      ? flags 
      : Array.from({ length: 12 }).map((_, index) => ({
          src: `/flags/flag-${index + 1}.webp`,
          alt: `Flag ${index + 1}`,
        }));
    
     return [...baseFlags, ...baseFlags, ...baseFlags];
  }, [flags]);

  return (
    <div className="w-full px-4">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: false,
        }}
        speed={1000}
        breakpoints={{
          320: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
          480: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 12,
            spaceBetween: 10,
          },
          1536: {
            slidesPerView: 12,
            spaceBetween: 20,
          },
        }}
        className="flag-swiper"
        grabCursor={true}
        allowTouchMove={true}
      >
        {flagList.map((flag, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center"
          >
            <div className="relative w-10 h-8 sm:w-10 sm:h-8 md:w-12 md:h-8 lg:w-18 lg:h-12 xl:w-18 xl:h-12 2xl:w-32 2xl:h-20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl    ">
              <img
                src={flag.src}
                alt={flag.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}