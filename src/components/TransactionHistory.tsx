import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import TransactionHistoryItem from "@/components/TransactionHistoryItem.tsx";
import { Expense } from "@/types/Expenses.types.ts";

type TransactionHistoryProps = {
  expenses: Expense[] | [];
  getExpenses: () => Promise<void>;
};
function TransactionHistory({ expenses }: TransactionHistoryProps) {
  return (
    <div
      className={
        "hidden xl:flex bg-blue-950 w-[600px] max-h-max flex-col gap-2 text-white overflow-y-auto rounded-lg"
      }
    >
      <div
        className={
          "bg-secondaryColor h-16 flex gap-3 items-center justify-center border-b-2 border-blue-900 border-solid"
        }
      >
        <CalendarDaysIcon className={"h-6 w-6"} />
        Your Transaction History
      </div>

      {expenses && expenses.length > 0 ? (
        expenses.map((expense) => <TransactionHistoryItem expense={expense} />)
      ) : (
        <div
          className={
            "bg-secondaryColor h-full flex gap-3 items-center justify-center border-b-2 border-blue-900 border-solid"
          }
        >
          Dont have expenses yet
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
