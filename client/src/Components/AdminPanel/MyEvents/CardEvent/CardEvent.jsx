import { useState } from "react";
import React from "react";
import EditEventAdmin from "../EditEvent/EditEventAdmin"
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import styles from "./CardEventStyle";
import axios from "axios";

export default function CardEvent({ e }) {
    const [v, setV] = useState(false)
    const [active, setActive] = useState(e.active)
    const handleEdit = () => {
        // v ? setV(false) : setV(true)
        setV(!v)
    }
    const available = async ()=>{
        axios.put(`/events/toggleEvent/${e.id}`, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
        .then(response => console.log(response))
        .catch(error => console.log(error))
        // try {
        //    const {data} = await axios.put(`/events/toggleEvent/${e.id}`, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
        //    console.log(data)
        // } catch (error) {
        //     console.log(error)
        // }
        
    }

    return (
        <div className="m-2 w-[37rem] grid grid-cols-[1fr_2fr_0.2fr] border border-gray-200 rounded-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white">
            <div className="w-40 h-32">
                <img src={e.image} alt="evento" className="w-full h-32" />
            </div>
            <div className="text-start">
                <h2 className="text-lg font-medium">{e.name}</h2>
                <p>{e.ticketPrice}{e.currency} /<span>{e.country}</span></p>
                {active ? (<p className={styles.exito}>✅visible</p>):(<p className={styles.error}>🚫 no visible</p>)}
            </div>
            <div className="grid grid-rows-3">
                <button className="bg-[#FE0000] rounded-tr-lg grid place-items-center"><AiOutlineClose/></button>
                <button className="bg-[#F4EEEE]" onClick={available}>🚫</button>
                <button className="bg-[#EA906C] rounded-br-lg" onClick={handleEdit}>✏️</button>
                {v && <EditEventAdmin handleEdit={handleEdit} e={e} />}
            </div>
        </div>
    )
}