"use client";
import { TEMPLATES } from "@/@types/types";
import FormSection from "@/components/client/FormSection";
import OutputSection from "@/components/client/OutputSection";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/helpers/AiModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/model";
import Tempelates from "@/utils/Tempelates";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/UsageContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditContext";

interface PageProps {
  params: {
    "content-slug": string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [aiModelOutput, setAiModelOutput] = useState<string>("");
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );

  const { updatedCredit, setUpdatedCredit } = useContext(
    UpdateCreditUsageContext
  );

  const { user } = useUser();

  // console.log("Params: ", params["content-slug"]);

  const selectedTemplate: TEMPLATES | any = Tempelates.find(
    (item: any) => item.slug === params["content-slug"]
  );

  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= Number(10000) && !userSubscription) {
      alert("Please Buy Some Tokens");
      router.push("/dashboard/billing");
      return;
    }
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;

    const FinalAiPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

    const result = await chatSession.sendMessage(FinalAiPrompt);

    setAiModelOutput(result.response.text());

    await saveIntoDatabase(
      formData,
      selectedTemplate?.slug,
      result.response.text()
    );

    // console.log("Result", result.response.text());
    setLoading(false);
    setUpdatedCredit(Date.now());
  };

  const saveIntoDatabase = async (
    formData: any,
    slug: any,
    aiResponse: string
  ) => {
    const result = await db.insert(AIOutput).values({
      formData: formData,
      tempelateSlug: slug,
      aiResponse: aiResponse,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD/MM/YY"),
    });

    // console.log("Result: ", result);
  };

  // console.log("User: ", user);

  // console.log("Selected Templates: ", selectedTemplate);

  return (
    <div>
      <Button
        onClick={() => router.push("/dashboard")}
        variant={"ghost"}
        className=" bg-transparent gap-5 py-5"
      >
        <ArrowLeft /> Back
      </Button>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
        {/* Text Editor */}
        <div className=" col-span-2">
          <OutputSection result={aiModelOutput} />
        </div>
        {/* Form Section */}

        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(value: any) => GenerateAIContent(value)}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Page;
