import { Teacher } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";

import prisma from "@/app/_lib/prisma";
import { getUserRole } from "@/app/_lib/utils";

import BigCalendarContainer from "@/app/_components/BigCalendarContainer";
import FormContainer from "@/app/_components/FormContainer";
import PageWrapper from "@/app/_components/PageWrapper";
import ShortcutsCard from "@/app/_components/Shortcuts";
import { dateFormatter } from "@/app/_Validators/dateFormatter";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { role } = await getUserRole();

  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });

  if (!teacher) {
    return notFound();
  }

  return (
    <PageWrapper parentDivStyles="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      <PageWrapper.Left leftDivStyles="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={teacher.img || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="size-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">
                  {teacher.name + " " + teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={teacher} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{dateFormatter(teacher.birthday)}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{teacher.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{teacher.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex-1 flex gap-4 justify-between flex-wrap">
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
                <h1 className="text-xl font-semibold">
                  {teacher._count.subjects}
                </h1>
                <span className="text-sm text-gray-400">Branches</span>
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
                <h1 className="text-xl font-semibold">
                  {teacher._count.lessons}
                </h1>
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
                <h1 className="text-xl font-semibold">
                  {teacher._count.classes}
                </h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type="teacherId" id={teacher.id} />
        </div>
      </PageWrapper.Left>

      <PageWrapper.Right
        showPerformance
        rightDivStyles="w-full xl:w-1/3 flex flex-col gap-4"
      >
        <ShortcutsCard>
          <ShortcutsCard.Link
            href={`/list/classes?supervisorId=${teacher.id}`}
            className="bg-lamaSkyLight"
          >
            Teacher&apos;s Classes
          </ShortcutsCard.Link>
          <ShortcutsCard.Link
            href={`/list/students?teacherId=${teacher.id}`}
            className="bg-lamaPurpleLight"
          >
            Teacher&apos;s Students
          </ShortcutsCard.Link>
          <ShortcutsCard.Link
            href={`/list/lessons?teacherId=${teacher.id}`}
            className="bg-lamaYellowLight"
          >
            Teacher&apos;s Lessons
          </ShortcutsCard.Link>
          <ShortcutsCard.Link
            href={`/list/exams?teacherId=${teacher.id}`}
            className="bg-pink-50"
          >
            Teacher&apos;s Exams
          </ShortcutsCard.Link>
          <ShortcutsCard.Link
            href={`/list/assignments?teacherId=${teacher.id}`}
            className="bg-lamaSkyLight"
          >
            Teacher&apos;s Assignments
          </ShortcutsCard.Link>
        </ShortcutsCard>
      </PageWrapper.Right>
    </PageWrapper>
  );
}
