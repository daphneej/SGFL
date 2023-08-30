import { FiBook, FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import BarChart from "@/components/admins/charts/BarChart";
import PieChart from "@/components/admins/charts/PieChart";
import StackedBarChart from "@/components/admins/charts/StackedBarChart";
import ScatterPlot from "@/components/admins/charts/ScatterPlot";

const DashboardChart = ({ users, categories, courses }) => {
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
      icon: <MdOutlineCategory className="mr-2" size={25} />,
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

      <div className="flex flex-wrap items-center gap-8 py-4 rounded-md bg-base-200">
        <div className="w-full md:w-[40vw] mx-auto">
          <BarChart categories={categories} />
        </div>
        <div className="w-full md:w-[40vw] mx-auto">
          <ScatterPlot courses={courses} />
        </div>
        <div className="w-full md:w-[40vw] mx-auto">
          <StackedBarChart
            userStats={users?.reduce((stats, user) => {
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
            }, {})}
          />
        </div>
        <div className="w-full md:w-[40vw] mx-auto">
          <PieChart users={users} />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
