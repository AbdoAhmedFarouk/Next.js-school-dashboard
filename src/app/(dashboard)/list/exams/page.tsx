import { Exam } from "@prisma/client";
import useGetExams from "./useGetExams";

import FormContainer from "@/app/_components/FormContainer";
import ListPage from "@/app/_components/ListPage";

import { dateFormatter } from "@/app/_Validators/dateFormatter";
import { PageProps } from "@/app/_Validators/searchParams-validator";
import { getUserRole } from "@/app/_lib/utils";

type ExamList = Exam & {
  lesson: {
    teacher: { name: string; surname: string };
    subject: { name: string };
    class: { name: string };
  };
};

export default async function Page({ searchParams }: PageProps) {
  const { role, currentUserId } = await getUserRole();
  const { getQuery, fetchData } = useGetExams(role, currentUserId);

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
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: ExamList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        {item.lesson.subject.name}
      </td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell">{dateFormatter(item.startTime)}</td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table="exam" type="update" data={item} />
              <FormContainer table="exam" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <ListPage<ExamList>
      title="All exams"
      allowedRole="teacher"
      searchParams={searchParams}
      tableColumns={columns}
      renderRow={renderRow}
      getQuery={getQuery}
      fetchData={fetchData}
      createModal={<FormContainer table="exam" type="create" />}
    />
  );
}
