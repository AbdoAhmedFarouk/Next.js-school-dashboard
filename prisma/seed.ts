import { Day, PrismaClient, UserSex } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.admin.create({
      data: { id: "admin1", username: "admin1" },
    });
  } catch (e) {
    console.error("admin1", e);
  }
  try {
    await prisma.admin.create({
      data: { id: "admin2", username: "admin2" },
    });
  } catch (e) {
    console.error("admin2", e);
  }

  for (let i = 1; i <= 6; i++) {
    try {
      await prisma.grade.create({ data: { level: i } });
    } catch (e) {
      console.error(`grade ${i}`, e);
    }
  }

  for (let i = 1; i <= 6; i++) {
    try {
      await prisma.class.create({
        data: {
          name: `${i}A`,
          gradeId: i,
          capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
        },
      });
    } catch (e) {
      console.error(`class ${i}`, e);
    }
  }

  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];

  for (let i = 0; i < subjectData.length; i++) {
    try {
      await prisma.subject.create({ data: subjectData[i] });
    } catch (e) {
      console.error(`subject ${i + 1}`, e);
    }
  }

  for (let i = 1; i <= 15; i++) {
    try {
      await prisma.teacher.create({
        data: {
          id: `teacher${i}`,
          username: `teacher${i}`,
          name: `TName${i}`,
          surname: `TSurname${i}`,
          email: `teacher${i}@example.com`,
          phone: `123-456-789${i}`,
          address: `Address${i}`,
          bloodType: "A+",
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          subjects: { connect: [{ id: (i % 10) + 1 }] },
          classes: { connect: [{ id: (i % 6) + 1 }] },
          birthday: new Date(
            new Date().setFullYear(new Date().getFullYear() - 30)
          ),
        },
      });
    } catch (e) {
      console.error(`teacher ${i}`, e);
    }
  }

  for (let i = 1; i <= 30; i++) {
    const hour = 8 + ((i - 1) % 8);
    const startTime = new Date();
    startTime.setHours(hour, 0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setHours(hour + 1, 0, 0, 0);
    try {
      await prisma.lesson.create({
        data: {
          name: `Lesson${i}`,
          day: Day[
            Object.keys(Day)[
              Math.floor(Math.random() * Object.keys(Day).length)
            ] as keyof typeof Day
          ],
          startTime,
          endTime,
          subjectId: (i % 10) + 1,
          classId: (i % 6) + 1,
          teacherId: `teacher${(i % 15) + 1}`,
        },
      });
    } catch (e) {
      console.error(`lesson ${i}`, e);
    }
  }

  for (let i = 1; i <= 25; i++) {
    try {
      await prisma.parent.create({
        data: {
          id: `parentId${i}`,
          username: `parentId${i}`,
          name: `PName ${i}`,
          surname: `PSurname ${i}`,
          email: `parent${i}@example.com`,
          phone: `123-456-789${i}`,
          address: `Address${i}`,
        },
      });
    } catch (e) {
      console.error(`parent ${i}`, e);
    }
  }

  for (let i = 1; i <= 50; i++) {
    try {
      await prisma.student.create({
        data: {
          id: `student${i}`,
          username: `student${i}`,
          name: `SName${i}`,
          surname: `SSurname ${i}`,
          email: `student${i}@example.com`,
          phone: `987-654-321${i}`,
          address: `Address${i}`,
          bloodType: "O-",
          sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
          parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`,
          gradeId: (i % 6) + 1,
          classId: (i % 6) + 1,
          birthday: new Date(
            new Date().setFullYear(new Date().getFullYear() - 10)
          ),
        },
      });
    } catch (e) {
      console.error(`student ${i}`, e);
    }
  }

  for (let i = 1; i <= 10; i++) {
    try {
      await prisma.exam.create({
        data: {
          title: `Exam ${i}`,
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
          lessonId: (i % 30) + 1,
        },
      });
    } catch (e) {
      console.error(`exam ${i}`, e);
    }
  }

  for (let i = 1; i <= 10; i++) {
    try {
      await prisma.assignment.create({
        data: {
          title: `Assignment ${i}`,
          startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
          dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          lessonId: (i % 30) + 1,
        },
      });
    } catch (e) {
      console.error(`assignment ${i}`, e);
    }
  }

  for (let i = 1; i <= 10; i++) {
    try {
      await prisma.result.create({
        data: {
          score: 90,
          studentId: `student${i}`,
          ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }),
        },
      });
    } catch (e) {
      console.error(`result ${i}`, e);
    }
  }

  for (let i = 1; i <= 10; i++) {
    try {
      await prisma.attendance.create({
        data: {
          date: new Date(),
          present: true,
          studentId: `student${i}`,
          lessonId: (i % 30) + 1,
        },
      });
    } catch (e) {
      console.error(`attendance ${i}`, e);
    }
  }

  for (let i = 1; i <= 5; i++) {
    try {
      await prisma.event.create({
        data: {
          title: `Event ${i}`,
          description: `Description for Event ${i}`,
          startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
          endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
          classId: (i % 5) + 1,
        },
      });
    } catch (e) {
      console.error(`event ${i}`, e);
    }
  }

  for (let i = 1; i <= 5; i++) {
    try {
      await prisma.announcement.create({
        data: {
          title: `Announcement ${i}`,
          description: `Description for Announcement ${i}`,
          date: new Date(),
          classId: (i % 5) + 1,
        },
      });
    } catch (e) {
      console.error(`announcement ${i}`, e);
    }
  }

  for (let i = 1; i <= 10; i++) {
    try {
      await prisma.event.create({
        data: {
          title: `Special Event ${i}`,
          description: `This is a special event for class ${(i % 6) + 1}`,
          startTime: new Date(new Date().setHours(10 + (i % 5), 0, 0, 0)),
          endTime: new Date(new Date().setHours(11 + (i % 5), 0, 0, 0)),
          classId: (i % 6) + 1,
        },
      });
    } catch (e) {
      console.error(`event extra ${i}`, e);
    }
  }

  for (let i = 1; i <= 10; i++) {
    try {
      await prisma.announcement.create({
        data: {
          title: `Announcement ${i + 5}`,
          description: `Extra announcement for class ${(i % 6) + 1}`,
          date: new Date(),
          classId: (i % 6) + 1,
        },
      });
    } catch (e) {
      console.error(`announcement extra ${i}`, e);
    }
  }

  for (let i = 1; i <= 30; i++) {
    try {
      await prisma.attendance.create({
        data: {
          date: new Date(new Date().setDate(new Date().getDate() - (i % 7))),
          present: i % 3 !== 0,
          studentId: `student${(i % 50) + 1}`,
          lessonId: ((i * 2) % 30) + 1,
        },
      });
    } catch (e) {
      console.error(`attendance extra ${i}`, e);
    }
  }

  for (let i = 11; i <= 20; i++) {
    try {
      await prisma.assignment.create({
        data: {
          title: `Assignment ${i}`,
          startDate: new Date(
            new Date().setDate(new Date().getDate() - (i % 5))
          ),
          dueDate: new Date(new Date().setDate(new Date().getDate() + (i % 3))),
          lessonId: (i % 30) + 1,
        },
      });
    } catch (e) {
      console.error(`assignment extra ${i}`, e);
    }
  }

  for (let i = 11; i <= 20; i++) {
    try {
      await prisma.result.create({
        data: {
          score: 60 + (i % 40),
          studentId: `student${(i % 50) + 1}`,
          ...(i <= 15
            ? { examId: (i % 10) + 1 }
            : { assignmentId: (i % 10) + 1 }),
        },
      });
    } catch (e) {
      console.error(`result extra ${i}`, e);
    }
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
