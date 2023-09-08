import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./misCompras.module.css"; // Importa el archivo de módulo CSS

const MisCompras = () => {
  const myPurchases = useSelector((state) => state.myPurchases);

  const purchases = myPurchases.filter((sale) => sale.isCompra);

  const salesByMonth = purchases.reduce((acc, sale) => {
    const month = new Date(sale.date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(sale);
    return acc;
  }, {});

  // Verificar si no hay compras realizadas
  const noPurchasesMessage =
    Object.keys(salesByMonth).length === 0 ? (
      <div className={styles.noPurchasesMessage}>
        No tienes compras realizadas hasta el momento.
        No seas rata, compra pobre..
      </div>
    ) : null;

  return (
    <div>
      <h1 className={styles.heading}>Mis Compras</h1>
      {noPurchasesMessage}
      {Object.entries(salesByMonth).map(([month, sales]) => (
        <div key={month} className={styles.monthContainer}>
          <h2>{month}</h2>
          <table className={styles.salesTable}>
            <thead>
              <tr>
                <th>Número de Compra</th>
                <th>Evento</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>Compra #{sale.purchaseNumber}</td>
                  <td>{sale.eventName}</td>
                  <td>${sale.price}</td>
                  <td>{sale.quantity}</td>
                  <td>${sale.price * sale.quantity}</td>
                  <td>
                    <img
                      src={sale.image}
                      alt={sale.eventName}
                      className={styles.eventImage}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <Link to="/">
        {" "}
        <button className={styles.backButton}>Back</button>
      </Link>
    </div>
  );
};

export default MisCompras;
