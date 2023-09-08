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
    const [eBuy, setEBuy ] = useState([])
    const total = eBuy?.map((e) => { return e.price * e.quantity }).reduce(function (a, v) { return a + v }, 0)

    useEffect(() => {
        axios.get('/sales/' + id)
            .then(({ data }) => {
                setResult(data)
                setEBuy(data.eventsToAdd)
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
                                <div className={style.label}>
                                    <header className={style.header}>
                                        <h1 className={style.bold}>Resumen de compra</h1>
                                        <div className={style.divider}></div>
                                        <p>BOHO, Compra seguro con nosotros!!</p>
                                    </header>
                                    <div className={`${style.divider} ${style.large}`}></div>
                                    <div className={style.calories_info}>
                                        <div className={style.left_container}>
                                            {/* <h2 className={`${style.bold} ${style.small_text}`}>Amount per serving</h2> */}
                                            <p>Eventos comprados: {eBuy?.length}</p>
                                        </div>
                                    </div>
                                    <div className={`${style.divider} ${style.medium}`}></div>
                                    {eBuy?.map(e => {
                                        return (
                                            <div>
                                                <p>{e.eventName}</p>
                                                <p>Tickets: <span class="bold">{e.quantity}unid.</span></p>
                                                <p className={style.bold}>precio: <span class="bold">{e.quantity * e.price}$</span></p>
                                                <div className={style.divider}></div>
                                            </div>
                                        )
                                    })}
                                    <div className={`${style.divider} ${style.medium}`}></div>
                                    <div className={style.calories_info}>
                                        <div className={style.left_container}>
                                            <p>Total: {total}$</p>
                                        </div>
                                    </div>
                                    <div className={`${style.divider} ${style.medium}`}></div>
                                    <div className="flex justify-center">
                                        <p>tu pago fue aceptado con exito!</p>
                                    </div>
                                </div>
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