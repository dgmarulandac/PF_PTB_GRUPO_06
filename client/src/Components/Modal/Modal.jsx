import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import validation from '../../functions/Validations/validationModal/validation'
import { styles } from "./modalStyle";
import { modal } from "../../Redux/Action/action";
import mp from './MP.png'
import { Link } from "react-router-dom";

export default function Modal() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const idBuyer = useSelector(state => state.userSesion.id)
    const [event, setEvent] = useState({})
    const [error, setError] = useState({})
    const [ticket, setTicket] = useState('')
    const [order, setOrder] = useState({
        idBuyer
    })
    const [urlMp, setUrlMp] = useState(false)

    const handleChange = (e) => {
        const { value } = e.target;
        setTicket(value)
        setOrder({ ...order, quantity: Number(value), price: value * event.ticketPrice })
        setError(validation(value, event.cantTickets))
    }

    const handleClose = () => {
        dispatch(modal(false))
    }

    const prueba = async () => {
        try {
            const response = await axios.post('orders/createOrder', order)
            setUrlMp(response.data.response.init_point)
            console.log(response)
        } catch (error) {
            setError({ ...error, post: error.response.data.error })
        }
    }

    useEffect(() => {
        axios.get(`/events/${id}`)
            .then(({ data }) => {
                setEvent(data)
                setOrder({ ...order, idEvent: data.id })
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
                    <button onClick={handleClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto grid justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {idBuyer ?
                    (<div className={''}>
                        <div className='m-5'>
                            <p className={styles.p}>Resumen de la orden</p>
                            <div className="text-start">
                                <span className="text-lg">{event.name}/ </span>
                                <span className="text-xs m-0">{event.ticketPrice}{event.currency}</span>
                                {order.quantity > 0 && <p className="text-xs m-0">Tickets a comprar: {order.quantity}</p>}
                                {order.price > 0 && <p className="text-xs m-0">Total a pagar: {order.price}</p>}
                            </div>
                        </div>
                        {urlMp ? (
                            <div>
                                <div>
                                    <p className={styles.p}>Metodo de Pago</p>
                                </div>
                                <div className="m-5 mb-2">
                                    <a id='mercadoPago' href={urlMp} target="_blank">
                                        <img src={mp} alt="logo de mercado pago" width='80' />
                                    </a>
                                    <div class="flex items-center justify-center">
                                        <div role="status">
                                            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={''}>
                                <p className={styles.p}>Genere la orden</p>
                                <label className={styles.label}>Seleccione la cantidad de entradas que desea comprar</label>
                                <input className={styles.input} type="number" placeholder="ejem 1,2" value={ticket} onChange={handleChange} />
                                {error.cantTickets && <p className={styles.error}>{error.cantTickets}</p>}
                                <button className={styles.button} onClick={prueba}>Confirmar orden</button>
                            </div>
                        )}
                        {error.post && <p className={styles.error}>⚠️ {error.post}</p>}
                    </div>) : (<div>
                        <p>Inicia sesion para comprar las entradas!</p>
                        <Link to='/login'>
                            <button onClick={handleClose} className={styles.button}>iniciar sesion</button>
                        </Link>
                    </div>)
                }
            </div>
        </div>

    )
} 