import MostlyLikedCategories from "@/components/MostlyLikedCategories.tsx";
import TransactionHistory from "@/components/TransactionHistory.tsx";
import { useEffect, useMemo, useState } from "react";
import ExpensesService from "@/services/ExpensesService.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import getMostlyLikedCategories from "@/utils/getMostlyLikedCategories.tsx";
import { cn } from "@/lib/utils.ts";
import ChartGenerator from "@/components/ChartGenerator.tsx";
import { useUserStore } from "@/providers/ZusStore.tsx";
import BankService from "@/services/BankService.tsx";
import CreateBankAccountForm from "@/components/forms/CreateBankAccountForm.tsx";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OPTIONS = ["asc", "desc"];

function HomePage() {
  const { getExpenses } = ExpensesService();
  const [active, setActive] = useState<string>("desc");
  const globalExpenses = useUserStore((state) => state.globalExpenses);
  const setGlobalExpenses = useUserStore((state) => state.setGlobalExpenses);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getBankAccounts } = BankService();
  // @ts-ignore
  const mostLikedCategories: [string, { count: number; total: number }][] =
    useMemo(() => {
      return getMostlyLikedCategories(globalExpenses, 3, active);
    }, [globalExpenses, active]);
  const setGlobalAccounts = useUserStore((state) => state.setGlobalAccounts);
  const globalAccounts = useUserStore((state) => state.globalAccounts);
  const user = useUserStore((state) => state.user);
  const getAccounts = () => {
    return getBankAccounts()
      .then((data) => {
        if (data.error) {
          return Promise.reject(data.error);
        }
        // setBanks(data.bankAccounts);
        setGlobalAccounts(data.bankAccounts);
        return Promise.resolve(data);
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
  };

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

  useEffect(() => {
    if (globalAccounts.length === 0 && user.bankAccounts.length > 0) {
      void getAccounts();
    }
  }, []);

  if (user.bankAccounts.length === 0) {
    return <CreateBankAccountForm />;
  }

  return (
    <div className={"h-full w-full bg-primaryColor rounded-lg"}>
      <div className={"max-h-full w-full flex p-4 gap-4"}>
        <div className={"flex flex-col w-full gap-4"}>
          <div className={"flex flex gap-2"}>
            {mostLikedCategories.length > 0 &&
              OPTIONS.map((option) => {
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
          {mostLikedCategories.length > 0 ? (
            <MostlyLikedCategories mostLikedCategories={mostLikedCategories} />
          ) : (
            <></>
          )}
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
              <div
                className={
                  "flex justify-center items-center flex-col text-white gap-4"
                }
              >
                <p>No transactions yet</p>
                <PlusCircle
                  className={
                    "cursor-pointer w-16 h-16 text-green-500 hover:text-green-600/70 transition duration-300 transition"
                  }
                  onClick={() => {
                    navigate("/expenses");
                  }}
                />
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
