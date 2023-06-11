import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAuthResponse, IUser } from "../../utils/interfaces";
import { RootState } from "../store";

interface IUserState {
  user: IUser | null;
  isAuth: boolean;
}

const initialState: IUserState = {
  user: null,
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<IAuthResponse>) {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    signout(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { login, signout } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelector = (state: RootState) => state.user;
