import { useMutation, useQuery } from "@tanstack/react-query";
import { Drawer } from "antd";
import { FC, FormEvent, useState } from "react";
import { setCookie } from "typescript-cookie";
import UsersApi from "../api/users";
import { setUser, signout, userSelector } from "../redux/slices/user-slice";
import Button from "../ui/button";
import Container from "../ui/container";
import Input from "../ui/input";
import Stack from "../ui/stack";
import { useAppDispatch, useAppSelector } from "../utils/hooks/redux";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector(userSelector);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const changeHandler = (
    e: FormEvent<HTMLInputElement>,
    field: "name" | "email"
  ) => {
    if (field == "name") {
      setName(e.currentTarget.value);
    }
    if (field == "email") {
      setEmail(e.currentTarget.value);
    }
  };

  const query = useQuery(["key"], () => UsersApi.getUser(user?.user_id!));

  const mutation = useMutation(
    (data: any) => {
      return UsersApi.updateUser(data, user?.user_id);
    },
    {
      onSuccess(data) {
        query.refetch().then(({ data }) => {
          dispatch(setUser(data?.data));
          setCookie("user", JSON.stringify(data?.data));
        });
      },
    }
  );

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({ name, email });
  };

  return (
    <header className="header min-w-full bg-white text-black">
      <Container maxWidth="xl">
        <Stack
          flex="row"
          items="center"
          justify="space-between"
          className="min-h-[50px]"
        >
          <h1 className="font-bold text-2xl">Chat</h1>
          <Button
            variant="simple"
            theme="dark"
            otherProps={{ onClick: showDrawer }}
          >
            {user?.name}
          </Button>
          <Drawer
            className="drawer-with-custom-title"
            title="Профиль"
            placement="right"
            onClose={onClose}
            open={open}
            footer={
              <Button
                variant="outline"
                theme="dark"
                otherProps={{
                  onClick: () => {
                    dispatch(signout());
                  },
                }}
              >
                Выйти
              </Button>
            }
          >
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

              <Button
                otherProps={{ type: "submit" }}
                variant="contained"
                theme="dark"
              >
                Сохранить
              </Button>
            </form>
          </Drawer>
        </Stack>
      </Container>
    </header>
  );
};

export default Header;
