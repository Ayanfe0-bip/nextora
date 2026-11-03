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

export default function AcademyPdfLibrary({ departmentCode }) {
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
      setFiles(results);

      if (!results.length) {
        setNotice("No PDF materials were found in this department yet.");
      }
    } catch (err) {
      setError(err.message || "Unable to load PDF materials.");
    } finally {
      setLoading(false);
    }
  }

  async function loadCompletedFiles() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("academy_pdf_student_progress")
      .select("file_path")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (!error) {
      setCompletedFiles((data || []).map((row) => row.file_path));
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
      setError(err.message || "Unable to open this PDF.");
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

      if (!data || !Array.isArray(data.questions) || !data.questions.length) {
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
      setError(err.message || "Could not load the assessment.");
    } finally {
      setReaderLoading(false);
    }
  }

  async function submitAssessment() {
    if (questions.some((question, index) => answers[index] === undefined)) {
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
      const { data: { user } } = await supabase.auth.getUser();

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

      setCompletedFiles((previous) => [
        ...new Set([...previous, activeFile.path]),
      ]);
    } catch (err) {
      setError(
        err.message || "Your result could not be saved. Please try again."
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
    panel: {
      background: "#ffffff",
      border: "1px solid #e8e8f4",
      borderRadius: 18,
      padding: 18,
      marginTop: 20,
      color: "#252747",
    },
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      border: 0,
      borderRadius: 10,
      padding: "11px 15px",
      background: "#6657d9",
      color: "#ffffff",
      fontWeight: 800,
      cursor: "pointer",
    },
    secondary: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      border: "1px solid #e3e3f1",
      borderRadius: 10,
      padding: "10px 13px",
      background: "#f6f5ff",
      color: "#5143bd",
      fontWeight: 700,
      cursor: "pointer",
    },
  };

  return (
    <section style={styles.panel}>
      {!activeFile ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <h2 style={{ margin: "0 0 7px", fontSize: 21 }}>
                <BookOpen
                  size={21}
                  style={{ verticalAlign: "middle", marginRight: 8 }}
                />
                Department PDF Materials
              </h2>

              <p style={{ margin: 0, color: "#747791", lineHeight: 1.6 }}>
                Read your materials and complete their assessments.
              </p>
            </div>

            <button
              type="button"
              style={styles.secondary}
              onClick={() => {
                loadFiles();
                loadCompletedFiles();
              }}
              disabled={loading}
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {loading ? (
            <p>Loading PDF materials...</p>
          ) : notice ? (
            <p>{notice}</p>
          ) : (
            <>
              <p style={{ color: "#747791", fontSize: 13, marginTop: 18 }}>
                {files.length} PDF materials available
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,230px),1fr))",
                  gap: 13,
                  marginTop: 14,
                }}
              >
                {files.map((file) => {
                  const completed = completedFiles.includes(file.path);

                  return (
                    <article
                      key={file.path}
                      style={{
                        border: "1px solid #e8e8f4",
                        borderRadius: 14,
                        padding: 15,
                      }}
                    >
                      <FileText size={27} color="#7567ec" />

                      <h3 style={{ fontSize: 14, overflowWrap: "anywhere" }}>
                        {file.name}
                      </h3>

                      {completed && (
                        <p style={{ color: "#16865d", fontWeight: 800 }}>
                          <CheckCircle
                            size={15}
                            style={{ verticalAlign: "middle" }}
                          />{" "}
                          Assessment completed
                        </p>
                      )}

                      <button
                        type="button"
                        style={styles.button}
                        onClick={() => openPdf(file)}
                      >
                        <ExternalLink size={15} />
                        Read PDF
                      </button>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <div>
          <button
            type="button"
            style={styles.secondary}
            onClick={closeReader}
          >
            <ArrowLeft size={16} />
            Back to materials
          </button>

          <h2 style={{ overflowWrap: "anywhere" }}>
            {activeFile.name}
          </h2>

          {readerLoading ? (
            <p>Loading...</p>
          ) : stage === "reading" ? (
            <>
              {pdfUrl && (
                <iframe
                  title={activeFile.name}
                  src={pdfUrl}
                  style={{
                    width: "100%",
                    height: "70vh",
                    minHeight: 450,
                    border: "1px solid #e5e2f2",
                    borderRadius: 12,
                    background: "#f5f5f5",
                  }}
                />
              )}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginTop: 16,
                }}
              >
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    ...styles.secondary,
                    textDecoration: "none",
                  }}
                >
                  <Download size={16} />
                  Open / Download PDF
                </a>

                <button
                  type="button"
                  style={styles.button}
                  onClick={startAssessment}
                  disabled={!pdfUrl}
                >
                  I've Finished Reading
                </button>
              </div>
            </>
          ) : stage === "quiz" ? (
            <>
              <h3>Knowledge Assessment</h3>

              <p style={{ color: "#747791" }}>
                Answer every question. You need at least {PASS_MARK}% to pass.
              </p>

              {questions.map((question, index) => (
                <article
                  key={index}
                  style={{
                    border: "1px solid #e8e8f4",
                    borderRadius: 13,
                    padding: 15,
                    marginTop: 13,
                  }}
                >
                  <h4>
                    {index + 1}. {question.question}
                  </h4>

                  {(question.options || []).map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      style={{
                        display: "flex",
                        gap: 10,
                        padding: 10,
                        marginTop: 7,
                        borderRadius: 9,
                        background:
                          answers[index] === optionIndex
                            ? "#f0edff"
                            : "#fafaff",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name={`pdf-question-${index}`}
                        checked={answers[index] === optionIndex}
                        onChange={() =>
                          setAnswers((previous) => ({
                            ...previous,
                            [index]: optionIndex,
                          }))
                        }
                      />
                      {option}
                    </label>
                  ))}
                </article>
              ))}

              <button
                type="button"
                style={{ ...styles.button, marginTop: 18 }}
                onClick={submitAssessment}
                disabled={saving}
              >
                {saving ? "Saving result..." : "Submit Assessment"}
              </button>

              {result && (
                <div
                  style={{
                    marginTop: 18,
                    padding: 18,
                    borderRadius: 13,
                    background: result.passed ? "#eafaf2" : "#fff3e9",
                  }}
                >
                  <h3>
                    {result.passed ? "Congratulations!" : "Not quite there yet"}
                  </h3>

                  <p>
                    Your score: {result.score}/{result.total} (
                    {result.percentage}%)
                  </p>

                  {result.passed ? (
                    <>
                      <Award size={35} color="#16865d" />
                      <p>
                        You passed! Your PDF lesson completion has been saved.
                      </p>
                      <button
                        type="button"
                        style={styles.button}
                        onClick={closeReader}
                      >
                        Return to materials
                      </button>
                    </>
                  ) : (
                    <>
                      <p>
                        You need at least {PASS_MARK}% to complete this lesson.
                        Review the PDF and try again.
                      </p>
                      <button
                        type="button"
                        style={styles.button}
                        onClick={() => {
                          setAnswers({});
                          setResult(null);
                        }}
                      >
                        Try Again
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          ) : null}
        </div>
      )}

      {error && (
        <div
          role="alert"
          style={{
            marginTop: 16,
            padding: 13,
            background: "#fff0f0",
            color: "#a32e3b",
            borderRadius: 10,
            overflowWrap: "anywhere",
          }}
        >
          <AlertCircle
            size={16}
            style={{ verticalAlign: "middle", marginRight: 7 }}
          />
          {error}
        </div>
      )}
    </section>
  );
          }
