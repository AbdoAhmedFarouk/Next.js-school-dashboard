import { ReactNode } from "react";
import Link from "next/link";

type ShortcutsCardProps = {
  children: ReactNode;
};

function ShortcutsCard({ children }: ShortcutsCardProps) {
  return (
    <div className="p-4 bg-white rounded-md">
      <h1 className="text-xl font-semibold">Shortcuts</h1>
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
        {children}
      </div>
    </div>
  );
}

type ShortcutProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

function Shortcut({
  href,
  children,
  className = "bg-lamaSkyLight",
}: ShortcutProps) {
  return (
    <Link href={href} className={`capitalize p-3 rounded-md ${className}`}>
      {children}
    </Link>
  );
}

ShortcutsCard.Link = Shortcut;

export default ShortcutsCard;
