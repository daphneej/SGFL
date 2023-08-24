import Chart from "chart.js/auto";
import { useEffect } from "react";
import { useRef } from "react";
import { FiBook, FiLayers, FiUsers } from "react-icons/fi";

const DashboardChart = ({ users, categories, courses }) => {
  const acquisitionsRef = useRef();
  const acquisitionsRef2 = useRef();

  useEffect(() => {
    const canvasId = new Chart(acquisitionsRef.current, {
      type: "bar",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Users by day",
            data: Array.from([25, 35, 38, 56, 12, 64]).map(
              (value) => value * 12
            ),
          },
        ],
      },
    });

    const canvasId2 = new Chart(acquisitionsRef2.current, {
      type: "line",
      data: {
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Users by day",
            data: Array.from([25, 35, 38, 56, 12, 64]).map(
              (value) => value * 12
            ),
          },
        ],
      },
    });

    return () => {
      canvasId.destroy();
      canvasId2.destroy();
    };
  }, []);

  const cardsData = [
    {
      title: "Total Users",
      description: "Number of registered users",
      numbers: users?.length || 0,
      icon: <FiUsers className="mr-2" size={25} />,
    },
    {
      title: "Total Courses",
      description: "Number of available courses",
      numbers: courses?.length || 0,
      icon: <FiBook className="mr-2" size={25} />,
    },
    {
      title: "Total Categories",
      description: "Number of course categories",
      numbers: categories?.length || 0,
      icon: <FiLayers className="mr-2" size={25} />,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="p-4 shadow-sm shadow-primary stats">
        {cardsData.map((card, index) => (
          <div key={index} className="stat">
            <div className="stat-figure text-primary">{card.icon}</div>
            <div className="stat-title">{card.title}</div>
            <div className="stat-value text-primary">{card.numbers}</div>
            <div className="stat-desc">{card.description}</div>
          </div>
        ))}
      </div>

      <h2 className="my-4 text-2xl font-semibold text-left">Dashboard</h2>

      <div className="grid w-full grid-cols-1 gap-2 py-4 h-fit md:h-screen md:grid-cols-2">
        <div className="w-full h-fit">
          <canvas ref={acquisitionsRef}></canvas>
        </div>
        <div className="w-full h-fit">
          <canvas ref={acquisitionsRef2}></canvas>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
