import React, { SetStateAction } from "react";
import SearchIcon from "../../assets/svg/SearchIcon";

interface InputSearchInterface {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  placeholder: string;
}

const InputSearch = ({ setValue, placeholder }: InputSearchInterface) => {
  return (
    <div className="h-12 p-2 rounded-3xl overflow-hidden bg-[#543639] flex items-center bg-opacity-50">
      <SearchIcon color="white" className="" />
      <input
        onChange={(e) => setValue(e.target.value)}
        // onKeyDown={(e) => handleOnEnter(e)}
        type="text"
        name="name"
        id="name"
        placeholder={placeholder}
        autoComplete="off"
        className="block rounded-md pl-3 bg-transparent placeholder:text-white placeholder:opacity-60 w-full focus:outline-none h-auto autofill:clear-none"
      ></input>
    </div>
  );
};

export default InputSearch;
