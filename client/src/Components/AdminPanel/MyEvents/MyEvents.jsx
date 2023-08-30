import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardEvent from "./CardEvent/CardEvent";

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
            {console.log(events)}
            {error ? (
                <div>
                    <p>{error}</p>
                </div>
            ) : (
                <div className="grid gap-3 justify-center border">
                    {events.length === 0 ? (
                        <div>
                            <h1>No hay eventos para mostrar</h1>
                        </div>
                    ) : (
                        events.map((e, i) => {
                            return (
                                <CardEvent e={e} key={i} />
                            )

                        })
                    )}

                </div>
            )}
        </div>)
}

// /events/toggleEvent/:id
// /events/admin
