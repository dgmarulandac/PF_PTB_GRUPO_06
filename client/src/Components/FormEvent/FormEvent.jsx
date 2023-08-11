import React, { useState } from "react";
import { useSelector } from 'react-redux'
import validation from "../../Utils/ValidationEventForm/validation";
import { useDispatch } from "react-redux";
import { createEvent } from "../../Redux/Action/action";

export default function FormEvent() {

    const {country, eventTypes} = useSelector(state => state)
    const dispatch = useDispatch()

    const [event, setEvent] = useState({
        name: '',
        description: '',
        date: '',
        hour: '',
        cantTickets: '',
        adress: '',
        country: '',
        image: '',
        eventType: '',
        ticketPrice: ''
    })
    const [error, setError] = useState({})

    const handleChange = (e)=>{
        const {value, name} = e.target
        const newEvent = {...event, [name]: value}
        setEvent(newEvent)
        setError(validation(newEvent))
    }

    const handleCreate = (e)=>{
        e.preventDefault();
        if (Object.keys(error).length === 0 && event.name.length > 0){
            dispatch(createEvent(event))
        }
    }
    

    return (
        <div>
            {console.log(error, event)}
            <form onSubmit={handleCreate}>
                <div>
                    <label htmlFor="">Nombre</label>
                    <input type="text" name="name" id="1" 
                    placeholder="nombre del evento..." 
                    value={event.name} onChange={handleChange}/>
                    {error.name && <p>{error.name}</p>}
                </div>
                <div>
                    <label htmlFor="">Decripcion</label>
                    <textarea id="2" name="description" 
                    placeholder="escribe la descripcion de tu evento..." rows="4" cols="50"
                    value={event.description} onChange={handleChange}></textarea>
                    {error.description && <p>{error.description}</p>}
                </div>
                <div>
                    <label htmlFor="">image</label>
                    <input type="text" name="image" id="8" 
                    value={event.image} onChange={handleChange}/>
                    {error.image && <p>{error.image}</p>}
                </div>
                <div>
                    <label htmlFor="">Fecha</label>
                    <input type="date" name="date" id="3" 
                    value={event.date} onChange={handleChange}/>
                    {error.date && <p>{error.date}</p>}
                </div>
                <div>
                    <label htmlFor="">Hora</label>
                    <input type="time" name="hour" id="4" 
                    value={event.hour} onChange={handleChange}/>
                    {error.hour && <p>{error.hour}</p>}
                </div> 
                <div>
                    <label htmlFor="">Direccion</label>
                    <input type="text" name="adress" id="6"
                    value={event.adress} onChange={handleChange} />
                    {error.adress && <p>{error.adress}</p>}
                </div>
                <div>
                    <label htmlFor="">Pais</label>
                    <select name="country" id="7" onChange={handleChange}>
                        <option value="">-elige un pais-</option>
                        {country.map((c,i)=>{
                            return(<option key={i} value={c}>{c}</option>)
                        })}
                    </select>
                    {error.country && <p>{error.country}</p>}
                </div>
                <div>
                    <label htmlFor="">Tipo de Evento</label>
                    <select name="eventType" id="9" onChange={handleChange}>
                        <option value="">-evento-</option>
                        {eventTypes.map((e,i)=>{
                            return(<option key={i} value={e}>{e}</option>)
                        })}
                    </select>
                    {error.eventType && <p>{error.eventType}</p>}
                </div>
                <div>
                    <label htmlFor="">Cantidad de Tickets</label>
                    <input type="number" name="cantTickets" id="5" 
                    value={event.cantTickets} onChange={handleChange}/>
                    {error.cantTickets && <p>{error.cantTickets}</p>}
                </div>
                <div>
                    <label htmlFor="">Precio de los Tickets</label>
                    <input type="number" name="ticketPrice" id="10" 
                    value={event.ticketPrice} onChange={handleChange}/>
                    {error.ticketPrice && <p>{error.ticketPrice}</p>}
                </div>
                <button type="submit">Crear Evento</button>
            </form>
        </div>
    )
}