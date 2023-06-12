import { FC } from "react";
import { IBaseProps } from "../../utils/interfaces";
import PasswordInput from "./password";

import "./styles.css";
import EditableInput from "./editable";

interface IProps extends IBaseProps<HTMLInputElement> {
  editable?: boolean;
}

const Input: FC<IProps> = ({ otherProps, className, style, editable }) => {
  const baseClass =
    className + " input-ui " + (otherProps?.disabled ? "disabled" : "");

  if (otherProps?.type === "password") {
    return (
      <PasswordInput
        otherProps={otherProps}
        className={`${baseClass} ${className}`}
        style={style}
      />
    );
  }

  if (editable) {
    return (
      <EditableInput
        otherProps={otherProps}
        className={"input-ui " + className}
        style={style}
      />
    );
  }

  return (
    <input
      {...otherProps}
      className={
        className + " input-ui " + (otherProps?.disabled ? "disabled" : "")
      }
      style={style}
    />
  );
};

export default Input;
