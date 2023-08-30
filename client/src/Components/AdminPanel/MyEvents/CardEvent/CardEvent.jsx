import { useState } from "react";
import React from "react";
import EditEventAdmin from "../EditEvent/EditEventAdmin"

export default function CardEvent({e}) {
    const [v, setV] = useState(false)

    const handleEdit = ()=>{
        // v ? setV(false) : setV(true)
        setV(!v)
    } 

    return (
        <div className="flex w-5/5">
            {console.log(e)}
            <div className="w-64 h-32">
                <img src={e.image} alt="evento" className="w-full h-32" />
            </div>
            <div>
                <h2>{e.name}</h2>
                <p>{e.price} <span>{e.country}</span></p>
            </div>
            <div>
                <button onClick={handleEdit}>✏️</button>
                {v && <EditEventAdmin handleEdit={handleEdit} e={e}/>}
                <button>🚫</button>
                <button>❌</button>
            </div>
        </div>
    )
}