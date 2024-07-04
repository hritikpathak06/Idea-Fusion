import { SearchIcon } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <>
      <div className=" w-full h-[10%] bg-gray-900 border flex items-center justify-between pl-4 pr-4">
        <div className=" flex gap-2 items-center w-auto bg-white p-2 rounded-md max-w-xl">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            className=" focus:outline-none"
          />
        </div>
        <div className=" text-white bg-blue-900 p-2 rounded-md cursor-pointer">
          <h2>Join With Us</h2>
        </div>
      </div>
    </>
  );
};

export default Navbar;
