import React from "react";
import Card from "../Card/Card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function Home() {
    const evento = {
        id: 90,
        adress: "av de mayo",
        cantTickets: "400",
        country: "Argentina",
        date: "2023-08-26",
        description: "pelea de bobos",
        eventType: "Deportivo",
        hour: "21:00",
        image: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2023/06/elon-musk-vs-mark-zuckerberg.jpg?fit=1200%2C675&quality=50&strip=all&ssl=1",
        name: "musk vs zuckenberg",
        ticketPrice: "5990"
    }
    const slides = ['https://www.lunapark.com.ar/images/eventos/eventos/11066.jpg?1680027036', 'https://www.lunapark.com.ar/images/eventos/eventos/11027.jpg?1679514160',
'https://www.lunapark.com.ar/images/eventos/eventos/11477.jpg?1690910639']

    return (
        <div>
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
                modules={[Autoplay, Pagination, Navigation,Keyboard]}
                
            >
                {slides.map((s, i) => {
                    return (<SwiperSlide key={i}><img src={s} alt="evento" width='852' height='457' /></SwiperSlide>)
                })}
            </Swiper>  
            </div>
               <Card event={evento}/> 
            <div>
            </div>
        </div>

    );
}