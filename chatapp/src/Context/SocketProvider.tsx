import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import Peer from "simple-peer";
import { useAppContext } from "./AppProvider";
import { MessageInterface } from "../types";
import MessageRing from "../assets/music/message_ring.mp3";
import { useSelector } from "react-redux";
import { userSelector } from "../store/selector/authSelector";
import { currConversationSelector } from "../store/selector/conversationSelector";
import { useAppDispatch } from "../store/store";
import { addFriendRequest } from "../store/features/friendSlice";

interface SocketProviderProps {
  children: React.ReactNode;
}

interface SocketInterface {
  socket: Socket | null;
  userOnline: string[];
  myVideo: any;
  userVideo: any;
  callUser: () => void;
  answerCall: () => void;
  leaveCall: () => void;
  handleNoReply: () => void;
  handleCallEnded: () => void;
  callAccepted: boolean;
  receivingCall: boolean;
  name: string;
  isCalling: boolean;
  noReply: boolean;
  callEnded: boolean;
}

export const SocketContext = createContext<SocketInterface | null>(null);

const SocketProvider = ({ children }: SocketProviderProps) => {
  const dispatch = useAppDispatch();
  const currConversation = useSelector(currConversationSelector);

  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useSelector(userSelector);

  const [userOnline, setUserOnline] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState("");

  const [receivingCall, setReceivingCall] = useState<boolean>(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [noReply, setNoReply] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  const { setNewMessage } = useAppContext();

  const [myVideo, setMyVideo] = useState<MediaStream>();
  const [userVideo, setUserVideo] = useState<MediaStream>();

  const connectionRef = useRef<any>();
  const messageRing = useMemo(() => new Audio(MessageRing), []);

  useEffect(() => {
    if (user) {
      const socket = io(import.meta.env.VITE_DB_BASE_URL, {
        query: { userId: user?._id },
      });
      setSocket(socket);

      socket.on("getUserOnline", (users) => {
        setUserOnline(users);
      });

      socket.on("newMessage", (message: MessageInterface) => {
        messageRing.play();
        setNewMessage(message);
      });

      socket.on("notify_add_friend", (data) => {
        // setFriendRequestList([data, ...friendRequestList]);
        dispatch(addFriendRequest(data));
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket?.close();
        setSocket(null);
      }
    }
    return () => {};
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("callUser", ({ signal, from, name }) => {
        setReceivingCall(true);
        setNoReply(false);

        setCaller(from);
        setName(name);
        setCallerSignal(signal);
      });

      socket.on("leaveCall", ({ noReply }) => {
        setCallEnded(true);
        setCallAccepted(false);
        setNoReply(noReply);
      });
    }
  }, [socket]);

  const callUser = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    if (socket && stream) {
      setMyVideo(stream);
      setIsCalling(true);
      setCallAccepted(false);
      setCallEnded(false);
      setNoReply(false);

      const receiver = currConversation?.members.find(
        (item) => item._id !== user?._id
      );
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream,
      });
      peer.on("signal", (data) => {
        socket.emit("callUser", {
          signal: data,
          name: user?.full_name,
          from: user?._id,
          to: receiver?._id,
        });
      });

      socket.on("callAccepted", ({ signal }) => {
        setCallAccepted(true);
        setIsCalling(true);

        peer.signal(signal);
      });

      peer.on("stream", (stream) => {
        setUserVideo(stream);
      });
      connectionRef.current = peer;

      peer.on("close", () => {
        socket.off("callAccepted");
      });
    }
  };

  const answerCall = async () => {
    setReceivingCall(false);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    if (socket && stream) {
      setMyVideo(stream);

      setIsCalling(true);
      setCallAccepted(true);
      setCallEnded(false);

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream,
      });
      peer.on("signal", (data) => {
        socket.emit("answerCall", { signal: data, to: caller });
      });
      peer.on("stream", (stream) => {
        setUserVideo(stream);
      });
      peer.signal(callerSignal);
      connectionRef.current = peer;
    }
  };

  const leaveCall = () => {
    setIsCalling(false);

    connectionRef?.current?.destroy();
    if (userVideo) {
      userVideo.getTracks().forEach((media) => media.stop());
      setUserVideo(undefined);
    }
    if (myVideo) {
      myVideo?.getTracks().forEach((media) => media.stop());
      setMyVideo(undefined);
    }

    const receiver = currConversation?.members.find(
      (item) => item._id !== user?._id
    );
    if (socket) {
      socket.emit("leaveCall", { to: receiver?._id });
    }
  };

  const handleNoReply = () => {
    setReceivingCall(false);

    const receiver = currConversation?.members.find(
      (item) => item._id !== user?._id
    );
    if (socket) {
      socket.emit("leaveCall", { to: receiver?._id, noReply: true });
    }
  };

  const handleCallEnded = () => {
    setIsCalling(false);

    connectionRef?.current?.destroy();
    if (userVideo) {
      userVideo.getTracks().forEach((media) => media.stop());
      setUserVideo(undefined);
    }
    if (myVideo) {
      myVideo?.getTracks().forEach((media) => media.stop());
      setMyVideo(undefined);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        userOnline,
        myVideo,
        userVideo,
        callUser,
        answerCall,
        leaveCall,
        callAccepted,
        name,
        receivingCall,
        isCalling,
        noReply,
        callEnded,
        handleNoReply,
        handleCallEnded,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
