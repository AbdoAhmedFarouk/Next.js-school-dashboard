import AttendanceChartContainer from "@/app/_components/AttendanceChartContainer";
import CountChartContainer from "@/app/_components/CountChartContainer";
import FinanceChart from "@/app/_components/FinanceChart";
import PageWrapper from "@/app/_components/PageWrapper";
import UserCard from "@/app/_components/UserCard";
import prisma from "@/app/_lib/prisma";
import { PageProps } from "@/app/_Validators/searchParams-validator";

type EventType = {
  id: number;
  title: string;
  startTime: Date;
  description: string;
  endTime: Date;
  classId: number | null;
};

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: PageProps) {
  const { date } = searchParams;

  const isDate = date ? new Date(date) : new Date();

  const data: EventType[] = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(isDate!.setHours(0, 0, 0, 0)),
        lte: new Date(isDate!.setHours(23, 59, 59, 999)),
      },
    },
  });

  console.log(data);

  return (
    <PageWrapper parentDivStyles="flex gap-4 p-4 flex-col md:flex-row">
      <PageWrapper.Left leftDivStyles="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="parent" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </PageWrapper.Left>

      <PageWrapper.Right
        dateParamData={data}
        showCalendar
        rightDivStyles="w-full lg:w-1/3 flex flex-col gap-8"
      />
    </PageWrapper>
  );
}
