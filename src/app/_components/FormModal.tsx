"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";

import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "../_lib/actions";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
} as const;

type TableKey = keyof typeof deleteActionMap;

const TeacherForm = dynamic(() => import("./Forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./Forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});

const SubjectForm = dynamic(() => import("./Forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});

const ExamForm = dynamic(() => import("./Forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});

const ClassForm = dynamic(() => import("./Forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: Record<TableKey, (
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  type: "create" | "update",
  data?: any,
  relatedData?: any
) => JSX.Element> = {
  teacher: (setIsOpen, type, data, relatedData) => (
    <TeacherForm
      setIsOpen={setIsOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  student: (setIsOpen, type, data, relatedData) => (
    <StudentForm
      setIsOpen={setIsOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  subject: (setIsOpen, type, data, relatedData) => (
    <SubjectForm
      setIsOpen={setIsOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  class: (setIsOpen, type, data, relatedData) => (
    <ClassForm
      setIsOpen={setIsOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
  exam: (setIsOpen, type, data, relatedData) => (
    <ExamForm
      setIsOpen={setIsOpen}
      type={type}
      data={data}
      relatedData={relatedData}
    />
  ),
};

export default function FormModal({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setIsOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center
          justify-center"
        >
          <div
            className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%]
            xl:w-[50%] 2xl:w-[40%]"
          >
            <Form
              table={table as TableKey}
              data={data}
              type={type}
              id={id}
              relatedData={relatedData}
              setIsOpen={setIsOpen}
            />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Form = ({
  table,
  type,
  data,
  id,
  relatedData,
  setIsOpen,
}: FormContainerProps & { relatedData?: any } & {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [state, formAction] = useFormState(deleteActionMap[table as TableKey], {
    success: false,
    error: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`${table} has been deleted!`);
      setIsOpen(false);
      router.refresh();
    }
  }, [state, router, setIsOpen, table]);

  return type === "delete" && id ? (
    <form action={formAction} className="p-4 flex flex-col gap-4">
      <input type="number | text" name="id" value={id} hidden readOnly />
      <span className="text-center font-medium">
        All data will be lost. Are you sure you want to delete this {table}?
      </span>
      <button
        className="bg-red-700 text-white py-2 px-4 rounded-md border-none
          w-max self-center"
      >
        Delete
      </button>
    </form>
  ) : type === "create" || type === "update" ? (
    forms[table as TableKey](setIsOpen, type, data, relatedData)
  ) : (
    "Form not found!"
  );
};
