import ImageButton from "@/app/_components/ImageButton";
import Pagination from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";
import Table from "@/app/_components/Table";

import { lessonsData, role } from "@/app/_lib/data";

type Lesson = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export default function Page() {
  const renderRow = (item: Lesson) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              {/* <FormModal table="lesson" type="update" data={item} />
              <FormModal table="lesson" type="delete" id={item.id} /> */}
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white flex-1 rounded-md p-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold capitalize">
          All lessons
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <SearchField
            parentDivStyles="w-full md:w-auto items-center gap-2 text-xs rounded-full
            ring-[1.5px] ring-gray-300 px-2 flex"
          />
          <div className="flex items-center gap-4 self-end">
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
            {role === "admin" && (
              <ImageButton
                btnStyles="size-8 flex items-center justify-center rounded-full
              bg-lamaYellow"
                img="/plus.png"
                width={14}
                height={14}
              />
            )}
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={lessonsData} />

      <Pagination />
    </div>
  );
}
