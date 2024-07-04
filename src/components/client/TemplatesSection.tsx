"use client";
import { TEMPLATES } from "@/@types/types";
import Tempelates from "@/utils/Tempelates";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const TemplatesSection = ({ userSearchInput }: any) => {
  const [templates, setTemplates] = useState(Tempelates);

  console.log(templates);

  useEffect(() => {
    // console.log("Template", userSearchInput);
    if (userSearchInput) {
      const filterData = Tempelates.filter((item: any) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplates(filterData);
    } else {
      setTemplates(Tempelates);
    }
  }, [userSearchInput]);

  return (
    <>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10 sm:grid-cols-1">
        {templates.map((item: TEMPLATES, index: number) => (
          <>
            {/* <h1>{item.aiPrompt}</h1> */}
            <Card
              name={item.name}
              aiPrompt={item.aiPrompt}
              slug={item.slug}
              desc={item.desc}
              icon={item.icon}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default TemplatesSection;
