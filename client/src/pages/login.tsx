import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";
import AuthApi from "../api/auth";
import LoginForm from "../components/login-form";
import SignupForm from "../components/signup-form";
import { formSubmitHandler } from "../utils/helpers/form-submit";
import { useAppDispatch } from "../utils/hooks/redux";
import { loginDto, registerDto } from "../utils/interfaces";
import { login } from "../redux/slices/user-slice";

const Login: FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const mutation = useMutation(
    (newUser: loginDto | registerDto) => AuthApi.auth(mode, newUser),
    {
      onSuccess(data) {
        if (mode == "login") {
          if (!data?.data.access_token) return;

          dispatch(login(data?.data));
          setCookie("user-token", data?.data.access_token, { expires: 7 });

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
      formSubmitHandler(e, mutation, mutation.isError),
    registerSubmit: (e: FormEvent<HTMLFormElement>) =>
      formSubmitHandler(e, mutation, mutation.isError),
  };

  return (
    <div className="login-page min-h-[100vh] pt-20 text-white">
      <h1 className="text-center text-3xl">{text[mode].title}</h1>
      <p className="text-center mt-2 mb-8">{text[mode].subtitle}</p>

      <div className=" text-center pb-8 font-bold">
        {mutation.isError && <p className="text-red-600">{error?.message}</p>}
        {mutation.isLoading && <p>Идет загрузка</p>}
      </div>

      {mode === "login" ? (
        <LoginForm
          isError={mutation.isError}
          submitHandler={handlers.loginSubmit}
        />
      ) : (
        <SignupForm
          isError={mutation.isError}
          submitHandler={handlers.registerSubmit}
        />
      )}

      <div className="py-4 text-center"></div>

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
