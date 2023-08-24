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

const UserUpdateFormModal = ({ selectedUser, modalOpen, setModalOpen }) => {
  const { user } = useUserStore();
  const { updateUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      firstName: selectedUser?.firstName,
    },
    resolver: zodResolver(addUserSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: updateUser,
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

  const handleUpdateUser = (data) => {
    // mutate({ user: data, token: connectedUser.token });
    console.log(data);
  };

  const handleCancelClick = () => {
    setModalOpen(false);
  };

  return (
    <form
      className={`modal ${modalOpen && "modal-open"}`}
      onSubmit={handleSubmit(handleUpdateUser)}
    >
      <h2 className="">Add New User</h2>

      <div className="grid mt-6 space-y-4 bg-gray-300 grid- modal-box">
        <div className="flex-col mb-4">
          <label
            htmlFor="update-firstName"
            className="block font-semibold text-gray-800 dark:text-gray-200"
          >
            First Name:
          </label>
          <input
            id={"update-firstName"}
            {...register("firstName")}
            type="text"
            className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
          />
        </div>
        <div className="flex-col mb-4">
          <label
            htmlFor="update-lastName"
            className="block font-semibold text-gray-800 dark:text-gray-200"
          >
            Last Name:
          </label>
          <input
            id={"update-lastName"}
            {...register("lastName")}
            type="text"
            className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
          />
        </div>
        <div className="flex-col mb-4">
          <label
            htmlFor="update-email"
            className="block font-semibold text-gray-800 dark:text-gray-200"
          >
            Email:
          </label>
          <input
            id={"update-email"}
            {...register("email")}
            type="email"
            className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
          />

          <p>{errors?.email && errors?.root?.message}</p>
        </div>
        <div className="flex-col mb-4">
          <label
            htmlFor="update-address"
            className="block font-semibold text-gray-800 dark:text-gray-200"
          >
            Address:
          </label>
          <input
            id={"update-address"}
            {...register("address")}
            type="text"
            className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
          />
        </div>
        <div className="flex-col mb-4">
          <label
            htmlFor="update-phone"
            className="block font-semibold text-gray-800 dark:text-gray-200"
          >
            Phone Number:
          </label>
          <input
            id={"update-phone"}
            {...register("phone")}
            type="tel"
            className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
          />
        </div>
        <div className="flex-col mb-4">
          <label
            htmlFor="update-gender"
            className="block font-semibold text-gray-800 dark:text-gray-200"
          >
            Gender:
          </label>
          <select
            id={"update-gender"}
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
            htmlFor="update-password"
            className="block font-semibold text-gray-800 dark:text-gray-200"
          >
            Password:
          </label>
          <input
            id={"update-password"}
            {...register("password")}
            type="password"
            autoComplete=""
            className="w-full px-4 py-2 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary bg-base-200"
          />
        </div>
        <div className="flex-col mb-4">
          <label
            htmlFor="update-role"
            className="block font-semibold text-gray-800 dark:text-gray-200"
          >
            Role:
          </label>
          <select
            id={"update-role"}
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
            htmlFor="update-status"
            className="block font-semibold text-gray-800 dark:text-gray-200"
          >
            Status:
          </label>
          <select
            id={"update-status"}
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
        <div className="flex flex-col gap-2 md:flex-row">
          <button
            type="submit"
            className={`flex-1 px-4 py-2 rounded-lg ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-gray-400 hover:text-black hover:bg-primary text-white hover:bg-gray-400 hover:text-black-focus"
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

export default UserUpdateFormModal;
