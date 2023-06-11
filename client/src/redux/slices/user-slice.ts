import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../utils/interfaces";
import { RootState } from "../store";

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const userSelector = (state: RootState) => state.user.user;
