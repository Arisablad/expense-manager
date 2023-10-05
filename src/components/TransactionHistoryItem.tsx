import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { ThreeDotsVertical } from "@/components/icons/SharedIcons.tsx";
import { Expense } from "@/types/Expenses.types.ts";

function TransactionHistoryItem({ expense }: { expense: Expense }) {
  return (
    <div
      className={
        "bg-secondaryColor h-16 flex justify-between items-center px-4 border-b-2 border-blue-900 border-solid"
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
        <span className={"text-red-500"}>{expense.amount} zł</span>
        <span className={"text-red-500"}>
          <ThreeDotsVertical />
        </span>
      </div>
    </div>
  );
}

export default TransactionHistoryItem;
