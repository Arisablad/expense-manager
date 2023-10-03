import { Outlet } from "react-router-dom";
import React from "react";

function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className={"flex flex-col bg-blue-950"}>
        <div>NAVIGATION WILL BE THERE</div>
      </div>
      <Outlet>{children}</Outlet>;
    </>
  );
}

export default Layout;
