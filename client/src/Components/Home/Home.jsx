import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvent } from "../../Redux/Action/action";
import Card from "../Card/Card";
import EventFilter from "../EventFilter/EventFilter";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './Home.module.css';

export default function Home() {

    const dispatch = useDispatch();
    const events = useSelector( (state) => state.events );

    useEffect( () => {
        dispatch( getAllEvent() );
    }, [] );

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
            <EventFilter />
            <div className={styles.cards}>
                {events && events.map( event => {
                    return <Card event={event}/>
                } )}
            </div>
        </div>

    );
}