import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankAccountSchema } from "@/models/BankAccountModels.ts";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast.ts";
import BankService from "@/services/BankService.tsx";
import { useUserStore } from "@/providers/ZusStore.tsx";
import { Bank } from "@/types/Banks.types.ts";
function CreateBankAccountForm() {
  const { createBankAccount } = BankService();
  const setBanks = useUserStore((state) => state.setGlobalAccounts);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const bankAccountForm = useForm<z.infer<typeof BankAccountSchema>>({
    resolver: zodResolver(BankAccountSchema),
    defaultValues: {
      name: "",
      balance: 0,
    },
  });

  const createNewAccount = (data: z.infer<typeof BankAccountSchema>) => {
    createBankAccount(data).then(
      (data: {
        bankAccounts: Bank;
        bankAccountsId: string;
        error: Record<string, never>;
      }) => {
        if (data.error) {
          toast({
            title: `Error`,
            description: `${data.error}`,
            duration: 3000,
            variant: "destructive",
          });
          return;
        }
        if (data.bankAccounts) {
          toast({
            title: `Success`,
            description: `Account created successfully`,
            duration: 3000,
            variant: "default",
          });
          setBanks([data.bankAccounts]);
          setUser({
            ...user,
            bankAccounts: [data.bankAccountsId],
          });
          return;
        }
      },
    );
  };

  return (
    <Card className={"bg-secondaryColor border-blue-400 text-white"}>
      <CardHeader>
        <CardTitle className={"text-center min-w-sm"}>
          Hello Looks like you're first time here
        </CardTitle>
        <CardDescription className={"text-center min-w-sm"}>
          Create your first bank account to track your expenses
        </CardDescription>
      </CardHeader>
      <CardContent className={"flex items-center justify-center"}>
        <Form {...bankAccountForm}>
          <form
            onSubmit={bankAccountForm.handleSubmit(createNewAccount)}
            className="border-solid border-blue-400 border-[0.5px] bg-secondaryColor shadow-xl p-10 flex flex-col gap-4 text-sm w-full text-white justify-center items-center md:max-w-xl rounded-lg"
          >
            <FormField
              control={bankAccountForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ING Bank"
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
              control={bankAccountForm.control}
              name="balance"
              render={({ field }) => (
                <FormItem className={"w-full"}>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"0"}
                      type={"number"}
                      className={"text-black"}
                      min={0}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{/**/}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={
                "bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
              }
            >
              {" "}
              Create Account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>{/*<p>Card Footer</p>*/}</CardFooter>
    </Card>
  );
}

export default CreateBankAccountForm;
