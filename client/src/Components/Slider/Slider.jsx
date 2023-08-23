import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {swiper} from './styles'

export default function Slider() {
    const slides = [
        "https://www.lunapark.com.ar/images/eventos/eventos/11066.jpg?1680027036",
        "https://www.lunapark.com.ar/images/eventos/eventos/11027.jpg?1679514160",
        "https://www.lunapark.com.ar/images/eventos/eventos/11477.jpg?1690910639",
    ];
    return (
        <div className={swiper}>
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          keyboard={{
            enabled: true,
          }}
          modules={[Autoplay, Pagination, Navigation, Keyboard]}
        >
          {slides.map((s, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex items-center justify-center">
                  <img src={s} alt="evento" width="852" height="457" className="mb-4" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

    )
}