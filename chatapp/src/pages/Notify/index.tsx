import { useEffect, useState } from "react";
import ChatIcon from "../../assets/svg/ChatIcon";
import { friendService } from "../../services/FriendService";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selector/authSelector";
import { requestFriendsSelector } from "../../store/selector/friendSelector";
import { useAppDispatch } from "../../store/store";
import {
  confirmRequestAddFriend,
  getRequestAddFriend,
} from "../../store/features/friendSlice";

const Save = () => {
  const dispatch = useAppDispatch();
  const requestFriends = useSelector(requestFriendsSelector);

  useEffect(() => {
    dispatch(getRequestAddFriend());
  }, []);

  const handleConfirm = async (friendId: string, confirm: boolean) => {
    dispatch(confirmRequestAddFriend({ confirm, friendId }));
  };

  return (
    <div className="w-full max-w-lg h-full gap-4 p-4">
      <div className="bg-[#1F1D1D] rounded p-3 flex flex-col gap-3">
        <h3 className="text-xl px-2 mb-1">Thông báo</h3>
        <h4 className="text-md">Lời mời kết bạn</h4>
        {requestFriends?.length > 0 ? (
          <>
            <ul className="flex flex-col gap-2">
              {requestFriends?.map((item: any, index: number) => (
                <li key={index} className="p-4 rounded-md bg-[#2b2828]">
                  <div className="flex gap-1 items-center">
                    <div className="">
                      <img
                        src={item?.userId?.avatar}
                        alt=""
                        className="rounded-full object-cover h-16 w-16"
                      />
                    </div>
                    <div className="flex-1 ml-3">
                      <div className="mb-2">
                        {item?.userId?.full_name} đã gửi lời mời kết bạn
                      </div>
                      <div className="flex items-center gap-2">
                        {item.confirm ? (
                          <>
                            <button
                              className="w-full h-10 flex flex-1 items-center justify-center bg-[#2a353f] rounded-lg text-blue-500 cursor-default"
                              // onClick={() => handleAddFriend(item._id)}
                            >
                              Bạn bè
                            </button>
                            <button className="bg-[#1F1D1D] w-12 h-10 flex items-center justify-center rounded-lg hover:bg-[#353232]">
                              <ChatIcon color="#828485" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="w-full h-10 flex flex-1 items-center justify-center bg-[#3c66e3] rounded-lg text-white hover:bg-[#3c66e3e7]"
                              onClick={() =>
                                handleConfirm(item?.userId?._id, true)
                              }
                            >
                              Xác nhận
                            </button>
                            <button
                              className="w-full h-10 flex flex-1 items-center justify-center bg-[#2a353f] rounded-lg text-white hover:bg-[#3c4d5d]"
                              onClick={() =>
                                handleConfirm(item?.userId?._id, false)
                              }
                            >
                              Xóa
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="text-sm text-gray-500 px-3">
            Không có lời mời kết bạn nào
          </div>
        )}
        <h4 className="text-lg">Tin nhắn</h4>
      </div>
    </div>
  );
};

export default Save;
