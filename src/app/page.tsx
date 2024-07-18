"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center flex-col gap-10">
      <Image
        src={"/ideafusion.png"}
        alt="logo"
        className=" md:h-[70%] md:w-[80%] h-max w-max object-contain border-collapse rounded-xl border-x-slate-500 shadow-inner"
        height={600}
        width={600}
      />
      <Button
        onClick={() => router.push("/dashboard")}
        className=" bg-white text-black w-[30%] hover:bg-white"
      >
        Get Started
      </Button>
    </div>
  );
};

export default page;
