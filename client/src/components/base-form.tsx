import { FC, FormEventHandler, ReactNode } from "react";
import Button from "../ui/button";
import Container from "../ui/container";
import Input from "../ui/input";

interface IProps {
  children: ReactNode;
  text: {
    action: string;
    title: string;
    subtitle: string;
    alternate: ReactNode;
  };
  submitHandler: FormEventHandler<HTMLFormElement>;
}

const BaseForm: FC<IProps> = ({ children, text, submitHandler }) => {
  const { action, title, subtitle, alternate } = text;
  return (
    <Container maxWidth="lg" className="pt-20">
      <h1 className="text-center text-3xl">{title}</h1>
      <p className="text-center mt-2 mb-8">{subtitle}</p>
      <form
        onSubmit={submitHandler}
        action={action}
        method="post"
        className="w-1/3 mx-auto flex flex-col gap-4 items-center"
      >
        {children}
      </form>

      {alternate}
    </Container>
  );
};

export default BaseForm;
