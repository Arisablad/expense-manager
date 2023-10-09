import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast.ts";
import BankService from "@/services/BankService.tsx";
import { useEffect } from "react";
import { ExpenseSchema } from "@/models/ExpensesModes.ts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExpensesService from "@/services/ExpensesService.tsx";
import { useUserStore } from "@/providers/ZusStore.tsx";

const CATEGORIES = [
  "entertainment",
  "food",
  "groceries",
  "health",
  "home",
  "transportation",
  "bills",
  "utilities",
  "other",
];

const EXPENSE_TYPES = ["expense", "income"];

function CreateExpenseForm() {
  const { getBankAccounts } = BankService();
  const { addExpenseToDb } = ExpensesService();
  const { toast } = useToast();
  const setGlobalAccounts = useUserStore((state) => state.setGlobalAccounts);
  const globalAccounts = useUserStore((state) => state.globalAccounts);
  const globalExpenses = useUserStore((state) => state.globalExpenses);
  const setGlobalExpenses = useUserStore((state) => state.setGlobalExpenses);

  const getAccounts = () => {
    if (globalAccounts.length === 0) {
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
    }
  };

  useEffect(() => {
    if (globalAccounts.length === 0) {
      void getAccounts();
    }
  }, []);

  const expenseForm = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      name: "",
      amount: 0,
      category: "",
      account: "",
      type: "expense",
    },
  });

  const createExpense = (data: z.infer<typeof ExpenseSchema>) => {
    addExpenseToDb(data)
      .then((response) => {
        if (response.error) {
          toast({
            title: "Error",
            description: response.error,
            duration: 3000,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Success",
          description: "Expense Created",
          duration: 3000,
          variant: "default",
        });
        expenseForm.reset({
          name: "",
          amount: 0,
          category: "",
          account: "",
          type: "expense",
        });

        //Change balance of account according to type
        if (data.type === "expense") {
          const chargingAccount = globalAccounts.find(
            (account) => account._id === data.account,
          );
          if (chargingAccount) {
            chargingAccount.balance -= data.amount;
          }
        } else {
          const chargingAccount = globalAccounts.find(
            (account) => account._id === data.account,
          );
          if (chargingAccount) {
            chargingAccount.balance += data.amount;
          }
        }
        setGlobalExpenses([...globalExpenses, response]);
        // getAccounts();
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.error || error.message,
          duration: 3000,
          variant: "destructive",
        });
      });
  };

  // name, amount, category, account, type

  return (
    <div className=" h-full w-full flex rounded-lg">
      <div className="bg-primaryColor h-full w-full shadow-xl p-10 flex flex-col gap-4 text-sm rounded-lg items-center ">
        <Form {...expenseForm}>
          <form
            onSubmit={expenseForm.handleSubmit(createExpense)}
            className="w-full bg-secondaryColor shadow-xl p-2 flex flex-col gap-4 text-sm h-full text-white rounded-lg sm:w-2/3 sm:p-10"
          >
            <FormField
              control={expenseForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Spotify"
                      {...field}
                      className={"text-black"}
                    />
                  </FormControl>
                  <FormDescription>{/**/}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={expenseForm.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Price in zł"
                      type={"number"}
                      className={"text-black"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{/**/}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={expenseForm.control}
              name="category"
              render={({ field }) => (
                <FormItem className={"text-black"}>
                  <FormLabel className={"text-white"}>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={"p-10 sm:p-2.5"}>
                        <SelectValue placeholder="Select a category of expense" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem value={category} key={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Group your expenses by category later{" "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={expenseForm.control}
              name="type"
              render={({ field }) => (
                <FormItem className={"text-black"}>
                  <FormLabel className={"text-white"}>Expense Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type of expense" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {EXPENSE_TYPES.map((type) => (
                        <SelectItem value={type} key={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Group your expenses by type later{" "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={expenseForm.control}
              name="account"
              render={({ field }) => (
                <FormItem className={"text-black"}>
                  <FormLabel className={"text-white"}>Bank Account</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bank account to charge" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {globalAccounts?.length > 0 &&
                        globalAccounts.map((bank) => (
                          <SelectItem value={bank._id} key={bank._id}>
                            {`${bank.name} - ${bank.balance} zł`}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Group your expenses by bank account later{" "}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className={
                "bg-[#4F46E5] py-8 w-full md:py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196] transition duration-500 ease-in-out"
              }
              type={"submit"}
              disabled={expenseForm.formState.isSubmitting}
            >
              {" "}
              Create new expense
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreateExpenseForm;
