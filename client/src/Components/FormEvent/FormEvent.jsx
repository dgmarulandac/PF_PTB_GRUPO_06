import React, { useState } from "react";
import { useSelector } from 'react-redux'
import validation from "../../Utils/ValidationEventForm/validation";
import { useDispatch } from "react-redux";
import { createEvent } from "../../Redux/Action/action";
import BrowseFileUpdate from "../BrowseFileUpdate/BrowseFileUpdate";
import { styles } from "./formEventStyle";

export default function FormEvent() {



    const { country, eventTypes, moneyTypes, userSession } = useSelector(state => state)

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
        ticketPrice: '',
        currency: 'COP'
    })
    const [error, setError] = useState({})

    const handleChange = (e) => {
        const { value, name } = e.target
        const newEvent = { ...event, [name]: value }
        setEvent(newEvent)
        setError(validation(newEvent))
    }

    const handleImageUpload = (secure_url) => {
        const newEvent = { ...event, image: secure_url };
        setEvent(newEvent);
        setError(validation(newEvent))
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (Object.keys(error).length === 0 && event.name.length > 0) {

            const eventToSend = {...event, idSeller: userSession.id};

            dispatch(createEvent(eventToSend))
            setEvent({ 
            name: '',
            description: '',
            date: '',
            hour: '',
            cantTickets: '',
            address: '',
            country: '',
            image: '',
            eventType: '',
            ticketPrice: '', 
            result: '✅ Evento creado con exito' })
        }else{
            setEvent({...event, result: '⚠️ Completa los campos'})
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <h1 className={styles.logo}>BOHO</h1>
                <p className={styles.p}>
                    ¡Crea un evento para que puedas promocionarlo en nuestra pagina!
                    <br />*No dejes ningun campo vacio.
                </p>
            </div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleCreate}>
                    <div className={styles.div_ind}>
                        <label className={styles.label}>Nombre</label>
                        <input type="text" name="name" id="1"
                            placeholder="nombre del evento..."
                            value={event.name} onChange={handleChange}
                            className={styles.input} />
                        <div>
                            {error.name && <p className={styles.error}>{error.name}</p>}
                        </div>
                    </div>
                    <div className={styles.div_g}>
                        <label className={styles.label}>Descripcion</label>
                        <textarea id="2" name="description"
                            placeholder="escribe la descripcion de tu evento..." rows="4" cols="40"
                            value={event.description} onChange={handleChange}
                            className={styles.input} />
                        <div>
                            {error.description && <p className={styles.error}>{error.description}</p>}
                        </div>
                    </div>
                    <div className={styles.div_g}>
                        <label className={styles.label}>Imagen</label>
                        <BrowseFileUpdate onImageUpload={handleImageUpload} />
                        <div>
                            {error.image && <p className={styles.error}>{error.image}</p>}
                        </div>
                    </div>
                    <div className={styles.dual}>
                        <div className={styles.div_p}>
                            <label className={styles.label}>Fecha</label>
                            <input type="date" name="date" id="3"
                                value={event.date} onChange={handleChange}
                                className={styles.input} />
                            <div>
                                {error.date && <p className={styles.error}>{error.date}</p>}
                            </div>
                        </div>
                        <div className={styles.div_p}>
                            <label className={styles.label}>Hora</label>
                            <input type="time" name="hour" id="4" step='1'
                                value={event.hour} onChange={handleChange}
                                className={styles.input} />
                            <div>
                                {error.hour && <p className={styles.error}>{error.hour}</p>}
                            </div>
                        </div>
                    </div>

                    <div className={styles.div_ind}>
                        <label className={styles.label}>Direccion</label>
                        <input type="text" name="address" id="6"
                            value={event.address} onChange={handleChange}
                            placeholder="Debe ser asi: Av.España 234, Madrid"
                            className={styles.input} />
                        <div>
                            {error.adress && <p className={styles.error}>{error.adress}</p>}
                        </div>
                    </div>
                    <div className={styles.dual}>
                        <div className={styles.div_ind}>
                            <label className={styles.label}>Pais</label>
                            <select name="country" id="7" onChange={handleChange}
                                className={styles.select}>
                                <option value="">-elige un pais-</option>
                                {country.map((c, i) => {
                                    return (<option key={i} value={c}>{c}</option>)
                                })}
                            </select>
                            <div>
                                {error.country && <p className={styles.error}>{error.country}</p>}
                            </div>
                        </div>
                        <div className={styles.div_ind}>
                            <label className={styles.label}>Tipo de Evento</label>
                            <select name="eventType" id="9" onChange={handleChange}
                                className={styles.select}>
                                <option value="">-evento-</option>
                                {eventTypes.map((e, i) => {
                                    return (<option key={i} value={e}>{e}</option>)
                                })}
                            </select>
                            <div>
                                {error.eventType && <p className={styles.error}>{error.eventType}</p>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.div_ind}>
                        <label className={styles.label}>Cantidad de Tickets</label>
                        <input type="number" name="cantTickets" id="5"
                            value={event.cantTickets} onChange={handleChange}
                            className={styles.input} placeholder="ejem: 400" />
                        <div>
                            {error.cantTickets && <p className={styles.error}>{error.cantTickets}</p>}
                        </div>
                    </div>

                    {/* <label className={styles.label}>Precio de los Tickets</label>
                    <div className='relative'>
                        <input type="number" name="ticketPrice" id="10"
                            value={event.ticketPrice} onChange={handleChange}
                            className={styles.input} 
                            placeholder="ejem: 600" />
                        <div>
                            {error.ticketPrice && <span className={styles.error}>{error.ticketPrice}</span>}
                        </div>
                    </div> */}
                    <div className={styles.div_ind}>
                        <label className={styles.label}>Precio de los Tickets</label>
                        <div class="relative">
                            <input type="number" name="ticketPrice" id="10"
                            value={event.ticketPrice} onChange={handleChange}
                            class={styles.input_price} placeholder="ejem: 600" />
                            <select className={styles.select_m} value={event.curency} name='currency' onChange={handleChange}>
                                <option value="">-Moneda-</option>
                                {moneyTypes.map((m, i) => {
                                    return (<option value={m} key={i}>{m}</option>)
                                })}
                            </select>
                        </div>
                        <div>
                            {error.ticketPrice && <span className={styles.error}>{error.ticketPrice}</span>}
                        </div>
                    </div>

                    {event.result && <p className={event.result[0] === '✅' ? styles.exito : styles.error}>{event.result}</p>}

                    <button type="submit" className={styles.button}>Crear Evento</button>
                </form>
            </div>
        </div>
    )
}