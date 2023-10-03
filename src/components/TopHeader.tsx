import {
  HamburgerMenuIcon,
  ThreeDotsVertical,
} from "@/components/icons/SharedIcons.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/20/solid";
import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAVIGATION_ITEMS = [
  {
    title: "Home",
    icon: "some",
  },
  {
    title: "Explore",
    icon: "some",
  },
  {
    title: "Bell",
    icon: "some",
  },
  {
    title: "Messages",
    icon: "some",
  },
];

export default function TopHeader() {
  const [expand, setExpand] = useState(false);
  const expandMobileMenu = () => {
    setExpand(!expand);
  };

  return (
    // MOBILE HEADER
    <>
      {expand ? (
        <div className={"bg-primaryColor w-full h-12 md:hidden p-4"}>
          <div
            className={
              "flex items-center h-full gap-2 text-white font-medium justify-between"
            }
          >
            <HamburgerMenuIcon onClick={expandMobileMenu} />
            <span className={"text-2xl"}>Overview</span>
            <ThreeDotsVertical />
          </div>
        </div>
      ) : (
        <div
          className={
            "bg-primaryColor w-screen h-screen z-[50] fixed md:hidden text-white"
          }
        >
          <HamburgerMenuIcon
            onClick={expandMobileMenu}
            className={"absolute top-4 right-4"}
          />
          <div
            className={
              "bg-primaryColor w-full h-full flex flex-col items-center pt-14 text-white"
            }
          >
            <Link
              to={"/"}
              className={
                "flex justify-center gap-2 font-medium w-full p-2 rounded-md bg-secondaryColor hover:bg-secondaryColor/90 duration-300 ease-in-out"
              }
            >
              <UserIcon className={"h-6 w-6"} />
              <span>Overview</span>
            </Link>
          </div>
        </div>
      )}

      {/*  DESKTOP BAR */}
      <div
        className={
          "hidden md:flex justify-between items-center bg-primaryColor w-full h-12 p-4"
        }
      >
        <img
          src={logo}
          className="h-[40px] w-auto"
          alt="Expense Manager Logo"
        />
        <div className={"flex items-center gap-4"}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          Hi, Shad
        </div>
      </div>
    </>
  );
}
