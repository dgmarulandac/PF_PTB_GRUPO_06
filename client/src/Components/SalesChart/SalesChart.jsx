import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from 'victory';
import styles from './SalesChart.module.css';

const SalesChart = ({ sales }) => {
  // Calculate monthly total sales and profit by accumulating daily sales and profit
  const monthlyData = sales.map(data => ({
    month: data.month,
    totalSales: data.dailySales.reduce((total, dailyData) => total + dailyData.sales, 0),
    totalProfit: data.dailySales.reduce((total, dailyData) => total + (dailyData.sales * dailyData.price), 0),
  }));

  const totalProfit = monthlyData.reduce((total, data) => total + data.totalProfit, 0);

  return (
    <div className={styles.salesChartContainer}>
      <h2 className={styles.salesChartTitle}>Gráfico de Ventas Mensual</h2>
      <div className={styles.salesChart}>
        <VictoryChart domainPadding={20}>
          <VictoryAxis
            tickValues={monthlyData.map(data => data.month)}
            tickFormat={(tick) => tick}
          />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={monthlyData}
            x="month"
            y="totalProfit" // Use totalProfit for the y-axis
            labels={({ datum }) => `${datum.totalProfit} ganancia\n(${((datum.totalProfit / totalProfit) * 100).toFixed(2)}%)`}
            labelComponent={<VictoryTooltip />}
            style={{
              data: { fill: '#8884d8' },
            }}
          />
        </VictoryChart>
      </div>
      
      <div className={styles.salesInfo}>
        <h3>Detalles: </h3>
        {monthlyData.map(data => (
          <div key={`details-${data.month}`} className={styles.salesData}>
            <span className={styles.month}>Mes: {data.month}</span>
            <span className={styles.salesValue}>Total Ganancia: ${data.totalProfit}</span>
            <span className={styles.percentage}>
              {totalProfit === 0 ? '0.00%' : `${((data.totalProfit / totalProfit) * 100).toFixed(2)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DailySalesChart = ({ dailySales }) => {
  // Calculate total profit by accumulating daily sales and profit
  const totalDailyProfit = dailySales.reduce((total, data) => total + (data.sales * data.price), 0);

  return (
    <div className={styles.salesChartContainer}>
      <h2 className={styles.salesChartTitle}>Gráfico de Ventas Diarias</h2>
      <div className={styles.salesChart}>
        <VictoryChart domainPadding={20}>
          <VictoryAxis
            tickValues={dailySales.map(data => data.day)}
            tickFormat={(tick) => tick}
          />
          <VictoryAxis dependentAxis />
          <VictoryBar
            data={dailySales}
            x="day"
            y="sales"
            labels={({ datum }) => `${datum.sales} ventas\n(${((datum.sales * datum.price) / totalDailyProfit * 100).toFixed(2)}%)`}
            labelComponent={<VictoryTooltip />}
            style={{
              data: { fill: '#8884d8' },
            }}
          />
        </VictoryChart>
      </div>
      
      <div className={styles.salesInfo}>
        <h3>Detalles: </h3>
        {dailySales.map((data, index) => (
          <div key={data.day} className={styles.salesData}>
            {index === 0 || dailySales[index - 1].day !== data.day ? (
              <span className={styles.day}>Día: {data.day}</span>
            ) : null}
            <span className={styles.salesValue}>Vendidas: {data.sales}</span>
            <span className={styles.ganancia}>Ganancia: ${data.sales * data.price}</span>
            <span className={styles.percentage}>
              {((data.sales * data.price / totalDailyProfit) * 100).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { SalesChart, DailySalesChart };













