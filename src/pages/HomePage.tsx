import MostlyLikedCategories from "@/components/MostlyLikedCategories.tsx";
import TransactionHistory from "@/components/TransactionHistory.tsx";
import { useEffect, useState } from "react";
import ExpensesService from "@/services/ExpensesService.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import { Expense } from "@/types/Expenses.types.ts";

function HomePage() {
  const { getExpenses } = ExpensesService();
  const [expenses, setExpenses] = useState<Expense[] | []>([]);
  const { toast } = useToast();

  useEffect(() => {
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
        setExpenses(res);
      })
      .catch((error) => {
        toast({
          title: `Error`,
          description: `${error.error || error.message}`,
          variant: "destructive",
          duration: 3000,
        });
      });
  }, []);

  return (
    <div className={"h-full w-full bg-primaryColor rounded-lg"}>
      <div className={"max-h-screen w-full flex p-4 gap-4"}>
        <div className={"flex flex-col w-full gap-8"}>
          <MostlyLikedCategories />
          <div className={"bg-blue-950 h-96 rounded-lg p-4"}>
            <h1 className={"text-3xl text-white"}>Here will be a graph</h1>
          </div>
        </div>
        <TransactionHistory expenses={expenses} />
      </div>
    </div>
  );
}

export default HomePage;
