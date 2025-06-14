import { auth } from "@clerk/nextjs/server";

import PageWrapper from "@/app/_components/PageWrapper";
import BigCalendarContainer from "@/app/_components/BigCalendarContainer";

export default async function Page() {
  const { userId } = await auth();

  return (
    <PageWrapper parentDivStyles="flex flex-1 gap-4 p-4 flex-col xl:flex-row">
      <PageWrapper.Left leftDivStyles="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendarContainer id={userId!} type="teacherId" />
        </div>
      </PageWrapper.Left>

      <PageWrapper.Right rightDivStyles="w-full xl:w-1/3 flex flex-col gap-8" />
    </PageWrapper>
  );
}
