import { UserButton } from "@clerk/nextjs";
import { SearchIcon } from "lucide-react";
import React from "react";
import { DrawerForMobileDevices } from "./Drawer";

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
        <div className="md:block hidden">
          <UserButton />
        </div>
        <div className=" md:hidden">
          <DrawerForMobileDevices />
        </div>
      </div>
    </>
  );
};

export default Navbar;
