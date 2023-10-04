import MostlyLikedCategories from "@/components/MostlyLikedCategories.tsx";
import TransactionHistory from "@/components/TransactionHistory.tsx";

function HomePage() {
  return (
    <div className={"bg-green-600 h-full w-full"}>
      <div className={"bg-gray-400 max-h-screen w-full flex p-4 gap-4"}>
        <div className={"flex flex-col w-full gap-8"}>
          <MostlyLikedCategories />
          <div className={"bg-blue-500 h-96"}>
            <h1 className={"text-3xl text-white"}>Here will be a graph</h1>
          </div>
        </div>
        <TransactionHistory />
      </div>
    </div>
  );
}

export default HomePage;
