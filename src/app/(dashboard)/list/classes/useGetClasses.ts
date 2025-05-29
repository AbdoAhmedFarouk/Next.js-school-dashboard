import prisma from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/app/_Validators/settings";

function useGetClasses() {
  const getQuery = (params: {
    [key: string]: string;
  }): Prisma.ClassWhereInput => {
    const query: Prisma.ClassWhereInput = {};

    if (params.supervisorId) {
      query.supervisorId = params.supervisorId;
    }

    if (params.search) {
      query.name = {
        contains: params.search,
        mode: "insensitive",
      };
    }

    return query;
  };

  const fetchData = (query: Prisma.ClassWhereInput, page: number) => {
    return prisma.$transaction([
      prisma.class.findMany({
        where: query,
        include: { supervisor: true },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      }),

      prisma.class.count({ where: query }),
    ]);
  };

  return { getQuery, fetchData };
}

export default useGetClasses;
