import {
  HamburgerMenuIcon,
  ThreeDotsVertical,
} from "@/components/icons/SharedIcons.tsx";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/20/solid";
import logo from "@/assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/providers/ZusStore.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useToast } from "@/components/ui/use-toast.ts";
import AuthService from "@/services/AuthService.tsx";

// const NAVIGATION_ITEMS = [
//   {
//     title: "Home",
//     icon: "some",
//   },
//   {
//     title: "Explore",
//     icon: "some",
//   },
//   {
//     title: "Bell",
//     icon: "some",
//   },
//   {
//     title: "Messages",
//     icon: "some",
//   },
// ];

export default function TopHeader() {
  const [expand, setExpand] = useState(false);
  const user = useUserStore((state) => state.user);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [position, setPosition] = useState("bottom");
  const { toast } = useToast();
  const { signOutUser } = useUserStore((state) => state);
  const { signOut } = AuthService();
  const navigate = useNavigate();
  const expandMobileMenu = () => {
    setExpand(!expand);
  };

  const logout = () => {
    signOut()
      .then(() => {
        toast({
          title: "Logged out successfully",
          duration: 3000,
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          duration: 3000,
          variant: "destructive",
        });
      });
    signOutUser();
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    // MOBILE HEADER
    <>
      {!expand ? (
        <div className={"bg-secondaryColor w-full h-12 md:hidden p-4"}>
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
            "bg-secondaryColor w-screen h-screen z-[50] fixed md:hidden text-white"
          }
        >
          <HamburgerMenuIcon
            onClick={expandMobileMenu}
            className={"absolute top-4 right-4"}
          />
          <div
            className={
              "bg-secondaryColor w-full h-full flex flex-col items-center pt-14 text-white"
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
          "hidden md:flex justify-between items-center bg-secondaryColor w-full h-18 p-4"
        }
      >
        <Link to={"/home"}>
          <img
            src={logo}
            className="h-[60px] w-auto hover:scale-[130%] duration-300"
            alt="Expense Manager Logo"
          />
        </Link>
        <div className={"flex items-center gap-4"}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar
                className={"cursor-pointer hover:scale-[130%] duration-300"}
              >
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  onClick={() => {
                    setDropdownMenu(!dropdownMenu);
                  }}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Additional options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem
                  value="top"
                  className={"cursor-pointer"}
                  onClick={() => {
                    logout();
                  }}
                >
                  Sign Out
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className={"text-amber-100"}> Hi {user.name}</span>
        </div>
      </div>
    </>
  );
}
