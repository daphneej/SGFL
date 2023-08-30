import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

import useUserStore from "@/zustand/useUserStore";
import useAuth from "@/hooks/users/useAuth";

import { updateUserSchema } from "@/schemas/userSchema";

import UserProfileView from "@/components/users/UserProfileView";
import UserProfileUpdate from "@/components/users/UserProfileUpdate";

import { queryClient } from "@/index";
import ButtonsForm from "@/components/forms/ButtonsForm";
import ButtonForm from "@/components/forms/ButtonForm";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    values: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      address: user?.address,
      phone: user?.phone,
      gender: user?.gender,
      role: user?.role,
      status: user?.status,
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success(data.message);
      queryClient.invalidateQueries("user");
      setIsEditing(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleSkipClick = () => {
    navigate(-1);
  };

  const handleUpdateUser = (data) => {
    mutate({ ...data, id: user.id, token: user.token });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-100">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 p-4 m-4 rounded-md md:gap-4 md:flex-row bg-base-200">
          <div className="avatar placeholder">
            <div className="text-xl font-extrabold rounded-full w-14 bg-neutral-focus text-neutral-content">
              <span>{user.email.at(0).toUpperCase()}</span>
            </div>
          </div>
          <div className="flex flex-col text-center md:text-left">
            <h3 className="text-lg font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="w-[90vw] md:w-[50vw]">
          {isEditing ? (
            <UserProfileUpdate
              register={register}
              handler={handleSubmit(handleUpdateUser)}
              errors={errors}
              isLoading={isLoading}
              setIsEditing={setIsEditing}
            />
          ) : (
            <UserProfileView user={user} />
          )}
        </div>

        <div className="w-full">
          {!isEditing && (
            <ButtonsForm>
              <ButtonForm
                isLoading={false}
                primary={true}
                label={"Modifier"}
                handleClick={handleEditClick}
              />
              <ButtonForm
                isLoading={false}
                primary={false}
                label={"Passer"}
                handleClick={handleSkipClick}
              />
            </ButtonsForm>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
