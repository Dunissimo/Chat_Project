import { FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatMiniCard: FC = () => {
  return (
    <div className="chat-mini-card w-full border px-2 py-2 cursor-pointer transition-all hover:bg-gray-100 active:bg-gray-300">
      <div className="flex items-center justify-between mb-2">
        <h2>Комната 1</h2>
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
      <div className="">Привет всем, это новая комната!</div>
    </div>
  );
};

export default ChatMiniCard;
