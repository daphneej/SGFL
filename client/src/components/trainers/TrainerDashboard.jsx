import { useState } from "react";
import { RiMenuUnfoldLine } from "react-icons/ri";

import useTrainerDashboardStore from "@/zustand/useTrainerDashboardStore";

import CourseAddForm from "@/components/trainers/CourseAddForm";
import CreatedCourses from "@/components/trainers/CreatedCourses";
import TrainerAsideDashboard from "@/components/trainers/TrainerAsideDashboard";

const TrainerDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const { selectedMenuItem, setSelectedMenuItem } = useTrainerDashboardStore();

  return (
    <div className="flex flex-col w-screen md:h-screen md:overflow-hidden bg-base-100 md:flex-row">
      <TrainerAsideDashboard
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

        <div className="flex justify-center w-full px-4 py-8 md:px-8">
          {/* <div className="w-full mx-auto mt-10 md:w-1/2">
            {selectedMenuItem === "Dashboard" && <></>}
          </div> */}

          {selectedMenuItem === "AddCourse" && (
            <div className="flex items-center w-full mx-auto mt-24 md:w-5/6">
              <CourseAddForm setMenuOpen={setMenuOpen} />{" "}
            </div>
          )}
          {selectedMenuItem === "Courses" && (
            <div className="flex w-full mx-auto mt-10">
              <CreatedCourses />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TrainerDashboard;
