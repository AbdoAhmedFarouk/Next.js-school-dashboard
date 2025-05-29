import FormModal from "@/app/_components/FormModal";
import ListPage from "@/app/_components/ListPage";

import { role } from "@/app/_lib/data";
import { PageProps } from "@/app/_Validators/searchParams-validator";
import { Assignment } from "@prisma/client";
import useGetAssignments from "./useGetAssignments";
import { dateFormatter } from "@/app/_Validators/dateFormatter";

type AssignmentList = Assignment & {
  lesson: {
    teacher: { name: string; surname: string };
    subject: { name: string };
    class: { name: string };
  };
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
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: AssignmentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td className="hidden md:table-cell">{dateFormatter(item.dueDate)}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" ||
          (role === "teacher" && (
            <>
              <FormModal table="assignment" type="update" data={item} />
              <FormModal table="assignment" type="delete" id={item.id} />
            </>
          ))}
      </div>
    </td>
  </tr>
);

export default function Page({ searchParams }: PageProps) {
  const { getQuery, fetchData } = useGetAssignments();

  return (
    <ListPage<AssignmentList>
      title="All assignments"
      searchParams={searchParams}
      tableColumns={columns}
      renderRow={renderRow}
      getQuery={getQuery}
      fetchData={fetchData}
      createModal={<FormModal table="exam" type="create" />}
    />
  );
}
