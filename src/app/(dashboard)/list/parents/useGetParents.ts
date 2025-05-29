import prisma from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/app/_Validators/settings";

function useGetParents() {
  const getQuery = (params: {
    [key: string]: string;
  }): Prisma.ParentWhereInput => {
    const query: Prisma.ParentWhereInput = {};

    if (params.search) {
      query.name = {
        contains: params.search,
        mode: "insensitive",
      };
    }

    return query;
  };

  const fetchData = (query: Prisma.ParentWhereInput, page: number) => {
    return prisma.$transaction([
      prisma.parent.findMany({
        where: query,
        include: { students: true },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      }),

      prisma.parent.count({ where: query }),
    ]);
  };

  return { getQuery, fetchData };
}

export default useGetParents;
