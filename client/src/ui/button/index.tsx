import { ButtonHTMLAttributes, FC } from "react";
import { IBaseProps } from "../../utils/interfaces";

import "./styles.css";

interface IProps extends IBaseProps<HTMLButtonElement> {
  otherProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  variant?: "standard" | "outline" | "contained" | "simple";
  theme?: "dark" | "light";
}

const Button: FC<IProps> = ({
  children,
  className,
  style,
  otherProps,
  variant = "standard",
  theme = "light",
}) => {
  return (
    <button
      {...otherProps}
      className={className + " button-ui " + variant + " " + theme}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
