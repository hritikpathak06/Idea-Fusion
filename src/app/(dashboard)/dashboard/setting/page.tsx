import { UserProfile } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className=" w-full flex items-center justify-center h-full">
      {/* <h1>Setting Page</h1> */}
      <UserProfile/>
    </div>
  );
};

export default page;
