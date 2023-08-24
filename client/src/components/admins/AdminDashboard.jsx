import { useQuery } from "react-query";

import useUser from "@/hooks/users/useUser";
import useCategory from "@/hooks/useCategory";
import useCourse from "@/hooks/useCourse";

import useUserStore from "@/zustand/useUserStore";
import useDashboardStore from "@/zustand/useDashboardStore";

import DashboardChart from "@/components/admins/charts/DashboardChart";
import UserTable from "@/components/admins/tables/UserTable";
import CategoryTable from "@/components/admins/tables/CategoryTable";
import CourseTable from "@/components/admins/tables/CourseTable";
import AsideDashboard from "@/components/admins/AsideDashboard";

const AdminDashboard = () => {
  const { user } = useUserStore();
  const { selectedMenuItem, setSelectedMenuItem } = useDashboardStore();

  const { getUsers } = useUser();
  const { getCategories } = useCategory();
  const { getCourses } = useCourse();

  const { isLoading: isLoadingUsers, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(user.token),
    enabled: Boolean(user),
  });

  const { isLoading: isLoadingCategories, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(user.token),
    enabled: Boolean(user),
  });

  const { isLoading: isLoadingCourses, data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(user.token),
    enabled: Boolean(user),
  });

  return (
    <div className="flex flex-col h-full md:flex-row bg-base-100">
      {/* Sidebar */}
      <AsideDashboard
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
      />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        {selectedMenuItem === "Dashboard" && (
          <DashboardChart
            users={users}
            categories={categories}
            courses={courses}
          />
        )}
        {selectedMenuItem === "Users" && (
          <UserTable users={users} isLoadingUsers={isLoadingUsers} />
        )}
        {selectedMenuItem === "Categories" && (
          <CategoryTable
            categories={categories}
            isLoadingCategories={isLoadingCategories}
          />
        )}
        {selectedMenuItem === "Courses" && (
          <CourseTable courses={courses} isLoadingCourses={isLoadingCourses} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
