import { memo, useEffect } from "react";
import Header from "./Header";
import InputMessage from "./InputMessage";
import MessageList from "./MessageList";
import "./styles.scss";
import CallWindow from "../CallWindow";
import { useAppDispatch } from "../../store/store";
import { setCurrConversation } from "../../store/features/conversationSlice";

export interface ChatWindowInterface {
  onClick: () => void;
}

const ChatWindow = ({ onClick }: ChatWindowInterface) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(setCurrConversation(null));
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col pb-3">
      <Header onClick={onClick} />
      <MessageList />
      <InputMessage />
      <CallWindow />
    </div>
  );
};

export default memo(ChatWindow);
