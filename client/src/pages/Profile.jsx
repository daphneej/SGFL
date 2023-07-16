import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

import { useAppContext } from "../context/AppContext";
import useAuth from "../hooks/useAuth";

const GENDERS = ["M", "F"];

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const { isLoading, errorMessage, successMessage, updateUser } = useAuth();

  const [inputs, setInputs] = useState({
    firstName: user.firstName ? user.firstName : "",
    lastName: user.lastName ? user.lastName : "",
    email: user.email ? user.email : "",
    password: "",
    gender: user.gender ? user.gender : "",
    address: user.address ? user.address : "",
    phone: user.phone ? user.phone : "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await updateUser(inputs);

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
    <div className="flex-1 flex justify-center">
      <div className="flex flex-col mt-8">
        <h1 className="font-bold text-2xl uppercase my-4">Profile</h1>

        <form className="w-96 flex flex-col gap-3" onSubmit={handleUpdateUser}>
          <input
            value={inputs.firstName}
            onChange={(e) =>
              setInputs({
                ...inputs,
                firstName: e.target.value,
              })
            }
            type="text"
            placeholder="Modifiez votre prénom"
            className="input input-bordered input-primary w-full"
          />
          <input
            value={inputs.lastName}
            onChange={(e) =>
              setInputs({
                ...inputs,
                lastName: e.target.value,
              })
            }
            type="text"
            placeholder="Modifiez votre nom de famille"
            className="input input-bordered input-primary w-full"
          />
          <input
            value={inputs.email}
            onChange={(e) =>
              setInputs({
                ...inputs,
                email: e.target.value,
              })
            }
            type="email"
            placeholder="Modifiez votre addresse email"
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
            placeholder="Modifiez votre mot de passe"
            className="input input-bordered input-primary w-full"
          />

          <select
            defaultValue={inputs.gender ? inputs.gender : GENDERS.at(0)}
            className="select select-bordered select-primary w-full"
            onChange={(e) =>
              setInputs({
                ...inputs,
                gender: e.target.value,
              })
            }
          >
            <option disabled value={"sexe"}>
              Sexe
            </option>
            {GENDERS.map((gender, index) => {
              return (
                <option key={index} value={gender}>
                  {gender}
                </option>
              );
            })}
          </select>

          <input
            value={inputs.address}
            onChange={(e) =>
              setInputs({
                ...inputs,
                address: e.target.value,
              })
            }
            type="address"
            placeholder="Modifiez votre addresse"
            className="input input-bordered input-primary w-full"
          />

          <input
            value={inputs.phone}
            onChange={(e) =>
              setInputs({
                ...inputs,
                phone: e.target.value,
              })
            }
            type="tel"
            placeholder="Modifier votre numéro de téléphone."
            className="input input-bordered input-primary w-full"
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? <CircleLoader /> : <span>Update Your Profile</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
