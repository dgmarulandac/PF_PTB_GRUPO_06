import React from "react";
import { Link } from "react-router-dom";
import style from './card.module.css'

export default function Card({ event }) {
    let { name, date, hour, adress, image, id, eventType, country } = event
    const monthsInLetters = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
    date = `${monthsInLetters[new Date(date).getMonth()]} ${new Date(date).getDate()+1}`
    return (
        <div>
            {id &&
                <Link to={`/event/${id}`} className={style.container}>
                    <div>
                        <img className={style.image} src={image} alt="imagen event"/>
                    </div>
                    <div className={style.info}>
                        <p className={style.location}>{adress} - {country} <span> /{eventType}</span></p>
                        <h2>{name}</h2>
                        <p>{date} - {hour}</p>
                    </div>
                    <button>
                        comprar
                    </button>
                </Link>
            }

        </div>
    )
}