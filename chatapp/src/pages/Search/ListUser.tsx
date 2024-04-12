import { useSelector } from "react-redux";
import ChatIcon from "../../assets/svg/ChatIcon";
import {
  addFriend,
  removeRequestFriend,
} from "../../store/features/friendSlice";
import { useAppDispatch } from "../../store/store";
import { userListSelector } from "../../store/selector/userSelector";
import { friendListSelector } from "../../store/selector/friendSelector";
import { useNavigate } from "react-router-dom";

const ListUser = () => {
  const userList = useSelector(userListSelector);
  const friendList = useSelector(friendListSelector);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleAddFriend = async (friendId: string) => {
    try {
      dispatch(addFriend(friendId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveRequestFriend = async (friendId: string) => {
    try {
      dispatch(removeRequestFriend(friendId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ul className="flex flex-col gap-3 relative overflow-y-scroll flex-1 pr-1">
      {userList?.map((item: any, index: number) => (
        <li key={index} className="p-3 rounded-md bg-[#2b2828]">
          <div className="flex items-center">
            <div className="">
              <img
                src={item?.avatar}
                alt=""
                className="rounded-full object-cover h-16 w-16"
              />
            </div>
            <div className="flex-1 ml-3">{item?.full_name}</div>
            <div className="basis-1/3">
              <div className="flex items-center gap-2">
                {friendList?.some((friend) => friend?._id === item._id) ? (
                  <>
                    {friendList?.some(
                      (friend) => friend?._id === item._id && friend.confirm
                    ) ? (
                      <>
                        <button
                          className="w-full h-10 flex flex-1 items-center justify-center bg-[#2a353f] rounded-lg text-blue-500 hover:bg-[#3c4d5d]"
                          onClick={() => handleAddFriend(item._id)}
                        >
                          Bạn bè
                        </button>
                        <button
                          className="bg-[#1F1D1D] w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#353232]"
                          onClick={() => navigate(`/${item._id}`)}
                        >
                          <ChatIcon color="#828485" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="w-full h-10 flex flex-1 items-center justify-center bg-[#2a353f] rounded-lg text-blue-500 hover:bg-[#3c4d5d]"
                          onClick={() => handleRemoveRequestFriend(item._id)}
                        >
                          Hủy lời mời
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <button
                    className="w-full h-10 flex flex-1 items-center justify-center bg-[#2a353f] rounded-lg text-blue-500 hover:bg-[#3c4d5d]"
                    onClick={() => handleAddFriend(item._id)}
                  >
                    Thêm bạn bè
                  </button>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListUser;
