import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Friend, MessageInterface } from "../types";
import { getFriendList } from "../store/features/friendSlice";
import { useAppDispatch } from "../store/store";
import { useSelector } from "react-redux";
import { userSelector } from "../store/selector/authSelector";
import { getConversations } from "../store/features/conversationSlice";

type Theme = "light" | "dark";

interface AppContextInterface {
  theme: Theme;
  setTheme: React.Dispatch<SetStateAction<Theme>>;
  visibleModal: boolean;
  setVisibleModal: React.Dispatch<SetStateAction<boolean>>;
  visibleModalIncomingCall: boolean;
  setVisibleModalIncomingCall: React.Dispatch<SetStateAction<boolean>>;
  imageList: any;
  setImageList: React.Dispatch<SetStateAction<string[]>>;
  indexImg: number;
  setIndexImg: React.Dispatch<SetStateAction<number>>;
  friendList: Array<Friend>;
  setFriendList: React.Dispatch<SetStateAction<Friend[]>>;
  setMessageList: React.Dispatch<SetStateAction<MessageInterface[]>>;
  messageList: MessageInterface[];
  setNewMessage: React.Dispatch<SetStateAction<MessageInterface | null>>;
  newMessage: MessageInterface | null;
}

export const AppContext = createContext<AppContextInterface>({
  theme: "dark",
  setTheme: () => {},
  visibleModal: false,
  setVisibleModal: () => {},
  visibleModalIncomingCall: false,
  setVisibleModalIncomingCall: () => {},
  imageList: [],
  setImageList: () => {},
  indexImg: 0,
  setIndexImg: () => {},
  friendList: [],
  setFriendList: () => {},
  setMessageList: () => {},
  messageList: [],
  newMessage: null,
  setNewMessage: () => {},
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useSelector(userSelector);

  const [theme, setTheme] = useState<Theme>("dark");
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visibleModalIncomingCall, setVisibleModalIncomingCall] =
    useState<boolean>(false);
  const [imageList, setImageList] = useState<string[]>([]);
  const [indexImg, setIndexImg] = useState(0);
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [messageList, setMessageList] = useState<MessageInterface[]>([]);
  const [newMessage, setNewMessage] = useState<MessageInterface | null>(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(getFriendList());
    }
  }, [user]);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  useEffect(() => {
    dispatch(getConversations({ inputSearch: "", type: "" }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        visibleModal,
        setVisibleModal,
        imageList,
        setImageList,
        indexImg,
        setIndexImg,
        friendList,
        setFriendList,
        visibleModalIncomingCall,
        setVisibleModalIncomingCall,
        messageList,
        setMessageList,
        newMessage,
        setNewMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
