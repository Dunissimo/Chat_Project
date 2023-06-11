import { Dispatch, FC, FormEventHandler, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Container from "../ui/container";
import { useMutation } from "@tanstack/react-query";
import { loginDto } from "../utils/interfaces";
import AuthApi from "../api/auth";
import { useNavigate, useLocation, Navigate, redirect } from "react-router-dom";
import { setCookie } from "typescript-cookie";
import { AxiosError } from "axios";

interface IProps {
  setMode: Dispatch<React.SetStateAction<"login" | "signup">>;
}

// TODO: устранить копирование функционала (две формы), следовать принципу DRY!
const LoginForm: FC<IProps> = ({ setMode }) => {
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation((newUser: loginDto) => AuthApi.login(newUser), {
    onSuccess: ({ data }: any) => {
      if (!data.access_token) return;

      setCookie("user-token", data.access_token, { expires: 1 });
      navigate("/");
    },
    onError(error) {
      const err = error as AxiosError<{ message: string }>;
      setError(new Error(err?.response?.data?.message));
    },
  });

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const fields = {
      name: formData.get("username"),
      password: formData.get("password"),
    };

    mutation.mutate(fields as loginDto);
    e.currentTarget.reset();
  };

  return (
    <Container maxWidth="lg" className="pt-20">
      <h1 className="text-center text-3xl">Рады снова вас видеть в Chat!</h1>
      <p className="text-center mt-2 mb-8">
        Вы должны войти в свой аккаунт, чтобы продолжить общение
      </p>
      <form
        onSubmit={submitHandler}
        action="login"
        method="post"
        className="w-1/3 mx-auto flex flex-col gap-4 items-center"
      >
        <Input
          className={`text-black ${error ? "error" : ""}`}
          otherProps={{
            autoComplete: "off",
            type: "text",
            name: "username",
            placeholder: "Логин",
            required: true,
          }}
        />
        <Input
          className={`text-black ${error ? "error" : ""}`}
          otherProps={{
            type: "password",
            name: "password",
            placeholder: "Пароль",
            required: true,
          }}
        />
        {error && <p className="text-red-600 font-bold">{error.message}</p>}
        <Button otherProps={{ type: "submit" }} variant="outline">
          Вход
        </Button>
      </form>

      {mutation.isLoading && <p className="mt-4 text-center">Идет загрузка</p>}

      <p className="text-center mt-6 opacity-75">
        Если у вас ещё нет аккаунта, то можно{" "}
        <button
          className="underline hover:no-underline"
          onClick={() => setMode("signup")}
        >
          зарегистрироваться
        </button>
      </p>
    </Container>
  );
};

export default LoginForm;
