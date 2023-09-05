import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./modalStyle";
import axios from "axios";
import MP from './MP.png'
import { Link } from "react-router-dom";
import CardCar from "../CardCar/CardCar";
import { modal } from "../../../Redux/Action/action";

export default function CarModal({ handleModal }) {
    const { shoppingCar } = useSelector(state => state)
    const [urlMP, setUrlMP] = useState(false)
    const { userSesion } = useSelector(state => state)
    const result = shoppingCar?.map((e) => { return e.ticketPrice * e.Cart_Event.quantity }).reduce(function (a, v) { return a + v }, 0)
    const dispatch = useDispatch()
    const [error, setError] = useState([])

    const handlerOrder = () => {
        axios.post('orders/createOrder', { token: localStorage.getItem('shoppingCar') }, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(({ data }) => {
                console.log(data.response.init_point)
                setUrlMP(data.response.init_point)
            })
            .catch(error => setUrlMP('no hay link, inicia sesion'))
    }

    // const handleError = (value) => {
    //     setError(value.error)
    // }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <button onClick={()=>{dispatch(modal(false))}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto grid justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                {urlMP ? (
                    <div>
                        {Object.keys(userSesion)?.length > 0 ?
                            (
                                <div>
                                    <div>
                                        <p className={styles.p}>Metodos de pago</p>
                                    </div>
                                    <div className="m-5 mb-2">
                                        <a href={urlMP} target="_blank">
                                            <img src={MP} alt="logo de mercadpago" width='100' />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>inicia sesion para poder seguir con la compra</p>
                                    <Link to={'/login'}>
                                        <button className={styles.button} onClick={()=>{dispatch(modal(false))}}>Iniciar sesion</button>
                                    </Link>

                                </div>
                            )}
                    </div>
                ) : (
                    <div>
                        {shoppingCar?.length > 0 ? (
                            <div>
                                <h1 className={styles.p}>Resumen de compra</h1>
                                <div className="divide-y">
                                    {shoppingCar?.map((e, i) => {
                                        return (
                                            <CardCar e={e} key={i} />
                                        )
                                    })}
                                </div>
                                <div className='font-medium text-gray-900 dark:text-white border-b-[3px]'></div>
                                <div>
                                    <h3>Total a pagar: {result}$</h3>
                                    <button className={styles.button} onClick={handlerOrder}>Comprar</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className={styles.eventNotFount}>No hay eventos en el carrito</h1>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}