import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvent } from "../../Redux/Action/action";
import Card from "../Card/Card";
import Paginado from "../pagination/pagination";
import EventFilter from "../EventFilter/EventFilter";
import * as styles from "./HomeStiles";
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
    setEventosAMostrar(events.length && events.slice(primerIndex, ultimoIndex));
  }, [events, currentPage]);

  return (
    <div>
      <Slider />
      <EventFilter />
      <div className={styles.cardcontainer}>
        {!eventosAMostrar ? (
          <h2 className={styles.error}>No existe ningún evento con estas caracteristicas.</h2>
        ) : (
          eventosAMostrar && eventosAMostrar.map((event) => {
            return <Card event={event} key={event.id} />;
          })
        )}
      </div>
      <div className={styles.paginado}>
        <Paginado
          eventsPerPage={eventsPerPage}
          events={events}
          page={currentPage}
          paginado={setCurrentPage}
        />
      </div>
    </div>
  );
}
