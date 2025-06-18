import { Class, Event } from "@prisma/client";
import useGetEvents from "./useGetEvents";

import FormModal from "@/app/_components/FormModal";
import ListPage from "@/app/_components/ListPage";

import { getUserRole } from "@/app/_lib/utils";
import { dateFormatter } from "@/app/_Validators/dateFormatter";
import { PageProps } from "@/app/_Validators/searchParams-validator";

type EventList = Event & { class: Class | null };

export default async function Page({ searchParams }: PageProps) {
  const { page, ...queryParams } = searchParams;

  const { role, currentUserId } = await getUserRole();
  const { getQuery, fetchData } = useGetEvents(role, currentUserId);

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
    {
      header: "Start Time",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    {
      header: "End Time",
      accessor: "endTime",
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

  const renderRow = (item: EventList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class?.name || "-"}</td>
      <td className="hidden md:table-cell">{dateFormatter(item.startTime)}</td>
      <td className="hidden md:table-cell">
        {item.startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>
      <td className="hidden md:table-cell">
        {item.endTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <ListPage<EventList>
      title="All events"
      page={page}
      queryParams={queryParams}
      tableColumns={columns}
      renderRow={renderRow}
      getQuery={getQuery}
      fetchData={fetchData}
      createModal={<FormModal table="event" type="create" />}
    />
  );
}
