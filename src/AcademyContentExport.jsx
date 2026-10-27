import React from "react";
import { allCourses } from "./AcademyPage";

const STORAGE_KEY = "nextora-academy-export-course-ids";

function csvCell(value) {
  const text =
    value == null
      ? ""
      : typeof value === "string"
        ? value
        : JSON.stringify(value);

  return `"${text.replace(/"/g, '""')}"`;
}

function downloadCsv(filename, headers, rows) {
  const csv = [
    headers.map(csvCell).join(","),
    ...rows.map((row) =>
      headers.map((key) => csvCell(row[key])).join(",")
    ),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getCourseIds() {
  let saved = {};

  try {
    saved = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );
  } catch {
    saved = {};
  }

  const ids = {};

  allCourses.forEach((course) => {
    ids[course.code] =
      saved[course.code] || crypto.randomUUID();
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));

  return ids;
}

function exportCourses() {
  const ids = getCourseIds();

  const rows = allCourses.map((course, index) => ({
    id: ids[course.code],
    code: course.code,
    department_id: course.departmentId,
    title: course.title,
    description: course.description,
    level: course.level,
    duration: course.duration,
    content: {},
    is_published: true,
    sort_order: index + 1,
  }));

  downloadCsv(
    "nextora-academy-courses.csv",
    [
      "id",
      "code",
      "department_id",
      "title",
      "description",
      "level",
      "duration",
      "content",
      "is_published",
      "sort_order",
    ],
    rows
  );
}

function exportLessons() {
  const ids = getCourseIds();
  const rows = [];

  allCourses.forEach((course) => {
    (course.sections || []).forEach((section, sectionIndex) => {
      (section.lessons || []).forEach((lesson, lessonIndex) => {
        rows.push({
          id: crypto.randomUUID(),
          course_id: ids[course.code],
          section_title: section.title || "",
          title: lesson.title || "",
          content: lesson.content || "",
          example: lesson.example || "",
          exercise: lesson.exercise || "",
          questions: lesson.questions || [],
          sort_order: sectionIndex * 1000 + lessonIndex + 1,
          is_published: true,
        });
      });
    });

    (course.lessons || []).forEach((lesson, index) => {
      rows.push({
        id: crypto.randomUUID(),
        course_id: ids[course.code],
        section_title: "General",
        title: lesson.title || "",
        content: lesson.content || "",
        example: lesson.example || "",
        exercise: lesson.exercise || "",
        questions: lesson.questions || [],
        sort_order: 100000 + index,
        is_published: true,
      });
    });
  });

  downloadCsv(
    "nextora-academy-lessons.csv",
    [
      "id",
      "course_id",
      "section_title",
      "title",
      "content",
      "example",
      "exercise",
      "questions",
      "sort_order",
      "is_published",
    ],
    rows
  );
}

export default function AcademyContentExport() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "40px auto",
        padding: 24,
        fontFamily: "Arial, sans-serif",
        color: "#24345B",
      }}
    >
      <h1>NEXTORA Academy Export</h1>

      <p>
        Prepare your existing course and lesson content
        for migration into Supabase.
      </p>

      <button
        onClick={exportCourses}
        style={{ padding: 14, marginRight: 10 }}
      >
        Export courses CSV
      </button>

      <button
        onClick={exportLessons}
        style={{ padding: 14 }}
      >
        Export lessons CSV
      </button>

      <p>
        Export both files using the same browser and
        device. The course IDs are saved locally so the
        lesson records can reference the exported courses.
      </p>

      <p>
        Keep the exported files private. Never include
        passwords or secret API keys.
            </p>
    </main>
  );
}
