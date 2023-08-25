import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "@/hooks/users/useAuth";
import useUserStore from "@/zustand/useUserStore";

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
    if (user && user.role === "ADMIN") {
      navigate("/dashboard/admins");
    } else if (user && user.role === "TRAINER") {
      navigate("/dashboard/trainers");
    } else if (user && user.role === "STUDENT") {
      navigate("/dashboard/students");
    } else if (user && user.role === "USER") {
      navigate("/dashboard/users");
    }
  }, [user, navigate]);

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
    <div className="flex justify-center px-4 py-24 h-fit bg-base-100">
      <div className="w-full max-w-md p-8 rounded-md h-fit bg-base-300">
        <h2 className="mb-6 text-3xl font-bold text-center">Connexion</h2>

        <form onSubmit={handleLoginUser}>
          <div className="mb-4">
            <label htmlFor="email" className="font-medium text-md">
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
              className="w-full px-4 py-2 mt-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="font-medium text-md">
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
              className="w-full px-4 py-2 mt-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white btn bg-primary hover:bg-neutral"
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
