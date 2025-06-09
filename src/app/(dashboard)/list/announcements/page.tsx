import { Announcement, Class } from "@prisma/client";

import useGetAnnouncements from "./useGetAnnouncements";

import FormModal from "@/app/_components/FormModal";
import ListPage from "@/app/_components/ListPage";

import { getUserRole } from "@/app/_lib/utils";
import { dateFormatter } from "@/app/_Validators/dateFormatter";
import { PageProps } from "@/app/_Validators/searchParams-validator";

type AnnouncementList = Announcement & { class: Class | null };

export default async function Page({ searchParams }: PageProps) {
  const { role, currentUserId } = await getUserRole();
  const { getQuery, fetchData } = useGetAnnouncements(role, currentUserId);

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
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

  const renderRow = (item: AnnouncementList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class?.name || "-"}</td>
      <td className="hidden md:table-cell">{dateFormatter(item.date)}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="announcement" type="update" data={item} />
              <FormModal table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <ListPage<AnnouncementList>
      title="All Announcements"
      searchParams={searchParams}
      tableColumns={columns}
      renderRow={renderRow}
      getQuery={getQuery}
      fetchData={fetchData}
      createModal={<FormModal table="announcement" type="create" />}
    />
  );
}
