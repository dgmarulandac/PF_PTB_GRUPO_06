import React from "react";
import { Link } from "react-router-dom";
import * as styles from "./styles"

export default function Card({ event }) {
    let { name, date, hour, adress, image, id, eventType, country } = event
    const monthsInLetters = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
    date = `${monthsInLetters[new Date(date).getMonth()]} ${new Date(date).getDate()+1} ${new Date(date).getFullYear()}`
    return (
        <div className={styles.container}>
            {id &&
                <Link to={`/event/${id}`} >
                    <div>
                        <img className={styles.image} src={image} alt="imagen event"/>
                    </div>
                    <div className={styles.div}>
                        <h5 className={styles.name}>{name}</h5>
                        <p className={styles.p}>{adress} - {country} <span className={styles.span}> /{eventType}</span></p>
                        
                        <p className={styles.p}>{date} - {hour}</p>
                    </div>
                </Link>
            }

        </div>
    )
}