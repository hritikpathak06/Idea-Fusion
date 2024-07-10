"use client";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditContext";
import { TotalUsageContext } from "@/app/(context)/UsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import Drawer from "@/components/client/Drawer";
import Navbar from "@/components/client/Navbar";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [userSubscription, setUserSubscription] = useState<boolean>(false);
  const [updatedCredit, setUpdatedCredit] = useState<any>();

  return (
    <html lang="en">
      <body className={inter.className}>
        <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
          <UserSubscriptionContext.Provider
            value={{ userSubscription, setUserSubscription }}
          >
            <UpdateCreditUsageContext.Provider value={{updatedCredit, setUpdatedCredit}}>
              <div className="flex">
                <div className=" md:w-[80%] w-full h-screen">
                  <Navbar />
                  <div className=" bg-black max-h-[90%] h-[90%] overflow-scroll text-white">
                    {children}
                  </div>
                </div>
                <div className="bg-blue-400 h-screen w-[20%] md:block hidden">
                  <Drawer />
                </div>

                {/* <div className=" w-full bg-gray-800 h-[8%]">
            <Navbar />
            <div className=" md:hidden block">
              <Drawer />
            </div>
          </div>
          <div className=" w-full bg-blue-200 h-[92%] flex">
            <div className=" md:w-[85%] w-full bg-green-300">{children}</div>
          </div> */}
              </div>
            </UpdateCreditUsageContext.Provider>
          </UserSubscriptionContext.Provider>
        </TotalUsageContext.Provider>
      </body>
    </html>
  );
}
