"use client";
import SearchSection from "@/components/client/SearchSection";
import TemplatesSection from "@/components/client/TemplatesSection";
import React, { useState } from "react";

const page = () => {
  const [userSearchInput, setUserSearchInput] = useState<string>("");


  console.log("User Search: ",userSearchInput)

  return (
    <>
      <div>
        {/* search Section  */}
        <SearchSection onSearchInput={(value: string) => setUserSearchInput(value)} />
        {/* Template List Section */}
        <TemplatesSection userSearchInput = {userSearchInput}/>
      </div>
    </>
  );
};

export default page;
