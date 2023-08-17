import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/Action/action";
import styles from "./Detail.module.css"

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ticketid = useSelector ((state)=> state.detail)

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
          <div className={styles.Detail}>
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
              <button>Buy ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
      }  

export default Detail;
