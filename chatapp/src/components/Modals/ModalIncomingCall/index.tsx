import ModalFullScreen from "../ModalFullScreen";
import CameraIcon from "../../../assets/svg/CameraIcon";
import CloseRound from "../../../assets/svg/CloseRound";
import { useSocketContext } from "../../../Context/SocketProvider";
import { memo, useEffect } from "react";
import ringUrl from "../../../assets/music/ring.mp3";

const ModalIncomingCall = () => {
  const { name, receivingCall, answerCall, handleNoReply } = useSocketContext();
  const ring = new Audio(ringUrl);

  useEffect(() => {
    if (receivingCall) {
      ring.play();
      ring.volume = 0.5;
    }
  }, [receivingCall]);

  return (
    <>
      {receivingCall && (
        <ModalFullScreen className="">
          <div className="w-[300px] py-10 px-10 bg-[#1e1c31] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-gray-300/80 text-white flex flex-col items-center">
            <h4 className="text-base mb-5">Cuộc gọi đến</h4>
            <img
              src={""}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <h3 className="text-xl text-center my-2">
              {name} đang gọi cho bạn
            </h3>
            <p className="text-gray-400 w-full text-center mb-6 text-sm">
              Cuộc gọi sẽ bắt đầu ngay khi bạn chấp nhận
            </p>
            <div className="w-full flex justify-around">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500"
                onClick={() => {
                  ring.pause();
                  handleNoReply();
                }}
              >
                <CloseRound color="white" className="" />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500"
                onClick={() => {
                  ring.pause();
                  answerCall();
                }}
              >
                <CameraIcon color="white" className="scale-[0.6]" />
              </button>
            </div>
          </div>
        </ModalFullScreen>
      )}
    </>
  );
};

export default memo(ModalIncomingCall);
