import { AxiosError } from "axios";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useAuth from "@/hooks/users/useAuth";
import useUserStore from "@/zustand/useUserStore";
import { loginUserSchema } from "@/schemas/userSchema";

import InputText from "@/components/forms/InputText";
import ButtonForm from "@/components/forms/ButtonForm";
import SimpleForm from "@/components/forms/SimpleForm";
import InputsForm from "@/components/forms/InputsForm";
import ButtonsForm from "@/components/forms/ButtonsForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      navigate("/dashboard/admins");
    } else if (user && user.role === "TRAINER") {
      navigate("/dashboard/trainers");
    } else if (user && user.role === "STUDENT") {
      navigate("/dashboard/students");
    } else if (user && user.role === "USER") {
      navigate("/courses");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  const { isLoading, mutate } = useMutation(["user"], loginUser, {
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

  const handleLoginUser = (data) => {
    mutate(data);
  };

  return (
    <div className="flex justify-center w-full px-4 py-24 h-fit bg-base-100">
      <div className="w-full max-w-md">
        <SimpleForm handler={handleSubmit(handleLoginUser)} label={"Connexion"}>
          <InputsForm col={1}>
            <InputText
              id={crypto.randomUUID()}
              name={"email"}
              label={"Adresse Email"}
              error={errors?.email}
              register={register("email")}
              type={"email"}
              autoComplete={"email"}
            />
            <InputText
              id={crypto.randomUUID()}
              name={"password"}
              label={"Mot De Passe"}
              error={errors?.password}
              register={register("password")}
              type={"password"}
              autoComplete={"current-password"}
            />
          </InputsForm>
          <ButtonsForm>
            <ButtonForm
              isLoading={isLoading}
              primary={true}
              label={"Connexion"}
              handleClick={() => {}}
            />
          </ButtonsForm>
        </SimpleForm>
      </div>
    </div>
  );
};

export default LoginPage;
