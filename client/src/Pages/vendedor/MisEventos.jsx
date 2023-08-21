import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../Components/Card/Card";
import EditEvent from "../../Components/EditEvent/EditEvent";
import style from "./misEventos.module.css"

const MisEventos = () => {
    const user = useSelector((state) => state.user);
    const events = useSelector((state) => state.events);

    // Filtrar eventos para mostrar solo los creados por el vendedor actual
    const eventosDelVendedor = events.filter((evento) => evento.vendedorId === user?.id);

    return (
        <div>
            <h2>Mis Eventos</h2>
            {eventosDelVendedor.length > 0 ? (
                <ul>
                    {eventosDelVendedor.map(evento => (
                        <li key={evento.id}>
                            <Link to={`/mis-eventos/${evento.id}`}>{evento.name}</Link>
                            <Link to={`/editar-evento/${evento.id}`}>Editar</Link>
                            {/* Renderizar EditEvent solo cuando se encuentre el evento */}
                            {events.find(event => event.id === evento.id) && (
                                <EditEvent eventId={evento.id} events={events} />
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                    <p>No hay eventos creados.</p>
                    <Link to='/createEvent'><button className={style.btn}>Crear evento</button></Link>
                </div>
            )}

            {/* Opcionalmente, puedes mostrar los detalles de cada evento */}
            <div>
                {eventosDelVendedor.map(evento => (
                    <Card event={evento} key={evento.id} />
                ))}
            </div>
        </div>
    );
}

export default MisEventos;




