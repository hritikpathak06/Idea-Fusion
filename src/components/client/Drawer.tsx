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
  HomeIcon,
  PersonStanding,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Drawer = () => {
  const pathname = usePathname();

  const MenuList = [
    {
      name: "Home",
      icon: <HomeIcon className="text-white" />,
      path: "/dashboard",
    },
    {
      name: "About",
      icon: <PersonStanding className="text-white" />,
      path: "/about",
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

  console.log("Pathname", pathname);

  return (
    <>
      <div className="md:hidden block">
        <Sheet>
          <SheetTrigger>Open</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden bg-gray-800 border h-screen ">
        <div className=" flex items-center justify-center pt-3">
          <Image
            src={"/logo.png"}
            height={200}
            width={100}
            alt="idead_fusion"
          />
        </div>

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
      </div>
    </>
  );
};

export default Drawer;
