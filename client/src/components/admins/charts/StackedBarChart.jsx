import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const StackedBarChart = ({ users }) => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (users) {
      const userStats = users?.reduce((stats, user) => {
        const { role, status } = user;

        if (!stats[role]) {
          stats[role] = {};
        }

        if (!stats[role][status]) {
          stats[role][status] = 1;
        } else {
          stats[role][status]++;
        }

        return stats;
      }, {});

      const roles = Object.keys(userStats);
      const statusLabels = [
        { key: "ACTIVE", value: "ACTIF" },
        { key: "INACTIVE", value: "INACTIF" },
      ];

      const datasets = roles.map((role) => ({
        label:
          role === "ADMIN"
            ? "Administrateur"
            : role === "TRAINER"
            ? "Formateur"
            : role === "STUDENT"
            ? "Etudiant"
            : "Utilisateur",
        data: statusLabels.map((status) => userStats[role][status.key] || 0),
        backgroundColor: statusLabels.map((status) =>
          status.key === "ACTIVE"
            ? "rgba(75, 192, 192, 0.6)"
            : "rgba(255, 99, 132, 0.6)"
        ),
        borderColor: statusLabels.map((status) =>
          status.key === "ACTIVE"
            ? "rgba(75, 192, 192, 1)"
            : "rgba(255, 99, 132, 1)"
        ),
        borderWidth: 1,
      }));

      setData({
        labels: statusLabels.map((status) => status.value),
        datasets: datasets,
      });
    }
  }, [users]);

  return (
    <div>
      {data && (
        <Bar
          data={data}
          options={{
            scales: {
              x: {
                stacked: true,
                title: {
                  display: true,
                  text: "État des utilisateurs",
                },
              },
              y: {
                stacked: true,
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Nombre d'utilisateurs",
                },
              },
            },
            plugins: {
              legend: {
                display: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default StackedBarChart;
