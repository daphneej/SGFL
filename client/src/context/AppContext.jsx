import { useContext } from "react";
import { createContext, useReducer } from "react";

const INITIAL_VALUE = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  courses: [],
};

const appReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_USER":
      return { ...state, user: payload };
    case "SET_COURSES":
      return { ...state, courses: payload };
    default:
      return state;
  }
};

const AppContext = createContext(INITIAL_VALUE);

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_VALUE);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
