import { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { apiUrl } from "./index.js";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { dispatch } = useAppContext();

  const registerUser = async (user) => {
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
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "SET_USER", payload: data });
        setSuccessMessage("Votre compte a été crée avec succès");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (user) => {
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
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "SET_USER", payload: data });
        setSuccessMessage("L'utilisateur a été authentifié avec succès");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/users/logout`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("user");
        dispatch({ type: "SET_USER", payload: null });
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (user) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/users/update`, {
        method: "PUT",
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
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "SET_USER", payload: data });
        setSuccessMessage(
          "Les informations utilisateur ont été modifiées avec succès"
        );
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
