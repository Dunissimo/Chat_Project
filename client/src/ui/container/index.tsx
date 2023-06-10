import { FC } from "react";
import { IBaseProps } from "../../utils/interfaces";

import "./styles.css";

interface IProps extends IBaseProps<HTMLDivElement> {
  maxWidth: "sm" | "md" | "lg" | "xl";
}

const maxWidths = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

const Container: FC<IProps> = ({
  maxWidth,
  children,
  className,
  style,
  otherProps,
}) => {
  return (
    <div
      {...otherProps}
      className={`container ${className}`}
      style={{ maxWidth: maxWidths[maxWidth], ...style }}
    >
      {children}
    </div>
  );
};

export default Container;
