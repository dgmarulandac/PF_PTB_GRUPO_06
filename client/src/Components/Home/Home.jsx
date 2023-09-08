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

export default function Home() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const {modalOn} = useSelector(state => state)

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
    setEventosAMostrar(events && events.slice(primerIndex, ultimoIndex));
  }, [events, currentPage]);

  return (
    <div className="bg-white dark:bg-gray-700">
      <Slider />
      <EventFilter />
      <div className="bg-white dark:bg-gray-700">
        {!eventosAMostrar ? (
          <div className="flex justify-center m-10">
            <h2 className={styles.error}>No existe ningún evento para Mostrar.</h2>
          </div>) : (
          <div className={styles.cardcontainer}>
            {eventosAMostrar && eventosAMostrar.map((event) => {
              return <Card event={event} key={event.id} />
            })}
          </div>)
        }
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
