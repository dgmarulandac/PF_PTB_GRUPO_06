import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Card from "../Card/Card";
import s from "./EventGallery.module.css"

export default function EventGallery({ events }) {
  const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div >
        
      <div className={s.galleryList}>
        {sortedEvents.map((event) => (
          <Card key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}