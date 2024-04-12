import { useEffect, useState } from "react";
import InputSearch from "../../components/InputSearch";
import ListUser from "./ListUser";
import { useAppDispatch } from "../../store/store";
import { getUserBySearch } from "../../store/features/userSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const [inputSearch, setInputSearch] = useState<string>("");

  useEffect(() => {
    dispatch(getUserBySearch(inputSearch));
  }, [inputSearch]);

  return (
    <div className="w-full h-full max-w-[500px] m-auto py-6 ">
      <div className="bg-[#1F1D1D] w-full h-full rounded-lg p-6 flex flex-col">
        <InputSearch
          value={inputSearch}
          setValue={setInputSearch}
          placeholder="Search..."
        />
        <div className="border-b-2 border-[#543639] m-4"></div>
        <ListUser />
      </div>
    </div>
  );
};

export default Search;
