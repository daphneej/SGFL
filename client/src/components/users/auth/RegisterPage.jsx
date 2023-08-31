import { AxiosError } from "axios";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "@/hooks/users/useAuth";
import useUserStore from "@/zustand/useUserStore";
import { registerUserSchema } from "@/schemas/userSchema";

import InputField from "@/components/forms/InputField";
import ButtonForm from "@/components/forms/ButtonForm";
import SimpleForm from "@/components/forms/SimpleForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const { user, setUser } = useUserStore();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerUserSchema),
  });

  const { isLoading, mutate } = useMutation(["user"], registerUser, {
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

  const handleRegisterUser = (data) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center w-full px-4 py-24 h-fit bg-base-100">
      <div className="w-full max-w-md">
        <SimpleForm
          handler={handleSubmit(handleRegisterUser)}
          label={"Creation de Compte"}
        >
          <InputsForm col={1}>
            <InputField
              label={"Adresse Email"}
              errors={errors}
              register={register}
              field={"email"}
              type={"email"}
            />
            <InputField
              label={"Mot De Passe"}
              errors={errors}
              register={register}
              field={"password"}
              type={"password"}
            />
            <InputField
              label={"Confirmez Mot De Passe"}
              errors={errors}
              register={register}
              field={"confirmPassword"}
              type={"password"}
            />
          </InputsForm>
          <ButtonsForm>
            <ButtonForm
              isLoading={isLoading}
              primary={true}
              label={"Creer Compte"}
              handleClick={() => {}}
            />
          </ButtonsForm>
        </SimpleForm>
      </div>
    </div>
  );
};

export default Register;
