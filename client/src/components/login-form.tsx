import { Dispatch, FC, FormEvent, FormEventHandler, useState } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Container from "../ui/container";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IFormProps, loginDto, registerDto } from "../utils/interfaces";

interface IProps extends IFormProps {}

// TODO: устранить копирование функционала (две формы), следовать принципу DRY!
const LoginForm: FC<IProps> = ({ submitHandler, isError }) => {
  return (
    <Container maxWidth="lg">
      <form
        onSubmit={submitHandler}
        action="login"
        method="post"
        className="w-1/3 mx-auto flex flex-col gap-4 items-center"
      >
        <Input
          className={`text-black ${isError ? "error" : ""}`}
          otherProps={{
            autoComplete: "off",
            type: "text",
            name: "name",
            placeholder: "Логин",
            required: true,
          }}
        />
        <Input
          className={`text-black ${isError ? "error" : ""}`}
          otherProps={{
            type: "password",
            name: "password",
            placeholder: "Пароль",
            required: true,
          }}
        />
        <Button otherProps={{ type: "submit" }} variant="outline">
          Вход
        </Button>
      </form>
    </Container>
  );
};

export default LoginForm;
