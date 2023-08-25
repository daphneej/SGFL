import { useState } from "react";
import { useQuery } from "react-query";
import { RiMenuUnfoldLine } from "react-icons/ri";

import useUser from "@/hooks/users/useUser";
import useCategory from "@/hooks/useCategory";
import useCourse from "@/hooks/useCourse";

import useUserStore from "@/zustand/useUserStore";
import useDashboardStore from "@/zustand/useDashboardStore";

import AsideDashboard from "@/components/admins/aside/AsideDashboard";

import DashboardChart from "@/components/admins/charts/DashboardChart";
import UserTable from "@/components/admins/tables/UserTable";
import CategoryTable from "@/components/admins/tables/CategoryTable";
import CourseTable from "@/components/admins/tables/CourseTable";

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="flex flex-col h-screen overflow-hidden bg-base-100 md:flex-row">
      {/* Sidebar */}
      <AsideDashboard
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Main content */}
      <main
        className="flex flex-col flex-1 h-full overflow-auto md:overflow-hidden"
        onClick={() => {
          if (menuOpen) {
            setMenuOpen(false);
          }
        }}
      >
        <div className="absolute mt-4 ml-4 top-1 left-1">
          <RiMenuUnfoldLine
            className="cursor-pointer"
            size={30}
            onClick={() => setMenuOpen(true)}
          />
        </div>

        <div className="p-4 mt-20 md:mt-10 md:p-6">
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
            <CourseTable
              courses={courses}
              isLoadingCourses={isLoadingCourses}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
