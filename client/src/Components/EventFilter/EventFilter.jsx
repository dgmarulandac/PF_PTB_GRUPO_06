import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEventsFilter } from "../../Redux/Action/action";
import styles from "./EventFilter.module.css";

const EventFilter = () => {
  const [order, setOrder] = useState("");
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const handleResetFilters = () => {
    setName("");
    setEventType("");
    setCountry("");
    setDate("");
    setOrder("");
    dispatch(getEventsFilter("", "", "", "", ""));
  };

  useEffect(() => {
    dispatch(getEventsFilter(name, eventType, country, date, order ));
  }, [name, eventType, country, date, order, dispatch]);

  return (
    <div className={styles.filterContainer}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <select value={eventType} onChange={e => setEventType(e.target.value)}>
        <option value="">Selecciona un Evento</option>
        <option value="Musical">Musical</option>
        <option value="Deportivo">Deportivo</option>
        <option value="Artistico">Artístico</option>
        <option value="Otro">Otro</option>
      </select>
      <select value={country} onChange={e => setCountry(e.target.value)}>
        <option value="">Selecciona un pais</option>
        <option value="Uruguay">Uruguay</option>
        <option value="Venezuela">Venezuela</option>
        <option value="Colombia">Colombia</option>
        <option value="Argentina">Argentina</option>
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <select value={order} onChange={e => setOrder(e.target.value)}>
        <option value="">Ordenar por</option>
        <option value="name">Nombre</option>
        <option value="date">Fecha</option>
        <option value="eventType">Tipo de Evento</option>
      </select>
      <button onClick={handleResetFilters} className={styles.filterButton}>Quitar Filtros</button>
    </div>
  );
};

export default EventFilter;