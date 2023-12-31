import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import TopHeader from "@/components/TopHeader.tsx";
import Sidebar from "@/components/Sidebar.tsx";
import { useUserStore } from "@/providers/ZusStore.tsx";

function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div
        className={
          "min-w-screen min-h-full overflow-y-auto overflow-x-auto sm:overflow-x-hidden sm:overflow-y-hidden bg-primaryColor sm:max-h-screen"
        }
      >
        <TopHeader />
        <div className={"px-4 py-12 flex h-full md:h-[calc(100vh-80px)] gap-2"}>
          <Sidebar />
          <div className={"w-full min-h-full"}>
            <Outlet>{children}</Outlet>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
