import { FC, useState } from "react";
import { IBaseProps } from "../../utils/interfaces";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Stack from "../stack";

import "./styles.css";

interface IProps extends IBaseProps<HTMLInputElement> {}

const Input: FC<IProps> = ({ otherProps, children, className, style }) => {
  if (otherProps?.type === "password") {
    return (
      <PasswordInput
        otherProps={otherProps}
        className={className}
        style={style}
      />
    );
  }

  return (
    <input {...otherProps} className={className + " input-ui"} style={style} />
  );
};

const PasswordInput: FC<IProps> = ({ className, style, otherProps }) => {
  const [visibility, setVisibility] = useState(false);

  const clickHandler = () => {
    setVisibility((state) => !state);
  };

  return (
    <Stack flex="row" items="center" className="w-full relative">
      <input
        {...otherProps}
        type={visibility ? "text" : "password"}
        className={className + " input-ui"}
        style={style}
      />
      <div
        onClick={clickHandler}
        className="h-full cursor-pointer absolute right-4 flex items-center"
      >
        {visibility ? (
          <AiFillEye color="blue" size={"1.75em"} />
        ) : (
          <AiFillEyeInvisible color="blue" size={"1.75em"} />
        )}
      </div>
    </Stack>
  );
};

export default Input;
