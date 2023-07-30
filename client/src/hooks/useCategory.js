import { useState } from "react";
import { actions } from "../context/actions/appActions";
import { useAppContext } from "../context/AppContext";
import { apiUrl } from "./index.js";

const useCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { dispatch } = useAppContext();
  const { SET_CATEGORIES } = actions;

  const getCategories = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
      }

      if (response.ok) {
        dispatch({ type: SET_CATEGORIES, payload: data });
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, getCategories };
};

export default useCategory;
