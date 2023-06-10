import { Dispatch, FC } from "react";
import Button from "../ui/button";
import Container from "../ui/container";
import Input from "../ui/input";

interface IProps {
  setMode: Dispatch<React.SetStateAction<"login" | "signup">>;
}

const SignupForm: FC<IProps> = ({ setMode }) => {
  return (
    <Container maxWidth="lg" className="pt-20">
      <h1 className="text-center text-3xl">Добро пожаловать в Chat!</h1>
      <p className="text-center mt-2 mb-8">
        Вы можете создать аккаунт, чтобы начать общение
      </p>
      <form
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
        <Button
          otherProps={{ type: "submit", onClick: (e) => e.preventDefault() }}
          variant="outline"
        >
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
