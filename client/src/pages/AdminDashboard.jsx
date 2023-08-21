import { useQuery } from "react-query";

import useAuth from "../hooks/useAuth";
import useCategory from "../hooks/useCategory";
import useCourse from "../hooks/useCourse";

import useUserStore from "../zustand/useUserStore";
import useDashboardStore from "../zustand/useDashboardStore";

import DashboardChart from "../components/charts/DashboardChart";
import UserTable from "../components/tables/UserTable";
import CategoryTable from "../components/tables/CategoryTable";
import CourseTable from "../components/tables/CourseTable";
import AsideDashboard from "../components/admin/AsideDashboard";

const AdminDashboard = () => {
  const { user } = useUserStore();
  const { selectedMenuItem, setSelectedMenuItem } = useDashboardStore();

  const { getUsers } = useAuth();
  const { getCategories } = useCategory();
  const { getCourses } = useCourse();

  const { data: users } = useQuery({
    queryKey: "users",
    queryFn: () => getUsers(user),
  });

  const { data: categories } = useQuery("categories", getCategories);
  const { data: courses } = useQuery("courses", getCourses);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AsideDashboard
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
      />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {selectedMenuItem === "Dashboard" && <DashboardChart />}
        {selectedMenuItem === "Users" && <UserTable users={users} />}
        {selectedMenuItem === "Categories" && (
          <CategoryTable categories={categories} />
        )}
        {selectedMenuItem === "Courses" && <CourseTable courses={courses} />}
      </main>
    </div>
  );
};

export default AdminDashboard;
