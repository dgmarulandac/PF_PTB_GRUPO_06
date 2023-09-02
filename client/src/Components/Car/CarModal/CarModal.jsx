import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "./formEventEditStyle";
import axios from "axios";
import MP from './MP.png'
import { Link } from "react-router-dom";
import { addToCar } from "../../../Redux/Action/action";

export default function CarModal({ handleModal }) {
    const { shoppingCar } = useSelector(state => state)
    const [urlMP, setUrlMP] = useState(false)
    const { userSesion } = useSelector(state => state)
    const result = shoppingCar.map((e) => { return e.ticketPrice * e.Cart_Event.quantity }).reduce(function (a, v) { return a + v }, 0)
    const dispatch = useDispatch()

    const handlerOrder = () => {
        axios.post('orders/createOrder', { token: localStorage.getItem('shoppingCar') }, { headers: { 'X-Access-Token': localStorage.getItem('jwt') } })
            .then(({ data }) => {
                console.log(data)
                // setUrlMP(data.init_point)
            })
            .catch(error => console.log(error))
    }

    return (
        <div className={styles.body}>

            <div className={styles.container}>
                <button onClick={handleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto grid justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                {urlMP ? (
                    <div>
                        {Object.keys(userSesion).length > 0 ?
                            (
                                <div>
                                    <div>
                                        <p className={styles.p}>Metodos de pago</p>
                                    </div>
                                    <div className="m-5 mb-2">
                                        <a href={urlMP} target="_blank">
                                            <img src={MP} alt="logo de mercadpago" width='80' />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>inicia sesion para poder seguir con la compra</p>
                                    <Link to={'/login'}>
                                        <button className={styles.button}>Iniciar sesion</button>
                                    </Link>

                                </div>
                            )}
                    </div>
                ) : (
                    <div>
                        <h1 className={styles.p}>Resumen de compra</h1>
                        <div className="divide-y">
                            {shoppingCar?.map((e, i) => {
                                return (
                                    <div className="text-start p-3" key={i}>
                                        <div>
                                            <button type="button" className="absolute right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto grid justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <h1 className="text-lg">{e.name}</h1>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-sm ">Cantidad de tickets:</p>
                                            <div className="flex text-sm ">
                                                <button className={styles.plusLess} onClick={() => { dispatch(addToCar({ idEvent: e.id, quantity: 1 })) }}>+</button>
                                                <p>{e?.Cart_Event?.quantity}</p>
                                                <button className={styles.plusLess} onClick={() => { dispatch(addToCar({ idEvent: e.id, quantity: -1 })) }}>-</button>
                                            </div>
                                            <p className="text-sm">Precio: {e.ticketPrice}$</p>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className={styles.p}></div>
                        </div>
                        <div>
                            <h3>Total a pagar: {result}$</h3>
                        </div>
                        <button className={styles.button} onClick={handlerOrder}>Comprar</button>
                    </div>
                )}
            </div>
        </div>
    )
}