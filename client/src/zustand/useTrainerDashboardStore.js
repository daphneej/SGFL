import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTrainerDashboardStore = create(
  persist(
    (set) => ({
      // selectedMenuItem: "Dashboard",
      selectedMenuItem: "AddCourse",
      setSelectedMenuItem: (newMenuItem) =>
        set(() => ({
          selectedMenuItem: newMenuItem,
        })),
    }),
    {
      name: "trainer-dashboard-store",
    }
  )
);

export default useTrainerDashboardStore;
