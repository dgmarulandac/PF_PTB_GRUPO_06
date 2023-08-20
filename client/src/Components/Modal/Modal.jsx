import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import validation from '../../functions/Validations/validationModal/validation'
import { styles } from "./modalStyle";

export default function Modal() {
    const { id } = useParams()
    const [event, setEvent] = useState({})
    const [error, setError] = useState({})
    const [ticket, setTicket] = useState('')

    const handleChange = (e) => {
        const { value } = e.target;
        setTicket(value)
        setError({ ...error, cantTickets: validation(value, event.cantTickets) })
    }
    useEffect(() => {
        axios.get(`/events/${id}`)
            .then(({ data }) => {
                setEvent(data)
                setError('')
            })
            .catch(reason =>
                setError({ ...error, petition: reason.response.data.error }))
        setEvent({})

        return () => {
            setEvent({})
            setError('')
        }
    }, [id])

    return (
        <div className={styles.errorPopUp}>
            {error.petition ?
                (<p>{error.petition}</p>) :
                (<div className={''}>
                    <div>
                        <label className={styles.label}>Seleccione la cantidad de entradas que desea comprar</label>
                        <input className={styles.input} type="number" placeholder="ejem 1,2" value={ticket} onChange={handleChange} />
                        {error.cantTickets && <p>{error.cantTickets}</p>}
                    </div>
                    <div>
                        <p className={styles.p}>Metodo de Pago</p>
                    </div>
                    <div>
                        <p className={styles.p}>Confirmacion</p>
                    </div>
                    <button className={styles.button}>Comprar</button>
                </div>)
            }
        </div>
    )
} 