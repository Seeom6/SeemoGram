import React from "react";
import { GoSearch } from "react-icons/go";
const SearchBar = () => {
  return (
    <div className="w-full py-2 px-4 ">
      <div className="w-full relative">
        <input
          type="text"
          placeholder={"Search"}
          className="w-full h-10 p-1 pl-14 rounded-lg bg-[#001b66] focus:border focus:border-white focus:outline-none"
        />
        <GoSearch className="absolute left-3 p-1 w-8 h-8 top-[4px] focus:border-none focus:outline-none"/>
      </div>
    </div>
  );
};

export default SearchBar;
