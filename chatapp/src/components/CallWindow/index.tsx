import "./styles.scss";
import ReactPlayer from "react-player";
import { memo, useEffect, useRef } from "react";
import { useSocketContext } from "../../Context/SocketProvider";
import PhoneIcon from "../../assets/svg/PhoneIcon";
import CloseRound from "../../assets/svg/CloseRound";
import { userSelector } from "../../store/selector/authSelector";
import { useSelector } from "react-redux";

const CallWindow = () => {
  const {
    leaveCall,
    callAccepted,
    userVideo,
    myVideo,
    isCalling,
    callEnded,
    noReply,
    handleNoReply,
    handleCallEnded,
  } = useSocketContext();

  const user = useSelector(userSelector);

  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      box.style.top = `${nextY}px`;
      box.style.left = `${nextX}px`;
    };

    box.addEventListener("mousedown", onMouseDown);
    box.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseUp);

    const cleanup = () => {
      box.removeEventListener("mousedown", onMouseDown);
      box.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseUp);
    };

    return cleanup;
  }, [boxRef.current, containerRef.current, isClicked.current]);

  return (
    <>
      {isCalling && (
        <div
          ref={containerRef}
          className="fixed top-20 right-3 video-call w-[301px] h-[227px]"
        >
          <div
            ref={boxRef}
            className="relative group/video w-full h-full border border-gray-300 rounded-2xl overflow-hidden"
          >
            {callAccepted && !callEnded ? (
              <>
                {userVideo && (
                  <ReactPlayer
                    url={userVideo}
                    width={"100%"}
                    height={"auto"}
                    playing
                    style={{ objectFit: "cover" }}
                  />
                )}
                <div className="absolute bottom-1 right-1 group-hover/video:bottom-12 duration-200">
                  {myVideo && (
                    <ReactPlayer
                      url={myVideo}
                      width={"120px"}
                      height={"auto"}
                      playing
                      muted
                    />
                  )}
                </div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <button
                    className="w-9 h-9 hidden group-hover/video:flex items-center justify-center rounded-full bg-red-500"
                    onClick={leaveCall}
                  >
                    <PhoneIcon color="white" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-full relative">
                  <img
                    src={user?.avatar}
                    alt=""
                    className="w-full h-full object-cover filter blur-[1px] rounded-2xl"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex flex-col items-center justify-center">
                    <img
                      src={user?.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    {noReply ? (
                      <span className="text-white">Không trả lời</span>
                    ) : (
                      <>
                        {callEnded ? (
                          <span className="text-white">
                            Cuộc gọi kết thúc...
                          </span>
                        ) : (
                          <span className="text-white">Đang gọi...</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <button
                    className="w-9 h-9 hidden group-hover/video:flex items-center justify-center rounded-full bg-red-500"
                    onClick={callEnded ? handleCallEnded : handleNoReply}
                  >
                    <CloseRound color="white" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(CallWindow);
