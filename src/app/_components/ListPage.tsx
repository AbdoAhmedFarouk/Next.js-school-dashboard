import Pagination from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";
import Table from "@/app/_components/Table";
import ImageButton from "@/app/_components/ImageButton";

import { getUserRole } from "../_lib/utils";

interface ListPageProps<T> {
  title: string;
  searchParams: { [key: string]: string | undefined };
  tableColumns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: T) => React.ReactNode;
  getQuery: (queryParams: { [key: string]: string }) => any;
  fetchData: (query: any, pageNumber: number) => Promise<[T[], number]>;
  createModal?: React.ReactNode;
  extraButtons?: React.ReactNode;
  allowedRole?: string;
}

export default async function ListPage<T>({
  title,
  searchParams,
  tableColumns,
  renderRow,
  getQuery,
  fetchData,
  createModal,
  extraButtons,
  allowedRole,
}: ListPageProps<T>) {
  const { page, ...queryParams } = searchParams;
  const { role } = await getUserRole();

  const pageNumber = page ? +page : 1;
  const isRoleAllowed = allowedRole?.includes(role!);

  const parsedQueryParams = Object.entries(queryParams).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) acc[key] = value;
      return acc;
    },
    {} as { [key: string]: string }
  );

  const query = getQuery(parsedQueryParams);
  const [data, count] = await fetchData(query, pageNumber);

  return (
    <div className="bg-white flex-1 rounded-md p-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold capitalize">
          {title}
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <SearchField
            parentDivStyles="w-full md:w-auto items-center gap-2 text-xs rounded-full
            ring-[1.5px] ring-gray-300 px-2 flex"
          />
          <div className="flex items-center gap-4 self-end">
            {extraButtons || (
              <>
                <ImageButton
                  btnStyles="size-8 flex items-center justify-center rounded-full
                  bg-lamaYellow"
                  img="/filter.png"
                  width={14}
                  height={14}
                />
                <ImageButton
                  btnStyles="size-8 flex items-center justify-center rounded-full
                  bg-lamaYellow"
                  img="/sort.png"
                  width={14}
                  height={14}
                />
              </>
            )}
            {(role === "admin" || isRoleAllowed) && createModal}
          </div>
        </div>
      </div>

      <Table columns={tableColumns} renderRow={renderRow} data={data} />

      <Pagination pageNumber={pageNumber} count={count} />
    </div>
  );
}
