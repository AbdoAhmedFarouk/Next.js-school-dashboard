import { Subject, Teacher } from "@prisma/client";
import useGetSubjects from "./useGetSubjects";

import FormContainer from "@/app/_components/FormContainer";
import ListPage from "@/app/_components/ListPage";

import { PageProps } from "@/app/_Validators/searchParams-validator";

type SubjectList = Subject & { teachers: Teacher[] };

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

export default function Page({ searchParams }: PageProps) {
  const { getQuery, fetchData } = useGetSubjects();

  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">
        {item.teachers.map((teacher) => teacher.name).join(",")}
      </td>
      <td>
        <div className="flex items-center gap-2">
          <FormContainer table="subject" type="update" data={item} />
          <FormContainer table="subject" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  return (
    <ListPage<SubjectList>
      title="All subjects"
      searchParams={searchParams}
      tableColumns={columns}
      renderRow={renderRow}
      getQuery={getQuery}
      fetchData={fetchData}
      createModal={<FormContainer table="subject" type="create" />}
    />
  );
}
