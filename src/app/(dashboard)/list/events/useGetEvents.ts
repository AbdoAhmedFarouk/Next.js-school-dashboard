import prisma from "@/app/_lib/prisma";
import { ITEM_PER_PAGE } from "@/app/_Validators/settings";
import { Prisma } from "@prisma/client";

function useGetEvents(currentUserId?: string | null, role?: string | null) {
  const getQuery = (params: {
    [key: string]: string;
  }): Prisma.EventWhereInput => {
    const query: Prisma.EventWhereInput = {};

    if (params.search) {
      query.title = {
        contains: params.search,
        mode: "insensitive",
      };
    }

    const roleConditions = {
      teacher: { lessons: { some: { teacherId: currentUserId! } } },
      student: { students: { some: { id: currentUserId! } } },
      parent: { students: { some: { parentId: currentUserId! } } },
    };

    query.OR = [
      { classId: null },
      {
        class: roleConditions[role as keyof typeof roleConditions] || {},
      },
    ];

    return query;
  };

  const fetchData = (query: Prisma.EventWhereInput, page: number) => {
    return prisma.$transaction([
      prisma.event.findMany({
        where: query,
        include: {
          class: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      }),

      prisma.event.count({ where: query }),
    ]);
  };

  return { getQuery, fetchData };
}

export default useGetEvents;
