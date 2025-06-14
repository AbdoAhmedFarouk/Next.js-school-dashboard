import Image from "next/image";
import Link from "next/link";

import { Class, Student } from "@prisma/client";
import useGetStudents from "./useGetStudents";

import ListPage from "@/app/_components/ListPage";
import FormContainer from "@/app/_components/FormContainer";
import ImageButton from "@/app/_components/ImageButton";

import { getUserRole } from "@/app/_lib/utils";
import { PageProps } from "@/app/_Validators/searchParams-validator";

type StudentList = Student & { class: Class };

export default async function Page({ searchParams }: PageProps) {
  const { role } = await getUserRole();
  const { getQuery, fetchData } = useGetStudents();

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
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: StudentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block size-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.class.name[0]}</td>
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
            <FormContainer table="student" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <ListPage<StudentList>
      title="All Students"
      searchParams={searchParams}
      tableColumns={columns}
      renderRow={renderRow}
      getQuery={getQuery}
      fetchData={fetchData}
      createModal={<FormContainer table="student" type="create" />}
    />
  );
}
