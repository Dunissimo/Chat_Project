import { Dispatch, FC, FormEventHandler, useState } from "react";
import Button from "../ui/button";
import Container from "../ui/container";
import Input from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { IFormProps, registerDto } from "../utils/interfaces";
import AuthApi from "../api/auth";
import { AxiosError } from "axios";

interface IProps extends IFormProps {}

// TODO: устранить копирование функционала (две формы), следовать принципу DRY!
const SignupForm: FC<IProps> = ({ submitHandler, error, mutation }) => {
  return (
    <Container maxWidth="lg">
      <form
        onSubmit={submitHandler}
        action="signup"
        method="post"
        className="w-1/3 mx-auto flex flex-col gap-4 items-center"
      >
        <Input
          className={`text-black ${error ? "error" : ""}`}
          otherProps={{
            autoComplete: "off",
            type: "text",
            name: "name",
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
        <Input
          className={`text-black ${error ? "error" : ""}`}
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
    </Container>
  );
};

export default SignupForm;
