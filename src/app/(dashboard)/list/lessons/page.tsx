import FormModal from "@/app/_components/FormModal";

import ListPage from "@/app/_components/ListPage";
import { role } from "@/app/_lib/data";
import { PageProps } from "@/app/_Validators/searchParams-validator";
import { Class, Lesson, Subject, Teacher } from "@prisma/client";
import useGetLessons from "./useGetLessons";

type LessonList = Lesson & {
  subject: { name: string };
  class: { name: string };
  teacher: { name: string; surname: string };
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

const renderRow = (item: LessonList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">
      {item.teacher.name + " " + item.teacher.surname}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="lesson" type="update" data={item} />
            <FormModal table="lesson" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

export default function Page({ searchParams }: PageProps) {
  const { getQuery, fetchData } = useGetLessons();

  return (
    <ListPage<LessonList>
      title="All lessons"
      searchParams={searchParams}
      tableColumns={columns}
      renderRow={renderRow}
      getQuery={getQuery}
      fetchData={fetchData}
      createModal={<FormModal table="lesson" type="create" />}
    />
  );
}
