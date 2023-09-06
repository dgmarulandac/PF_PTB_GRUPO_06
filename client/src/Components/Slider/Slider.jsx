import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import { Pagination, Autoplay, Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { swiper } from './styles';
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Slider() {
  const events = useSelector((state) => state.events);

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
        {events && events.map((event, i) => {
          const eventDetailUrl = `/event/${event.id}`; // Construct the event detail URL
          return (
            <SwiperSlide key={i}>
              <div className="flex items-center justify-center   ">
                <div className=" box-content h-96 w-96 mb-7 shadow-md rounded-lg">
                <Link to={eventDetailUrl}> {/* Use Link to navigate to event detail */}
                  <img src={event.image} alt={event.title} className="mb-4 w-full h-full rounded" />
                </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
