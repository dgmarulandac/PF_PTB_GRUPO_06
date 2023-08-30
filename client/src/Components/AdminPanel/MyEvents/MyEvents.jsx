import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardEvent from "./CardEvent/CardEvent";

export default function MyEvents() {
    // const [events, setEvents] = useState({})
    const [error, seterror] = useState(false)

    // useEffect(() => {
    //     axios.get('/events/admin')
    //         .then(response => setEvents(response.data))
    //         .catch(error => seterror(error))

    //     return setEvents(false)
    // }, [])
    const events = useSelector(state => state.events)


    return (
        <div>
            {error ? (
                <div>
                    <p>{error}</p>
                </div>
            ) : (

                <div className="grid gap-3 justify-center border">
                    {events.map((e, i) => {
                        return (
                            <CardEvent e={e} key={i}/>
                        )

                    })}
                </div>
            )}
        </div>)
}

// /events/toggleEvent/:id
// /events/admin
