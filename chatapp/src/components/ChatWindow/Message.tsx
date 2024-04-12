import { useSelector } from "react-redux";
import { MessageInterface } from "../../types";
import ImageGallery from "./ImageGallery";
import { userSelector } from "../../store/selector/authSelector";

interface MessageProps {
  data: MessageInterface;
}

const Message = ({ data }: MessageProps) => {
  const user = useSelector(userSelector);

  return (
    <li
      className={`w-full flex flex-col gap-2 ${
        data.creator === user?._id ? "my-message" : "friend-message"
      }`}
    >
      {data.message && (
        <div
          className={`w-full flex  ${
            data.creator._id === user?._id
              ? "justify-end my-message"
              : "justify-start gap-2 friend-message"
          }`}
        >
          {data.creator._id !== user?._id && (
            <div className="w-8 h-8">
              <img
                src={data.creator.avatar}
                alt=""
                className="w-full h-full rounded-full object-cover avatar"
              />
            </div>
          )}
          <div className="bg-[#312F2F] px-3 py-1 rounded-full max-w-[75%] group/message relative">
            {data.message}
            <div
              className={`${
                data.creator._id === user?._id
                  ? "left-0 -translate-x-full"
                  : "right-0 translate-x-full"
              } pointer-events-none group-hover/message:inline-block hidden absolute top-1/2 -translate-y-1/2 text-black bg-gray-300 rounded-lg p-1 duration-400 delay-200 ease-in-out`}
            >
              {"19:23"}
            </div>
          </div>
        </div>
      )}

      {/* image */}
      {data.images.length > 0 && (
        <div
          className={`w-full flex  ${
            data.creator._id === user?._id
              ? "justify-end my-message"
              : "justify-start gap-2 friend-message"
          }`}
        >
          {data.creator._id !== user?._id && (
            <div className="w-8 h-8">
              <img
                src={user?.avatar}
                alt=""
                className="w-full h-full rounded-full object-cover avatar"
              />
            </div>
          )}
          {data?.images.length > 0 && (
            <div className="max-w-[70%] group/image relative">
              <ImageGallery images={data?.images} />
              <div
                className={`${
                  data.creator === user?._id
                    ? "left-0 -translate-x-full"
                    : "right-0 translate-x-full"
                } pointer-events-none group-hover/image:inline-block hidden absolute top-1/2 -translate-y-1/2 text-black bg-gray-300 rounded-lg p-1 duration-400 delay-200 ease-in-out`}
              >
                {"19:23"}
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default Message;
