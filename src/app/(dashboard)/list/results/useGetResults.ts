import prisma from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/app/_Validators/settings";

function useGetResults(role: string | null, currentUserId: string | null) {
  const getQuery = (params: {
    [key: string]: string;
  }): Prisma.ResultWhereInput => {
    const query: Prisma.ResultWhereInput = {};

    if (params.studentId) {
      query.studentId = params.studentId;
    }

    if (params.search) {
      query.OR = [
        { exam: { title: { contains: params.search, mode: "insensitive" } } },
        { student: { name: { contains: params.search, mode: "insensitive" } } },
      ];
    }

    switch (role) {
      case "admin":
        break;
      case "teacher":
        query.OR = [
          { exam: { lesson: { teacherId: currentUserId! } } },
          { assignment: { lesson: { teacherId: currentUserId! } } },
        ];
        break;

      case "student":
        query.studentId = currentUserId!;
        break;

      case "parent":
        query.student = {
          parentId: currentUserId!,
        };
        break;
      default:
        break;
    }

    return query;
  };

  const fetchData = (query: Prisma.ResultWhereInput, page: number) => {
    return prisma.$transaction([
      prisma.result.findMany({
        where: query,
        include: {
          student: { select: { name: true, surname: true } },
          exam: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
          assignment: {
            include: {
              lesson: {
                select: {
                  class: { select: { name: true } },
                  teacher: { select: { name: true, surname: true } },
                },
              },
            },
          },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      }),

      prisma.result.count({ where: query }),
    ]);
  };

  return { getQuery, fetchData };
}

export default useGetResults;
