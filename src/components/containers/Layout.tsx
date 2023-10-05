import { Outlet } from "react-router-dom";
import React from "react";
import TopHeader from "@/components/TopHeader.tsx";
import Sidebar from "@/components/Sidebar.tsx";

function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <TopHeader />
      <div className={"min-w-screen min-h-screen h-full"}>
        <div className={"px-4 py-12 flex min-h-screen bg-primaryColor"}>
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
