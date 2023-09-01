import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./misCompras.module.css"; // Importa el archivo de módulo CSS

const MisCompras = () => {
    const exampleSales = [
        { id: 1, purchaseNumber: "ABC123", eventName: "Festival de Cine1", price: 15.5, quantity: 2, isCompra: true, date: "2023-06-20", image: "cine.jpg" },
        { id: 2, purchaseNumber: "DEF456", eventName: "Festival de Cine", price: 15.5, quantity: 1, isCompra: true, date: "2023-07-20", image: "cine.jpg" },
        { id: 3, purchaseNumber: "GHI789", eventName: "Concierto de Rock", price: 25.99, quantity: 3, isCompra: true, date: "2023-08-15", image: "concierto.jpg" },
        { id: 4, purchaseNumber: "JKL012", eventName: "Exposición de Arte", price: 10.0, quantity: 10, isCompra: true, date: "2023-08-05", image: "arte.jpg" },
    ];
    
    const mySales = exampleSales.filter((sale) => sale.isCompra);

    const salesByMonth = mySales.reduce((acc, sale) => {
        const month = new Date(sale.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(sale);
        return acc;
    }, {});

    return (
        <div>
            <h1 className={styles.heading}>Mis Compras</h1>
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
                                    <td><img src={sale.image} alt={sale.eventName} className={styles.eventImage} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}

            <Link to='/'> <button className={styles.backButton}>Back</button></Link>
        </div>
    );
};

export default MisCompras;
