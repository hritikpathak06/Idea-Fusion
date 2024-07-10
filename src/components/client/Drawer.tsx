"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import {
  CoinsIcon,
  GlobeIcon,
  HammerIcon,
  HomeIcon,
  PersonStanding,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UsageTrack from "./UsageTrack";

const MenuList = [
  {
    name: "Home",
    icon: <HomeIcon className="text-white" />,
    path: "/dashboard",
  },
  {
    name: "History",
    icon: <GlobeIcon className="text-white" />,
    path: "/dashboard/history",
  },
  {
    name: "Billing",
    icon: <CoinsIcon className="text-white" />,
    path: "/dashboard/billing",
  },
  {
    name: "Setting",
    icon: <SettingsIcon className="text-white" />,
    path: "/dashboard/setting",
  },
];

const Drawer = () => {
  const pathname = usePathname();

  console.log("Pathname", pathname);

  return (
    <>
      <div className="md:block hidden bg-gray-900 border h-screen relative ">
        <div className=" flex items-center justify-center pt-3">
          <Image
            src={"/logo.png"}
            height={200}
            width={100}
            alt="idead_fusion"
          />
        </div>
        <hr className=" mt-9" />

        <div className=" flex flex-col gap-5 mt-3 p-4">
          {MenuList.map((item, index) => (
            <>
              <Link href={item.path} key={index}>
                <div
                  className={`flex items-center gap-2 cursor-pointer hover:bg-blue-300 p-4 rounded-md ${
                    pathname === item.path ? "bg-blue-900" : ""
                  }`}
                >
                  {item.icon}
                  <h2 className=" text-white hover:text-gray-200">
                    {item.name}
                  </h2>
                </div>
              </Link>
            </>
          ))}
        </div>
        <div className="  text-white absolute  bottom-0  w-full">
          <UsageTrack />
        </div>
      </div>
    </>
  );
};

export const DrawerForMobileDevices = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="md:hidden block ">
        <Sheet>
          <SheetTrigger>
            <HammerIcon className=" h-5 w-5 text-white" />
          </SheetTrigger>
          <SheetContent className="bg-black">
            <SheetHeader>
              <SheetDescription>
                <h1>Hello</h1>
                <div className="  h-[95vh] relative ">
                  <div className=" flex items-center justify-center pt-3">
                    <Image
                      src={"/logo.png"}
                      height={200}
                      width={100}
                      alt="idead_fusion"
                    />
                  </div>
                  <hr className=" mt-9" />

                  <div className=" flex flex-col gap-5 mt-3 p-4">
                    {MenuList.map((item, index) => (
                      <>
                        <Link href={item.path} key={index}>
                          <div
                            className={`flex items-center gap-2 cursor-pointer hover:bg-blue-300 p-4 rounded-md ${
                              pathname === item.path ? "bg-blue-900" : ""
                            }`}
                          >
                            {item.icon}
                            <h2 className=" text-white hover:text-gray-200">
                              {item.name}
                            </h2>
                          </div>
                        </Link>
                      </>
                    ))}
                  </div>
                  <div className="  text-white absolute  bottom-0  w-full">
                    <UsageTrack />
                  </div>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Drawer;
