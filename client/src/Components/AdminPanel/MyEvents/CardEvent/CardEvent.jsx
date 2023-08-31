import { useEffect, useState } from "react";
import React from "react";
import EditEventAdmin from "../EditEvent/EditEventAdmin"
import EditEventTest from "../EditEvent/EditEventTest";
import { AiOutlineClose, AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import styles from "./CardEventStyle";
import axios from "axios";
import { BiBlock } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CardEvent({ e }) {
    const [v, setV] = useState(false)
    const [active, setActive] = useState(e.active)
    const handleEdit = () => {
        // v ? setV(false) : setV(true)
        setV(!v)
    }
    const available = async () => {
        axios.put("/events/toggleEvent/" + e.id, {}, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(({ data }) => {
                setActive(data.active)
            })
            .catch(error => console.log(error))
    }
    // useEffect(() => { }, [active])

    return (
        <div className="m-2 w-[37rem] grid grid-cols-[1fr_2fr_0.2fr] border border-gray-200 rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
            <div className="w-40 h-32">
                <img src={e.image} alt="evento" className="w-full h-32" />
            </div>
            <Link to={`/event/${e.id}`}>
                <div className="text-start">
                    <h2 className="text-lg font-medium">{e.name}</h2>
                    <p>{e.ticketPrice}{e.currency} /<span>{e.country}</span></p>
                    {active ? (<p className={styles.exito}>✅visible</p>) : (<p className={styles.error}>🚫 no visible</p>)}
                </div>
            </Link>
            <div className="grid grid-rows-2">
                {/* <button className="bg-[#FE0000] rounded-tr-lg grid place-items-center"><AiOutlineClose /></button> */}
                {active ?
                    (<button className="bg-[#FE0000] rounded-tr-lg grid place-items-center" onClick={available}><BiBlock /></button>)
                    :
                    (<button className="bg-lime-400 rounded-tr-lg grid place-items-center" onClick={available}><AiOutlineCheck /></button>)
                }
                <button className="bg-[#FD8D14] rounded-br-lg grid place-items-center" onClick={handleEdit}><AiOutlineEdit /></button>
                {v && <EditEventAdmin handleEdit={handleEdit} e={e} />}
            </div>
        </div>
    )
}