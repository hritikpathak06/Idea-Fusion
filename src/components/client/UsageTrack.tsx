"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/model";
import { eq } from "drizzle-orm";
import { TotalUsageContext } from "@/app/(context)/UsageContext";

const UsageTrack = () => {
  const { user } = useUser();
  const [data, setData] = useState<any>([]);

  // const [totalUsage, setTotalUsage] = useState<number>(0);
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);

  useEffect(() => {
    async function fetchData() {
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const result: any = await db
            .select()
            .from(AIOutput)
            .where(
              eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress)
            );
          setData(result);
        } catch (error) {
          console.error("Error fetching history:", error);
        }
      }
    }
    fetchData();
  }, [user]);

  const getTotalUsage = async () => {
    let total: any = 0;

    data.forEach((element: any) => {
      total = total + Number(element.aiResponse.length);
    });

    setTotalUsage(total);
  };

  useEffect(() => {
    getTotalUsage();
  }, [data, user]);

  useEffect(() => {
    if (data.length > 0) {
      const aiResponses = data.map((item: any) => item.aiResponse);
      console.log("AI Responses:", aiResponses);
    }
  }, [data]);

  console.log("Data: ", data);

  console.log("Total: ", totalUsage);

  return (
    <>
      <div className="m-5">
        <div className=" bg-blue-700 text-white rounded-lg p-3 ">
          <h2 className=" font-bold">Credits Left</h2>
          <div className=" h-2 bg-[#9901f9] w-full rounded-full mt-3">
            <div
              className=" h-2 bg-white rounded-full"
              // style={{ width: (totalUsage / 10000) * 100 }}
              style={{
                width:
                  totalUsage / Number(10000) > 1
                    ? 100 + "%"
                    : (totalUsage / Number(10000)) * 100 + "%",
              }}
            ></div>
          </div>
          <h2 className=" text-sm my-2">{totalUsage}/10000 Credit Used</h2>
        </div>
        <Button className=" w-full my-3" variant="secondary">
          Upgrade
        </Button>
      </div>
    </>
  );
};

export default UsageTrack;
