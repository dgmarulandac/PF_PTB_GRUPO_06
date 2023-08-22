import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, modal } from "../../Redux/Action/action";
import Modal from "../Modal/Modal";
import * as styles from "./DetStiles"

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

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
    <div className="flex justify-center items-center min-h-screen bg-gray-700 p-4 rounded-lg shadow-md">
      {ticketid.error ? (
        <h1 className=" text-gray-600 dark:text-gray-300 mb-4">{ticketid?.error}</h1>
      ) : (
        <div>
          <h1 className="font-bungee text-5xl bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-green-500">BOHO</h1>
          <br />
          <p className="font-bold text-gray-600 dark:text-gray-300 mb-4"> compra tu voleta aqui</p>
          <br />
          <div className="bg-white dark:bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg shadow-blue-800/50">
            <div key="0">
              <h2 className="text-5xl bg-gradient-to-r text-transparent bg-clip-text from-blue-500 to-green-500 font-bold mb-4">{ticketid.name}</h2>
              <div className="flex justify-center items-center">
                <img
                  src={ticketid.image}
                  alt=""
                  className="img-small rounded-lg object-cover mb-4"
                />
              </div>
              <div className=" font-bold border border-sky-100 text-gray-600 dark:text-gray-300 mb-4 bg-white dark:bg-gray-700 rounded-lg">
                <p> Pais: {ticketid.country}</p>
                <p> Fecha: {ticketid.date}</p>
                <p> Hora: {ticketid.hour}</p>
                <p> Descripción: {ticketid.description}</p>
                <p> Tipo de evento: {ticketid.eventType}</p>
                <p> Cantidad de voletos: {ticketid.cantTickets}</p>
                <p> Precio: ${ticketid.ticketPrice}</p>
              </div>
              <div>
                <button
                  onClick={handleClick}
                  className="text-white bg-blue-600 px-4 py-2 rounded relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-gradient-to-r from-blue-500 to-green-500 before:transition-all before:duration-500 hover:text-white hover:shadow-green-500 hover:before:left-0 hover:before:w-full"
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
<<<<<<< HEAD
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
              <button data-modal-target="staticModal" data-modal-toggle="staticModal" onClick={handleClick}>Comprar tickete</button>
            </div>
          </div>
          {modalOn && <div key='1'><Modal /></div>}
=======
>>>>>>> dev
        </div>
      )}
    </div>
  );
}

export default Detail;
