import logo from "@/assets/logo.png";
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
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast.ts";
import BankService from "@/services/BankService.tsx";
import { useEffect, useState } from "react";
import { ExpenseSchema } from "@/models/ExpensesModes.ts";

function CreateExpenseForm() {
  const { getBankAccounts } = BankService();
  const [banks, setBanks] = useState([]);

  const getAccounts = () => {
    return getBankAccounts()
      .then((data) => {
        if (data.error) {
          return Promise.reject(data.error);
        }
        setBanks(data.bankAccounts);
        return Promise.resolve(data);
      })
      .catch((err) => {
        return Promise.reject(err.response.data);
      });
  };

  console.log("banki", banks);

  useEffect(() => {
    getAccounts();
  }, []);

  const expenseForm = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {},
  });

  const createExpense = (data: z.infer<typeof ExpenseSchema>) => {
    console.log(data);
  };

  const { toast } = useToast();

  return (
    <div className=" h-screen w-full flex rounded-lg">
      <div className="bg-primaryColor h-full w-full shadow-xl p-10 flex flex-col gap-4 text-sm rounded-lg ">
        <Form {...expenseForm}>
          <form
            onSubmit={expenseForm.handleSubmit(createExpense)}
            className="bg-secondaryColor shadow-xl p-10 flex flex-col gap-4 text-sm w-full h-full text-white rounded-lg"
          >
            <FormField
              control={expenseForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>{/**/}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={expenseForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" type="password" {...field} />
                  </FormControl>
                  <FormDescription>{/**/}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={
                "bg-[#4F46E5] py-8 w-full md:py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
              }
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
