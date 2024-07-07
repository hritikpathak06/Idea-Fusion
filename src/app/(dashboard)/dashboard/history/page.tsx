"use client";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/model";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user } = useUser();
  const [aiOutputData, setAiOutputData] = useState<any>([]);

  useEffect(() => {
    const getAiOutputData = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const result = await db
            .select()
            .from(AIOutput)
            .where(
              eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress)
            );
          console.log("Data: ", result);
          setAiOutputData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    getAiOutputData();
  }, [user]);

  return (
    <div>
      <h1>History Page</h1>
    </div>
  );
};

export default page;
