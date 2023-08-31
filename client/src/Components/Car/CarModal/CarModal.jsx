import React, { useState } from "react";
import { useSelector } from "react-redux";
import { styles } from "./modalStyle";

export default function CarModal({ handleModal }) {
    const { shoppingCar } = useSelector(state => state)
    const [urlMP, setUrlMP] = useState(false)

    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-75 grid place-items-center z-50">
            {console.log(shoppingCar)}
            <div className={styles.container}>
                <button onClick={handleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto grid justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div>
                    <div className="text-start">
                        <h2>Nombre del evento</h2>
                        <p className="text-sm">cantidad <span>precio</span></p>
                    </div>
                    <div>
                        <h3>Total a pagar: $</h3>
                    </div>
                    <button className={styles.button}>Comprar</button>
                </div>
            </div>
        </div>
    )
}