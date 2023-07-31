import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      coursesInCart: [],
      user: null,
      setUser: (user) =>
        set(() => ({
          user,
        })),
      addCourseInCart: (course) =>
        set((state) => ({
          coursesInCart: [...state.coursesInCart, course],
        })),
      removeCourseInCart: (courseId) =>
        set((state) => ({
          coursesInCart: state.coursesInCart.filter(
            (course) => course.id !== courseId
          ),
        })),
    }),
    {
      name: "user-store",
    }
  )
);

export default useUserStore;
