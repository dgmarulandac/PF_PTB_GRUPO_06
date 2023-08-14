import React, { useState } from "react";
import { useSelector } from 'react-redux'
import validation from "../../Utils/ValidationEventForm/validation";
import { useDispatch } from "react-redux";
import { createEvent } from "../../Redux/Action/action";
import style from './formEvent.module.css'

export default function FormEvent() {

    const { country, eventTypes } = useSelector(state => state)
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

    const handleChange = (e) => {
        const { value, name } = e.target
        const newEvent = { ...event, [name]: value }
        setEvent(newEvent)
        setError(validation(newEvent))
    }

    const handleCreate = (e) => {
        e.preventDefault();
        if (Object.keys(error).length === 0 && event.name.length > 0) {
            dispatch(createEvent(event))
        }
    }


    return (
        <div className={style.body}>
            <div className={style.container}>
                <div>
                    <h2>Crea un evento!</h2>
                    <p>crea un evento para que puedas promocionarlo en nuestra pagina,
                        no dejes ningun campo vacio.
                    </p>
                </div>
                <form className={style.container_form} onSubmit={handleCreate}>
                    <div className={style.container_div}>
                        <label htmlFor="">Nombre</label>
                        <input type="text" name="name" id="1"
                            placeholder="nombre del evento..."
                            value={event.name} onChange={handleChange} />
                        {error.name && <p className={style.error}>{error.name}</p>}
                    </div>
                    <div className={style.container_div_description}>
                        <label htmlFor="">Descripcion</label>
                        <textarea id="2" name="description"
                            placeholder="escribe la descripcion de tu evento..." rows="4" cols="40"
                            value={event.description} onChange={handleChange} />
                        {error.description && <p className={style.error}>{error.description}</p>}
                    </div>
                    <div className={style.container_div}>
                        <label htmlFor="">imagen</label>
                        <input type="text" name="image" id="8"
                            value={event.image} onChange={handleChange} />
                        {error.image && <p className={style.error}>{error.image}</p>}
                    </div>
                    <div className={style.container_div_duo}>
                        <div className={style.container_div}>
                            <label htmlFor="">Fecha</label>
                            <input type="date" name="date" id="3"
                                value={event.date} onChange={handleChange} />
                            {error.date && <p className={style.error}>{error.date}</p>}
                        </div>
                        <div className={style.container_div}>
                            <label htmlFor="">Hora</label>
                            <input type="time" name="hour" id="4"
                                value={event.hour} onChange={handleChange} />
                            {error.hour && <p className={style.error}>{error.hour}</p>}
                        </div>
                    </div>

                    <div className={style.container_div}>
                        <label htmlFor="">Direccion</label>
                        <input type="text" name="adress" id="6"
                            value={event.adress} onChange={handleChange} />
                        {error.adress && <p className={style.error}>{error.adress}</p>}
                    </div>
                    <div className={style.container_div_duo}>
                        <div className={style.container_div}>
                            <label htmlFor="">Pais</label>
                            <select name="country" id="7" onChange={handleChange}>
                                <option value="">-elige un pais-</option>
                                {country.map((c, i) => {
                                    return (<option key={i} value={c}>{c}</option>)
                                })}
                            </select>
                            {error.country && <p className={style.error}>{error.country}</p>}

                        </div>
                        <div className={style.container_div}>
                            <label htmlFor="">Tipo de Evento</label>
                            <select name="eventType" id="9" onChange={handleChange}>
                                <option value="">-evento-</option>
                                {eventTypes.map((e, i) => {
                                    return (<option key={i} value={e}>{e}</option>)
                                })}
                            </select>
                            {error.eventType && <p className={style.error}>{error.eventType}</p>}
                        </div>
                    </div>
                    <div className={style.container_div_duo}>
                        <div className={style.container_div}>
                            <label htmlFor="">Cantidad de Tickets</label>
                            <input type="number" name="cantTickets" id="5"
                                value={event.cantTickets} onChange={handleChange} />
                            {error.cantTickets && <p className={style.error}>{error.cantTickets}</p>}
                        </div>
                        <div className={style.container_div}>
                            <label htmlFor="">Precio de los Tickets</label>
                            <input type="number" name="ticketPrice" id="10"
                                value={event.ticketPrice} onChange={handleChange} />
                            {error.ticketPrice && <span className={style.error}>{error.ticketPrice}</span>}
                        </div>
                    </div>

                    <button type="submit">Crear Evento</button>
                </form>
            </div>
        </div>
    )
}