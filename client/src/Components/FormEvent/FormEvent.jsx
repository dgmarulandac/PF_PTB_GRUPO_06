import React, { useState } from "react";
import { useSelector } from 'react-redux'
import validation from "../../Utils/ValidationEventForm/validation";
import { useDispatch } from "react-redux";
import { createEvent } from "../../Redux/Action/action";
import style from './formEvent.module.css'
import BrowseFileUpdate from "../BrowseFileUpdate/BrowseFileUpdate";

export default function FormEvent() {

    const { country, eventTypes } = useSelector(state => state)
    const dispatch = useDispatch()

    const [event, setEvent] = useState({
        name: '',
        description: '',
        date: '',
        hour: '',
        cantTickets: '',
        address: '',
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


    const handleCreate = async (e) => {
        e.preventDefault();
        if (Object.keys(error).length === 0 && event.name.length > 0) {
            await dispatch(createEvent(event))
            setEvent({ ...event, exito: 'Evento creado con exito' })
        }
    }

    const handleImageUpload = (secure_url) => {
        setEvent({ ...event, image: secure_url });
    };

    return (
        <div className={style.body}>
            <div className={style.titleContainer}>
                <h1>BOHO</h1>
                <p>¡¡Compra tus tickets seguro con nosotros!!</p>
            </div>
            <div className={style.container}>
                <div>
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
                        <div>
                            {error.name && <p className={style.error}>{error.name}</p>}
                        </div>
                    </div>
                    <div className={style.container_div_description}>
                        <label htmlFor="">Descripcion</label>
                        <textarea id="2" name="description"
                            placeholder="escribe la descripcion de tu evento..." rows="4" cols="40"
                            value={event.description} onChange={handleChange} />
                        <div>
                            {error.description && <p className={style.error}>{error.description}</p>}
                        </div>
                    </div>
                    <div className={style.container_div}>
                        <label htmlFor="">imagen</label>
                        <BrowseFileUpdate onImageUpload={handleImageUpload} />
                        <div>
                            {error.image && <p className={style.error}>{error.image}</p>}
                        </div>
                    </div>
                    <div className={style.container_div_duo}>
                        <div className={style.container_div}>
                            <label htmlFor="">Fecha</label>
                            <input type="date" name="date" id="3"
                                value={event.date} onChange={handleChange} />
                            <div>
                                {error.date && <p className={style.error}>{error.date}</p>}
                            </div>
                        </div>
                        <div className={style.container_div}>
                            <label htmlFor="">Hora</label>
                            <input type="time" name="hour" id="4" step='1'
                                value={event.hour} onChange={handleChange} />
                            <div>
                                {error.hour && <p className={style.error}>{error.hour}</p>}
                            </div>
                        </div>
                    </div>

                    <div className={style.container_div}>
                        <label htmlFor="">Direccion</label>
                        <input type="text" name="address" id="6"
                            value={event.address} onChange={handleChange}
                            placeholder="Debe ser asi: Av.España 234, Madrid" />
                        <div>
                            {error.adress && <p className={style.error}>{error.adress}</p>}
                        </div>
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
                            <div>
                                {error.country && <p className={style.error}>{error.country}</p>}
                            </div>
                        </div>
                        <div className={style.container_div}>
                            <label htmlFor="">Tipo de Evento</label>
                            <select name="eventType" id="9" onChange={handleChange}>
                                <option value="">-evento-</option>
                                {eventTypes.map((e, i) => {
                                    return (<option key={i} value={e}>{e}</option>)
                                })}
                            </select>
                            <div>
                                {error.eventType && <p className={style.error}>{error.eventType}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={style.container_div_duo}>
                        <div className={style.container_div}>
                            <label htmlFor="">Cantidad de Tickets</label>
                            <input type="number" name="cantTickets" id="5"
                                value={event.cantTickets} onChange={handleChange} />
                            <div>
                                {error.cantTickets && <p className={style.error}>{error.cantTickets}</p>}
                            </div>
                        </div>
                        <div className={style.container_div}>
                            <label htmlFor="">Precio de los Tickets</label>
                            <input type="number" name="ticketPrice" id="10"
                                value={event.ticketPrice} onChange={handleChange} />
                            <div>
                                {error.ticketPrice && <span className={style.error}>{error.ticketPrice}</span>}
                            </div>
                        </div>
                    </div>
                    {event.exito && <p className={style.exito}>{event.exito}</p>}
                    <button type="submit">Crear Evento</button>

                </form>
            </div>
        </div>
    )
}