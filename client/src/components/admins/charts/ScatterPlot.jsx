import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";

const ScatterPlot = ({ courses }) => {

  const [data, setData] = useState({
          datasets: [{
              label: 'Cours',
              data: [],
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 6,
            }],
      });

  useEffect(() => {
    if (courses?.length > 0) {
      const courseData = courses?.map(course => ({
        x: course?.price,
        y: course?.students.length,
      }));

      setData({
          datasets: [{
              label: 'Cours',
              data: courseData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              pointRadius: 6,
            }],
      })
    }
  }, [courses]);

  return <Scatter data={data} options={{
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Prix du cours',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Nombre d\'étudiants inscrits',
              },
            },
          },
        }} />;
};

export default ScatterPlot;