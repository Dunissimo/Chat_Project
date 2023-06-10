import { AllHTMLAttributes, CSSProperties, ReactNode } from "react";

export interface IBaseProps<T> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  otherProps?: AllHTMLAttributes<T>;
}
