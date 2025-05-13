import Announcements from "@/app/_components/Announcements";
import BigCalendar from "@/app/_components/BigCalendar";
import PageWrapper from "@/app/_components/PageWrapper";
import Performance from "@/app/_components/Performance";
import ShortcutsCard from "@/app/_components/Shortcuts";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <PageWrapper parentDivStyles="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      <PageWrapper.Left leftDivStyles="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="size-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="capitalize font-semibold text-xl">salma ahmed</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>October 2025</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>1 234 456</span>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex-1 flex gap-4 justify-between flex-wrap capitalize">
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[47%] xl:w-[45%] 2xl:w-[47%]">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div>
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[47%] xl:w-[45%] 2xl:w-[47%]">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6th</h1>
                <span className="text-sm text-gray-400">grade</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[47%] xl:w-[45%] 2xl:w-[47%]">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div>
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[47%] xl:w-[45%] 2xl:w-[47%]">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
              <div>
                <h1 className="text-xl font-semibold">6A</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-md p-4 h-[800px] capitalize">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </PageWrapper.Left>

      <PageWrapper.Right
        showPerformance
        rightDivStyles="w-full xl:w-1/3 flex flex-col gap-4"
      >
        <ShortcutsCard>
          <ShortcutsCard.Link href="/" className="bg-lamaSkyLight">
            Student&apos;s Lessons
          </ShortcutsCard.Link>
          <ShortcutsCard.Link href="/" className="bg-lamaPurpleLight">
            Student&apos;s teachers
          </ShortcutsCard.Link>
          <ShortcutsCard.Link href="/" className="bg-lamaYellowLight">
            Student&apos;s exams
          </ShortcutsCard.Link>
          <ShortcutsCard.Link href="/" className="bg-pink-50">
            Student&apos;s assignments
          </ShortcutsCard.Link>
          <ShortcutsCard.Link href="/" className="bg-lamaSkyLight">
            Student&apos;s results
          </ShortcutsCard.Link>
        </ShortcutsCard>
      </PageWrapper.Right>
    </PageWrapper>
  );
}
