import AttendanceChart from "@/app/_components/AttendanceChart";
import CountChart from "@/app/_components/CountChart";
import FinanceChart from "@/app/_components/FinanceChart";
import PageWrapper from "@/app/_components/PageWrapper";
import UserCard from "@/app/_components/UserCard";

export default function Page() {
  return (
    <PageWrapper
      parentDivStyles="flex gap-4 p-4 flex-col md:flex-row"
      leftDivStyles="w-full lg:w-2/3 flex flex-col gap-8"
      rightDivStyles="w-full lg:w-1/3 flex flex-col gap-8"
      isCalenderShown={true}
    >
      <div className="flex gap-4 justify-between flex-wrap">
        <UserCard type="student" />
        <UserCard type="teacher" />
        <UserCard type="parent" />
        <UserCard type="staff" />
      </div>
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 h-[450px]">
          <CountChart />
        </div>
        <div className="w-full lg:w-2/3 h-[450px]">
          <AttendanceChart />
        </div>
      </div>
      <div className="w-full h-[500px]">
        <FinanceChart />
      </div>
    </PageWrapper>
  );
}
