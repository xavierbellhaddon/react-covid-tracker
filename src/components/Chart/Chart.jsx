import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

  const Chart = ({ data: { cases, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3535eb",
            fill: false,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "#d42d17",
            fill: false,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              ticks: {},
            },
          ],
        },
      }}
    />
  ) : null;

  // const barChart = confirmed ? (
    const barChart = cases ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["#3535eb", "#54c428", "#d42d17"],
            data: [cases, recovered, deaths],
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return <div className={styles.container}>
    {country ? barChart : lineChart}
    </div>;
};

export default Chart;
