import { useState } from "react";
import { RiMenuUnfoldLine } from "react-icons/ri";

import StudentAsideDashboard from "@/components/students/StudentAsideDashboard";
import PaidCourses from "@/components/students/PaidCourses";

import useStudentDashboardStore from "@/zustand/useStudentDashboardStore";

const StudentDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const { selectedMenuItem, setSelectedMenuItem } = useStudentDashboardStore();

  return (
    <div className="flex flex-col w-screen md:h-screen md:overflow-hidden bg-base-100 md:flex-row">
      <StudentAsideDashboard
        selectedMenuItem={selectedMenuItem}
        setSelectedMenuItem={setSelectedMenuItem}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="flex flex-col flex-1 md:overflow-y-auto">
        <div
          className={`fixed w-full top-0 flex justify-end md:justify-start py-4 px-6 backdrop-blur ${
            menuOpen && "-left-[100vw]"
          }`}
        >
          <RiMenuUnfoldLine
            className="cursor-pointer"
            size={30}
            onClick={() => setMenuOpen(true)}
          />
        </div>

        <div className="w-full h-screen px-4 py-8 overflow-y-auto md:px-8">
          <div className="w-full mx-auto mt-10 md:w-1/2">
            {selectedMenuItem === "Dashboard" && <></>}
          </div>
          {selectedMenuItem === "Courses" && <PaidCourses />}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
