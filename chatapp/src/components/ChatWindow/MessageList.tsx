import { useCallback, useEffect, useRef, useState } from "react";
import queryString from "query-string";
import Message from "./Message";
import { useParams } from "react-router-dom";
import { messageService } from "../../services/MessageService";
import Spinner from "../Spinner";
import { useAppContext } from "../../Context/AppProvider";

const MessageList = () => {
  const { currentConversationId } = useParams();

  const { setMessageList, messageList } = useAppContext();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await messageService.getMessageByConversationId(
        currentConversationId + "",
        queryString.stringify({ page, limit: 20 })
      );
      setNextPage(data.pagination.nextPage);
      setPage(page + 1);
      setMessageList([...messageList, ...data.data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [currentConversationId, messageList]);

  useEffect(() => {
    return () => {
      setMessageList([]);
      setPage(1);
      setLoading(false);
      setNextPage(true);
    };
  }, [currentConversationId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (nextPage) {
            fetchData();
          }
        }
      },
      { threshold: 0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, fetchData]);

  return (
    <ul className="h-full flex items-center px-3 py-2 gap-2 overflow-y-auto flex-col-reverse message-list">
      <div ref={messagesEndRef} />
      {messageList?.map((item, index) => (
        <Message key={index} data={item} />
      ))}
      {loading ? <Spinner /> : <div ref={observerTarget} />}
      {!loading && messageList?.length == 0 && (
        <div>Enter a message to start chatting!!!</div>
      )}
    </ul>
  );
};

export default MessageList;
