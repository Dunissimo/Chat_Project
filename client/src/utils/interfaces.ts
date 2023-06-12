import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  AllHTMLAttributes,
  CSSProperties,
  Dispatch,
  FormEvent,
  ReactNode,
} from "react";

export interface IBaseProps<T> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  otherProps?: AllHTMLAttributes<T>;
}

export interface registerDto {
  name: string;
  password: string;
  email?: string;
  role?: "user" | "admin";
}

export type loginDto = Pick<registerDto, "name" | "password">;

export interface IUser {
  user_id: number;
  name: string;
  password: string;
  email: string;
  role: "user" | "admin";
}

export interface IAuthResponse {
  user: IUser;
  access_token: string;
  message: string;
}

export interface IFormProps {
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
  isError: boolean;
}
