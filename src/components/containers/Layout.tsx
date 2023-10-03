import { Outlet } from "react-router-dom";
import React from "react";
import TopHeader from "@/components/TopHeader.tsx";

function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <TopHeader />
      <div className={"min-w-screen min-h-screen h-full"}>
        <div className={"p-4 flex min-h-screen"}>
          <div className={"hidden md:flex bg-amber-500 w-36"}>Nav</div>
          <div className={"w-full min-h-full"}>
            <Outlet>{children}</Outlet>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
