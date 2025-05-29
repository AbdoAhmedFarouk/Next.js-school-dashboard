import prisma from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/app/_Validators/settings";

function useGetLessons() {
  const getQuery = (params: {
    [key: string]: string;
  }): Prisma.LessonWhereInput => {
    const query: Prisma.LessonWhereInput = {};

    if (params.teacherId) {
      query.teacherId = params.teacherId;
    }

    if (params.classId) {
      query.classId = +params.classId;
    }

    if (params.search) {
      query.OR = [
        {
          subject: {
            name: {
              contains: params.search,
              mode: "insensitive",
            },
          },
        },
        {
          teacher: {
            name: {
              contains: params.search,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    return query;
  };

  const fetchData = (query: Prisma.LessonWhereInput, page: number) => {
    return prisma.$transaction([
      prisma.lesson.findMany({
        where: query,
        include: {
          subject: { select: { name: true } },
          class: { select: { name: true } },
          teacher: { select: { name: true, surname: true } },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      }),

      prisma.lesson.count({ where: query }),
    ]);
  };

  return { getQuery, fetchData };
}

export default useGetLessons;
