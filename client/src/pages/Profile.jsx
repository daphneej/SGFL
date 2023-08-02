import { useState } from "react";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

import useUserStore from "../zustand/useUserStore";

import useAuth from "../hooks/useAuth";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

const GENDERS = ["Male", "Female"];

const Profile = () => {
  const { user, setUser } = useUserStore();
  const { updateUser } = useAuth();

  const [inputs, setInputs] = useState({
    firstName: user.firstName ? user.firstName : "",
    lastName: user.lastName ? user.lastName : "",
    gender: user.gender ? user.gender : "",
    address: user.address ? user.address : "",
    phone: user.phone ? user.phone : "",
  });

  const { isLoading, mutate } = useMutation("user", updateUser, {
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

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    mutate({ ...inputs, token: user.token });
  };

  return (
    <div className="flex-1 flex flex-col w-full p-4">
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
              <CircleLoader size={25} color={"white"} />
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
