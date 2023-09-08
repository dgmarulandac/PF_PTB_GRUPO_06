import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cambiarTicket, getMyEvents, getMySales } from "../../Redux/Action/action";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import SalesChart from "../SalesChart/SalesChart";
import * as styles from "./EventDashboardStiles";
import Paginado from "../pagination/pagination";
import axios from "axios";
import Swal from "sweetalert2";

const EventsDashboard = () => {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.myEvents);
    const sales = useSelector((state) => state.mySales);

    useEffect(() => {
        dispatch(getMyEvents());
        dispatch(getMySales());
    }, []);

    //paginado Daniel M
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

    const toggleEvent = async (id) => {
        try {
            const {data} = await axios.put(`/events/toggleEvent/${id}`, {}, {
                headers: { "X-Access-Token": localStorage.getItem("jwt") },
            });
    
            if (data) {
                dispatch(cambiarTicket(data))
            } else {
                // La respuesta es inválida o no contiene datos
                console.error("Respuesta de solicitud PUT no válida:", data);
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: `${error.response ? error.response.data.error : "Error desconocido"}`,
                icon: "error",
            });
        }
    }

    return(
        <div>
            <h1 className={styles.error}>Mis Ventas</h1>
            <div>
                <SalesChart sales={sales} />
            </div>
            <h1 className={styles.title}>Mis Eventos</h1>
            
            <div>
                {!eventosAMostrar ? (
                    <div>
                        <h2 className={styles.error}>No hay eventos creados.</h2>
                        <Link to='/createEvent'><button className={styles.button}>Crear evento</button></Link>
                    </div>
                    ) : (
                    <div className={styles.cardcontainer}> 
                         {eventosAMostrar && eventosAMostrar.map((event) => {
                            return <div className={styles.card}>
                                    <Card event={event} key={event.id} />
                                    <div className={styles.buttons}>
                                    <Link to={`/editEvent/${event.id}`}><button className={styles.button}>Editar Evento</button></Link>
                                    
                                    {event.active ? (
                                <button className={styles.redbutton} onClick={() => toggleEvent(event.id)}>🚫Desactivar</button>
                            ) : (
                                <button className={styles.greenbutton} onClick={() => toggleEvent(event.id)}>✅Activar</button>
                            )}
                                    </div>
                                    
                                </div>;
                            })
                        }
                    </div>)}
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
    )


};

export default EventsDashboard;