import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthResponse, IUser } from "../../utils/interfaces";
import { RootState } from "../store";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";

interface IUserState {
  user: IUser | null;
  isAuth: boolean;
}

const initialState: IUserState = {
  user: JSON.parse(getCookie("user") || "null"),
  isAuth: Boolean(getCookie("user_token")),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      setCookie("user", JSON.stringify(action.payload.user));
    },
    login(state, action: PayloadAction<IAuthResponse>) {
      state.user = action.payload.user;
      state.isAuth = true;
      setCookie("user", JSON.stringify(action.payload.user));
      setCookie("user_token", action.payload.access_token);
    },
    signout(state) {
      state.user = null;
      state.isAuth = false;
      removeCookie("user_token");
      removeCookie("user");
    },
  },
});

export const { setUser, login, signout } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelector = (state: RootState) => state.user;
