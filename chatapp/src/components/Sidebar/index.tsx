import { useEffect, useState } from "react";
import FriendList from "../ConversationList";
import InputSearch from "../InputSearch";
import { getConversations } from "../../store/features/conversationSlice";
import { useAppDispatch } from "../../store/store";

const MENU_GROUP = [
  { value: "", label: "All Chats" },
  { value: "group", label: "Group" },
  { value: "contacts", label: "Contacts" },
];

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const [selectOption, setSelectOption] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");

  useEffect(() => {
    dispatch(getConversations({ inputSearch, type: selectOption }));
  }, [selectOption, inputSearch]);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="dark:bg-[#1F1D1D] py-4 px-5 flex flex-col gap-4 h-full">
        <InputSearch
          value=""
          setValue={setInputSearch}
          placeholder="Search..."
        />
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-white text-xl">Message</span>
          <ul className="flex bg-black rounded-3xl p-1 justify-evenly m-auto w-full">
            {MENU_GROUP.map((item, index) => (
              <li
                key={index}
                onClick={() => setSelectOption(item.value)}
                className={`${
                  selectOption === item.value && "bg-[#1F1D1D]"
                } rounded-3xl px-2 py-2 text-sm flex-1 justify-center items-center flex  duration-300 cursor-pointer`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <FriendList />
      </div>
    </div>
  );
};

export default Sidebar;
