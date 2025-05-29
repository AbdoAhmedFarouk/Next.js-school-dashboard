import prisma from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/app/_Validators/settings";

function useGetSubjects() {
  const getQuery = (params: {
    [key: string]: string;
  }): Prisma.SubjectWhereInput => {
    const query: Prisma.SubjectWhereInput = {};

    if (params.search) {
      query.name = {
        contains: params.search,
        mode: "insensitive",
      };
    }

    return query;
  };

  const fetchData = (query: Prisma.SubjectWhereInput, page: number) => {
    return prisma.$transaction([
      prisma.subject.findMany({
        where: query,
        include: { teachers: true },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      }),

      prisma.subject.count({ where: query }),
    ]);
  };

  return { getQuery, fetchData };
}

export default useGetSubjects;
