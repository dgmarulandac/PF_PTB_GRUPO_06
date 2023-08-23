import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyEvents } from "../../Redux/Action/action";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import * as styles from "./EventDashboardStiles";


const EventsDashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userSesion);
    const events = useSelector((state) => state.myEvents);

    useEffect(() => {
        dispatch(getMyEvents(user.id));
    }, []);


    return(
        <div>
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