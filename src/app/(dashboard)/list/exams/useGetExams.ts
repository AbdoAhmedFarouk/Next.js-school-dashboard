import prisma from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/app/_Validators/settings";

function useGetExams(role?: string | null, currentUserId?: string | null) {
  const getQuery = (params: {
    [key: string]: string;
  }): Prisma.ExamWhereInput => {
    const query: Prisma.ExamWhereInput = {};
    query.lesson = {};

    if (params.teacherId) {
      query.lesson = { teacherId: params.teacherId };
    }

    if (params.classId) {
      query.lesson = { classId: +params.classId };
    }

    if (params.search) {
      query.lesson.subject = {
        name: { contains: params.search, mode: "insensitive" },
      };
    }

    switch (role) {
      case "admin":
        break;
      case "teacher":
        query.lesson.teacherId = currentUserId!;
        break;
      case "student":
        query.lesson.class = {
          students: {
            some: {
              id: currentUserId!,
            },
          },
        };
        break;
      case "parent":
        query.lesson.class = {
          students: {
            some: {
              parentId: currentUserId!,
            },
          },
        };
        break;

      default:
        break;
    }

    return query;
  };

  const fetchData = (query: Prisma.ExamWhereInput, page: number) => {
    return prisma.$transaction([
      prisma.exam.findMany({
        where: query,
        include: {
          lesson: {
            select: {
              teacher: { select: { name: true, surname: true } },
              subject: { select: { name: true } },
              class: { select: { name: true } },
            },
          },
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      }),

      prisma.exam.count({ where: query }),
    ]);
  };

  return { getQuery, fetchData };
}

export default useGetExams;
