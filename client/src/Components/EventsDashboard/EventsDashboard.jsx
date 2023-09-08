import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyEvents, getMySales } from "../../Redux/Action/action";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import SalesChart from "../SalesChart/SalesChart";
import * as styles from "./EventDashboardStiles";
import Paginado from "../pagination/pagination";

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
                            return <div>
                                    <Card event={event} key={event.id} />
                                    <Link to={`/editEvent/${event.id}`}><button className={styles.button}>Editar Evento</button></Link>
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