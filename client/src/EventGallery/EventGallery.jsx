import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Card from "../Card/Card";

export default function EventGallery({ events }) {
  const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <Swiper spaceBetween={20}
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
      >
        {sortedEvents.map((event, index) => (
          <SwiperSlide key={index}>
            <img src={event.image} alt="evento" width='852' height='457' />
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        {sortedEvents.map((event) => (
          <Card key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}