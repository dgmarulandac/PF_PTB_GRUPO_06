import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvent } from "../../Redux/Action/action";
import Card from "../Card/Card";
import Paginado from "../pagination/pagination";
import { useState } from "react";
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

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 8;
    
    const ultimoIndex = currentPage * eventsPerPage;
    const primerIndex = ultimoIndex - eventsPerPage;
    
    const [eventosAMostrar, setEventosAMostrar] = useState(events && events.slice(primerIndex, ultimoIndex));

    useEffect( () => {
        setCurrentPage(1);
        setEventosAMostrar(events && events.slice(primerIndex, ultimoIndex));
    }, [events] );

    useEffect( () => {
        setEventosAMostrar(events && events.slice(primerIndex, ultimoIndex));
    }, [currentPage] );

    const slides = ['https://www.lunapark.com.ar/images/eventos/eventos/11066.jpg?1680027036', 'https://www.lunapark.com.ar/images/eventos/eventos/11027.jpg?1679514160',
'https://www.lunapark.com.ar/images/eventos/eventos/11477.jpg?1690910639']

    return (
        <div className="bg-gray-50">
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
                {eventosAMostrar && eventosAMostrar.map( event => {
                    return <Card event={event} key={event.id}/>
                } )}
            </div>
            <Paginado eventsPerPage={eventsPerPage} events={events} page={currentPage} paginado={setCurrentPage} />
        </div>

    );
}