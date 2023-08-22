import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import validation from '../../functions/Validations/validationModal/validation'
import { styles } from "./modalStyle";
import { modal } from "../../Redux/Action/action";
import mp from './MP.png'

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
    const [orderCreated, setOrderCreated] = useState({})

    const handleChange = (e) => {
        const { value } = e.target;
        setTicket(value)
        setOrder({ ...order, quantity: value, price: value * event.ticketPrice })
        setError({ ...error, cantTickets: validation(value, event.cantTickets) })
    }

    const handleClose = () => {
        dispatch(modal(false))
    }

    const prueba = async () => {
        try {
            const response = await axios.post('orders/createOrder', order)
            setOrderCreated(response.data)
            console.log(response)
        } catch (error) {
            setError({...error, post: error.response.data.error})
        }
    }

    const urlInA = async () => {
        try {
            const mercadoPago = document.getElementById('mercadoPago')
            const { data } = await axios.post('/orderMercadoPago/create_Order',
                { description: event.name, price: order.price, quantity: order.quantity, currency_id: 'COP' });
            console.log(data)
            mercadoPago.href = data.init_point
        } catch (error) {
            console.log(error)
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
                {error.petition ?
                    (<p>{error.petition}</p>) :
                    (<div className={''}>
                        <div className='m-5'>
                            <p className={styles.p}>Resumen de la orden</p>
                            <div className="text-start">
                                <p className="text-lg">{event.name}</p>
                                <span className="text-xs m-0">{event.ticketPrice}$/ {event.cantTickets} entradas disponibles</span>
                                {orderCreated.quantity && <p className="text-xs m-0">Tickets a comprar: {orderCreated.quantity}</p>}
                                {orderCreated.price && <p className="text-xs m-0">Total a pagar: {orderCreated.price}</p>}
                            </div>
                        </div>
                        {orderCreated.id ? (
                            <div>
                                <div>
                                    <p className={styles.p}>Metodo de Pago</p>
                                </div>
                                <div className="m-5 mb-2">
                                    <a id='mercadoPago' href="">
                                        <img src={mp} alt="logo de mercado pago" width='80' />
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className={''}>
                                <p className={styles.p}>Genere la orden</p>
                                <label className={styles.label}>Seleccione la cantidad de entradas que desea comprar</label>
                                <input className={styles.input} type="number" placeholder="ejem 1,2" value={ticket} onChange={handleChange} />
                                {error.cantTickets && <p className={styles.error}>{error.cantTickets}</p>}
                                <p>Total: {order.price}</p>
                                <button className={styles.button} onClick={prueba}>Confirmar orden</button>
                            </div>
                        )}
                        {error.post && <p className={styles.error}>⚠️ {error.post}</p>}
                    </div>)
                }
            </div>
        </div>

    )
} 