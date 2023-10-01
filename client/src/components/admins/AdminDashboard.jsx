import { useState } from "react";
import { useQuery } from "react-query";
import { RiMenuUnfoldLine } from "react-icons/ri";

import useUser from "@/hooks/users/useUser";
import useCategory from "@/hooks/useCategory";
import useCourse from "@/hooks/useCourse";
import usePayment from "@/hooks/usePayment";

import useUserStore from "@/zustand/useUserStore";
import useDashboardStore from "@/zustand/useDashboardStore";

import AsideDashboard from "@/components/admins/aside/AsideDashboard";

import DashboardChart from "@/components/admins/charts/DashboardChart";

import UserTable from "@/components/admins/tables/UserTable";
import CategoryTable from "@/components/admins/tables/CategoryTable";
import CourseTable from "@/components/admins/tables/CourseTable";
import TrainerTable from "@/components/admins/tables/TrainerTable";
import StudentTable from "@/components/admins/tables/StudentTable";
import PaymentTable from "@/components/admins/tables/PaymentTable";

const AdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUserStore();
  const { selectedMenuItem, setSelectedMenuItem } = useDashboardStore();

  const { getUsers } = useUser();
  const { getCategoriesWithCourses } = useCategory();
  const { getCourses } = useCourse();
  const { getPayments } = usePayment();

  const { isLoading: isLoadingUsers, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(user?.token),
    enabled: Boolean(user?.token),
  });

  const { isLoading: isLoadingCategories, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesWithCourses({ token: user?.token }),
    enabled: Boolean(user?.token),
  });

  const { isLoading: isLoadingCourses, data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(user?.token),
    enabled: Boolean(user?.token),
  });

  const { isLoading: isLoadingPayments, data: payments } = useQuery({
    queryKey: ["payments"],
    queryFn: () => getPayments(user?.token),
    enabled: Boolean(user?.token),
  });

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-base-100 md:flex-row">
      {/* Sidebar */}
      <AsideDashboard
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Main content */}
      <main
        className="flex flex-col flex-1 h-screen overflow-auto"
        onClick={() => {
          if (menuOpen) {
            setMenuOpen(false);
          }
        }}
      >
        <div
          className={`sticky top-0 flex justify-end md:justify-start p-4 backdrop-blur ${
            menuOpen && "hidden"
          }`}
        >
          <RiMenuUnfoldLine
            className="cursor-pointer"
            size={30}
            onClick={() => setMenuOpen(true)}
          />
        </div>

        <div className="p-4 md:p-6">
          {selectedMenuItem === "Dashboard" && (
            <DashboardChart
              users={users}
              categories={categories}
              courses={courses}
              payments={payments}
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

          {selectedMenuItem === "Trainers" && (
            <TrainerTable
              users={users?.filter((user) => user?.role === "TRAINER")}
              isLoadingUsers={isLoadingUsers}
            />
          )}

          {selectedMenuItem === "Students" && (
            <StudentTable
              users={users?.filter((user) => user?.role === "STUDENT")}
              isLoadingUsers={isLoadingUsers}
            />
          )}

          {selectedMenuItem === "Payments" && (
            <PaymentTable
              payments={payments}
              isLoadingPayments={isLoadingPayments}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
