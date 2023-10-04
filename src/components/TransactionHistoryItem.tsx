import React from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { ThreeDotsVertical } from "@/components/icons/SharedIcons.tsx";

function TransactionHistoryItem(props) {
  return (
    <div
      className={
        "bg-blue-500 h-16 flex justify-between items-center px-4 border-b-2 border-blue-900 border-solid"
      }
    >
      <div className={"flex items-center gap-4"}>
        <CalendarDaysIcon className={"h-6 w-6"} />
        <div>
          <p>Burger King</p>
          <p>31 dec 2022</p>
        </div>
      </div>

      <div className={"flex items-center gap-4"}>
        <span className={"text-red-500"}>330 $</span>
        <span className={"text-red-500"}>
          <ThreeDotsVertical />
        </span>
      </div>
    </div>
  );
}

export default TransactionHistoryItem;
