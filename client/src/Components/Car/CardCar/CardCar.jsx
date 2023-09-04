import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEventCar, addToCar } from "../../../Redux/Action/action";
import { styles } from "./styles";
import validation from "../../../Utils/ValidationQuantityCar/validation";


export default function CardCar({ e }) {
    const dispatch = useDispatch()
    const [error, setError] = useState()

    useEffect(() => {
        setError(validation(e?.Cart_Event?.quantity, e?.cantTickets))
    }, [e])
    return (
        <div className="text-start p-3">
            <div>
                <button onClick={() => { dispatch(deleteEventCar(e.id)) }} type="button" className="absolute right-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto grid justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
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
                    <button className={error ? styles.pLError : styles.plusLess} onClick={() => {
                        dispatch(addToCar({ idEvent: e.id, quantity: -1 }))
                    }}>-</button>
                    <p className={error ? styles.error : styles.exito}>{e?.Cart_Event?.quantity}</p>
                    <button className={error ? styles.pLError : styles.plusLess} onClick={() => {
                        dispatch(addToCar({ idEvent: e.id, quantity: 1 }))
                    }}>+</button>
                </div>
                <p className="text-sm">Precio: {e.ticketPrice}$</p>
            </div>
            <div>
                {error && <p className={styles.error2}>la cantidad de tickets excede el maximo disponible</p>}
            </div>
        </div>
    )
}