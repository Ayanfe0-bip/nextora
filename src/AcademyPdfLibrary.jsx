import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { supabase } from "./lib/supabaseclient";

const BUCKET = "academy-lessons";

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

    // Supabase Storage represents folders differently from files.
    const isFolder = item.id === null && !item.metadata;

    if (isFolder) {
      const nestedFiles = await listPdfFiles(path);
      files.push(...nestedFiles);
    } else if (item.name.toLowerCase().endsWith(".pdf")) {
      files.push({
        name: item.name,
        path,
      });
    }
  }

  return files;
}

export default function AcademyPdfLibrary({ departmentCode }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openingPath, setOpeningPath] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

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
      // Load PDFs from this department only.
      const results = await listPdfFiles(departmentCode);
      setFiles(results);

      if (results.length === 0) {
        setNotice(
          "No PDF materials were found in this department yet."
        );
      }
    } catch (err) {
      console.error("Unable to load department PDFs:", err);
      setError(
        err?.message ||
          "Unable to load this department's PDF materials."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFiles();
  }, [departmentCode]);

  async function openPdf(file, download = false) {
    setOpeningPath(file.path);
    setError("");

    try {
      const { data, error: urlError } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(file.path, 300, {
          download: download ? file.name : undefined,
        });

      if (urlError) throw urlError;

      if (!data?.signedUrl) {
        throw new Error("Supabase did not return a PDF link.");
      }

      window.open(
        data.signedUrl,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (err) {
      console.error("Unable to open PDF:", err);
      setError(
        err?.message || "Could not open this PDF. Please try again."
      );
    } finally {
      setOpeningPath("");
    }
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
      gap: 7,
      border: 0,
      borderRadius: 10,
      padding: "10px 13px",
      background: "#6657d9",
      color: "#ffffff",
      fontWeight: 700,
      cursor: "pointer",
    },
    secondary: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
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
              style={{
                verticalAlign: "middle",
                marginRight: 8,
              }}
            />
            Department PDF Materials
          </h2>

          <p
            style={{
              margin: 0,
              color: "#747791",
              lineHeight: 1.6,
            }}
          >
            Open or download the learning materials for this department.
          </p>
        </div>

        <button
          type="button"
          style={styles.secondary}
          onClick={loadFiles}
          disabled={loading}
        >
          <RefreshCw size={16} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

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
            style={{
              verticalAlign: "middle",
              marginRight: 7,
            }}
          />
          {error}
        </div>
      )}

      {loading ? (
        <p style={{ marginTop: 20, color: "#747791" }}>
          Loading this department's PDF materials...
        </p>
      ) : notice ? (
        <p style={{ marginTop: 18, color: "#747791" }}>
          {notice}
        </p>
      ) : (
        <>
          <p
            style={{
              marginTop: 18,
              color: "#747791",
              fontSize: 13,
            }}
          >
            {files.length} PDF{files.length === 1 ? "" : "s"} available
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
              gap: 13,
              marginTop: 14,
            }}
          >
            {files.map((file) => (
              <article
                key={file.path}
                style={{
                  border: "1px solid #e8e8f4",
                  borderRadius: 14,
                  padding: 15,
                  minWidth: 0,
                }}
              >
                <FileText size={26} color="#7567ec" />

                <h3
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    overflowWrap: "anywhere",
                  }}
                >
                  {file.name}
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 12,
                  }}
                >
                  <button
                    type="button"
                    style={styles.button}
                    disabled={openingPath === file.path}
                    onClick={() => openPdf(file)}
                  >
                    <ExternalLink size={15} />
                    {openingPath === file.path
                      ? "Opening..."
                      : "Open PDF"}
                  </button>

                  <button
                    type="button"
                    style={styles.secondary}
                    disabled={openingPath === file.path}
                    onClick={() => openPdf(file, true)}
                  >
                    <Download size={15} />
                    Download
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      <p
        style={{
          marginTop: 18,
          marginBottom: 0,
          fontSize: 12,
          color: "#8589a0",
          lineHeight: 1.7,
        }}
      >
        PDF access links are temporary and generated securely from
        Supabase Storage.
      </p>
    </section>
  );
              }
