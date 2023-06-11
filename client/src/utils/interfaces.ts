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
  id: number;
  name: string;
  password: string;
  email: string;
  role: "user" | "admin";
}

export interface IFormProps {
  setMode: Dispatch<React.SetStateAction<"login" | "signup">>;
  submitHandler: (e: FormEvent<HTMLFormElement>) => void;
  error: Error | null;
  mutation: UseMutationResult<
    AxiosResponse<any, any> | undefined,
    unknown,
    registerDto | loginDto,
    unknown
  >;
}
