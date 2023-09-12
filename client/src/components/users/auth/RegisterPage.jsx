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

import InputText from "@/components/forms/InputText";
import ButtonForm from "@/components/forms/ButtonForm";
import SimpleForm from "@/components/forms/SimpleForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      navigate("/profile");
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
            <InputText
              id={crypto.randomUUID()}
              name={"email"}
              type={"email"}
              label={"Adresse Email"}
              error={errors?.email}
              register={register("email")}
            />
            <InputText
              id={crypto.randomUUID()}
              name={"password"}
              type={"password"}
              label={"Mot De Passe"}
              error={errors?.password}
              register={register("password")}
            />
            <InputText
              id={crypto.randomUUID()}
              name={"confirmPassword"}
              type={"password"}
              label={"Confirmez Mot De Passe"}
              error={errors?.confirmPassword}
              register={register("confirmPassword")}
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
