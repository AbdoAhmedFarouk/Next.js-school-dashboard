import prisma from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/app/_Validators/settings";

function useGetStudents() {
  const getQuery = (params: {
    [key: string]: string;
  }): Prisma.StudentWhereInput => {
    const query: Prisma.StudentWhereInput = {};

    if (params.teacherId) {
      query.class = {
        lessons: { some: { teacherId: params.teacherId } },
      };
    }

    if (params.search) {
      query.name = {
        contains: params.search,
        mode: "insensitive",
      };
    }

    return query;
  };

  const fetchData = (query: Prisma.StudentWhereInput, page: number) => {
    return prisma.$transaction([
      prisma.student.findMany({
        where: query,
        include: { class: true },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      }),

      prisma.student.count({ where: query }),
    ]);
  };

  return { getQuery, fetchData };
}

export default useGetStudents;
