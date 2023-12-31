import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStudentDashboardStore = create(
  persist(
    (set) => ({
      selectedMenuItem: "Courses",
      setSelectedMenuItem: (newMenuItem) =>
        set(() => ({
          selectedMenuItem: newMenuItem,
        })),
    }),
    {
      name: "student-dashboard-store",
    }
  )
);

export default useStudentDashboardStore;
