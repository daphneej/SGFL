import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";

const BarChart = ({ categories }) => {

  const [data, setData] = useState({
    labels: categories?.map(category => category?.name),
    datasets: [{
      label: "Nombre de cours par catégorie",
      data: categories?.map(category => category?.courses?.length),
      backgroundColor: ["rgba(75, 192, 192, 1)"]
    }]
  });

  useEffect(() => {
    setData({
      labels: categories?.map(category => category?.name),
      datasets: [{
        label: "Nombre de cours par catégorie",
        data: categories?.map(category => category?.courses?.length),
      }]
    })
  }, [categories]);

  return <Bar data={data} options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Nombre de cours",
              },
            },
            x: {
              title: {
                display: true,
                text: "Catégories de cours",
              },
            },
          },
        }} />;
};

export default BarChart;
