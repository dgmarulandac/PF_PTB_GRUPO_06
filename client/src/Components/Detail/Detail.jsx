import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCar, addToCar, getDetail, modal } from "../../Redux/Action/action";
import Modal from "../Modal/Modal";
import style from "./Detail.module.css";
import * as styles from "./DetStiles";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FiArrowLeft } from 'react-icons/fi';
import React from "react";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { id: idUser } = useSelector((state) => state.userSesion);

  const ticketid = useSelector((state) => state.detail);
  const { modalOn } = useSelector((state) => state);

  const [review, setReview] = useState({
    score: 0,
    comment: "",
    idEvent: id,
  });

  const [reviews, setReviews] = useState([]);

  const handleClick = () => {
    dispatch(addToCar({idEvent: id, quantity: 1}))
    dispatch(modal(true))
  }

  useEffect(() => {
    return (() => dispatch(getDetail()))
  }, [])

  useEffect(() => {
    const getreviews = async () => {
      const { data } = await axios.get(`/reviews/${id}`);
      setReviews(data);
    };
    getreviews()
      .then(() => dispatch(getDetail(id)))
      .catch((error) => console.log(error));

    return () => dispatch(getDetail());
  }, []);

  const changereview = (event) => {
    setReview({ ...review, [event.target.name]: event.target.value });
  };

  const handledsummit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/reviews/createReview", review, {
        headers: { "X-Access-Token": localStorage.getItem("jwt") },
      });
      setReview({
        score: 0,
        comment: "",
        idEvent: id,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error.response.data.error}`,
        icon: "error",
      });
    }
  };

  if (ticketid.length === 0) {
    return (
      <div className={styles.container}>
        <svg
          viewBox="0 0 240 240"
          height="240"
          width="240"
          class={style.loader}
        >
          <circle
            stroke-linecap="round"
            stroke-dashoffset="-330"
            stroke-dasharray="0 660"
            stroke-width="20"
            stroke="#000"
            fill="none"
            r="105"
            cy="120"
            cx="120"
            className={`${style.loaderRing} ${style.loaderRingA}`}
          ></circle>
          <circle
            stroke-linecap="round"
            stroke-dashoffset="-110"
            stroke-dasharray="0 220"
            stroke-width="20"
            stroke="#000"
            fill="none"
            r="35"
            cy="120"
            cx="120"
            className={`${style.loaderRing} ${style.loaderRingB}`}
          ></circle>
          <circle
            stroke-linecap="round"
            stroke-dasharray="0 440"
            stroke-width="20"
            stroke="#000"
            fill="none"
            r="70"
            cy="120"
            cx="85"
            className={`${style.loaderRing} ${style.loaderRingC}`}
          ></circle>
          <circle
            stroke-linecap="round"
            stroke-dasharray="0 440"
            stroke-width="20"
            stroke="#000"
            fill="none"
            r="70"
            cy="120"
            cx="155"
            className={`${style.loaderRing} ${style.loaderRingD}`}
          ></circle>
        </svg>
      </div>
    );
  } else
    return (
      <>
        <div className={styles.container}>
          {ticketid.error ? (
            <h1 className={styles.h1}>{ticketid?.error}</h1>
          ) : (
            <div>
              
              <h1 className={styles.boho}>BOHO</h1>
              <br />
              <p className={styles.comen}>compra tu boleta aqui</p>

              <Link to="/">
                <button className={styles.buttonback}>
                  <svg
                    width="32"
                    height="32"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="1 2 32 32"
                  >
                    <path
                      d="M26 18A10 10 0 1 1 16 8h6.182l-3.584 3.585L20 13l6-6l-6-6l-1.402 1.414L22.185 6H16a12 12 0 1 0 12 12z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>{" "}
              </Link>
              <br />
              <div className={styles.cardcon}>
                <div key="0">
                  <h2 className={styles.name}>{ticketid.name}</h2>
                  <div className="display: flex justify-center ">
                    <div className={styles.centerimg}>
                      <img src={ticketid.image} alt="" className={styles.img} />
                    </div>
                    <div className={styles.info}>
                      <p> 🌎 Pais: {ticketid.country}</p>
                      <p> 📅 Fecha: {ticketid.date}</p>
                      <p> ⌚ Hora: {ticketid.hour}</p>
                      <p> 🤩 Descripción: {ticketid.description}</p>
                      <p> ✨ Tipo de evento: {ticketid.eventType}</p>
                      <p> 🎟️ Cantidad de boletos: {ticketid.cantTickets}</p>
                      <p>
                        {" "}
                        💵 Precio: ${ticketid.ticketPrice} {ticketid.currency}
                      </p>
                    </div>
                  </div>

                  <div>
                    <button onClick={handleClick} className={styles.button}>
                      <span class="relative z-10">Comprar ticket</span>
                    </button>
                  </div>
                </div>
                {modalOn && (
                  <div key="1">
                    <Modal />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={styles.container}>
          <div >
  {reviews.map((review) => (
    <div key={review.id} className="box conten h-32 max-h-max px-4 pb-2 m-3 border bg-gray-100 dark:bg-gray-900 rounded-lg dark:border-blue-800 "  >
      <p className="text-white font-bold text-justify">{review.User.name}</p>
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} >{index + 1 <= review.score ? "⭐" : ""}</span>
        ))}
      </div>
      <div className="box conten h-16 max-h-max p-2 rounded-lg dark:text-gray-300 border border-gay-200 dark:border-gray-400 dark:bg-gray-700 text-justify"><p >{review.comment}</p></div>
      
    </div>
  ))}
  </div>
</div>
        {idUser && (
          <div className={styles.container}>
          <form  onSubmit={handledsummit} className="box conten h-62 w-5/12 px-4 pb-2 border bg-gray-100 dark:bg-gray-900 rounded-lg dark:border-blue-800 " >
            <br />
            <label className="text-white font-bold"> Puntuacion</label>
    <div className={style.rating}>
      {[5, 4, 3, 2, 1].map((value, index) => (
        <React.Fragment key={index}>
          <input
            type="radio"
            id={`star-${value}`}
            name="score"
            value={value}
            onChange={changereview}
          />
          <label htmlFor={`star-${value}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
            </svg>
          </label>
        </React.Fragment>
      ))}
    </div>
              <br />
              <textarea
                name="comment"
                value={review.comment}
                id=""
                cols="40"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={changereview}
                placeholder="comenta tu experiencia"
              ></textarea>
              <br />
              <button type="submit" className={styles.button}><span className="relative z-index-1">comentar</span></button>
  
          </form>
          </div>
        )}
      </>
    );
};

export default Detail;
