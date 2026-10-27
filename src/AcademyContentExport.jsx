import React from "react";
import { allCourses } from "./AcademyPage";

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

export default function AcademyContentExport() {
  const exportCourses = () => {
    const courseIds = new Map();

    const rows = allCourses.map((course) => {
      const id = crypto.randomUUID();
      courseIds.set(course.code, id);

      return {
        id,
        code: course.code,
        department_id: course.departmentId,
        title: course.title,
        description: course.description,
        level: course.level,
        duration: course.duration,
        content: {
          sections: course.sections || [],
          lessons: course.lessons || [],
        },
        is_published: true,
        sort_order: 0,
      };
    });

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

    return courseIds;
  };

  const exportLessons = () => {
    const courseIds = new Map(
      allCourses.map((course) => [course.code, ""])
    );

    const savedIds = window.localStorage.getItem(
      "nextora-academy-export-course-ids"
    );

    if (savedIds) {
      Object.entries(JSON.parse(savedIds)).forEach(
        ([code, id]) => courseIds.set(code, id)
      );
    }

    if ([...courseIds.values()].some((id) => !id)) {
      alert(
        "Export the courses first, then save their course IDs before exporting lessons."
      );
      return;
    }

    const rows = [];

    allCourses.forEach((course) => {
      const sections = course.sections || [];

      sections.forEach((section, sectionIndex) => {
        (section.lessons || []).forEach((lesson, lessonIndex) => {
          rows.push({
            id: crypto.randomUUID(),
            course_id: courseIds.get(course.code),
            section_title: section.title || "",
            title: lesson.title || "",
            content: lesson.content || "",
            example: lesson.example || "",
            exercise: lesson.exercise || "",
            questions: lesson.questions || [],
            sort_order: sectionIndex * 1000 + lessonIndex,
            is_published: true,
          });
        });
      });

      (course.lessons || []).forEach((lesson, index) => {
        rows.push({
          id: crypto.randomUUID(),
          course_id: courseIds.get(course.code),
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
  };

  return (
    <main style={{
      maxWidth: 720,
      margin: "40px auto",
      padding: 24,
      fontFamily: "Arial, sans-serif",
      color: "#24345B",
    }}>
      <h1>NEXTORA Academy Export</h1>

      <p>
        Export existing courses and lessons for migration
        into Supabase.
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
        Keep both exported files private. Do not upload
        credentials or secret API keys.
      </p>
    </main>
  );
    }
