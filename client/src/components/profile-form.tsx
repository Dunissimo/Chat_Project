import { FC, FormEvent } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import { useUserInfo } from "../utils/hooks/use-user-info";
import { useUserQuery } from "../utils/hooks/use-user-query";
import { IUser } from "../utils/interfaces";

interface IProps {
  user: IUser | null;
}

const ProfileForm: FC<IProps> = ({ user }) => {
  const { name, email, changeHandler } = useUserInfo({
    name: user?.name,
    email: user?.email,
  });

  const { mutation } = useUserQuery(user);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({ name, email });
  };

  return (
    <form
      method="POST"
      className="flex flex-col gap-[1rem]"
      onSubmit={submitHandler}
    >
      <div>
        <label htmlFor="username" className="px-0">
          Логин:
        </label>
        <Input
          editable
          otherProps={{
            value: name,
            disabled: true,
            placeholder: "Логин",
            id: "username",
            onChange: (e) => changeHandler(e, "name"),
          }}
          className="mt-2 px-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="px-0">
          Почта:
        </label>
        <Input
          editable
          otherProps={{
            value: email,
            disabled: true,
            placeholder: "Почта",
            id: "email",
            onChange: (e) => changeHandler(e, "email"),
          }}
          className="mt-2 px-2"
        />
      </div>

      <Button otherProps={{ type: "submit" }} variant="contained" theme="dark">
        Сохранить
      </Button>
    </form>
  );
};

export default ProfileForm;
