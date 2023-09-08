import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardEvent from "./CardEvent/CardEvent";
import styles from "./MyEventsStyle";
import style from "./MyEvents.module.css"
import { useDispatch } from "react-redux";
import { eventsAdmin } from "../../../Redux/Action/action";
import { Pagination } from "./paginationEvent/paginationEvent";
import SearchBar from "./SearchBar/SearchBar";

export default function MyEvents() {
    const [events, setEvents] = useState(false)
    // const [error, seterror] = useState(false)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const eventsGlobal = useSelector(state => state.eventsAdmin)


    useEffect(() => {
        if(events === false){
          dispatch(eventsAdmin());  
        }

        setEvents(eventsGlobal);

        if(events.length >= 0){
           setLoading(false); 
        }
        
    }, [eventsGlobal, events])


    return (
        <div>
            <div className="grid gap-3 justify-center">
                <h1 className={styles.p}>Lista de Eventos</h1>
                <SearchBar />
                {loading ? (
                    <div class="flex items-center justify-center">
                        <svg viewBox="0 0 240 240" height="240" width="240" class={style.loader}>
                            <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20" stroke="#000" fill="none" r="105" cy="120" cx="120" className={`${style.loaderRing} ${style.loaderRingA}`}></circle>
                            <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20" stroke="#000" fill="none" r="35" cy="120" cx="120" className={`${style.loaderRing} ${style.loaderRingB}`}></circle>
                            <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="85" className={`${style.loaderRing} ${style.loaderRingC}`}></circle>
                            <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="155" className={`${style.loaderRing} ${style.loaderRingD}`}></circle>
                        </svg>
                    </div>
                ) : (
                    <div>
                        {events.length === 0 && (
                            <div className="flex justify-center m-10">
                                <h2 className={styles.eventNotFount}>No hay eventos para mostrar</h2>
                            </div>
                        )}
                        {events.length > 0 && (
                            <div className="m-2">
                                {/* {events.map((e, i) => {
                                    return (
                                        <CardEvent e={e} key={i} />
                                    )

                                })} */}
                                <Pagination elementosPorPagina={6} event={events} />
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>)
}

// /events/toggleEvent/:id
// /events/admin
