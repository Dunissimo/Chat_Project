import { FC } from "react";
import { IBaseProps } from "../../utils/interfaces";

import "./styles.css";

interface IProps extends IBaseProps<HTMLDivElement> {}

const Container: FC<IProps> = ({ children, className, style, otherProps }) => {
  return (
    <div
      {...otherProps}
      className={`px-6 md:px-0 md:container mx-auto ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default Container;
