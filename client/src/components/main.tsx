import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  sidebar?: ReactNode;
  mainClassName?: string;
}

const Main: FC<IProps> = ({ children, sidebar, mainClassName }) => {
  return (
    <main
      className={
        "main w-full h-[580px] bg-white rounded-xl text-black flex " +
        mainClassName
      }
    >
      {sidebar && <div className={"w-1/4"}>{sidebar}</div>}
      <div className={`${sidebar ? "w-3/4" : "w-full"} text-black`}>
        {children}
      </div>
    </main>
  );
};

export default Main;
