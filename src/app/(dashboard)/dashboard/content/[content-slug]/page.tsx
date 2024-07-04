"use client";
import { TEMPLATES } from "@/@types/types";
import FormSection from "@/components/client/FormSection";
import OutputSection from "@/components/client/OutputSection";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/helpers/AiModel";
import Tempelates from "@/utils/Tempelates";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface PageProps {
  params: {
    "content-slug": string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const[loading,setLoading] = useState<boolean>(false);
  const[aiModelOutput,setAiModelOutput] = useState<string>("")
  // console.log("Params: ", params["content-slug"]);

  const selectedTemplate: TEMPLATES | any = Tempelates.find(
    (item: any) => item.slug === params["content-slug"]
  );

  const GenerateAIContent = async (formData: any) => {
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;

    const FinalAiPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

    const result = await chatSession.sendMessage(FinalAiPrompt);

    setAiModelOutput(result.response.text())

    // console.log("Result", result.response.text());
    setLoading(false);
  };

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
          <OutputSection result={aiModelOutput}/>
        </div>
        {/* Form Section */}

        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(value: any) => GenerateAIContent(value)}
          loading = {loading}
        />
      </div>
    </div>
  );
};

export default Page;
