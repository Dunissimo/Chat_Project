import { Dispatch, FC, FormEventHandler } from "react";
import Button from "../ui/button";
import Container from "../ui/container";
import Input from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { registerDto } from "../utils/interfaces";
import AuthApi from "../api/auth";

interface IProps {
  setMode: Dispatch<React.SetStateAction<"login" | "signup">>;
}

// TODO: устранить копирование функционала (две формы), следовать принципу DRY!
const SignupForm: FC<IProps> = ({ setMode }) => {
  const mutation = useMutation((newUser: registerDto) =>
    AuthApi.register(newUser)
  );

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const fields = {
      name: formData.get("username"),
      password: formData.get("password"),
      email: formData.get("email"),
    };

    mutation.mutate(fields as registerDto);

    setMode("login");
    e.currentTarget.reset();
  };

  return (
    <Container maxWidth="lg" className="pt-20">
      <h1 className="text-center text-3xl">Добро пожаловать в Chat!</h1>
      <p className="text-center mt-2 mb-8">
        Вы можете создать аккаунт, чтобы начать общение
      </p>
      <form
        onSubmit={submitHandler}
        action="signup"
        method="post"
        className="w-1/3 mx-auto flex flex-col gap-4 items-center"
      >
        <Input
          className="text-black"
          otherProps={{
            autoComplete: "off",
            type: "text",
            name: "username",
            placeholder: "Логин",
            required: true,
          }}
        />
        <Input
          className=" text-black"
          otherProps={{
            type: "password",
            name: "password",
            placeholder: "Пароль",
            required: true,
          }}
        />
        <Input
          className=" text-black"
          otherProps={{
            type: "email",
            name: "email",
            placeholder: "Почта",
          }}
        />
        <Button otherProps={{ type: "submit" }} variant="outline">
          Зарегистрироваться
        </Button>
      </form>

      <p className="text-center mt-6 opacity-75">
        Если у вас уже есть аккаунт, то можно{" "}
        <button
          className="underline hover:no-underline"
          onClick={() => setMode("login")}
        >
          войти
        </button>
      </p>
    </Container>
  );
};

export default SignupForm;
