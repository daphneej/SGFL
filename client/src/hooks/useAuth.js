import { useState } from "react";
import { actions } from "../context/actions/appActions";
import { useAppContext } from "../context/AppContext.jsx";
import { apiUrl } from "./index.js";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { dispatch } = useAppContext();
  const { SET_USER } = actions;

  const registerUser = async (user) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/users/register`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: SET_USER, payload: data.user });
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (user) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: SET_USER, payload: data.user });
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async (user) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/users/logout`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: SET_USER, payload: data.user });
        localStorage.removeItem("user");
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (user) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/users/update`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message);
      }

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: SET_USER, payload: data.user });
        setSuccessMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    successMessage,
    updateUser,
    registerUser,
    loginUser,
    logoutUser,
  };
};

export default useAuth;
