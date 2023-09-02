import React, { useState } from "react";
import { useSelector } from 'react-redux'
import validation from "../../../../Utils/ValidationEventForm/validation";
import { useDispatch } from "react-redux";
// import BrowseFileUpdate from "../../../BrowseFileUpdate/BrowseFileUpdate";
import { styles } from "./formEventEditStyle";
import BrowseFileUpdate from "../BrowseFileUpdateEdit/BrowseFileUpdateEdit";

export default function EditEventTest({ handleEdit, e }) {
    const { country, eventTypes, moneyTypes, userSesion } = useSelector(state => state)

    const dispatch = useDispatch()

    const [event, setEvent] = useState({
        id: e.id,
        name: e.name,
        description: e.description,
        date: e.date,
        hour: e.hour,
        cantTickets: e.cantTickets,
        address: e.address,
        country: e.country,
        image: e.image,
        eventType: e.eventType,
        ticketPrice: e.ticketPrice,
        currency: e.currency
    })
    const [error, setError] = useState({})

    const handleChange = (e) => {
        const { value, name } = e.target
        const newEvent = { ...event, [name]: value }
        setEvent(newEvent)
        // setError(validation(newEvent))
    }

    const handleCha = (e) => {
        const { value, name } = e.target
        const newEvent = { ...event, [name]: value }
        setEvent(newEvent)
        // setError(validation(newEvent))
    }

    const handleImageUpload = (secure_url) => {
        const newEvent = { ...event, image: secure_url };
        setEvent(newEvent);
        setError(validation(newEvent))
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (Object.keys(error).length === 0 && event.name.length > 0) {

            // const eventToSend = { ...event, idSeller: userSesion.id };

            // dispatch(createEvent(eventToSend))
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
                result: '✅ Evento editado con exito'
            })
        } else {
            setEvent({ ...event, result: '⚠️ Completa los campos' })
        }
    }

    return (
        <div className={styles.body}>
            {console.log(event)}
            <div className={styles.container}>
                <button onClick={handleEdit} className="text-gray-100 bg-transparent bg-white right-0 dark:bg-gray-500 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto grid justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <form className={styles.form} onSubmit={handleCreate}>
                    <div className={styles.div_ind}>
                        <label className={styles.label}>Nombre</label>
                        <input type="text" name="name" id="1"
                            placeholder="nombre del evento..."
                            value={event.name} onChange={handleCha}
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
                    <div className={styles.div_img}>
                        <label className={styles.label}>Imagen</label>
                        <div className='scale-75'>
                          <BrowseFileUpdate onImageUpload={handleImageUpload} imgedit={event.image}/>  
                        </div>
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
                                className={styles.select} value={event.country}>
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
                                className={styles.select} value={event.eventType}>
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
                    <div className={styles.div_ind}>
                        <label className={styles.label}>Precio de los Tickets</label>
                        <div class="relative">
                            <input type="number" name="ticketPrice" id="10"
                                value={event.ticketPrice} onChange={handleChange}
                                class={styles.input_price} placeholder="ejem: 600" />
                            <select className={styles.select_m} value={event.currency} 
                                id='40' name='currency'
                                onChange={handleChange}>
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

                    <button type="submit" className={styles.button}>Editar Evento</button>
                </form>
            </div>
        </div>
    )
}