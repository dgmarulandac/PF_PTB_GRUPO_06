import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyEvents, getMySales, toggleEvent } from "../../Redux/Action/action";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import SalesChart from "../SalesChart/SalesChart";
import * as styles from "./EventDashboardStiles";

const EventsDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userSesion);
  const events = useSelector((state) => state.myEvents);
  const sales = useSelector((state) => state.mySales);

  useEffect(() => {
    // Verifica si user y events se están cargando correctamente.
    console.log('User:', user);
    console.log('Events:', events);

    dispatch(getMyEvents(user.id));
    dispatch(getMySales());
  }, [dispatch, user.id]);

  const handleToggleEvent = (eventId, isOwner) => {
    // Verifica si se está enviando el ID del evento y si es el propietario.
    console.log('Toggle Event ID:', eventId);
    console.log('Is Owner:', isOwner);

    if (isOwner) {
      dispatch(toggleEvent(eventId));
    } else {
      alert("No tienes permisos para realizar esta acción.");
    }
  };

  return (
    <div>
      <h1 className={styles.error}>Mis Ventas</h1>
      <div>
        <SalesChart sales={sales && sales} />
      </div>
      <h1 className={styles.error}>Mis Eventos</h1>
      <div className={styles.cardcontainer}>
        {!events ? (
          <div>
            <h2 className={styles.error}>No hay eventos creados.</h2>
            <Link to="/createEvent">
              <button className={styles.button}>Crear evento</button>
            </Link>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id}>
              <Card event={event} />
              <button
                className={styles.button}
                onClick={() => handleToggleEvent(event.id, event.ownerId === user.id)}
              >
                {event.active ? "Desactivar" : "Activar"}
              </button>
              <Link to={`/editEvent/${event.id}`}>
                <button className={styles.button}>Editar Evento</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsDashboard;
