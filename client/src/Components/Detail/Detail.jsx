import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, modal } from "../../Redux/Action/action";
import Modal from "../Modal/Modal";
import style from "./Detail.module.css"
import * as styles from "./DetStiles"
import { Link } from "react-router-dom";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const ticketid = useSelector((state) => state.detail)
  const { modalOn } = useSelector(state => state)

  const handleClick = () => {
    dispatch(modal(true))
    console.log(modalOn)
  }

  useEffect(()=>{
    return(()=>dispatch(getDetail()))
  },[])

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  if (ticketid.length === 0){
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
          <svg  width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="1 2 32 32" ><path d="M26 18A10 10 0 1 1 16 8h6.182l-3.584 3.585L20 13l6-6l-6-6l-1.402 1.414L22.185 6H16a12 12 0 1 0 12 12z" fill="currentColor"></path></svg>
            </button> </Link>       
          <br />
          <div className={styles.cardcon}>
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
                ><span class="relative z-10">Comprar ticket</span>
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