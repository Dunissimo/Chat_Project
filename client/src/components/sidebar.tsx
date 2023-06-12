import { FC } from "react";
import ChatMiniCard from "./chat-mini-card";

const Sidebar: FC = () => {
  return (
    // TODO: сделать кастомный скролл
    <div className="h-full w-full border-r border-black overflow-auto">
      <div className="">
        <ChatMiniCard />
        <ChatMiniCard />
        <ChatMiniCard />
        <ChatMiniCard />
        <ChatMiniCard />
        <ChatMiniCard />
        <ChatMiniCard />
      </div>
    </div>
  );
};

export default Sidebar;
