import { FiBook, FiUserCheck } from "react-icons/fi";
import { PiUsersFour } from "react-icons/pi";
import BarChart from "@/components/admins/charts/BarChart";
import PieChart from "@/components/admins/charts/PieChart";
import StackedBarChart from "@/components/admins/charts/StackedBarChart";
import ScatterPlot from "@/components/admins/charts/ScatterPlot";

const DashboardChart = ({ users, categories, courses }) => {
  const cardsData = [
    {
      title: "Total Users",
      description: `Pourcentage d'étudiants ${(
        (users?.filter((user) => user.role === "STUDENT")?.length /
          users?.length) *
        100
      ).toFixed(2)} %`,
      numbers: users?.length || 0,
      icon: <PiUsersFour className="mr-2" size={25} />,
    },
    {
      title: "Total Courses",
      description: `Pourcentage de cours publiés ${
        (courses?.filter((course) => course.published === "PUBLISHED")?.length /
          courses?.length) *
        100
      } %`,
      numbers: courses?.length || 0,
      icon: <FiBook className="mr-2" size={25} />,
    },
    {
      title: "Total Formateurs",
      description: `Pourcentage de formateurs actifs ${(
        (users?.filter(
          (user) => user?.role === "TRAINER" && user?.status === "ACTIVE"
        )?.length /
          users?.filter((user) => user?.role === "TRAINER")?.length) *
        100
      ).toFixed(2)} %`,
      numbers: users?.filter((user) => user.role === "TRAINER")?.length || 0,
      icon: <FiUserCheck className="mr-2" size={25} />,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="p-4 shadow-sm shadow-primary stats">
        {cardsData.map((card, index) => (
          <div key={index} className="w-64 mx-auto md:w-full stat">
            <div className="stat-figure text-primary">{card.icon}</div>
            <div className="stat-title">{card.title}</div>
            <div className="stat-value text-primary">{card.numbers}</div>
            <div className="stat-desc">{card.description}</div>
          </div>
        ))}
      </div>

      <h2 className="my-4 text-2xl font-semibold text-left">Dashboard</h2>

      <div className="grid items-start grid-cols-1 gap-8 p-8 rounded-md bg-base-200">
        <div className="w-full md:w-3/4 p-4 mx-auto">
          <BarChart categories={categories} />
        </div>
        <div className="w-full md:w-3/4 p-4 mx-auto">
          <ScatterPlot courses={courses} />
        </div>
        <div className="w-full md:w-3/4 p-4 mx-auto">
          <StackedBarChart users={users} />
        </div>
        <div className="w-full md:w-1/2 p-4 mx-auto">
          <PieChart users={users} />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
