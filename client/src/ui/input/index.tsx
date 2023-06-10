import { FC, useState } from "react";
import { IBaseProps } from "../../utils/interfaces";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
        className="cursor-pointer absolute top-[15%] right-4"
      >
        {visibility ? (
          <VisibilityIcon color="info" />
        ) : (
          <VisibilityOffIcon color="info" />
        )}
      </div>
    </Stack>
  );
};

export default Input;
