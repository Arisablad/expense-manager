import { Outlet } from "react-router-dom";
import React from "react";
import TopHeader from "@/components/TopHeader.tsx";
import Sidebar from "@/components/Sidebar.tsx";

function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div
        className={
          "min-w-screen max-h-screen h-screen bg-red-300 overflow-y-hidden"
        }
      >
        <TopHeader />
        <div className={"px-4 py-12 flex h-full gap-2"}>
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
