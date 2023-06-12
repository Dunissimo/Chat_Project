import { FC } from "react";
import { IBaseProps } from "../../utils/interfaces";

import "./styles.css";

interface IProps extends IBaseProps<HTMLDivElement> {
  flex?: "row" | "column";
  justify?: "start" | "center" | "end" | "space-between";
  items?: "start" | "center" | "end";
  gap?: string | number;
}

const Stack: FC<IProps> = ({
  flex,
  justify,
  items,
  gap,
  children,
  className,
  style,
  otherProps,
}) => {
  return (
    <div
      {...otherProps}
      className={className}
      style={{
        display: flex && "flex",
        flexDirection: flex && flex,
        justifyContent: justify && justify,
        alignItems: items && items,
        gap: gap && gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Stack;
