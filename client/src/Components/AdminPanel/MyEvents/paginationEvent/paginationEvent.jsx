import React, { useEffect, useState } from "react";
import CardEvent from "../CardEvent/CardEvent";
import style from './paginationPage.module.css'
import { useSelector } from "react-redux";
import * as styles from "./pagStiles"

export function Pagination(props) {
    
    const {eventsAdmin} = useSelector(state => state)
    const { elementosPorPagina, event } = props;
    const [paginaActual, setPaginaActual] = useState(1);
    const paginasTotales = Math.ceil(event.length / elementosPorPagina)

    const ultimoElemento = paginaActual * elementosPorPagina;
    const primerElemento = ultimoElemento - elementosPorPagina;
    const elementosActuales = event.slice(primerElemento, ultimoElemento);

    const handlePage = (num) => {
        if(num > 0 && num <= paginasTotales) setPaginaActual(num)
        
    }

    const numerosDePagina = ()=>{
        let paginas = []
        for(let i = paginaActual; i <= Math.min(paginaActual + 4, paginasTotales); i++){
            paginas.push(
                <button className={`${styles.button} ${i === paginaActual ? styles.colorbutton : styles.hovbutton}`} key={i} onClick={()=> handlePage(i)}>{i}</button>
            )
        }
        return paginas
    }

    // useEffect(()=>{
    //     handlePage(1)
    // }, [eventsAdmin])

    return (
        <div>
            <div>
                {elementosActuales.map((e, i) => (
                    <CardEvent key={i} e={e} />
                ))}
            </div>

            <div className={styles.container}>
                <button className={styles.backbuton} onClick={()=> handlePage(paginaActual - 1)}>{'<'}</button>
                    {numerosDePagina()}
                <button className={styles.nexbutton} onClick={()=> handlePage(paginaActual + 1)}>{'>'}</button>
            </div>
        </div>
    )
}
 {/* {Array.from({ length: paginasTotales }, (_, indice) => (
                    <button key={indice} onClick={() => handlePage(indice + 1)}>
                        {indice + 1}
                    </button>
                ))} */}