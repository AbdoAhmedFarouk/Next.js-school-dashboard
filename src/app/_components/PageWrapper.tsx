import Announcements from "./Announcements";
import EventCalendar from "./EventCalendar";

export default function PageWrapper({
  children,
  parentDivStyles,
  rightDivStyles,
  leftDivStyles,
  isCalenderShown,
}: {
  children: React.ReactNode;
  parentDivStyles: string;
  rightDivStyles: string;
  leftDivStyles: string;
  isCalenderShown: boolean;
}) {
  return (
    <div className={parentDivStyles}>
      <div className={leftDivStyles}>{children}</div>
      <div className={rightDivStyles}>
        {isCalenderShown && <EventCalendar />}
        <Announcements />
      </div>
    </div>
  );
}
