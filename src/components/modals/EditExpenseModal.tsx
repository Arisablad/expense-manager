import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Expense } from "@/types/Expenses.types.ts";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ExpenseSchema } from "@/models/ExpensesModes.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/providers/ZusStore.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import ExpensesService from "@/services/ExpensesService.tsx";

type EditExpenseModalProps = {
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  expense: Expense;
  blockButtons: boolean;
};

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

function EditExpenseModal({
  setDropdown,
  expense,
  blockButtons,
}: EditExpenseModalProps) {
  const expenseForm = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
      account: expense.account,
      type: expense.type,
      _id: expense._id,
      owner: expense.owner,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
    },
  });
  const globalAccounts = useUserStore((state) => state.globalAccounts);
  const globalExpenses = useUserStore((state) => state.globalExpenses);
  const setGlobalExpenses = useUserStore((state) => state.setGlobalExpenses);
  const { updateSingleExpense } = ExpensesService();
  const { toast } = useToast();

  const updateExpense = (data: z.infer<typeof ExpenseSchema>) => {
    updateSingleExpense(
      expense._id,
      data.name,
      data.type,
      data.account,
      data.amount,
      data.category,
    )
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
        setDropdown(false);
        if (data.type === "expense") {
          const chargingAccount = globalAccounts.find(
            (account) => account._id === data.account,
          );
          if (chargingAccount) {
            const editedExpenses = [
              ...globalExpenses.map((element) => {
                if (element._id === expense._id) {
                  return data;
                } else {
                  return element;
                }
              }),
            ];
            setGlobalExpenses(editedExpenses);
            chargingAccount.balance -= data.amount - expense.amount;
            // difference between current expense and new expense added to new expense account balance
          }
        } else {
          const chargingAccount = globalAccounts.find(
            (account) => account._id === data.account,
          );
          if (chargingAccount) {
            const editedExpenses = [
              ...globalExpenses.map((element) => {
                if (element._id === expense._id) {
                  return data;
                } else {
                  return element;
                }
              }),
            ];
            setGlobalExpenses(editedExpenses);
            chargingAccount.balance += data.amount - expense.amount;
          }
        }
      })
      .catch((error) => {
        toast({
          title: `Error`,
          description: `${error.error || error.message}`,
          variant: "destructive",
          duration: 3000,
        });
        return;
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={
            "border border-white rounded p-4 bg-blue-950 hover:bg-black/50 transition duration-300"
          }
          disabled={blockButtons}
        >
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
          <DialogDescription>
            Make changes to your expense here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...expenseForm}>
          <form
            onSubmit={expenseForm.handleSubmit(updateExpense)}
            className="grid gap-4 py-4"
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
                  <FormLabel>Category</FormLabel>
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
                  <FormLabel>Expense Type</FormLabel>
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
                  <FormLabel>Bank Account</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bank account to charge" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {globalAccounts?.map((bank) => (
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

            <DialogFooter>
              <Button
                type="submit"
                disabled={expenseForm.formState.isSubmitting}
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditExpenseModal;
