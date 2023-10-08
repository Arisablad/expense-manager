import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function CreateBankAccountForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-center min-w-sm"}>
          Hello Looks like you're first time here
        </CardTitle>
        <CardDescription className={"text-center min-w-sm"}>
          Create your first bank account to track your expenses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

export default CreateBankAccountForm;
