import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

import useAuth from "../hooks/useAuth";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [emptyInput, setEmptyInput] = useState(true);
  const { isLoading, errorMessage, successMessage, loginUser } = useAuth();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

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
    await loginUser(inputs);
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }

    if (successMessage) {
      toast.success(successMessage);
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="w-screen min-h-[36rem] md:h-screen flex flex-col p-4">
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
            {isLoading ? <CircleLoader size={25} /> : <span>Connexion</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;