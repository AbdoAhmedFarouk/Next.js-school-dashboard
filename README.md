# School Dashboard

A modern school management dashboard built with Next.js, Prisma, PostgreSQL, and Clerk authentication. The app is designed to help schools manage students, teachers, classes, lessons, attendance, exams, assignments, announcements, and events from a single dashboard.

## What this app does

This project demonstrates a complete school administration experience with:

- Admin dashboard overview and management tools
- Student, teacher, and parent role-based views
- Student and teacher profiles with personal details
- Class and subject management
- Lesson scheduling and calendar-based planning
- Attendance tracking and performance insights
- Exams, assignments, and results management
- Announcements and school events
- Responsive UI with charts, cards, tables, and forms

## Key features

- Dashboard home with summary cards and charts
- List pages for students, teachers, parents, classes, subjects, exams, lessons, results, and announcements
- Add, edit, and delete forms for core school entities
- Interactive calendar for events and schedule visibility
- Role-based navigation for admin, student, teacher, and parent users
- Secure sign-in powered by Clerk

## Tech stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Clerk for authentication
- Recharts for analytics visuals
- React Big Calendar for scheduling

## Demo experience

Once the app is running, you can explore:

- The admin dashboard for school-wide insights and records
- Student pages for attendance, grades, and announcements
- Teacher pages for lessons, exams, and assignments
- Parent pages for child progress and school updates

## Test email:

- To sign in as an admin:
  - Username: admin
  - Password: admin
- To sign in as a teacher:
  - Username: teacher
  - Password: teacher
- To sign in as a student:
  - Username: student
  - Password: student
- To sign in as a parent:
  - Username: parent
  - Password: parent

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

The project already includes a local environment file with the database and Clerk credentials, but you can replace them with your own values if needed.

Make sure you have a PostgreSQL database available and set the following variables in your environment:

```env
DATABASE_URL="your_postgresql_connection_string"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
```

### 3. Run Prisma migrations

```bash
npx prisma migrate dev --name init
```

### 4. Seed the database

```bash
npx prisma db seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Lama Dev Youtube Channel](https://youtube.com/lamadev) 
- [Next.js](https://nextjs.org/learn)