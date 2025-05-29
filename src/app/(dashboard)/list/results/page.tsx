import FormModal from "@/app/_components/FormModal";
import ListPage from "@/app/_components/ListPage";

import { role } from "@/app/_lib/data";
import { PageProps } from "@/app/_Validators/searchParams-validator";
import useGetResults from "./useGetResults";
import { dateFormatter } from "@/app/_Validators/dateFormatter";

type ResultList = {
  id: number;
  score: number;
  student: {
    name: string;
    surname: string;
  };
  exam: {
    title: string;
    id: number;
    startTime: Date;
    endTime: Date;
    lessonId: number;
    lesson: {
      class: { name: string };
      teacher: { name: string; surname: string };
    };
  } | null;
  assignment: {
    title: string;
    id: number;
    startDate: Date;
    lessonId: number;
    lesson: {
      class: { name: string };
      teacher: { name: string; surname: string };
    };
  } | null;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
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

const renderRow = (item: ResultList) => {
  const assessment = item.exam || item.assignment;

  if (!assessment) return null;
  const isExam = "startTime" in assessment;

  return (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{assessment?.title}</td>
      <td>{item.student.name + " " + item.student.surname}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">
        {assessment?.lesson.teacher.name +
          " " +
          assessment?.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell">{assessment?.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {isExam
          ? dateFormatter(assessment.startTime)
          : dateFormatter(assessment.startDate)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" ||
            (role === "teacher" && (
              <>
                <FormModal table="result" type="update" data={item} />
                <FormModal table="result" type="delete" id={item.id} />
              </>
            ))}
        </div>
      </td>
    </tr>
  );
};

export default function Page({ searchParams }: PageProps) {
  const { getQuery, fetchData } = useGetResults();

  return (
    <ListPage<ResultList>
      title="All results"
      searchParams={searchParams}
      tableColumns={columns}
      renderRow={renderRow}
      getQuery={getQuery}
      fetchData={fetchData}
      createModal={<FormModal table="exam" type="create" />}
    />
  );
}
