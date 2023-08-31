import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";

const PieChart = ({ users }) => {

  const [data, setData] = useState({
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      });

  useEffect(() => {
    if (users?.length > 0) {
      const genderCounts = users?.reduce((object, user) => {
        if (user?.gender) {
          object[user?.gender] = (object[user?.gender] || 0) + 1;
        }

        return object;
      }, {});

      const labels = Object.keys(genderCounts);
      const data = Object.values(genderCounts);

      const userData = {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      }

      setData(userData);
  }

  }, [users]);

  return <Pie data={data} options={{
          plugins: {
            title: {
              display: true,
              text: 'Répartition des genres d\'utilisateurs',
            },
          },
        }} />;
};

export default PieChart;

