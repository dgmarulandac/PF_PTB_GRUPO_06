import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardEvent from "./CardEvent/CardEvent";
import styles from "./MyEventsStyle";

export default function MyEvents() {
    const [events, setEvents] = useState([])
    const [error, seterror] = useState(false)

    useEffect(() => {
        axios.get('/events/admin', { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(response => setEvents(response.data))
            .catch(error => seterror(error))

        return setEvents([])
    }, [])
    // const events = useSelector(state => state.events)

    return (
        <div>
            {error ? (
                <div>
                    <p>{error}</p>
                </div>
            ) : (
                <div className="grid gap-3 justify-center">
                    <h1 className={styles.p}>Lista de Eventos</h1>
                    {events.length === 0 ? (
                        <div className="flex justify-center m-10">
                            <h2 className={styles.eventNotFount}>No hay eventos para mostrar</h2>
                        </div>
                    ) : (
                        <div className="m-2">
                            {events.map((e, i) => {
                                return (
                                    <CardEvent e={e} key={i} />
                                )

                            })}
                        </div>
                    )}

                </div>
            )}

        </div>)
}

// /events/toggleEvent/:id
// /events/admin
