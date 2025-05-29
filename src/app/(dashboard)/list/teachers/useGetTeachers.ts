import prisma from "@/app/_lib/prisma";
import { ITEM_PER_PAGE } from "@/app/_Validators/settings";
import { Prisma } from "@prisma/client";

function useGetTeachers() {
  const getQuery = (params: {
    [key: string]: string;
  }): Prisma.TeacherWhereInput => {
    const query: Prisma.TeacherWhereInput = {};

    if (params.classId) {
      query.lessons = {
        some: { classId: parseInt(params.classId) },
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

  const fetchData = (query: Prisma.TeacherWhereInput, page: number) => {
    return prisma.$transaction([
      prisma.teacher.findMany({
        where: query,
        include: {
          subjects: true,
          classes: true,
        },
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (page - 1),
      }),

      prisma.teacher.count({ where: query }),
    ]);
  };
  return { getQuery, fetchData };
}

export default useGetTeachers;
