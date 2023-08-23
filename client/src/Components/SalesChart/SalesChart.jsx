import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';
import styles from './SalesChart.module.css';

const SalesChart = ({ sales }) => {
  const totalSales = sales.reduce((total, data) => total + data.sales, 0);

  return (
    <div className={styles.salesChartContainer}>
      <h2 className={styles.salesChartTitle}>Gráfico de Ventas</h2>
      <div className={styles.salesChart}>
        <VictoryChart domainPadding={20}>
          <VictoryAxis
            tickValues={sales.map(data => data.month)}
            tickFormat={(tick) => tick}
          />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={sales}
            x="month"
            y="sales"
            labels={({ datum }) => `${datum.sales} ventas (${((datum.sales / totalSales) * 100).toFixed(2)}%)`}
            labelComponent={<VictoryTooltip />}
            style={{
              data: { fill: '#8884d8' },
            }}
          />
        </VictoryChart>
        
      </div> 
      
      <div className={styles.salesInfo}>
        <h3>Detalles: </h3>
        {sales.map(data => (
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






