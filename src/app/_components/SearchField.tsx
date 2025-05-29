"use client";

import Image from "next/image";
import { useCustomQuery } from "../_hooks/useUpdateSearchParams";

export default function SearchField({
  parentDivStyles,
}: {
  parentDivStyles: string;
}) {
  const { setQuery } = useCustomQuery();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = (e.currentTarget[0] as HTMLInputElement).value;

    value && setQuery("search", value);
  };
  return (
    <form onSubmit={handleSubmit} className={parentDivStyles}>
      <Image src="/search.png" width={14} height={14} alt="search" />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] bg-transparent p-2 outline-none"
      />
    </form>
  );
}
