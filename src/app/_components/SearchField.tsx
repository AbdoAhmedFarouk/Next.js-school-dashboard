import Image from "next/image";

export default function SearchField({
  parentDivStyles,
}: {
  parentDivStyles: string;
}) {
  return (
    <div className={parentDivStyles}>
      <Image src="/search.png" width={14} height={14} alt="search" />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] bg-transparent p-2 outline-none"
      />
    </div>
  );
}
