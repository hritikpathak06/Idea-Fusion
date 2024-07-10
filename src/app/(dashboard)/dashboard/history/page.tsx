import { db } from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import Tempelates from "@/utils/Tempelates";
import CopyButton from "@/components/client/CopyButton";
import { AIOutput } from "@/utils/model";

async function History() {
  const user = await currentUser();
  if (!user || !user.primaryEmailAddress?.emailAddress) return [];

  const HistoryList = await db
    .select()
    .from(AIOutput)
    .where(eq(AIOutput?.createdBy, user.primaryEmailAddress.emailAddress))
    .orderBy(desc(AIOutput.id));

  const GetTemplateName = (slug: string) => {
    const template: any = Tempelates?.find((item: any) => item.slug == slug);
    return template;
  };
  return (
    <div className="m-5 p-5 b rounded-lg bg-black">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">
        Search your previously generate AI content
      </p>
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2 text-black">TEMPLATE</h2>
        <h2 className="col-span-2  text-black">AI RESPONSE</h2>
        <h2 className=" text-black">DATE</h2>
        <h2 className=" text-black">WORDS</h2>
        <h2 className=" text-black">COPY</h2>
      </div>
      {HistoryList.map((item: any, index: number) => (
        <>
          <div className="grid grid-cols-7 my-5 py-3 px-3">
            <h2 className="col-span-2 flex gap-2 items-center">
              <Image
                src={GetTemplateName(item?.tempelateSlug)?.icon}
                width={25}
                height={25}
                alt="icon"
              />
              {/* {GetTemplateName(item.templateSlug)?.name} */}
              {item.tempelateSlug}
            </h2>
            <h2 className="col-span-2 line-clamp-3 mr-3">{item?.aiResponse}</h2>
            <h2>{item.createdAt}</h2>
            <h2>{item?.aiResponse.length}</h2>
            <h2>
              <CopyButton aiResponse={item.aiResponse} />
            </h2>
          </div>
          <hr />
        </>
      ))}
    </div>
  );
}

export default History;
