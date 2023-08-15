import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/Action/action";
import styles from "./Detail.module.css"

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ticketid = useSelector ((state)=> state.Detail)
  //const ticketid = mockDetail;

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);
  
  return (
    <div  className={styles.background}>
      {ticketid.error ? (
        <h1>{ticketid?.error}</h1>
      ) : (
        <div >
            <div className={styles.boho}><h1>BOHO</h1></div>
        <div className={styles.Detail}>
        <div className={styles.title}><h1>{ticketid.name}</h1></div> 
          <img src={ticketid.image} alt="" />

          <div className={styles.information}>
            <h3>{ticketid.country}</h3>
          <h3>{ticketid.date}</h3>
          <h3>{ticketid.description}</h3>
          <h3>{ticketid.eventType}</h3>
          <h3>{ticketid.cantTickets}</h3>
          </div>
          <div className={styles.buttons}>
          <button>Buy ticket</button>
          </div>
        </div>
        
        </div>
      )}
    </div>
  );
};

export default Detail;
