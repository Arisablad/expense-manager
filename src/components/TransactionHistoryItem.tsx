import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { ThreeDotsVertical } from "@/components/icons/SharedIcons.tsx";
import { Expense } from "@/types/Expenses.types.ts";
import { useState } from "react";
import ExpensesService from "@/services/ExpensesService.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import { useUserStore } from "@/providers/ZusStore.tsx";
import EditExpenseModal from "@/components/modals/EditExpenseModal.tsx";
import dayjs from "dayjs";
function TransactionHistoryItem({ expense }: { expense: Expense }) {
  const [dropdown, setDropdown] = useState(false);
  const { removeExpenseFromDb } = ExpensesService();
  const [blockButtons, setBlockButtons] = useState(false);
  const { toast } = useToast();
  const globalExpenses = useUserStore((state) => state.globalExpenses);
  const setGlobalExpenses = useUserStore((state) => state.setGlobalExpenses);
  const globalAccounts = useUserStore((state) => state.globalAccounts);

  const removeExpense = (
    id: string,
    type: string,
    account: string,
    amount: number,
  ) => {
    setBlockButtons(true);
    removeExpenseFromDb(id, type, account, amount)
      .then((response) => {
        setDropdown(false);
        if (response.error) {
          toast({
            title: "Error",
            description: response.error || response.message,
            variant: "destructive",
            duration: 3000,
          });
          return;
        }
        setGlobalExpenses(globalExpenses.filter((e) => e._id !== id));
        if (type === "expense") {
          const chargingAccount = globalAccounts.find(
            (currentAccount) => currentAccount._id === account,
          );
          if (chargingAccount) {
            chargingAccount.balance += amount;
          }
        } else {
          const chargingAccount = globalAccounts.find(
            (currentAccount) => currentAccount._id === account,
          );
          if (chargingAccount) {
            chargingAccount.balance -= amount;
          }
        }
        toast({
          title: "Expense deleted successfully",
          duration: 3000,
        });
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.error || error.message,
          variant: "destructive",
          duration: 3000,
        });
      })
      .finally(() => {
        setBlockButtons(false);
      });
  };

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
          <p>{dayjs(expense.createdAt).format("DD.MM.YYYY")}</p>
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
                <EditExpenseModal
                  setDropdown={setDropdown}
                  expense={expense}
                  blockButtons={blockButtons}
                />
                <button
                  className={
                    "border border-white rounded p-4 bg-blue-950 hover:bg-black/50 transition duration-300"
                  }
                  onClick={() => {
                    removeExpense(
                      expense._id,
                      expense.type,
                      expense.account,
                      expense.amount,
                    );
                    setDropdown(false);
                  }}
                  disabled={blockButtons}
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
                  disabled={blockButtons}
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
