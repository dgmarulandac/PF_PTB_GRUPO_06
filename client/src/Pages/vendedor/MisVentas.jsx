import React from "react";
import SalesChart from "../../Components/SalesChart/SalesChart";
import styles from "./misventas.module.css"; // Asegúrate de poner el nombre correcto del archivo CSS

const MisVentas = () => {
    const sales = [
        { month: 'Enero', sales: 1500 },
        { month: 'Febrero', sales: 1800 },
        { month: 'Marzo', sales: 2100 },
        { month: 'Abril', sales: 3100 },
        // ... Agrega más meses y ventas aquí
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.text}>Panel de control del vendedor</h2>
            <div className={styles.eventsList}>
                {/* Contenido de la lista de eventos */}
            </div>
            <div className={styles.graphContainer}>
                <SalesChart sales={sales} className={styles.salesChart} />
            </div>
        </div>
    )
}

export default MisVentas;

