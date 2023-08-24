import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { queryClient } from "@/index";

import useUser from "@/hooks/users/useUser";
import useUserStore from "@/zustand/useUserStore";
import { addUserSchema } from "@/schemas/userSchema";

const GENDERS = ["MALE", "FEMALE"];
const STATUS = ["ACTIVE", "INACTIVE"];
const ROLES = ["ADMIN", "TRAINER", "STUDENT", "USER"];

const UserAddFormModal = ({ modalOpen, setModalOpen }) => {
  const { user } = useUserStore();
  const { addUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addUserSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: addUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("users");
      setModalOpen(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleAddUser = (data) => {
    mutate({ user: data, token: user.token });
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  return (
    <form
      className={`grid overflow-y-auto p-4 gridt-col modal ${
        modalOpen && "modal-open"
      }`}
      onSubmit={handleSubmit(handleAddUser)}
    >
      <div className="w-full p-8 rounded-md md:w-3/4 bg-base-100">
        <h2 className="text-xl font-bold">Add New User</h2>
        <div className="grid grid-cols-1 gap-8 mt-6 md:grid-cols-3">
          <div className="flex-col mb-4">
            <label
              htmlFor="firstName"
              className="block font-semibold text-gray-800 dark:text-gray-200"
            >
              First Name:
            </label>
            <input
              id={"firstName"}
              {...register("firstName")}
              type="text"
              className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
            />
          </div>
          <div className="flex-col mb-4">
            <label
              htmlFor="lastName"
              className="block font-semibold text-gray-800 dark:text-gray-200"
            >
              Last Name:
            </label>
            <input
              id={"lastName"}
              {...register("lastName")}
              type="text"
              className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
            />
          </div>
          <div className="flex-col mb-4">
            <label
              htmlFor="email"
              className="block font-semibold text-gray-800 dark:text-gray-200"
            >
              Email:
            </label>
            <input
              id={"email"}
              {...register("email")}
              type="email"
              className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
            />

            <p>{errors?.email && errors?.root?.message}</p>
          </div>
          <div className="flex-col mb-4">
            <label
              htmlFor="address"
              className="block font-semibold text-gray-800 dark:text-gray-200"
            >
              Address:
            </label>
            <input
              id={"address"}
              {...register("address")}
              type="text"
              className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
            />
          </div>
          <div className="flex-col mb-4">
            <label
              htmlFor="phone"
              className="block font-semibold text-gray-800 dark:text-gray-200"
            >
              Phone Number:
            </label>
            <input
              id={"phone"}
              {...register("phone")}
              type="tel"
              className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
            />
          </div>
          <div className="flex-col mb-4">
            <label
              htmlFor="gender"
              className="block font-semibold text-gray-800 dark:text-gray-200"
            >
              Gender:
            </label>
            <select
              id={"gender"}
              {...register("gender")}
              className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
              defaultValue={""}
            >
              <option disabled value="">
                Select Gender
              </option>
              {GENDERS.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-col mb-4">
            <label
              htmlFor="password"
              className="block font-semibold text-gray-800 dark:text-gray-200"
            >
              Password:
            </label>
            <input
              id={"password"}
              {...register("password")}
              type="password"
              autoComplete=""
              className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
            />
          </div>
          <div className="flex-col mb-4">
            <label
              htmlFor="role"
              className="block font-semibold text-gray-800 dark:text-gray-200"
            >
              Role:
            </label>
            <select
              id={"role"}
              {...register("role")}
              className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
              defaultValue={""}
            >
              <option disabled value="">
                Select Role
              </option>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-col mb-4">
            <label
              htmlFor="status"
              className="block font-semibold text-gray-800 dark:text-gray-200"
            >
              Status:
            </label>
            <select
              id={"status"}
              {...register("status")}
              defaultValue={""}
              className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
            >
              <option disabled value="">
                Select Status
              </option>
              {STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6 md:flex-row">
          <button
            type="submit"
            className={`flex-1 btn rounded-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary text-white"
            } text-white font-semibold`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading"></div>
            ) : (
              <span>Add User</span>
            )}
          </button>
          <button
            type="button"
            onClick={handleCancelClick}
            className="flex-1 px-4 py-2 font-semibold text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserAddFormModal;
