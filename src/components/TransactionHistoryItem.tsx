import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { ThreeDotsVertical } from "@/components/icons/SharedIcons.tsx";
import { Expense } from "@/types/Expenses.types.ts";
import { useState } from "react";

function TransactionHistoryItem({ expense }: { expense: Expense }) {
  const [dropdown, setDropdown] = useState(false);

  return (
    <div
      className={
        "bg-secondaryColor h-16 flex justify-between items-center px-4 border-b-2 border-blue-900 border-solid relative"
      }
    >
      <div className={"flex items-center gap-4"}>
        <CalendarDaysIcon className={"h-6 w-6"} />
        <div>
          <p>{expense.name}</p>
          <p>{expense.createdAt}</p>
        </div>
      </div>

      <div className={"flex items-center gap-4"}>
        <span
          className={
            expense.type === "expense" ? "text-red-500" : "text-green-500"
          }
        >
          {expense.amount} zł
        </span>
        <span
          className={
            "text-white cursor-pointer hover:text-white/70 transition duration-300"
          }
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <ThreeDotsVertical />
        </span>
        {dropdown && (
          <div
            className={
              "absolute top-0 left-0 w-full h-full  bg-blue-950/90 z-50"
            }
          >
            <div className={"flex justify-center items-center h-full bg"}>
              <div className={"flex gap-2"}>
                <button
                  className={
                    "border border-white rounded p-4 bg-blue-950 hover:bg-black/50 transition duration-300"
                  }
                  onClick={() => {
                    setDropdown(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className={
                    "border border-white rounded p-4 bg-blue-950 hover:bg-black/50 transition duration-300"
                  }
                  onClick={() => {
                    setDropdown(false);
                  }}
                >
                  Delete
                </button>

                <button
                  className={
                    "border border-white rounded p-4 bg-blue-950 hover:bg-black/50 transition duration-300"
                  }
                  onClick={() => {
                    setDropdown(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionHistoryItem;
