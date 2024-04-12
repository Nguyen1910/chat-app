import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSocketContext } from "../../Context/SocketProvider";
import { useEffect } from "react";
import {
  conversationListSelector,
  currConversationSelector,
} from "../../store/selector/conversationSelector";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/store";
import {
  getCurrConversation,
  updateConversation,
} from "../../store/features/conversationSlice";
import { userSelector } from "../../store/selector/authSelector";

const FriendList = () => {
  const conversationList = useSelector(conversationListSelector);
  const currConversation = useSelector(currConversationSelector);
  const dispatch = useAppDispatch();

  const user = useSelector(userSelector);

  const { userOnline } = useSocketContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentConversationId } = useParams();

  useEffect(() => {
    if (currentConversationId) {
      dispatch(getCurrConversation(currentConversationId));
    }
  }, [currentConversationId]);

  useEffect(() => {
    try {
      if (currConversation) {
        dispatch(
          updateConversation({
            currentConversation: currConversation,
            latest_message: null,
            userId: user._id,
          })
        );
      }
    } catch (error) {}
  }, [currConversation]);

  return (
    <div className="h-full overflow-y-auto">
      <ul className="flex flex-col h-full mr-1">
        {conversationList?.map((item, index) => (
          <li
            key={index}
            className={`${
              pathname?.includes("" + item?._id)
                ? "bg-[#312F2F]"
                : "hover:bg-[#322727]"
            } rounded-lg p-3 flex gap-3 h-[70px] items-center justify-start cursor-pointer overflow-hidden`}
            onClick={() =>
              pathname !== "/" + item._id && navigate("/" + item._id)
            }
          >
            <div className="relative ">
              <img
                src={item?.avatar}
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
              {user &&
                item?.members?.findIndex(
                  (i: any) => userOnline.includes(i._id) && user?._id !== i._id
                ) !== -1 && (
                  <div className="w-3 h-3 rounded-full bg-green-500 absolute top-0 right-0"></div>
                )}
            </div>
            <div className="flex flex-col font-semibold text-xs gap-0.5 w-full">
              <span className="text-white">
                {item.type === "private"
                  ? item?.members.filter(
                      (member) => member._id !== user?._id
                    )[0]?.full_name
                  : item.name}
              </span>
              <p
                className={`${
                  !item?.latest_message?.status &&
                  item?.latest_message?.creator !== user?._id
                    ? "text-green-500"
                    : "text-[#767876]"
                } truncate`}
              >
                {item?.latest_message
                  ? item?.latest_message?.message ||
                    (item?.latest_message?.images.length > 0 && "File đính kèm")
                  : "Hãy gửi lời chào để bắt đầu cuộc hội thoại"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;
