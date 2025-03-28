"use client";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import PrimaryButton from "./components/common/PrimaryButton";
import { cn } from "@/utils";
import Link from "next/link";
import { whitepaper } from "./data/auctions";

const tabs = [
  {
    label: "Whitepaper",
    href: whitepaper,
    target: "_blank"
  },
  {
    label: "Playground",
    href: "/playground",
    target: "_blank"
  }
];

export default function Home() {
  const router = useRouter();

  return (
    <Box
      bg={"linear-gradient(180deg, #6457FD 0%, #E2A9FE 50%, #FFDFE1 100%);"}
      className="w-full h-screen relative flex items-center justify-between min-w-[1280px] overflow-x-auto"
    >
      <div className="flex items-center justify-between min-w-[1280px] max-w-[1728px] w-full mx-auto h-full relative">
        <img
          onClick={() => router.push("/")}
          className="h-10 absolute top-5 left-20"
          src="/images/logo-cream-pad.svg"
          alt=""
        />
        <div className="absolute left-0 right-0 w-fit h-auto mx-auto top-6 font-baloo2 font-bold flex items-center gap-10">
          {tabs.map((tab) => (
            <Link
              href={tab.href}
              target={tab.target}
              key={tab.label}
              className="text-white bg-[#121212] rounded-full px-6 py-2 no-underline hover:bg-[#292929] transition-all duration-300 hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <div className="ml-20 flex flex-col gap-24">
          <img className="w-[672px]" src="/images/welcome.png" alt="" />
          <div
            className={cn(
              "rounded-full cursor-not-allowed w-fit flex items-center gap-8 bg-white py-2 text-black pl-8 pr-3 font-baloo2 font-bold text-[32px]"
            )}
          >
            Coming Soon
            <img src="/images/coffee.svg" alt="" className="size-[54px]" />
          </div>
          {/* <PrimaryButton
            onClick={() => router.push("/auction")}
            className="h-[66px] w-[414px] text-[32px]/normal border-none gap-4 font-baloo2"
          >
            <img src="/images/action.svg" alt="" />
            Auction Now
          </PrimaryButton> */}
        </div>
        <img className="w-[660px] mr-20" src="/images/cloud.png" alt="" />
      </div>
    </Box>
  );
}
