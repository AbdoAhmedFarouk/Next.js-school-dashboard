import React from "react";
import Announcements from "./Announcements";
import EventCalendar from "./EventCalendar";
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
}: {
  children?: React.ReactNode;
  showCalendar?: boolean;
  showPerformance?: boolean;
  showAnnouncements?: boolean;
  rightDivStyles: string;
}) {
  return (
    <div className={rightDivStyles}>
      {children}
      {showCalendar && <EventCalendar />}
      {showPerformance && <Performance />}
      {showAnnouncements && <Announcements />}
    </div>
  );
}

PageWrapper.Left = Left;
PageWrapper.Right = Right;

export default PageWrapper;
