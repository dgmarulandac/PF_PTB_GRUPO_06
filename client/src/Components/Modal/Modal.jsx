import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import validation from '../../functions/Validations/validationModal/validation'
import { styles } from "./modalStyle";
import { modal } from "../../Redux/Action/action";

export default function Modal() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [event, setEvent] = useState({})
    const [error, setError] = useState({})
    const [ticket, setTicket] = useState('')

    const handleChange = (e) => {
        const { value } = e.target;
        setTicket(value)
        setError({ ...error, cantTickets: validation(value, event.cantTickets) })
    }
    const handleClick = () => {
        dispatch(modal(false))
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
        <div className={styles.body}>
            <div className={styles.container}>
                <div>
                    <button onClick={handleClick} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto grid justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {error.petition ?
                    (<p>{error.petition}</p>) :
                    (<div className={''}>
                        <div className={styles.div_ind}>
                            <label className={styles.label}>Seleccione la cantidad de entradas que desea comprar</label>
                            <input className={styles.input} type="number" placeholder="ejem 1,2" value={ticket} onChange={handleChange} />
                            {error.cantTickets && <p className={styles.error}>{error.cantTickets}</p>}
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
        </div>

    )
} 