import BigCalendarContainer from "@/app/_components/BigCalendarContainer";
import PageWrapper from "@/app/_components/PageWrapper";
import prisma from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();

  const classItem = await prisma.class.findMany({
    where: { students: { some: { id: userId! } } },
  });

  return (
    <PageWrapper parentDivStyles="flex gap-4 p-4 flex-col xl:flex-row">
      <PageWrapper.Left leftDivStyles="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          <BigCalendarContainer type="classId" id={classItem[0]?.id} />
        </div>
      </PageWrapper.Left>

      <PageWrapper.Right
        rightDivStyles="w-full xl:w-1/3 flex flex-col gap-8"
        showCalendar
      />
    </PageWrapper>
  );
}
