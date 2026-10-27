import { useEffect, useState } from "react";
import {
  FileText,
  Download,
  ExternalLink,
  RefreshCw,
  Search,
  BookOpen,
  AlertCircle,
} from "lucide-react";

import { supabase } from "./lib/supabaseclient";

const BUCKET = "academy-lessons";

const DEPARTMENTS = [
  { code: "NAC-ABC", name: "AI for Business & Careers" },
  { code: "NAC-AIC", name: "AI Image Creation" },
  { code: "NAC-AIF", name: "AI Fundamentals" },
  { code: "NAC-AVC", name: "AI Video & Cartoons" },
  { code: "NAC-DGS", name: "Digital Skills" },
  { code: "NAC-HEA", name: "Health Education" },
  { code: "NAC-MHW", name: "Mental Wellness" },
  { code: "NAC-WAD", name: "Website & App Development" },
  { code: "NAC-YHK", name: "Yoruba Herbal Knowledge" },
  { code: "NAC-PAC", name: "Projects & Certificates" },
];

async function listPdfFiles(folderPath = "") {
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
    const path = folderPath
      ? `${folderPath}/${item.name}`
      : item.name;

    const isFolder =
      item.id === null &&
      !item.metadata;

    if (isFolder) {
      const nestedFiles = await listPdfFiles(path);
      files.push(...nestedFiles);
      continue;
    }

    if (item.name.toLowerCase().endsWith(".pdf")) {
      files.push({
        name: item.name,
        path,
      });
    }
  }

  return files;
}
export default function AcademyPdfLibrary() {
  const [files, setFiles] = useState([]);
  const [department, setDepartment] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [openingPath, setOpeningPath] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function loadFiles() {
    setLoading(true);
    setError("");
    setNotice("");

    try {
      const results = [];

      for (const item of DEPARTMENTS) {
        try {
          const departmentFiles = await listPdfFiles(item.code);

          results.push(
            ...departmentFiles.map((file) => ({
              ...file,
              departmentCode: item.code,
              departmentName: item.name,
            }))
          );
        } catch (err) {
          console.error(
            `Could not list PDFs in ${item.code}:`,
            err
          );
        }
      }

      setFiles(results);

      if (results.length === 0) {
        setNotice(
          "No PDFs were found. Check the folder names and Storage permissions."
        );
      }
    } catch (err) {
      setError(
        err?.message ||
          "Unable to load the Academy PDFs."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

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
      setError(
        err?.message ||
          "Could not open this PDF. Please try again."
      );
    } finally {
      setOpeningPath("");
    }
  }

  const visibleFiles = files.filter((file) => {
    const matchesDepartment =
      department === "all" ||
      file.departmentCode === department;

    const term = search.trim().toLowerCase();

    const matchesSearch =
      !term ||
      file.name.toLowerCase().includes(term) ||
      file.departmentName.toLowerCase().includes(term);

    return matchesDepartment && matchesSearch;
  });

  const styles = {
    panel: {
      background: "#ffffff",
      border: "1px solid #e8e8f4",
      borderRadius: 20,
      padding: 20,
      marginTop: 24,
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
          <h2 style={{ margin: "0 0 7px", fontSize: 23 }}>
            <BookOpen
              size={22}
              style={{ verticalAlign: "middle", marginRight: 8 }}
            />
            Academy PDF Library
          </h2>

          <p style={{ margin: 0, color: "#747791", lineHeight: 1.6 }}>
            Access learning materials for your department.
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
          marginTop: 20,
        }}
      >
        <label>
          <span
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 7,
            }}
          >
            Department
          </span>

          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #dedfee",
              background: "#ffffff",
              color: "#252747",
            }}
          >
            <option value="all">All departments</option>

            {DEPARTMENTS.map((item) => (
              <option key={item.code} value={item.code}>
                {item.code} — {item.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span
            style={{
              display: "block",
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 7,
            }}
          >
            Search PDFs
          </span>

          <div style={{ position: "relative" }}>
            <Search
              size={17}
              style={{
                position: "absolute",
                left: 11,
                top: 13,
                color: "#8185a0",
              }}
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search file or department..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 12px 12px 36px",
                borderRadius: 10,
                border: "1px solid #dedfee",
              }}
            />
          </div>
        </label>
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
          }}
        >
          <AlertCircle
            size={16}
            style={{ verticalAlign: "middle", marginRight: 7 }}
          />
          {error}
        </div>
      )}

      {notice && !loading && (
        <p style={{ color: "#747791", marginTop: 18 }}>{notice}</p>
      )}

      {loading ? (
        <p style={{ marginTop: 20, color: "#747791" }}>
          Loading Academy PDFs...
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 13,
            marginTop: 20,
          }}
        >
          {visibleFiles.map((file) => (
            <article
              key={file.path}
              style={{
                border: "1px solid #e8e8f4",
                borderRadius: 14,
                padding: 15,
                minWidth: 0,
              }}
            >
              <FileText size={25} color="#7567ec" />

              <h3
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  overflowWrap: "anywhere",
                }}
              >
                {file.name}
              </h3>

              <p
                style={{
                  fontSize: 12,
                  color: "#747791",
                  lineHeight: 1.6,
                }}
              >
                {file.departmentCode} · {file.departmentName}
              </p>

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
                  {openingPath === file.path ? "Opening..." : "Open PDF"}
                </button>

                <button
                  type="button"
                  style={styles.secondary}
                  disabled={openingPath === file.path}
                  onClick={() => openPdf(file, true)}
                  aria-label={`Download ${file.name}`}
                >
                  <Download size={15} />
                  Download
                </button>
              </div>
            </article>
          ))}

          {visibleFiles.length === 0 && !notice && (
            <p style={{ color: "#747791" }}>
              No PDFs match your search.
            </p>
          )}
        </div>
      )}

      <p
        style={{
          marginTop: 20,
          fontSize: 12,
          color: "#8589a0",
          lineHeight: 1.7,
        }}
      >
        PDF links are temporary and generated securely from Supabase Storage.
      </p>
    </section>
  );
}
