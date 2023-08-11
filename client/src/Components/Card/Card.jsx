import React from "react";
import { Link } from "react-router-dom";

export default function Card({ event }) {
    const { name, date, hour, adress, image, ticketPrice, id } = event
    return (
        <div>
            {id &&
                <Link to={`/detail/${id}`}>
                    <div>
                        <img src={image} alt="imagen event" width='150' height='100' />
                    </div>
                    <div>
                        <p>{name}</p>
                        <p>{date} {hour}</p>
                        <p>{ticketPrice}</p>
                        <p>{adress}</p>
                    </div>

                    <button>
                        comprar
                    </button>
                </Link>
            }

        </div>
    )
}