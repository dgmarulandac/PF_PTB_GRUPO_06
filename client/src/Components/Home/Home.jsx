import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvent } from "../../Redux/Action/action";
import Card from "../Card/Card";
import Paginado from "../pagination/pagination";
import EventFilter from "../EventFilter/EventFilter";
import * as styles from "./HomeStiles";
import Slider from "../Slider/Slider";
import Modal from "../Modal/Modal";
import CarModal from '../Car/CarModal/CarModal'
import style from "./Home.module.css"

export default function Home() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const { modalOn } = useSelector(state => state)

  const [loading, setLoading] = useState(true); // Controla la carga de eventos
  const [eventsLoaded, setEventsLoaded] = useState(false); // Controla si se han cargado eventos con éxito

  useEffect(() => {
    dispatch(getAllEvent())
      .then(() => {
        setLoading(false); // Cuando la promesa se cumple, la carga ha terminado
        setEventsLoaded(true); // Los eventos se han cargado con éxito
      })
      .catch(() => {
        setLoading(false); // La carga ha terminado incluso si la promesa falla
        setEventsLoaded(false); // Los eventos no se cargaron con éxito
      });
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
    setEventosAMostrar(events && events.slice(primerIndex, ultimoIndex));
  }, [events, currentPage]);

  return (
    <div className="bg-white dark:bg-gray-700">
      <Slider />
      <EventFilter />
      <div className="bg-white dark:bg-gray-700">
        {loading ? (
          <div className={styles.container}>
        <svg
          viewBox="0 0 240 240"
          height="240"
          width="240"
          class={style.loader}
        >
          <circle
            stroke-linecap="round"
            stroke-dashoffset="-330"
            stroke-dasharray="0 660"
            stroke-width="20"
            stroke="#000"
            fill="none"
            r="105"
            cy="120"
            cx="120"
            className={`${style.loaderRing} ${style.loaderRingA}`}
          ></circle>
          <circle
            stroke-linecap="round"
            stroke-dashoffset="-110"
            stroke-dasharray="0 220"
            stroke-width="20"
            stroke="#000"
            fill="none"
            r="35"
            cy="120"
            cx="120"
            className={`${style.loaderRing} ${style.loaderRingB}`}
          ></circle>
          <circle
            stroke-linecap="round"
            stroke-dasharray="0 440"
            stroke-width="20"
            stroke="#000"
            fill="none"
            r="70"
            cy="120"
            cx="85"
            className={`${style.loaderRing} ${style.loaderRingC}`}
          ></circle>
          <circle
            stroke-linecap="round"
            stroke-dasharray="0 440"
            stroke-width="20"
            stroke="#000"
            fill="none"
            r="70"
            cy="120"
            cx="155"
            className={`${style.loaderRing} ${style.loaderRingD}`}
          ></circle>
        </svg>
      </div>
        ) : eventsLoaded && eventosAMostrar.length === 0 ? (
          <div className="flex justify-center m-10">
            <h2 className={styles.error}>No se ha encontrado ningún evento</h2>
          </div>
        ) : (
          <div className={styles.cardcontainer}>
            {eventosAMostrar.map((event) => {
              return <Card event={event} key={event.id} />
            })}
          </div>
        )}
      </div>
      <div className={styles.paginado}>
        <Paginado
          eventsPerPage={eventsPerPage}
          events={events}
          page={currentPage}
          paginado={setCurrentPage}
        />
        {modalOn && <CarModal/>}
      </div>
    </div>
  );
}
