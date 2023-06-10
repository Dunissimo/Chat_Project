import { AllHTMLAttributes, CSSProperties, ReactNode } from "react";

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
