import CameraIcon from "../../assets/svg/CameraIcon";
import PhoneIcon from "../../assets/svg/PhoneIcon";
import InfoFill from "../../assets/svg/InfoFill";
import { memo } from "react";
import { useSocketContext } from "../../Context/SocketProvider";
import ModalIncomingCall from "../Modals/ModalIncomingCall";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector/authSelector";
import { currConversationSelector } from "../../store/selector/conversationSelector";

export interface HeaderInterface {
  onClick: () => void;
}

const Header = ({ onClick }: HeaderInterface) => {
  const user = useSelector(userSelector);

  const currConversation = useSelector(currConversationSelector);

  const { userOnline, callUser } = useSocketContext();

  return (
    <div className="w-full bg-[#1f1d1d] flex py-4 px-6 justify-between">
      <div className="flex gap-3 items-center">
        <img
          src={user?.avatar}
          alt=""
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col gap-0 font-semibold">
          <span className="text-lg">{user?.full_name}</span>
          <span
            className={`text-sm ${
              user &&
              currConversation?.members?.findIndex(
                (i: any) => userOnline.includes(i._id) && user?._id !== i._id
              ) !== -1 &&
              "text-green-500"
            } `}
          >
            {user &&
            currConversation?.members?.findIndex(
              (i: any) => userOnline.includes(i._id) && user?._id !== i._id
            ) !== -1
              ? "Online"
              : "Offline"}
          </span>
        </div>
      </div>
      {/* <img src={CameraIcon} alt="" className="fill-slate-300" /> */}
      <div className="flex items-center gap-2">
        <CameraIcon
          color="white"
          className="scale-50 cursor-pointer hover:opacity-75 duration-300"
          onClick={() => callUser()}
        />
        <PhoneIcon
          color="white"
          className="scale-125 cursor-pointer hover:opacity-75 duration-300"
        />
        <InfoFill
          color="white"
          className="scale-125 cursor-pointer hover:opacity-75 duration-300 ml-3"
          onClick={onClick}
        />
      </div>

      <ModalIncomingCall />
    </div>
  );
};

export default memo(Header);
