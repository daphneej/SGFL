import { create } from "zustand";
import { persist } from "zustand/middleware";

const useDashboardStore = create(
  persist(
    (set) => ({
      selectedMenuItem: "Dashboard",
      setSelectedMenuItem: (newMenuItem) =>
        set(() => ({
          selectedMenuItem: newMenuItem,
        })),
    }),
    {
      name: "dashboard-store",
    }
  )
);

export default useDashboardStore;
