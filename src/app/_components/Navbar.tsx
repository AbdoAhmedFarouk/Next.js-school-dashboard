import Image from "next/image";
import SearchField from "./SearchField";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

export default async function Navbar() {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;

  return (
    <div className="flex items-center justify-between p-4">
      <SearchField
        parentDivStyles="hidden md:flex items-center gap-2 text-xs rounded-full
        ring-[1.5px] ring-gray-300 px-2"
      />

      <div className="flex items-center gap-6 justify-end w-full">
        <div
          className="bg-white rounded-full size-7 flex justify-center
          items-center cursor-pointer"
        >
          <Image src="/message.png" alt="" width={20} height={20} />
        </div>

        <div
          className="relative bg-white rounded-full size-7 flex justify-center
          items-center cursor-pointer"
        >
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div
            className="absolute -top-3 -right-3 size-5 flex items-center
            justify-center bg-purple-500 text-white rounded-full text-xs"
          >
            1
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">{role}</span>
        </div>

        <UserButton />
      </div>
    </div>
  );
}
