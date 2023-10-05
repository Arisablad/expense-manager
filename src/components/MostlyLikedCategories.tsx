import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid";

function MostlyLikedCategories() {
  return (
    <div className={"w-full flex-col"}>
      <div className={"grid grid-cols-1 h-96 md:grid-cols-3 gap-4 md:h-40"}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={" flex justify-center items-center relative"}>
            <div
              className={
                "bg-secondaryColor w-full h-full flex justify-center flex-col py-4 px-8 text-white rounded-lg"
              }
            >
              <div>Food & drinks</div>
              <div>1251$</div>
            </div>
            <DevicePhoneMobileIcon
              className={"absolute bottom-0 right-[-1em] h-24 w-24 opacity-30"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostlyLikedCategories;
