import Sidebar from "../../components/Sidebar";
import ChatWindow from "../../components/ChatWindow";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import InfoConversation from "../../components/InfoConversation";
import { useAppContext } from "../../Context/AppProvider";
import { updateConversation } from "../../store/features/conversationSlice";
import { useAppDispatch } from "../../store/store";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector/authSelector";
import { currConversationSelector } from "../../store/selector/conversationSelector";

const Home = () => {
  const { currentConversationId } = useParams();
  const dispatch = useAppDispatch();
  const user = useSelector(userSelector);
  const currConversation = useSelector(currConversationSelector);
  const { newMessage, setNewMessage, messageList, setMessageList } =
    useAppContext();
  const [visibleInfoConversation, setVisibleInfoConversation] = useState(false);
  const handleVisibleInfoConversation = useCallback(() => {
    setVisibleInfoConversation(!visibleInfoConversation);
  }, [visibleInfoConversation]);
  useEffect(() => {
    return () => {
      setVisibleInfoConversation(false);
    };
  }, [currentConversationId]);

  useEffect(() => {
    (async () => {
      try {
        if (newMessage) {
          if (
            messageList.length &&
            messageList[0].conversationId === newMessage.conversationId
          ) {
            const newMess = [newMessage, ...messageList];
            setMessageList([...newMess]);
          }
          dispatch(
            updateConversation({
              currentConversation: currConversation,
              latest_message: newMessage,
              userId: user._id,
            })
          );

          setNewMessage(null);
        }
      } catch (error) {}
    })();
  }, [newMessage]);

  return (
    <>
      <div className="w-1/4 h-full">
        <Sidebar />
      </div>
      <div className="w-3/4 h-full flex">
        {currentConversationId && (
          <ChatWindow onClick={() => handleVisibleInfoConversation()} />
        )}
        {visibleInfoConversation && <InfoConversation />}
      </div>
    </>
  );
};

export default Home;
