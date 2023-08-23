import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyEvents, getMySales } from "../../Redux/Action/action";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import SalesChart from "../SalesChart/SalesChart";
import * as styles from "./EventDashboardStiles";


const EventsDashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userSesion);
    const events = useSelector((state) => state.myEvents);
    const sales = useSelector((state) => state.mySales);

    const sales1 = [
        { month: 'Enero', sales: 1500 },
        { month: 'Febrero', sales: 1800 },
        { month: 'Marzo', sales: 2100 },
        { month: 'Abril', sales: 3100 },
    ];

    useEffect(() => {
        dispatch(getMyEvents(user.id));
        dispatch(getMySales());
    }, []);


    return(
        <div>
            <h1 className={styles.error}>Mis Ventas</h1>
            <div>
                <SalesChart sales={sales1} />
            </div>
            <h1 className={styles.error}>Mis Eventos</h1>
            <div className={styles.cardcontainer}>
                {!events ? (
                    <div>
                        <h2 className={styles.error}>No hay eventos creados.</h2>
                        <Link to='/createEvent'><button className={styles.button}>Crear evento</button></Link>
                    </div>
                ) : (
                    events.map((event) => {
                        return <div>
                                <Card event={event} key={event.id} />
                                <Link to={`/editEvent/${event.id}`}><button className={styles.button}>Editar Evento</button></Link>
                            </div>;
                    })
                )}
            </div>
        </div>
    )


};

export default EventsDashboard;