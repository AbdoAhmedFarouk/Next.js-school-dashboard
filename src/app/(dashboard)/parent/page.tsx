import BigCalendar from "@/app/_components/BigCalendar";
import PageWrapper from "@/app/_components/PageWrapper";

export default function Page() {
  return (
    <PageWrapper parentDivStyles="flex flex-1 gap-4 p-4 flex-col xl:flex-row">
      <PageWrapper.Left leftDivStyles="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (John Doe)</h1>
          <BigCalendar />
        </div>
      </PageWrapper.Left>

      <PageWrapper.Right rightDivStyles="w-full xl:w-1/3 flex flex-col gap-8" />
    </PageWrapper>
  );
}
