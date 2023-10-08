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
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast.ts";
import AuthService from "@/services/AuthService.tsx";
import { useUserStore } from "@/providers/ZusStore.tsx";
import { RegisterSchema, SignInSchema } from "@/models/AuthModels.ts";

function AuthForm({ formType }: { formType: "login" | "register" }) {
  const { registerUser, loginUser } = AuthService();
  const navigate = useNavigate(); // react-router-dom v6

  const setUser = useUserStore((state) => state.setUser);

  const registerForm = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
    },
  });

  const loginForm = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
    },
  });

  const { toast } = useToast();

  const createAccount = (data: z.infer<typeof RegisterSchema>) => {
    registerUser(data)
      .then((data) => {
        if (data.error) {
          toast({
            title: `Error`,
            description: `${data.error}`,
            duration: 3000,
            variant: "destructive",
          });
          return;
        }
        if (data.user) {
          setUser(data.user);
          navigate("/home");
          return;
        }

        toast({
          description: `${data.message}`,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: `${error.error}`,
        });
      });
  };

  const loginToAccount = (data: z.infer<typeof SignInSchema>) => {
    loginUser(data)
      .then((data) => {
        if (data.error) {
          toast({
            title: `Error`,
            description: `${data.error}`,
            duration: 3000,
            variant: "destructive",
          });
          return;
        }
        if (data.user) {
          setUser(data.user);
          navigate("/home");
          return;
        }

        toast({
          description: `${data.message}`,
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: `${error.error}`,
        });
      });
  };

  if (formType === "login") {
    return (
      <div className="bg-[#F9FAFB] h-screen w-screen flex items-center">
        <div className="h-max mx-auto flex flex-col items-center">
          <img
            className="h-[140px] w-[127px] mb-5"
            src={logo}
            alt="Expense Manager Logo"
          />
          <h1 className="text-xl font-bold text-center pb-10">
            Sign in to your account
          </h1>
          <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm ">
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(loginToAccount)}
                className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm w-full"
              >
                <FormField
                  control={loginForm.control}
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
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="shadcn"
                          type="password"
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
                  Sign in
                </Button>
              </form>
              <div className="flex">
                <div className="w-1/2">
                  <input type="checkbox" name="remeberMe" />
                  <label htmlFor="remeberMe">Remeber me</label>
                </div>
                <div className="w-1/2">
                  <span
                    className="font-bold text-blue-600 cursor-pointer"
                    onClick={() => {
                      toast({
                        variant: "destructive",
                        description: `Function Will be implemented soon`,
                      });
                    }}
                  >
                    Forgot password ?
                  </span>
                </div>
              </div>

              <div>
                <p className="text-center">Or continue with</p>
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-[#1D9BF0] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                  onClick={() => {
                    toast({
                      variant: "destructive",
                      description: `Function Will be implemented soon`,
                    });
                  }}
                >
                  Twitter
                </button>
                <button
                  className="bg-[#24292F] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                  onClick={() => {
                    toast({
                      variant: "destructive",
                      description: `Function Will be implemented soon`,
                    });
                  }}
                >
                  Github
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-10">
                Not a member?{" "}
                <Link to="/signup" className="text-[#4F46E5] font-bold">
                  Register here
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  if (formType === "register") {
    return (
      <div className="bg-[#F9FAFB] h-screen w-screen flex items-center">
        <div className="h-max mx-auto flex flex-col items-center">
          <img
            className="h-[140px] w-[127px] mb-5"
            src={logo}
            alt="Expense Manager Logo"
          />
          <h1 className="text-xl font-bold text-center pb-10">
            Create a new account
          </h1>
          <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm ">
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(createAccount)}
                className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm w-full"
              >
                {/*name, username, email, password*/}
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your first Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        {/*This is your public display name.*/}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        {/*This is your public display name.*/}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="shadcn"
                          type={"password"}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {/*This is your public display name.*/}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="repeatPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repeat Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="shadcn"
                          type={"password"}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {/*This is your public display name.*/}
                      </FormDescription>
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
              <div>
                <p className="text-center">Or continue with</p>
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-[#1D9BF0] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                  onClick={() => {
                    toast({
                      variant: "destructive",
                      description: `Function Will be implemented soon`,
                    });
                  }}
                >
                  Twitter
                </button>
                <button
                  className="bg-[#24292F] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                  onClick={() => {
                    toast({
                      variant: "destructive",
                      description: `Function Will be implemented soon`,
                    });
                  }}
                >
                  Github
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-10">
                Already have account?{" "}
                <Link to="/signin" className="text-[#4F46E5] font-bold">
                  Login Here
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;
