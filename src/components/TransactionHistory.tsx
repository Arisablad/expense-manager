import React from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { ThreeDotsVertical } from "@/components/icons/SharedIcons.tsx";
import TransactionHistoryItem from "@/components/TransactionHistoryItem.tsx";

function TransactionHistory(props) {
  return (
    <div
      className={
        "hidden md:flex bg-amber-500 w-[600px] max-h-max flex-col gap-2 text-white overflow-y-scroll"
      }
    >
      <div
        className={
          "bg-blue-500 h-16 flex gap-3 items-center justify-center border-b-2 border-blue-900 border-solid"
        }
      >
        <CalendarDaysIcon className={"h-6 w-6"} />
        Your Transaction History
      </div>
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
      <TransactionHistoryItem />
    </div>
  );
}

export default TransactionHistory;
