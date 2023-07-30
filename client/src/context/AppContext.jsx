import { useContext } from "react";
import { createContext, useReducer } from "react";
import { appReducer } from "./reducers/appReducer";

const INITIAL_VALUE = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  courses: [],
  selectedCoursesCategory: { id: 0, name: "Tous" },
  categories: [],
  coursesInCart: localStorage.getItem("coursesInCart")
    ? JSON.parse(localStorage.getItem("coursesInCart"))
    : [],
};

const AppContext = createContext(INITIAL_VALUE);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_VALUE);

  console.log("====================================");
  console.log(state);
  console.log("====================================");

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
