import { useQuery, useMutation } from "@tanstack/react-query";
import { setCookie } from "typescript-cookie";
import { setUser } from "../../redux/slices/user-slice";
import UsersApi from "../../api/users";
import { IUser } from "../interfaces";
import { useAppDispatch } from "./redux";

export const useUserQuery = (user: IUser | null) => {
  const dispatch = useAppDispatch();

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

  return { query, mutation };
};
