import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, modal } from "../../Redux/Action/action";
import Modal from "../Modal/Modal";
import styles from "./Detail.module.css"

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const ticketid = useSelector((state) => state.detail)
  const { modalOn } = useSelector(state => state)

  const handleClick = () => {
    dispatch(modal(true))
    console.log(modalOn)
  }

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  return (
    <div className={styles.background}>
      {ticketid.error ? (
        <h1>{ticketid?.error}</h1>
      ) : (
        <div>
          <div>
            <h1 className={styles.boho}>BOHO</h1>
          </div>
          <div key='0' className={styles.Detail}>
            <div>
              <h2 className={styles.title}>{ticketid.name}</h2>
            </div>
            <img src={ticketid.image} alt="" className={styles.image} />
            <div className={styles.information}>
              <p>{ticketid.country}</p>
              <p>{ticketid.date}</p>
              <p>{ticketid.description}</p>
              <p>{ticketid.eventType}</p>
              <p>{ticketid.cantTickets}</p>
            </div>
            <div className={styles.buttons}>
              <button onClick={handleClick}>Buy ticket</button>
            </div>
          </div>
          {modalOn && <div key='1'><Modal /></div>}
        </div>
      )}
    </div>
  );
}

export default Detail;
