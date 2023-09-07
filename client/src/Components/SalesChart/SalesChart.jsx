import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryAxis, VictoryBar, VictoryTooltip } from "victory";
import styles from "./SalesChart.module.css";

const SalesChart = ({ sales }) => {
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    // Verificar si hay datos de ventas
    if (sales.length > 0) {
      const total = sales.reduce((total, data) => total + data.sales, 0);
      setTotalSales(total);
      setIsLoading(false); // Marca la carga como completa cuando hay datos
    }
  }, [sales]);

  if (isLoading) {
    // Muestra la pantalla de carga mientras isLoading es true
    return <div className="flex justify-center items-center">
            
        <svg
          viewBox="0 0 240 240"
          height="240"
          width="240"
          class={styles.loader}
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
            className={`${styles.loaderRing} ${styles.loaderRingA}`}
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
            className={`${styles.loaderRing} ${styles.loaderRingB}`}
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
            className={`${styles.loaderRing} ${styles.loaderRingC}`}
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
            className={`${styles.loaderRing} ${styles.loaderRingD}`}
          ></circle>
        </svg>
      
    </div>;
  }

  return (
    <div className={styles.salesChartContainer}>
      <h2 className={styles.salesChartTitle}>Gráfico de Ventas</h2>
      <div className={styles.salesChart}>
        <VictoryChart domainPadding={20}>
          <VictoryAxis
            tickValues={sales.map((data) => data.month)}
            tickFormat={(tick) => tick}
          />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={sales}
            x="month"
            y="sales"
            labels={({ datum }) =>
              `${datum.sales} ventas (${((datum.sales / totalSales) * 100).toFixed(2)}%)`
            }
            labelComponent={<VictoryTooltip />}
            style={{
              data: { fill: "#8884d8" },
            }}
          />
        </VictoryChart>
      </div>

      <div className={styles.salesInfo}>
        <h3>Detalles: </h3>
        {sales.map((data) => (
          <div key={data.month} className={styles.salesData}>
            <span className={styles.month}>{data.month} - </span>
            <span className={styles.salesValue}>{data.sales} - </span>
            <span className={styles.percentage}>{((data.sales / totalSales) * 100).toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesChart;

