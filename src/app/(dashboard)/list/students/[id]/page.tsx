import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Class, Student } from "@prisma/client";

import prisma from "@/app/_lib/prisma";
import { getUserRole } from "@/app/_lib/utils";

import BigCalendarContainer from "@/app/_components/BigCalendarContainer";
import PageWrapper from "@/app/_components/PageWrapper";
import ShortcutsCard from "@/app/_components/Shortcuts";
import FormContainer from "@/app/_components/FormContainer";

import { dateFormatter } from "@/app/_Validators/dateFormatter";
import StudentAttendanceCard from "@/app/_components/StudentAttendanceCard";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const { role } = await getUserRole();

  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });

  if (!student) {
    return notFound();
  }

  return (
    <PageWrapper parentDivStyles="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      <PageWrapper.Left leftDivStyles="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src={student.img || "/noAvatar.png"}
                alt=""
                width={144}
                height={144}
                className="size-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="capitalize font-semibold text-xl">
                  {student.name + " " + student.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="student" type="update" data={student} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>{dateFormatter(student.birthday)}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{student.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 flex items-center gap-2 lg:w-full 2xl:w-1/3">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{student.phone || "-"}</span>
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
              <Suspense fallback="loading...">
                <StudentAttendanceCard id={student.id} />
              </Suspense>
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
                  {student.class.name.charAt(0)}th
                </h1>
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
                <h1 className="text-xl font-semibold">
                  {student.class._count.lessons}
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
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white rounded-md p-4 h-[800px] capitalize">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendarContainer type="classId" id={student.class.id} />
        </div>
      </PageWrapper.Left>

      <PageWrapper.Right
        showPerformance
        rightDivStyles="w-full xl:w-1/3 flex flex-col gap-4"
      >
        <ShortcutsCard>
          <ShortcutsCard.Link
            href={`/list/lessons?classId=${student.class.id}`}
            className="bg-lamaSkyLight"
          >
            Student&apos;s Lessons
          </ShortcutsCard.Link>
          <ShortcutsCard.Link
            href={`/list/teachers?classId=${student.class.id}`}
            className="bg-lamaPurpleLight"
          >
            Student&apos;s teachers
          </ShortcutsCard.Link>
          <ShortcutsCard.Link
            href={`/list/exams?classId=${student.class.id}`}
            className="bg-lamaYellowLight"
          >
            Student&apos;s exams
          </ShortcutsCard.Link>
          <ShortcutsCard.Link
            href={`/list/assignments?classId=${student.class.id}`}
            className="bg-pink-50"
          >
            Student&apos;s assignments
          </ShortcutsCard.Link>
          <ShortcutsCard.Link
            href={`/list/results?studentId=${student.id}`}
            className="bg-lamaSkyLight"
          >
            Student&apos;s results
          </ShortcutsCard.Link>
        </ShortcutsCard>
      </PageWrapper.Right>
    </PageWrapper>
  );
}
