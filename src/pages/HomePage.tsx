import MostlyLikedCategories from "@/components/MostlyLikedCategories.tsx";
import TransactionHistory from "@/components/TransactionHistory.tsx";
import { useEffect, useMemo, useState } from "react";
import ExpensesService from "@/services/ExpensesService.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import getMostlyLikedCategories from "@/utils/getMostlyLikedCategories.tsx";
import { cn } from "@/lib/utils.ts";
import ChartGenerator from "@/components/ChartGenerator.tsx";
import { useUserStore } from "@/providers/ZusStore.tsx";

const OPTIONS = ["asc", "desc"];

function HomePage() {
  const { getExpenses } = ExpensesService();
  const [active, setActive] = useState<string>("desc");
  const globalExpenses = useUserStore((state) => state.globalExpenses);
  const setGlobalExpenses = useUserStore((state) => state.setGlobalExpenses);
  const { toast } = useToast();
  // @ts-ignore
  const mostLikedCategories: [string, { count: number; total: number }][] =
    useMemo(() => {
      return getMostlyLikedCategories(globalExpenses, 3, active);
    }, [globalExpenses, active]);

  useEffect(() => {
    if (globalExpenses.length === 0) {
      getExpenses()
        .then((res) => {
          if (res.error) {
            toast({
              title: `Error`,
              description: `${res.error}`,
              variant: "destructive",
              duration: 3000,
            });
            return;
          }
          setGlobalExpenses(res);
        })
        .catch((error) => {
          toast({
            title: `Error`,
            description: `${error.error || error.message}`,
            variant: "destructive",
            duration: 3000,
          });
        });
    }
  }, []);

  return (
    <div className={"h-full w-full bg-primaryColor rounded-lg"}>
      <div className={"max-h-full w-full flex p-4 gap-4"}>
        <div className={"flex flex-col w-full gap-4"}>
          <div className={"flex flex gap-2"}>
            {OPTIONS.map((option) => {
              return (
                <button
                  key={option}
                  className={cn(
                    "bg-secondaryColor w-full h-12 rounded-lg flex justify-center items-center text-white hover:bg-black/60 transition duration-300",
                    {
                      "bg-blue-600 hover:bg-blue-600": option === active,
                    },
                  )}
                  onClick={() => {
                    setActive(option);
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <MostlyLikedCategories mostLikedCategories={mostLikedCategories} />
          <div
            className={
              "bg-blue-950 h-96 rounded-lg p-4 flex items-center justify-center w-full overflow-x-auto"
            }
          >
            {globalExpenses?.length > 0 ? (
              <ChartGenerator
                xAxisData={globalExpenses.map((expense) => expense.category)}
                yAxisData={globalExpenses.map((expense) => {
                  if (expense.type === "expense") {
                    return -expense.amount;
                  }
                  return expense.amount;
                })}
              />
            ) : (
              <div className={"text-center text-white"}>
                No transactions yet
              </div>
            )}
          </div>
        </div>
        <TransactionHistory
          expenses={globalExpenses}
          getExpenses={getExpenses}
        />
      </div>
    </div>
  );
}

export default HomePage;
