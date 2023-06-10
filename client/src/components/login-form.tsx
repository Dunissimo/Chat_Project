import { Dispatch, FC } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Container from "../ui/container";

interface IProps {
  setMode: Dispatch<React.SetStateAction<"login" | "signup">>;
}

const LoginForm: FC<IProps> = ({ setMode }) => {
  return (
    <Container maxWidth="lg" className="pt-20">
      <h1 className="text-center text-3xl">Рады снова вас видеть в Chat!</h1>
      <p className="text-center mt-2 mb-8">
        Вы должны войти в свой аккаунт, чтобы продолжить общение
      </p>
      <form
        action="login"
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
        <Button
          otherProps={{ type: "submit", onClick: (e) => e.preventDefault() }}
          variant="outline"
        >
          Вход
        </Button>
      </form>

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
