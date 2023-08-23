import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyEvents } from "../../Redux/Action/action";
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
            <h2>Mis Eventos</h2>
            <div className={styles.cardcontainer}>
                {!events ? (
                <h2 className={styles.error}>No existe ningún evento con estas caracteristicas.</h2>
                ) : (
                events.map((event) => {
                    return <Card event={event} key={event.id} />;
                })
                )}
            </div>
        </div>
    )


};

export default EventsDashboard;