import { FC, FormEvent, FormEventHandler, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupForm from "../components/signup-form";
import LoginForm from "../components/login-form";
import { useMutation } from "@tanstack/react-query";
import { loginDto, registerDto } from "../utils/interfaces";
import AuthApi from "../api/auth";
import { setCookie } from "typescript-cookie";
import { AxiosError } from "axios";
import { formSubmitHandler } from "../utils/helpers/form-submit";

const Login: FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation(
    (newUser: loginDto | registerDto) => AuthApi.auth(mode, newUser),
    {
      onMutate() {
        setError(null);
      },
      onSuccess(data) {
        if (mode == "login") {
          if (!data?.data.access_token) return;

          setCookie("user-token", data?.data.access_token, { expires: 1 });
          navigate("/");
        }

        if (mode == "signup") {
          setMode("login");
        }
      },
      onError(error) {
        const err = error as AxiosError<{ message: string }>;
        setError(new Error(err?.response?.data?.message));
      },
    }
  );

  const text = {
    login: {
      title: "Рады снова вас видеть в Chat!",
      subtitle: "Вы должны войти в свой аккаунт, чтобы продолжить общение",
      par: "Если у вас ещё нет аккаунта, то можно",
      button: "зарегистрироваться",
    },
    signup: {
      title: "Добро пожаловать в Chat!",
      subtitle: "Вы можете создать аккаунт, чтобы начать общение",
      par: "Если у вас уже есть аккаунт, то можно",
      button: "войти",
    },
  };

  const handlers = {
    loginSubmit: (e: FormEvent<HTMLFormElement>) =>
      formSubmitHandler(e, mutation, error),
    registerSubmit: (e: FormEvent<HTMLFormElement>) =>
      formSubmitHandler(e, mutation, error),
  };

  return (
    <div className="login-page min-h-[100vh] pt-20 text-white">
      <h1 className="text-center text-3xl">{text[mode].title}</h1>
      <p className="text-center mt-2 mb-8">{text[mode].subtitle}</p>
      {error && (
        <p className="text-red-600 text-center pb-8 font-bold">
          {error.message}
        </p>
      )}
      {mode === "login" ? (
        <LoginForm
          setMode={setMode}
          error={error}
          mutation={mutation}
          submitHandler={handlers.loginSubmit}
        />
      ) : (
        <SignupForm
          setMode={setMode}
          error={error}
          mutation={mutation}
          submitHandler={handlers.registerSubmit}
        />
      )}

      {mutation.isLoading && <p className="mt-4 text-center">Идет загрузка</p>}

      <p className="text-center mt-6 opacity-75">
        {text[mode].par}{" "}
        <button
          className="underline hover:no-underline"
          onClick={() => setMode(mode == "login" ? "signup" : "login")}
        >
          {text[mode].button}
        </button>
      </p>
    </div>
  );
};

export default Login;
