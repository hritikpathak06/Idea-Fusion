import { SearchIcon } from "lucide-react";
import React from "react";

const SearchSection = ({onSearchInput}:any) => {
  return (
    <>
      <div className=" p-10 bg-gradient-to-br from-gray-700 via-gray-500 flex items-center justify-center flex-col">
        <h2 className=" text-3xl font-extrabold">Search All Templates</h2>
        <p>What is in Your Mind..?</p>
        <div className=" w-full flex items-center justify-center">
          <div className=" flex gap-2 items-center p-2 border rounded-md bg-black my-5 w-[40%]">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search Templates"
              className=" bg-transparent focus:outline-none p-3"
              onChange={(e:any) => onSearchInput(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSection;
