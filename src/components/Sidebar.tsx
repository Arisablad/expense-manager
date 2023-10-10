import { BanknotesIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useUserStore } from "@/providers/ZusStore.tsx";

const NAVIGATION_ITEMS = [
  {
    title: "home",
    icon: HomeModernIcon,
  },
  {
    title: "expenses",
    icon: BanknotesIcon,
  },
  // {
  //   title: "settings",
  //   icon: Cog8ToothIcon,
  // },
];

function Sidebar() {
  const user = useUserStore((state) => state.user);
  if (user?.bankAccounts?.length === 0) {
    return null;
  }
  return (
    <div
      className={
        "hidden md:flex bg-secondaryColor w-96 justify-center rounded-xl"
      }
    >
      <div className={"mt-12 flex flex-col gap-4 text-white"}>
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            className={
              "text-xl rounded-3xl py-4 px-6 flex items-center justify-start w-full space-x-2 hover:bg-white/10 transition duration-300"
            }
            key={item.title}
            to={item.title.toLowerCase()}
          >
            <div>
              <item.icon className={"h-6 w-6 text-white"} />
            </div>
            <div>{`${item.title[0].toUpperCase()}${item.title.slice(1)}`}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
