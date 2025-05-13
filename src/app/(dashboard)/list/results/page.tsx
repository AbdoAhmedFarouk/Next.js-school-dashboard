import ImageButton from "@/app/_components/ImageButton";
import Pagination from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";
import Table from "@/app/_components/Table";

import { resultsData, role } from "@/app/_lib/data";

type Result = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  type: "exam" | "assignment";
  date: string;
  score: number;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export default function Page() {
  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject}</td>
      <td>{item.student}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.date}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ||
            (role === "teacher" && (
              <>
                {/* <FormModal table="result" type="update" data={item} />
                <FormModal table="result" type="delete" id={item.id} /> */}
              </>
            ))}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white flex-1 rounded-md p-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold capitalize">
          All results
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

      <Table columns={columns} renderRow={renderRow} data={resultsData} />

      <Pagination />
    </div>
  );
}
