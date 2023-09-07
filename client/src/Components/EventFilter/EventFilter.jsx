import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEventsFilter } from "../../Redux/Action/action";
import * as FilStyles from "./FilStyles"

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
    dispatch(getEventsFilter(name, eventType, country, date, order));
  }, [name, eventType, country, date, order, dispatch]);

  return (
    <nav className={FilStyles.filterclases}>
      <div className={FilStyles.containerFilter}>
        <div className="relative">
          <div className={FilStyles.Nivel}>
            <svg className={FilStyles.svg} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            value={name}
            onChange={e => setName(e.target.value)}
            className={FilStyles.input}
            placeholder="Buscar eventos..."
            required
          />
        </div>
        
          <select value={eventType} onChange={e => setEventType(e.target.value)} className={FilStyles.select}>
            <option value="">Selecciona un Evento</option>
            <option value="Musical">Musical</option>
            <option value="Deportivo">Deportivo</option>
            <option value="Artistico">Artístico</option>
            <option value="Otro">Otro</option>
          </select>

          <select value={country} onChange={e => setCountry(e.target.value)} className={FilStyles.select}>
            <option value="">Selecciona un país</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Colombia">Colombia</option>
            <option value="Argentina">Argentina</option>
          </select>

          <select value={order} onChange={e => setOrder(e.target.value)} className={FilStyles.select}>
            <option value="">Ordenar por</option>
            <option value="name">Nombre</option>
            <option value="date">Fecha</option>
            <option value="eventType">Tipo de Evento</option>
          </select>

          <nav className={FilStyles.filterclases}>
            <div className={FilStyles.containerFilter}>
              <div className={FilStyles.relativeInput}>
                <div className={FilStyles.iconContainer}>
                  <svg className={FilStyles.sv} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className={FilStyles.date}
                  placeholder="Select date"
                />
              </div>
            </div>
          </nav>




        <button onClick={handleResetFilters} className={FilStyles.Button}>
          <span class="relative z-10">Quitar </span>
        </button>
      </div>
    </nav>
  );
};

export default EventFilter;