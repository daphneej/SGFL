import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

import { useAppContext } from "../context/AppContext";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [emptyInput, setEmptyInput] = useState(true);
  const { user } = useAppContext();
  const { isLoading, errorMessage, successMessage, registerUser } = useAuth();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

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

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    await registerUser(inputs);

    if (errorMessage) {
      toast.error(errorMessage);
    }

    if (successMessage) {
      toast.success(successMessage);
    }
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
        <h1 className="font-bold text-2xl uppercase my-4">Inscription</h1>

        <form
          className="flex flex-col w-96 gap-3"
          onSubmit={handleRegisterUser}
        >
          <input
            value={inputs.email}
            onChange={(e) =>
              setInputs({
                ...inputs,
                email: e.target.value,
              })
            }
            type="text"
            placeholder="Entrez votre email"
            className="input input-bordered input-primary w-full"
          />
          <input
            value={inputs.password}
            onChange={(e) =>
              setInputs({
                ...inputs,
                password: e.target.value,
              })
            }
            type="password"
            autoComplete="true"
            placeholder="Entrez votre mot de passe"
            className="input input-bordered input-primary w-full"
          />
          <input
            value={inputs.confirmPassword}
            onChange={(e) =>
              setInputs({
                ...inputs,
                confirmPassword: e.target.value,
              })
            }
            type="password"
            autoComplete="true"
            placeholder="Confirmez votre mot de passe"
            className="input input-bordered input-primary w-full"
          />
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={emptyInput}
          >
            {isLoading ? <CircleLoader /> : <span>Inscription</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
