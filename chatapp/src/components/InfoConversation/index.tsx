import { useEffect, useMemo } from "react";
import { useAppContext } from "../../Context/AppProvider";
import { useParams } from "react-router-dom";
import RemoveFill from "../../assets/svg/RemoveFill";
import Info from "../../assets/svg/Info";

const InfoConversation = () => {
  const { conversations } = useAppContext();
  const { currentConversationId } = useParams();
  const currConversation = useMemo(() => {
    if (currentConversationId) {
      return conversations?.find((item) => item._id === currentConversationId);
    }
  }, [currentConversationId]);

  return (
    <div className="w-[400px] bg-[#1f1d1d] flex flex-col items-center px-3 py-8 gap-3">
      <img src={""} alt="" className="w-20 h-20 rounded-full" />
      <p>{currConversation?.name}</p>
      <ul className="w-full flex flex-col cursor-pointer mt-3">
        <li className="flex items-center gap-3 hover:bg-[#312F2F] p-2.5 rounded-lg">
          <span className="inline-block w-5">Aa</span> Chỉnh sửa biệt danh
        </li>
        <li className="flex items-center gap-3 hover:bg-[#312F2F] p-2.5 rounded-lg">
          <span className="inline-block w-5">
            <RemoveFill color="white" />
          </span>
          Chặn
        </li>
        <li className="flex items-center gap-3 hover:bg-[#312F2F] p-2.5 rounded-lg">
          <span className="inline-block w-5">
            <Info color="white" />
          </span>
          Báo cáo
        </li>
      </ul>
    </div>
  );
};

export default InfoConversation;
