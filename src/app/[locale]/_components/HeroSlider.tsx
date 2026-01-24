"use client";

// components/HeroSlider.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

export default function HeroSlider() {
  return (
    <div className="h-full w-full">
      <div className="hero-slider-controls absolute bottom-0 left-0 z-10 flex w-full items-center justify-center">
        <div className="hero-custom-pagination flex items-center justify-center py-4"></div>
      </div>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="hero-slider relative z-1 h-full w-full"
        pagination={{ el: ".hero-custom-pagination", clickable: true }}
      >
        <SwiperSlide className="relative">
          <Image
            src={"/images/hero/1.png"}
            alt={`Prolo Professional Logistics Van is moving form desert in Saudia Arabia`}
            className="relative z-[-1] h-full w-full object-cover"
            width={1898}
            height={1067}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1898px"
            loading="eager"
          />
          <div className="absolute inset-0 z-2 bg-black/30"></div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <Image
            src={"/images/hero/2.png"}
            alt={`Prolo Professional Logistics Van is moving form desert in Saudia Arabia`}
            className="relative z-[-1] h-full w-full object-cover"
            width={1898}
            height={1067}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1898px"
            loading="eager"
          />
          <div className="absolute inset-0 z-2 bg-black/30"></div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <Image
            src={"/images/hero/3.png"}
            alt={`Prolo Professional Logistics Van is moving form desert in Saudia Arabia`}
            className="relative z-[-1] h-full w-full object-cover"
            width={1898}
            height={1067}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1898px"
            loading="eager"
          />
          <div className="absolute inset-0 z-2 bg-black/30"></div>
        </SwiperSlide>
        {/* <SwiperSlide className="relative">
          <Image
            src={"/images/hero/hero1.webp"}
            alt={`Prolo Professional Logistics Van is moving form desert in Saudia Arabia`}
            className="relative z-[-1] h-full w-full object-cover"
            width={1898}
            height={1067}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1898px"
            loading="eager"
          />
          <div className="absolute inset-0 z-2 bg-black/30"></div>
        </SwiperSlide> */}
        {/* <SwiperSlide className="relative">
          <Image
            src={"/images/hero/hero2.webp"}
            alt={`Prolo Professional Logistics Van is moving form city in Saudia Arabia`}
            className="relative z-[-1] h-full w-full object-cover"
            width={1898}
            height={1067}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1898px"
            loading="lazy"
          />
          <div className="absolute inset-0 z-2 bg-black/30"></div>
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
}
