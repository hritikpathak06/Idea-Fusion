"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/model";
import { eq } from "drizzle-orm";
import { TotalUsageContext } from "@/app/(context)/UsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditContext";
import { usePathname, useRouter } from "next/navigation";

const UsageTrack = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();
  const [data, setData] = useState<any>([]);
  const [maxWords, setMaxWords] = useState(10000);
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  const { updatedCredit, setUpdatedCredit } = useContext(
    UpdateCreditUsageContext
  );

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
  }, [user, updatedCredit]);

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
    IsUserSubscribed();
  }, [data]);

  const IsUserSubscribed = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.log("User email is not available");
      return;
    }
    const result = await db
      .select()
      .from(UserSubscription)
      .where(eq(UserSubscription.email, email));

    if (result) {
      setUserSubscription(true);
      setMaxWords(100000);
    }
  };

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
                  totalUsage / Number(maxWords) > 1
                    ? 100 + "%"
                    : (totalUsage / Number(maxWords)) * 100 + "%",
              }}
            ></div>
          </div>
          <h2 className=" text-sm my-2">
            {totalUsage}/{maxWords} Credit Used
          </h2>
        </div>
        <Button
          className=" w-full my-3"
          variant="secondary"
          onClick={() => router.push("/dashboard/billing")}
          disabled={pathname === "/dashboard/billing"}
        >
          Upgrade
        </Button>
      </div>
    </>
  );
};

export default UsageTrack;
