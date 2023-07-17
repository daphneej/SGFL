import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

import { useAppContext } from "../context/AppContext";
import useAuth from "../hooks/useAuth";

const GENDERS = ["Male", "Female"];

const Profile = () => {
  const { user } = useAppContext();
  const { isLoading, errorMessage, successMessage, updateUser } = useAuth();

  const [inputs, setInputs] = useState({
    firstName: user.firstName ? user.firstName : "",
    lastName: user.lastName ? user.lastName : "",
    gender: user.gender ? user.gender : "",
    address: user.address ? user.address : "",
    phone: user.phone ? user.phone : "",
  });

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    await updateUser({ ...inputs, token: user.token });
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
      <div className="flex flex-col items-center mt-4 md:mt-8">
        <h1 className="font-bold text-2xl uppercase my-4">Profile</h1>

        <form
          className="w-full md:w-96 flex flex-col gap-3"
          onSubmit={handleUpdateUser}
        >
          <div>
            <label className="font-bold" htmlFor="firstName">
              Prénom
            </label>
            <input
              id="firstName"
              value={inputs.firstName}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  firstName: e.target.value,
                })
              }
              type="text"
              placeholder="Veuillez saisir votre prénom"
              className="input input-bordered input-primary w-full"
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="lastName">
              Nom
            </label>
            <input
              id="lastName"
              value={inputs.lastName}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  lastName: e.target.value,
                })
              }
              type="text"
              placeholder="Veuillez saisir votre nom de famille"
              className="input input-bordered input-primary w-full"
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="genre">
              Sexe
            </label>
            <select
              id="genre"
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
                Veuillez sélectionner votre sexe
              </option>
              {GENDERS.map((gender, index) => {
                return (
                  <option key={index} value={gender}>
                    {gender.toLocaleUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="address">
              Adresse
            </label>
            <input
              id="address"
              value={inputs.address}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  address: e.target.value,
                })
              }
              type="address"
              placeholder="Veuillez saisir votre adresse"
              className="input input-bordered input-primary w-full"
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="phone">
              Numéro Téléphone
            </label>
            <input
              id="phone"
              value={inputs.phone}
              onChange={(e) =>
                setInputs({
                  ...inputs,
                  phone: e.target.value,
                })
              }
              type="tel"
              placeholder="Veuillez saisir votre numéro de téléphone"
              className="input input-bordered input-primary w-full"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <CircleLoader size={25} />
            ) : (
              <span>Update Profile</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
