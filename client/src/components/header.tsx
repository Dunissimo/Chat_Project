import { Drawer } from "antd";
import { FC, useState } from "react";
import { signout, userSelector } from "../redux/slices/user-slice";
import Button from "../ui/button";
import Container from "../ui/container";
import Stack from "../ui/stack";
import { useAppDispatch, useAppSelector } from "../utils/hooks/redux";
import ProfileForm from "./profile-form";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector(userSelector);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const drawerFooter = (
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
  );

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

          {/* Drawer Trigger */}
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
            footer={drawerFooter}
          >
            <ProfileForm user={user} />
          </Drawer>
        </Stack>
      </Container>
    </header>
  );
};

export default Header;
