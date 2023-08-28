import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyEvents, getMySales } from "../../Redux/Action/action";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import { DailySalesChart, SalesChart } from "../SalesChart/SalesChart";
import * as styles from "./EventDashboardStiles";
import stylesSales from "../SalesChart/SalesChart.module.css"


const EventsDashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userSesion);
    const events = useSelector((state) => state.myEvents);
    // const sales = useSelector((state) => state.mySales);
    const sales = [
        {
            month: "Julio",
            dailySales: [
                { day: "Lunes", sales: 900, cantTickets: 2000, price: 10 },
                { day: "Martes", sales: 100, cantTickets: 1000, price: 10 },
                { day: "Miercoles", sales: 350, cantTickets: 1000, price: 10 }
            ]
        },
        {
            month: "Agosto",
            dailySales: [
                { day: "Lunes", sales: 800, cantTickets: 2000, price: 10 },
                { day: "Martes", sales: 0, cantTickets: 1200, price: 10 },
                { day: "Miercoles", sales: 250, cantTickets: 1200, price: 10 }
            ]
        },
        // ...otros meses
    ];


    useEffect(() => {
        dispatch(getMyEvents(user.id));
        dispatch(getMySales());
    }, []);


    return (
        <div>
            <h1 className={styles.error}>Mis Ventas</h1>
            <div className={stylesSales.chartWrapper}>
                <SalesChart sales={sales && sales} />
                <DailySalesChart dailySales={sales[0].dailySales} />
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