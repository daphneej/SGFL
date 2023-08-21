import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import useUserStore from "../zustand/useUserStore";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const { user, setUser } = useUserStore();
  const [emptyInput, setEmptyInput] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const { isLoading, mutate } = useMutation("user", loginUser, {
    onSuccess: (data) => {
      toast.success(data.message);
      setUser(data.user);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  useEffect(() => {
    let hasEmptyInput = false;

    const values = Object.values(inputs);

    values.forEach((value) => {
      if (value.length === 0) {
        hasEmptyInput = true;
      }
    });

    setEmptyInput(hasEmptyInput);
  }, [inputs]);

  const handleLoginUser = async (e) => {
    e.preventDefault();
    mutate(inputs);
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100 dark:bg-gray-900 px-4 py-24">
      <div className="w-full h-fit max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Connexion
        </h2>

        <form onSubmit={handleLoginUser}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium">
              Adresse Email
            </label>
            <input
              id="email"
              value={inputs.email}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  email: e.target.value,
                })
              }
              type="text"
              placeholder="Veuillez saisir votre email"
              className="w-full px-4 py-2 mt-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-base-200"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium">
              Mot De Passe
            </label>
            <input
              id="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  password: e.target.value,
                })
              }
              type="password"
              autoComplete="true"
              placeholder="Veuillez saisir votre mot de passe"
              className="w-full px-4 py-2 mt-2 rounded-md border-gray-300 focus:outline-none focus:ring focus:ring-primary bg-base-200"
            />
          </div>

          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-focus"
            } text-white font-semibold`}
            disabled={emptyInput || isLoading}
          >
            {isLoading ? (
              <div className="loading"></div>
            ) : (
              <span>Connexion</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
