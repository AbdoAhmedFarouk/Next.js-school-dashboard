import { Parent, Student } from "@prisma/client";
import useGetParents from "./useGetParents";

import FormModal from "@/app/_components/FormModal";
import ListPage from "@/app/_components/ListPage";

import { PageProps } from "@/app/_Validators/searchParams-validator";
import { getUserRole } from "@/app/_lib/utils";

type ParentList = Parent & { students: Student[] };

export default async function Page({ searchParams }: PageProps) {
  const { page, ...queryParams } = searchParams;

  const { role } = await getUserRole();
  const { getQuery, fetchData } = useGetParents();

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student Names",
      accessor: "students",
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

  const renderRow = (item: ParentList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {item.students.map((student) => student.name).join(",")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="parent" type="update" data={item} />
              <FormModal table="parent" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <ListPage<ParentList>
      title="All parents"
      page={page}
      queryParams={queryParams}
      tableColumns={columns}
      renderRow={renderRow}
      getQuery={getQuery}
      fetchData={fetchData}
      createModal={<FormModal table="parent" type="create" />}
    />
  );
}
