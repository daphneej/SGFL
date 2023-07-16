import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const useCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { dispatch } = useAppContext();

  const getCourses = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/courses`, {
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
        dispatch({ type: "SET_COURSES", payload: data });
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, getCourses };
};

export default useCourse;
