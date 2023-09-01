import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addCar, addToCar, getDetail, modal } from "../../Redux/Action/action";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import * as styles from "./DetStiles"
import { FiArrowLeft } from 'react-icons/fi';
import style from "./Detail.module.css"

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const ticketid = useSelector((state) => state.detail)
  const { modalOn } = useSelector(state => state)

  const handleClick = () => {
    dispatch(addToCar({idEvent: id, quantity: 1}))
    dispatch(modal(true))
  }

  useEffect(() => {
    return (() => dispatch(getDetail()))
  }, [])

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  if (ticketid.length === 0) {
    return (
      <div className={styles.container}>
        <svg viewBox="0 0 240 240" height="240" width="240" class={style.loader}>
          <circle stroke-linecap="round" stroke-dashoffset="-330" stroke-dasharray="0 660" stroke-width="20" stroke="#000" fill="none" r="105" cy="120" cx="120" className={`${style.loaderRing} ${style.loaderRingA}`}></circle>
          <circle stroke-linecap="round" stroke-dashoffset="-110" stroke-dasharray="0 220" stroke-width="20" stroke="#000" fill="none" r="35" cy="120" cx="120" className={`${style.loaderRing} ${style.loaderRingB}`}></circle>
          <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="85" className={`${style.loaderRing} ${style.loaderRingC}`}></circle>
          <circle stroke-linecap="round" stroke-dasharray="0 440" stroke-width="20" stroke="#000" fill="none" r="70" cy="120" cx="155" className={`${style.loaderRing} ${style.loaderRingD}`}></circle>
        </svg>
      </div>
    );
  }
  else
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-700 p-4 rounded-lg shadow-md dark:bg-fondoDark">
        {ticketid.error ? (
          <h1 className={styles.h1}>{ticketid?.error}</h1>
        ) : (
          <div>
            <Link className="absolute m-5 mt-0 left-0" to="/">
              <button className={styles.button}><FiArrowLeft /></button>
            </Link>
            <div>
              <h1 className="font-bungee text-5xl bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-green-500 m-5">BOHO</h1>
              <p className="font-bold text-gray-600 dark:text-gray-300 mb-4">compra tu boleta aqui</p>
            </div>
            <div className="bg-white dark:bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg shadow-blue-800/50">
              <div key="0">
                <h2 className={styles.name}>{ticketid.name}</h2>
                <div className="display: flex justify-center ">
                  <div className={styles.centerimg}>
                    <img
                      src={ticketid.image}
                      alt=""
                      className={styles.img}
                    />
                  </div>
                  <div className={styles.info}>
                    <p> 🌎 Pais: {ticketid.country}</p>
                    <p> 📅 Fecha: {ticketid.date}</p>
                    <p> ⌚ Hora: {ticketid.hour}</p>
                    <p> 🤩 Descripción: {ticketid.description}</p>
                    <p> ✨ Tipo de evento: {ticketid.eventType}</p>
                    <p> 🎟️ Cantidad de boletos: {ticketid.cantTickets}</p>
                    <p> 💵 Precio: ${ticketid.ticketPrice} {ticketid.currency}</p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleClick}
                    className={styles.button}
                  ><span class="relative">Agregar al carrito</span>
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
    );
}

export default Detail