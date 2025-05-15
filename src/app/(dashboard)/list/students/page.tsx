import Image from "next/image";
import Link from "next/link";

import Pagination from "@/app/_components/Pagination";
import SearchField from "@/app/_components/SearchField";
import Table from "@/app/_components/Table";
import ImageButton from "@/app/_components/ImageButton";

import { role, studentsData } from "@/app/_lib/data";
import FormModal from "@/app/_components/FormModal";

type Student = {
  id: number;
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export default function Page() {
  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block size-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <ImageButton
              btnStyles="size-7 flex items-center justify-center rounded-full bg-lamaSky"
              img="/view.png"
              width={16}
              height={16}
            />
          </Link>
          {role === "admin" && (
            <FormModal table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white flex-1 rounded-md p-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold capitalize">
          All students
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
            {role === "admin" && <FormModal table="student" type="create" />}
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={studentsData} />

      <Pagination />
    </div>
  );
}
