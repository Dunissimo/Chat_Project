import { FC, useState } from "react";
import { IBaseProps } from "../../utils/interfaces";
import Stack from "../stack";
import { RiEditBoxLine } from "react-icons/ri";

interface IProps extends IBaseProps<HTMLInputElement> {}

const EditableInput: FC<IProps> = ({ otherProps, className, style }) => {
  const [disabled, setDisabled] = useState(otherProps?.disabled);

  const clickHandler = () => {
    setDisabled((state) => !state);
  };

  return (
    <Stack flex="row" items="center" className="w-full relative">
      <input
        {...otherProps}
        className={className + " " + (disabled ? "disabled" : "")}
        disabled={disabled}
        style={style}
      />
      <div
        onClick={clickHandler}
        className="h-full cursor-pointer absolute right-4 flex items-center"
      >
        <RiEditBoxLine size={"1.25rem"} color="blue" />
      </div>
    </Stack>
  );
};

export default EditableInput;
