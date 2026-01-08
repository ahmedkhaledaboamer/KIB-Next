"use client";

import Image from "next/image";
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
  speed = 1000,
}: FlagListProps = {}) {
  // Default flags if none provided
  const flagList = useMemo(() => {
    if (flags && flags.length > 0) {
      return flags;
    }
    return Array.from({ length: 12 }).map((_, index) => ({
      src: `/flags/flag-${index + 1}.webp`,
      alt: `Flag ${index + 1}`,
    }));
  }, [flags]);

  return (
    <div
      className="w-full mx-auto"
      style={{
        maxWidth: "clamp(20rem, 90vw, 80rem)",
        paddingLeft: "clamp(1rem, 2vw, 2rem)",
        paddingRight: "clamp(1rem, 2vw, 2rem)",
      }}
    >
      <Swiper
        modules={[Autoplay]}
        loop={flagList.length > 3}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: false,
        }}
        speed={speed}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 28,
          },
          1280: {
            slidesPerView: 7,
            spaceBetween: 32,
          },
          1536: {
            slidesPerView: 8,
            spaceBetween: 40,
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
            style={{
              width: "clamp(3rem, 5vw, 5.5rem)",
            }}
          >
            <div
              className="relative w-full h-full backdrop-blur-sm rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                aspectRatio: "3/2",
                padding: "clamp(0.375rem, 0.75vw, 0.75rem)",
              }}
            >
              <Image
                src={flag.src}
                alt={flag.alt}
                width={80}
                height={53}
                className="w-full h-full object-contain"
                loading="lazy"
                sizes="(max-width: 640px) 3rem, (max-width: 1024px) 4rem, 5.5rem"
                style={{
                  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
