import FormModal from "@/app/_components/FormModal";

import ListPage from "@/app/_components/ListPage";
import { role } from "@/app/_lib/data";
import { PageProps } from "@/app/_Validators/searchParams-validator";
import useGetClasses from "./useGetClasses";
import { Class, Teacher } from "@prisma/client";

type ClassList = Class & { supervisor: Teacher | null };

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  {
    header: "Grade",
    accessor: "grade",
    className: "hidden md:table-cell",
  },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: ClassList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">{item.capacity}</td>
    <td className="hidden md:table-cell">{item.name[0]}</td>
    <td className="hidden md:table-cell">
      {item.supervisor?.name + " " + item.supervisor?.surname}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="class" type="update" data={item} />
            <FormModal table="class" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

export default function Page({ searchParams }: PageProps) {
  const { getQuery, fetchData } = useGetClasses();

  return (
    <ListPage<ClassList>
      title="All classes"
      searchParams={searchParams}
      tableColumns={columns}
      renderRow={renderRow}
      getQuery={getQuery}
      fetchData={fetchData}
      createModal={<FormModal table="class" type="create" />}
    />
  );
}
