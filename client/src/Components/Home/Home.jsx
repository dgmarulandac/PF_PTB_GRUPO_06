import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvent } from "../../Redux/Action/action";
import Card from "../Card/Card";
import Paginado from "../pagination/pagination";
import EventFilter from "../EventFilter/EventFilter";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./Home.module.css";
import Slider from "../Slider/Slider";

export default function Home() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getAllEvent());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  const ultimoIndex = currentPage * eventsPerPage;
  const primerIndex = ultimoIndex - eventsPerPage;

  const [eventosAMostrar, setEventosAMostrar] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [events]);

  useEffect(() => {
    setEventosAMostrar(events.slice(primerIndex, ultimoIndex));
  }, [events, currentPage]);


  return (
    <div>
      <div>
        <Slider/>
      </div>
      <EventFilter />
      <div className={styles.cards}>
        {eventosAMostrar.length === 0 ? (
          <p>No existe ningún evento con ese nombre.</p>
        ) : (
          eventosAMostrar.map((event) => {
            return <Card event={event} key={event.id} />;
          })
        )}
      </div>
      <Paginado
        eventsPerPage={eventsPerPage}
        events={events}
        page={currentPage}
        paginado={setCurrentPage}
      />
    </div>
  );
}
