import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import TransactionHistoryItem from "@/components/TransactionHistoryItem.tsx";
import { Expense } from "@/types/Expenses.types.ts";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownAZIcon } from "lucide-react";
type TransactionHistoryProps = {
  expenses: Expense[] | [];
  getExpenses: () => Promise<void>;
};

const sortedByOptions = [
  { name: "date", value: "date" },
  { name: "amount", value: "amount" },
  { name: "name", value: "name" },
];

function TransactionHistory({ expenses }: TransactionHistoryProps) {
  const [sortedBy, setSortBy] = useState("date");
  const sortExpensesBy = useMemo(() => {
    if (expenses && sortedBy === "date" && expenses.length > 0) {
      return expenses.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    }
    if (sortedBy === "amount" && expenses.length > 0) {
      return expenses.sort((a, b) => {
        return a.amount - b.amount;
      });
    }
    if (sortedBy === "name" && expenses.length > 0) {
      return expenses.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
  }, [sortedBy, expenses]);

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ArrowDownAZIcon
              className={
                "h-6 w-6 cursor-pointer hover:text-white/80 duration-300 transition"
              }
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Sorted By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortedBy} onValueChange={setSortBy}>
              {sortedByOptions.map((option) => (
                <DropdownMenuRadioItem value={option.value}>
                  {option.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {sortExpensesBy && sortExpensesBy.length > 0 ? (
        sortExpensesBy.map((expense) => (
          <TransactionHistoryItem expense={expense} />
        ))
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
