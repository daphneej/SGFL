import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

import useUserStore from "../zustand/useUserStore";
import useAuth from "../hooks/useAuth";

const Login = () => {
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
      toast.error(error.message);
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
    <div className="flex-1 flex flex-col w-full p-4">
      <div className="flex flex-col items-center mt-8">
        <h1 className="font-bold text-2xl uppercase my-4">Connexion</h1>

        <form
          className="flex flex-col w-full md:w-96 gap-3"
          onSubmit={handleLoginUser}
        >
          <div>
            <label className="font-bold" htmlFor="email">
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
              className="input input-bordered input-primary w-full"
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="password">
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
              className="input input-bordered input-primary w-full"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={emptyInput}
          >
            {isLoading ? (
              <CircleLoader size={25} color={"white"} />
            ) : (
              <span>Connexion</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
