import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  BookOpen,
  CheckCircle,
  Award,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "./lib/supabaseclient";

const BUCKET = "academy-lessons";
const PASS_MARK = 70;
const PDF_COURSE_CODE = "NAC-AIF-001";

async function listPdfFiles(folderPath) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list(folderPath, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (error) throw error;

  const files = [];

  for (const item of data || []) {
    const path = `${folderPath}/${item.name}`;
    const isFolder = item.id === null && !item.metadata;

    if (isFolder) {
      files.push(...await listPdfFiles(path));
    } else if (item.name.toLowerCase().endsWith(".pdf")) {
      files.push({ name: item.name, path });
    }
  }

  return files;
}

export default function AcademyPdfLibrary({
  departmentCode,
  courseCode,
  onPdfCompleted,
}) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [activeFile, setActiveFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [readerLoading, setReaderLoading] = useState(false);

  const [stage, setStage] = useState("reading");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [completedFiles, setCompletedFiles] = useState([]);

  async function loadFiles() {
    if (!departmentCode) {
      setFiles([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");
    setNotice("");

    try {
      const results = await listPdfFiles(departmentCode);

const allowedPaths =
  COURSE_PDF_PATHS[courseCode] || [];

const courseFiles = results.filter((file) =>
  allowedPaths.includes(file.path)
);

setFiles(courseFiles);

      if (!results.length) {
        setNotice(
          "No PDF materials were found in this department yet."
        );
      }
    } catch (err) {
      setError(
        err.message || "Unable to load PDF materials."
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadCompletedFiles() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return;

    const { data, error } = await supabase
      .from("academy_pdf_student_progress")
      .select("file_path")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (!error) {
      setCompletedFiles(
        (data || []).map((row) => row.file_path)
      );
    }
  }

  useEffect(() => {
    loadFiles();
    loadCompletedFiles();
  }, [departmentCode]);

  async function openPdf(file) {
    setReaderLoading(true);
    setError("");
    setActiveFile(file);
    setStage("reading");
    setQuestions([]);
    setAnswers({});
    setResult(null);
    setPdfUrl("");

    try {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(file.path, 3600);

      if (error) throw error;

      setPdfUrl(data.signedUrl);
    } catch (err) {
      setError(
        err.message || "Unable to open this PDF."
      );
      setActiveFile(null);
    } finally {
      setReaderLoading(false);
    }
  }
    async function startAssessment() {
    setReaderLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("academy_pdf_assessments")
        .select("questions")
        .eq("file_path", activeFile.path)
        .maybeSingle();

      if (error) throw error;

      if (
        !data ||
        !Array.isArray(data.questions) ||
        !data.questions.length
      ) {
        setError(
          "An assessment has not yet been added for this PDF. Please check back later."
        );
        return;
      }

      setQuestions(data.questions);
      setAnswers({});
      setResult(null);
      setStage("quiz");
    } catch (err) {
      setError(
        err.message || "Could not load the assessment."
      );
    } finally {
      setReaderLoading(false);
    }
  }

  async function submitAssessment() {
    if (
      questions.some(
        (question, index) => answers[index] === undefined
      )
    ) {
      setError("Please answer every question before submitting.");
      return;
    }

    setSaving(true);
    setError("");

    const score = questions.filter(
      (question, index) =>
        Number(answers[index]) === Number(question.answer)
    ).length;

    const percentage = Math.round(
      (score / questions.length) * 100
    );

    const passed = percentage >= PASS_MARK;

    setResult({
      score,
      total: questions.length,
      percentage,
      passed,
    });

    if (!passed) {
      setSaving(false);
      return;
    }

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        throw new Error("Please log in to save your progress.");
      }

      const { error } = await supabase
        .from("academy_pdf_student_progress")
        .upsert(
          {
            user_id: user.id,
            file_path: activeFile.path,
            score: percentage,
            total_questions: questions.length,
            completed: true,
            completed_at: new Date().toISOString(),
          },
          {
            onConflict: "user_id,file_path",
          }
        );

      if (error) throw error;

      setCompletedFiles((previous) =>
        previous.includes(activeFile.path)
          ? previous
          : [...previous, activeFile.path]
      );

      if (
        courseCode === PDF_COURSE_CODE &&
        typeof onPdfCompleted === "function"
      ) {
        onPdfCompleted(activeFile.path);
      }
    } catch (err) {
      setError(
        err.message ||
          "Your result could not be saved. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  function closeReader() {
    setActiveFile(null);
    setPdfUrl("");
    setQuestions([]);
    setAnswers({});
    setResult(null);
    setStage("reading");
    setError("");
  }

  const styles = {
    container: {
      marginTop: "24px",
      padding: "20px",
      borderRadius: "18px",
      background: "#ffffff",
      border: "1px solid #e5e7eb",
      color: "#111827",
    },
    heading: {
      fontSize: "20px",
      fontWeight: "800",
      margin: "0 0 8px",
    },
    muted: {
      color: "#6b7280",
      fontSize: "13px",
      lineHeight: 1.6,
    },
    fileCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      padding: "14px",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      marginTop: "12px",
      flexWrap: "wrap",
    },
    button: {
      border: "none",
      borderRadius: "9px",
      padding: "10px 14px",
      background: "#2563eb",
      color: "#ffffff",
      fontWeight: "700",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "7px",
    },
    secondaryButton: {
      border: "1px solid #d1d5db",
      borderRadius: "9px",
      padding: "10px 14px",
      background: "#ffffff",
      color: "#374151",
      fontWeight: "700",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "7px",
    },
    alert: {
      padding: "12px",
      borderRadius: "10px",
      background: "#fef2f2",
      color: "#991b1b",
      fontSize: "13px",
      marginTop: "12px",
    },
    questionCard: {
      padding: "15px",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      marginTop: "14px",
    },
    option: {
      display: "flex",
      alignItems: "flex-start",
      gap: "9px",
      padding: "9px",
      marginTop: "7px",
      borderRadius: "8px",
      background: "#f9fafb",
      cursor: "pointer",
      fontSize: "14px",
    },
  };
    return (
    <div style={styles.container}>
      {!activeFile ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <BookOpen size={22} color="#2563eb" />
            <div>
              <h3 style={styles.heading}>PDF Learning Materials</h3>
              <p style={styles.muted}>
                Read each material and pass its assessment to earn
                course progress.
              </p>
            </div>
          </div>

          {loading && (
            <p style={styles.muted}>Loading learning materials...</p>
          )}

          {error && <div style={styles.alert}>{error}</div>}

          {notice && <p style={styles.muted}>{notice}</p>}

          {!loading &&
            files.map((file) => {
              const completed = completedFiles.includes(file.path);

              return (
                <div key={file.path} style={styles.fileCard}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flex: 1,
                      minWidth: "180px",
                    }}
                  >
                    <FileText size={23} color="#2563eb" />
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "14px" }}>
                        {file.name.replace(/\.pdf$/i, "").replace(/-/g, " ")}
                      </div>
                      <div style={styles.muted}>
                        {completed
                          ? "Assessment passed"
                          : "PDF learning material"}
                      </div>
                    </div>
                  </div>

                  {completed && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        color: "#15803d",
                        fontSize: "12px",
                        fontWeight: "800",
                      }}
                    >
                      <CheckCircle size={15} />
                      Completed
                    </span>
                  )}

                  <button
                    type="button"
                    style={styles.button}
                    onClick={() => openPdf(file)}
                  >
                    <BookOpen size={16} />
                    {completed ? "Review" : "Open PDF"}
                  </button>
                </div>
              );
            })}

          {!loading && files.length > 0 && (
            <p style={{ ...styles.muted, marginTop: "14px" }}>
              {completedFiles.filter((path) =>
                files.some((file) => file.path === path)
              ).length}{" "}
              of {files.length} PDF assessments completed.
            </p>
          )}
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              style={styles.secondaryButton}
              onClick={closeReader}
            >
              <ArrowLeft size={16} />
              Back to materials
            </button>

            <span style={styles.muted}>
              {stage === "reading" ? "Reading stage" : "Assessment stage"}
            </span>
          </div>

          <h3 style={{ ...styles.heading, marginTop: "18px" }}>
            {activeFile.name.replace(/\.pdf$/i, "").replace(/-/g, " ")}
          </h3>

          {error && <div style={styles.alert}>{error}</div>}

          {readerLoading && (
            <p style={styles.muted}>Please wait...</p>
          )}

          {stage === "reading" && (
            <>
              {pdfUrl && (
                <div
                  style={{
                    marginTop: "14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    title="PDF learning material"
                    src={pdfUrl}
                    style={{
                      width: "100%",
                      height: "520px",
                      border: "0",
                      display: "block",
                    }}
                  />
                </div>
              )}

              {pdfUrl && (
                <div
                  style={{
                    display: "flex",
                    gap: "9px",
                    flexWrap: "wrap",
                    marginTop: "12px",
                  }}
                >
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      ...styles.secondaryButton,
                      textDecoration: "none",
                    }}
                  >
                    <ExternalLink size={16} />
                    Open in new tab
                  </a>

                  <a
                    href={pdfUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      ...styles.secondaryButton,
                      textDecoration: "none",
                    }}
                  >
                    <Download size={16} />
                    Download PDF
                  </a>
                </div>
              )}

              <div
                style={{
                  marginTop: "18px",
                  padding: "14px",
                  background: "#eff6ff",
                  borderRadius: "12px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 10px",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "#1e40af",
                  }}
                >
                  Read the learning material carefully. When you finish,
                  take the assessment. You need at least {PASS_MARK}% to
                  pass and receive progress credit.
                </p>

                <button
                  type="button"
                  style={styles.button}
                  onClick={startAssessment}
                  disabled={readerLoading || !pdfUrl}
                >
                  <CheckCircle size={16} />
                  I've Finished Reading
                </button>
              </div>
            </>
          )}

          {stage === "quiz" && (
            <>
              <div
                style={{
                  marginTop: "14px",
                  padding: "13px",
                  background: "#eff6ff",
                  borderRadius: "10px",
                  color: "#1e40af",
                  fontSize: "13px",
                  lineHeight: 1.6,
                }}
              >
                Answer all {questions.length} questions. You need at least{" "}
                {PASS_MARK}% to pass this assessment.
              </div>

              {questions.map((question, index) => (
                <div key={index} style={styles.questionCard}>
                  <p
                    style={{
                      fontWeight: "800",
                      fontSize: "14px",
                      margin: "0 0 10px",
                    }}
                  >
                    {index + 1}. {question.question}
                  </p>

                  {(question.options || []).map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      style={{
                        ...styles.option,
                        border:
                          Number(answers[index]) === optionIndex
                            ? "1px solid #2563eb"
                            : "1px solid transparent",
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={optionIndex}
                        checked={
                          Number(answers[index]) === optionIndex
                        }
                        onChange={() =>
                          setAnswers((previous) => ({
                            ...previous,
                            [index]: optionIndex,
                          }))
                        }
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ))}

              <button
                type="button"
                style={{
                  ...styles.button,
                  marginTop: "18px",
                  opacity: saving ? 0.7 : 1,
                }}
                onClick={submitAssessment}
                disabled={saving}
              >
                {saving ? "Saving result..." : "Submit Assessment"}
              </button>

              {result && (
                <div
                  style={{
                    marginTop: "18px",
                    padding: "16px",
                    borderRadius: "12px",
                    background: result.passed ? "#f0fdf4" : "#fff7ed",
                    border: `1px solid ${
                      result.passed ? "#86efac" : "#fdba74"
                    }`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      color: result.passed ? "#166534" : "#9a3412",
                      fontWeight: "800",
                    }}
                  >
                    {result.passed ? (
                      <Award size={22} />
                    ) : (
                      <AlertCircle size={22} />
                    )}

                    {result.passed ? "Assessment Passed!" : "Not Passed Yet"}
                  </div>

                  <p
                    style={{
                      margin: "9px 0",
                      fontSize: "14px",
                      color: "#374151",
                    }}
                  >
                    Your score: {result.score}/{result.total} (
                    {result.percentage}%)
                  </p>

                  {result.passed ? (
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#166534",
                        lineHeight: 1.6,
                      }}
                    >
                      Your PDF assessment has been saved. This learning
                      item will count towards your course progress.
                    </p>
                  ) : (
                    <>
                      <p
                        style={{
                          margin: "0 0 12px",
                          fontSize: "13px",
                          color: "#9a3412",
                        }}
                      >
                        You need at least {PASS_MARK}% to pass. Review the
                        material and try again.
                      </p>

                      <button
                        type="button"
                        style={styles.secondaryButton}
                        onClick={() => {
                          setAnswers({});
                          setResult(null);
                          setError("");
                        }}
                      >
                        <RefreshCw size={15} />
                        Try Again
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
                  }
