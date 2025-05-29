"use client";

import { ITEM_PER_PAGE } from "../_Validators/settings";
import { useCustomQuery } from "../_hooks/useUpdateSearchParams";

export default function Pagination({
  pageNumber,
  count,
}: {
  pageNumber: number;
  count: number;
}) {
  const { setQuery } = useCustomQuery();

  const hasPrev = ITEM_PER_PAGE * (pageNumber - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (pageNumber - 1) + ITEM_PER_PAGE < count;

  const changeUrl = (newPage: number) => {
    setQuery("page", newPage.toString());
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        onClick={() => changeUrl(pageNumber - 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold
        disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from(
          { length: Math.ceil(count / ITEM_PER_PAGE) },
          (_, index) => {
            const pageIndex = index + 1;
            return (
              <button
                key={pageIndex}
                onClick={() => changeUrl(pageIndex)}
                className={`px-2 rounded-sm ${
                  pageNumber === pageIndex ? "bg-lamaSky" : ""
                }`}
              >
                {pageIndex}
              </button>
            );
          }
        )}
      </div>
      <button
        disabled={!hasNext}
        onClick={() => changeUrl(pageNumber + 1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold
        disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
