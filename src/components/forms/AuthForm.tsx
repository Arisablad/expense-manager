import logo from "@/assets/logo.png";

function AuthForm({ formType }: { formType: "login" | "register" }) {
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
          <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm">
            <div>
              <label
                className="text-gray-600 font-bold inline-block pb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                type="email"
                name="email"
                placeholder="mehedi@jaman.com"
              />
            </div>
            <div>
              <label
                className="text-gray-600 font-bold inline-block pb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                type="password"
                name="password"
                placeholder="******"
              />
            </div>
            <div className="flex">
              <div className="w-1/2">
                <input type="checkbox" name="remeberMe" />
                <label htmlFor="remeberMe">Remeber me</label>
              </div>
              <div className="w-1/2">
                <a className="font-bold text-blue-600" href="">
                  Forgot password ?
                </a>
              </div>
            </div>
            <div>
              <input
                className="bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                type="submit"
                value="Login"
              />
            </div>
            <div>
              <p className="text-center">Or continue with</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#1D9BF0] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]">
                Twitter
              </button>
              <button className="bg-[#24292F] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]">
                Github
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-10">
            Not a member?{" "}
            <a href="#" className="text-[#4F46E5] font-bold">
              Start a 14 day free trial
            </a>
          </p>
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
            Sign in to your account
          </h1>
          <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm">
            <div>
              <label
                className="text-gray-600 font-bold inline-block pb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                type="email"
                name="email"
                placeholder="mehedi@jaman.com"
              />
            </div>
            <div>
              <label
                className="text-gray-600 font-bold inline-block pb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2"
                type="password"
                name="password"
                placeholder="******"
              />
            </div>
            <div className="flex">
              <div className="w-1/2">
                <input type="checkbox" name="remeberMe" />
                <label htmlFor="remeberMe">Remeber me</label>
              </div>
              <div className="w-1/2">
                <a className="font-bold text-blue-600" href="">
                  Forgot password ?
                </a>
              </div>
            </div>
            <div>
              <input
                className="bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]"
                type="submit"
                value="Login"
              />
            </div>
            <div>
              <p className="text-center">Or continue with</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#1D9BF0] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]">
                Twitter
              </button>
              <button className="bg-[#24292F] w-1/2 py-1 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]">
                Github
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-10">
            Not a member?{" "}
            <a href="#" className="text-[#4F46E5] font-bold">
              Login now
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default AuthForm;
