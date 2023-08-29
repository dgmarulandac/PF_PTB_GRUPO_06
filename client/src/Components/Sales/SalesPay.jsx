import React, { useEffect, useState } from "react";
import reject from './reject.png'
import sucess from './sucess.png'
import { useParams } from "react-router-dom";
import axios from "axios";
import { styles } from "./salesStyles";
import style from "./Sales.module.css"

export default function SalesPay() {
    const { id } = useParams()
    const [result, setResult] = useState(null)
    const [error, setError] = useState({})
    const [v, setv] = useState(null)

    useEffect(() => {
        axios.get('/sales/' + id)
            .then(({ data }) => {
                setResult(data)
                // setv(data.dataValues)
                return data
            }).then(result => setv(result.dataValues.isSuccesful))
            .catch(error => setError(error))

        return setResult({})

    }, [id])

    return (
        <div className={styles.body}>
            {console.log(v)}
            {result === null ?
                (<div class="flex items-center justify-center">
                    <svg viewBox="0 0 240 240" height="240" width="240" class={style.loader}>
                        <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20" stroke="#000" fill="none" r="105" cy="120" cx="120" className={`${style.loaderRing} ${style.loaderRingA}`}></circle>
                        <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20" stroke="#000" fill="none" r="35" cy="120" cx="120" className={`${style.loaderRing} ${style.loaderRingB}`}></circle>
                        <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="85" className={`${style.loaderRing} ${style.loaderRingC}`}></circle>
                        <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="155" className={`${style.loaderRing} ${style.loaderRingD}`}></circle>
                    </svg>
                </div>) : (
                    <div className="m-10">
                        {v == null && (
                            <div class="flex items-center justify-center">
                                <svg viewBox="0 0 240 240" height="240" width="240" class={style.loader}>
                                    <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20" stroke="#000" fill="none" r="105" cy="120" cx="120" className={`${style.loaderRing} ${style.loaderRingA}`}></circle>
                                    <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20" stroke="#000" fill="none" r="35" cy="120" cx="120" className={`${style.loaderRing} ${style.loaderRingB}`}></circle>
                                    <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="85" className={`${style.loaderRing} ${style.loaderRingC}`}></circle>
                                    <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="155" className={`${style.loaderRing} ${style.loaderRingD}`}></circle>
                                </svg>
                            </div>)}
                        {v && (
                            <div>
                                <p className={styles.p}>Nombre del evento: {result.eventName}</p>
                                {/* <div className="flex justify-center">
                                    <img src={result.eventImage} alt="evento" /> 
                                </div> */}
                                <p className={styles.p}>Cantidad de tickets: {result.quantity}</p>
                                <p className={styles.p}>Fecha: {result.date}</p>
                                <p className={styles.p}>Hour: {result.hour}</p>
                                <p className={styles.p}>Direccion: {result.address}</p>
                                <div className="flex justify-center">
                                    <img src={sucess} alt="aprobado" />
                                </div>
                                <p className={styles.exito}>tu pago fue aceptado!</p>
                            </div>)}

                        {v === false && (
                            <div className={styles.info}>
                                <div className="flex justify-center">
                                    <img src={reject} alt="rechazado" />
                                </div>
                                <p className={styles.error}>tu pago fue rechazado</p>
                            </div>
                        )}


                    </div>
                )
            }
        </div>
    )
}