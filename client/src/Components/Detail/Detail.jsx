import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, modal } from "../../Redux/Action/action";
import Modal from "../Modal/Modal";
import style from "./Detail.module.css";
import * as styles from "./DetStiles";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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
    dispatch(modal(true));
    console.log(modalOn);
  };

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
        <div>
          {reviews.map((review) => (
            <div key={review.id}>
              <p>Score: {review.score}</p>
              <p>Comment: {review.comment}</p>
            </div>
          ))}
        </div>
        {idUser && (
          <form className={styles.container} onSubmit={handledsummit}>
            <label htmlFor="">
              <input
                name="score"
                value={review.score}
                type="range"
                min={0}
                max={5}
                onChange={changereview}
              />
              <br />
              <textarea
                name="comment"
                value={review.comment}
                id=""
                cols="40"
                rows="10"
                onChange={changereview}
              ></textarea>
              <br />
              <button type="submit">comentar</button>
            </label>
          </form>
        )}
      </>
    );
};

export default Detail;
