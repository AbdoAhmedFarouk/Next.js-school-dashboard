import Announcements from "./Announcements";
import EventCalendarContainer from "./EventCalendarContainer ";
import Performance from "./Performance";

type PageWrapperProps = {
  children: React.ReactNode;
  parentDivStyles: string;
};

function PageWrapper({ children, parentDivStyles }: PageWrapperProps) {
  return <div className={parentDivStyles}>{children}</div>;
}

function Left({
  children,
  leftDivStyles,
}: {
  children: React.ReactNode;
  leftDivStyles: string;
}) {
  return <div className={leftDivStyles}>{children}</div>;
}

function Right({
  children,
  showCalendar = false,
  showPerformance = false,
  showAnnouncements = true,
  rightDivStyles,
  dateParamData,
}: {
  children?: React.ReactNode;
  showCalendar?: boolean;
  showPerformance?: boolean;
  showAnnouncements?: boolean;
  rightDivStyles: string;
  dateParamData?: {
    id: number;
    title: string;
    startTime: Date;
    description: string;
    endTime: Date;
    classId: number | null;
  }[];
}) {
  return (
    <div className={rightDivStyles}>
      {children}
      {showCalendar && (
        <EventCalendarContainer dateParamData={dateParamData!} />
      )}
      {showPerformance && <Performance />}
      {showAnnouncements && <Announcements />}
    </div>
  );
}

PageWrapper.Left = Left;
PageWrapper.Right = Right;

export default PageWrapper;
