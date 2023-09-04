import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as styles from "./styles";
import style from "./card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { modal, addToCar, getDetail } from "../../Redux/Action/action";
import Modal from "../Modal/Modal";
import axios from "axios";

export default function Card({ event }) {
  let { name, date, hour, adress, image, id, eventType, country } = event;
  const monthsInLetters = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  date = `${monthsInLetters[new Date(date).getMonth()]} ${
    new Date(date).getDate() + 1
  } ${new Date(date).getFullYear()}`;
  const { modalOn } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addToCar({ idEvent: id, quantity: 1 }));
    dispatch(modal(true));
  };

  useEffect(() => {
    const getreviews = async () => {
      const { data } = await axios.get(`/reviews/${id}`);
      const combinedReviews = [ ...data];
      setReviews(combinedReviews);
    };

    getreviews()
      .catch((error) => console.log(error));

  }, [dispatch, event, id]);

  const [reviews, setReviews] = useState([]);

  

  const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);

  // Calcula el promedio
  let averageRating;
  if (totalScore === 0) {
    averageRating = "Evento sin calificar";
  } else {
    averageRating = (totalScore / reviews.length).toFixed(2);
  }

  return (
    <div className={`${styles.container} ${style.cardscale}`}>
      {id && (
        <div>
          <Link to={`/event/${id}`}>
            <div>
              <img className={styles.image} src={image} alt="imagen event" />
            </div>
            <div className={styles.div}>
              <h5 className={styles.name}>{name}</h5>
              <p className={styles.p}>
                {adress} - {country}{" "}
                <span className={styles.span}> /{eventType}</span>
              </p>

              <p className={styles.p}>
                {date} - {hour}
              </p>
              <p className={styles.rating}>{averageRating}:
                  <div>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>
                      {index + 1 <= Math.round(averageRating) ? "⭐" : "💥"}
                    </span>
                  ))}
                </div></p>
            </div>
          </Link>
          <div>
            <button className={styles.button} onClick={handleClick}>
              <span class="relative z-10">🛒</span>
            </button>
          </div>
          <br />
          <br />
        </div>
      )}
    </div>
  );
}