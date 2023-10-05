import {
  BanknotesIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const NAVIGATION_ITEMS = [
  {
    title: "home",
    icon: HomeModernIcon,
  },
  {
    title: "bills",
    icon: CreditCardIcon,
  },
  {
    title: "expenses",
    icon: BanknotesIcon,
  },
  {
    title: "settings",
    icon: Cog8ToothIcon,
  },
];

function Sidebar() {
  return (
    <div className={"hidden md:flex bg-amber-500 w-96 justify-center"}>
      <div className={"mt-12 flex flex-col gap-4"}>
        {NAVIGATION_ITEMS.map((item) => (
          <Link
            className={
              "text-xl rounded-3xl py-4 px-6 flex items-center justify-start w-full space-x-2 hover:bg-white/10 transition duration-300"
            }
            key={item.title}
            to={item.title.toLowerCase()}
          >
            <div>
              <item.icon className={"h-6 w-6 text-black"} />
            </div>
            <div>{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
