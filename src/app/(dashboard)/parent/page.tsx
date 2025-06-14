import BigCalendarContainer from "@/app/_components/BigCalendarContainer";
import PageWrapper from "@/app/_components/PageWrapper";
import prisma from "@/app/_lib/prisma";
import { getUserRole } from "@/app/_lib/utils";

export default async function Page() {
  const { currentUserId } = await getUserRole();

  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });
  return (
    <PageWrapper parentDivStyles="flex flex-1 gap-4 p-4 flex-col xl:flex-row">
      <PageWrapper.Left leftDivStyles="w-full xl:w-2/3">
        {students.map((student) => (
          <div key={student.id} className="h-full bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">
              Schedule ({student.name + " " + student.surname})
            </h1>
            <BigCalendarContainer type="classId" id={student.classId} />
          </div>
        ))}
      </PageWrapper.Left>

      <PageWrapper.Right rightDivStyles="w-full xl:w-1/3 flex flex-col gap-8" />
    </PageWrapper>
  );
}
