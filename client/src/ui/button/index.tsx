import { ButtonHTMLAttributes, FC } from "react";
import { IBaseProps } from "../../utils/interfaces";

import "./styles.css";

interface IProps extends IBaseProps<HTMLButtonElement> {
  otherProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  variant?: "standard" | "outline" | "contained";
}

const Button: FC<IProps> = ({
  children,
  className,
  style,
  otherProps,
  variant = "standard",
}) => {
  return (
    <button
      {...otherProps}
      className={className + " button-ui " + variant}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
