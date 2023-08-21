import Chart from "chart.js/auto";
import { useEffect } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";

import useAuth from "../../hooks/useAuth";
import useCategory from "../../hooks/useCategory";
import useCourse from "../../hooks/useCourse";
import useUserStore from "../../zustand/useUserStore";

const DashboardChart = () => {
  const { user } = useUserStore();

  const { getUsers } = useAuth();
  const { getCategories } = useCategory();
  const { getCourses } = useCourse();

  const acquisitionsRef = useRef();

  const { data: users } = useQuery({
    queryKey: "users",
    queryFn: () => getUsers(user),
  });
  const { data: categories } = useQuery("categories", getCategories);
  const { data: courses } = useQuery("courses", getCourses);

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

    return () => {
      canvasId.destroy();
    };
  }, []);

  const cardsData = [
    {
      title: "Total Users",
      description: "Number of registered users",
      numbers: users?.length || 0,
    },
    {
      title: "Total Courses",
      description: "Number of available courses",
      numbers: courses?.length || 0,
    },
    {
      title: "Total Categories",
      description: "Number of course categories",
      numbers: categories?.length || 0,
    },
    {
      title: "Enrolled Users",
      description: "Percentage of users enrolled in courses",
      numbers: `${((10 / users?.length) * 100).toFixed(2)}%`,
    },
    {
      title: "Active Courses",
      description: "Percentage of active courses",
      numbers: `${((10 / courses?.length) * 100).toFixed(2)}%`,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex gap-6 justify-between max-w-screen overflow-x-auto">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="flex flex-col h-44 w-72 bg-white rounded-lg p-6 shadow"
          >
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-gray-700 text-2xl font-extrabold">
              {card.numbers}
            </p>
            <p className="text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>

      <h2 className="text-left text-2xl font-semibold my-4">Dashboard</h2>

      <div className="w-[60%]">
        <canvas ref={acquisitionsRef}></canvas>
      </div>
    </div>
  );
};

export default DashboardChart;
