import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bell,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  GraduationCap,
  LogOut,
  ShieldCheck,
  Sparkles,
  User,
  Wallet,
} from "lucide-react";
import { supabase } from "./lib/supabaseclient";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#F7F8FC",
    color: "#18213B",
    fontFamily: "inherit",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 6%",
    background: "#FFFFFF",
    borderBottom: "1px solid #E8EAF1",
    gap: 12,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#243D85",
    fontWeight: 800,
    fontSize: 20,
  },
  brandIcon: {
    display: "grid",
    placeItems: "center",
    width: 40,
    height: 40,
    borderRadius: 13,
    background: "#EAF0FF",
  },
  back: {
    border: 0,
    background: "transparent",
    color: "#42527B",
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    fontSize: 14,
  },
  main: {
    width: "min(100% - 32px, 480px)",
    margin: "45px auto",
  },
  card: {
    background: "#FFFFFF",
    padding: "32px 26px",
    borderRadius: 22,
    border: "1px solid #E9ECF4",
    boxShadow: "0 16px 50px rgba(30,45,90,0.07)",
  },
  eyebrow: {
    color: "#526FC4",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1.4,
    marginBottom: 12,
  },
  title: {
    fontSize: "clamp(27px, 6vw, 36px)",
    lineHeight: 1.2,
    margin: "0 0 12px",
    letterSpacing: -1,
  },
  description: {
    color: "#69738C",
    lineHeight: 1.7,
    fontSize: 14,
    marginBottom: 25,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #DDE2EE",
    borderRadius: 11,
    padding: "13px 14px",
    fontSize: 15,
    outlineColor: "#526FC4",
    background: "#FFFFFF",
    color: "#18213B",
  },
  field: {
    marginBottom: 17,
  },
  primary: {
    width: "100%",
    padding: "14px 16px",
    border: 0,
    borderRadius: 11,
    background: "#29458F",
    color: "#FFFFFF",
    fontWeight: 800,
    fontSize: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    cursor: "pointer",
  },
  switch: {
    textAlign: "center",
    marginTop: 22,
    fontSize: 14,
    color: "#69738C",
  },
  link: {
    border: 0,
    padding: 0,
    background: "transparent",
    color: "#29458F",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: 14,
  },
  message: {
    padding: 12,
    background: "#F0F5FF",
    border: "1px solid #DCE6FF",
    borderRadius: 10,
    color: "#29458F",
    fontSize: 13,
    lineHeight: 1.6,
    marginBottom: 18,
  },
  error: {
    padding: 12,
    background: "#FFF0F0",
    border: "1px solid #FFDADA",
    borderRadius: 10,
    color: "#A32B36",
    fontSize: 13,
    lineHeight: 1.6,
    marginBottom: 18,
  },
  terms: {
    display: "flex",
    alignItems: "flex-start",
    gap: 9,
    fontSize: 12,
    lineHeight: 1.6,
    color: "#69738C",
    margin: "4px 0 20px",
  },
};

function Header({ onBack, dashboard = false, onSignOut }) {
  return (
    <header style={styles.header}>
      <div style={styles.brand}>
        <span style={styles.brandIcon}>
          <ArrowUpRight size={25} />
        </span>
        <span>NEXTORA</span>
      </div>

      {dashboard ? (
        <button style={styles.back} onClick={onSignOut}>
          <LogOut size={17} />
          Sign out
        </button>
      ) : (
        <button style={styles.back} onClick={onBack}>
          <ArrowLeft size={16} />
          Back to home
        </button>
      )}
    </header>
  );
}

export function AuthPortal({ initialMode = "signup", onBack }) {
  const [mode, setMode] = useState(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isSignup = mode === "signup";

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (isSignup && fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 6) {
      setError("Your password must contain at least 6 characters.");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (isSignup && !acceptedTerms) {
      setError("Please agree to the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { data, error: signupError } =
          await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: {
                full_name: fullName.trim(),
              },
            },
          });

        if (signupError) throw signupError;

        if (data.session) {
          setMessage("Your account has been created successfully.");
        } else {
          setMessage(
            "Your account request was received. Check your email for a confirmation link before signing in."
          );
        }
      } else {
        const { error: signinError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (signinError) throw signinError;

        setMessage("Login successful. Opening your dashboard...");
      }
    } catch (err) {
      setError(
        err?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <Header onBack={onBack} />

      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.eyebrow}>
            <Sparkles
              size={14}
              style={{ display: "inline", verticalAlign: "middle" }}
            />{" "}
            WHERE OPPORTUNITIES BEGIN
          </div>

          <h1 style={styles.title}>
            {isSignup
              ? "Create your NEXTORA account."
              : "Welcome back."}
          </h1>

          <p style={styles.description}>
            {isSignup
              ? "Join NEXTORA to prepare for your next opportunity."
              : "Sign in to continue your journey with NEXTORA."}
          </p>

          {message && <div style={styles.message}>{message}</div>}
          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div style={styles.field}>
                <label style={styles.label} htmlFor="nextora-name">
                  Full name
                </label>
                <input
                  id="nextora-name"
                  style={styles.input}
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  autoComplete="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div style={styles.field}>
              <label style={styles.label} htmlFor="nextora-email">
                Email address
              </label>
              <input
                id="nextora-email"
                style={styles.input}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label} htmlFor="nextora-password">
                Password
              </label>
              <input
                id="nextora-password"
                style={styles.input}
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete={
                  isSignup ? "new-password" : "current-password"
                }
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </div>

            {isSignup && (
              <>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="nextora-confirm">
                    Confirm password
                  </label>
                  <input
                    id="nextora-confirm"
                    style={styles.input}
                    type="password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    autoComplete="new-password"
                    placeholder="Enter your password again"
                    minLength={6}
                    required
                  />
                </div>

                <label style={styles.terms}>
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) =>
                      setAcceptedTerms(event.target.checked)
                    }
                    required
                  />
                  <span>
                    I agree to NEXTORA's Terms of Service and Privacy Policy.
                  </span>
                </label>
              </>
            )}

            <button
              style={{
                ...styles.primary,
                opacity: loading ? 0.7 : 1,
              }}
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isSignup
                  ? "Create account"
                  : "Sign in"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <div style={styles.switch}>
            {isSignup
              ? "Already have an account? "
              : "New to NEXTORA? "}

            <button
              style={styles.link}
              type="button"
              onClick={() => {
                setMode(isSignup ? "signin" : "signup");
                setMessage("");
                setError("");
              }}
            >
              {isSignup ? "Sign in" : "Create an account"}
            </button>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#8991A5",
            fontSize: 12,
            lineHeight: 1.7,
            marginTop: 22,
          }}
        >
          <ShieldCheck
            size={14}
            style={{ display: "inline", verticalAlign: "middle" }}
          />{" "}
          Your account is protected by Supabase authentication.
        </p>
      </main>

      <footer
        style={{
          textAlign: "center",
          color: "#8991A5",
          fontSize: 12,
          padding: "0 20px 28px",
        }}
      >
        © {new Date().getFullYear()} NEXTORA · Ayanfe Innovation Labs Limited
      </footer>
    </div>
  );
      }
export function Dashboard({ user, onSignOut }) {
  const fullName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "NEXTORA member";

  const firstName = fullName.trim().split(/\s+/)[0] || "there";

  const initials = fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState([]);

  const categoryNames = [
    "All",
    "Education",
    "Careers",
    "Funding",
    "Skills",
  ];

  const cards = [
    {
      title: "Scholarships",
      desc: "Explore education support and scholarship opportunities.",
      tag: "Education",
      icon: GraduationCap,
      tint: "#EAF0FF",
      ink: "#4565D8",
    },
    {
      title: "Jobs & Careers",
      desc: "Get ready for job openings, internships, and career growth.",
      tag: "Careers",
      icon: BriefcaseBusiness,
      tint: "#F1EAFE",
      ink: "#8155C8",
    },
    {
      title: "Grants & Funding",
      desc: "Discover funding pathways for ideas, learning, and projects.",
      tag: "Funding",
      icon: Wallet,
      tint: "#FFF0E3",
      ink: "#C47735",
    },
    {
      title: "NEXTORA Academy",
      desc: "Build practical skills and prepare for your next step.",
      tag: "Skills",
      icon: BookOpen,
      tint: "#E5F7F0",
      ink: "#258660",
    },
  ];

  const visibleCards = cards.filter(
    (card) =>
      activeCategory === "All" ||
      card.tag === activeCategory
  );

  return (
    <div className="nx-dashboard">
      <style>{`
        .nx-dashboard {
          min-height: 100vh;
          background: #f6f8fe;
          color: #192744;
          font-family: inherit;
        }

        .nx-topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(255,255,255,.95);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid #e8edf6;
        }

        .nx-topbar-inner {
          width: min(1180px, calc(100% - 36px));
          min-height: 76px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .nx-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 21px;
          font-weight: 900;
          letter-spacing: -.7px;
          color: #243d85;
        }

        .nx-brand-mark {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: linear-gradient(145deg,#7891ff,#3855ce);
          color: #fff;
          box-shadow: 0 7px 18px #4263eb30;
        }

        .nx-top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nx-icon-btn {
          width: 41px;
          height: 41px;
          display: grid;
          place-items: center;
          border: 1px solid #e8edf6;
          border-radius: 12px;
          background: #fff;
          color: #65738d;
        }

        .nx-user-chip {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 5px 10px 5px 5px;
          border: 1px solid #e8edf6;
          border-radius: 14px;
          background: #fff;
          max-width: 210px;
        }

        .nx-avatar {
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #eaf0ff;
          color: #3855ce;
          font-size: 12px;
          font-weight: 900;
        }

        .nx-user-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          font-weight: 700;
        }

        .nx-logout {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 13px;
          border: 0;
          border-radius: 11px;
          background: #fff0f0;
          color: #a73c48;
          font-size: 12px;
          font-weight: 800;
        }

        .nx-wrap {
          width: min(1180px, calc(100% - 36px));
          margin: 0 auto;
          padding: 30px 0 54px;
        }

        .nx-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0,1fr) 220px;
          align-items: center;
          gap: 22px;
          padding: 32px;
          border-radius: 25px;
          background: linear-gradient(
            115deg,
            #233c85 0%,
            #4868d7 64%,
            #7887ee 100%
          );
          color: white;
          box-shadow: 0 18px 44px #304bc425;
        }

        .nx-hero:before,
        .nx-hero:after {
          content: "";
          position: absolute;
          z-index: -1;
          border: 1px solid #ffffff24;
          border-radius: 50%;
          pointer-events: none;
        }

        .nx-hero:before {
          width: 300px;
          height: 300px;
          right: -70px;
          top: -160px;
        }

        .nx-hero:after {
          width: 240px;
          height: 240px;
          right: 20px;
          bottom: -190px;
        }

        .nx-kicker {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 14px;
          color: #e0e7ff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.7px;
        }

        .nx-hero h1 {
          margin: 0 0 12px;
          font-size: clamp(27px,4vw,39px);
          line-height: 1.17;
          letter-spacing: -1.2px;
          overflow-wrap: anywhere;
        }

        .nx-hero p {
          max-width: 600px;
          margin: 0;
          color: #e8edff;
          font-size: 14px;
          line-height: 1.8;
        }

        .nx-hero-art {
          justify-self: center;
          display: grid;
          place-items: center;
          width: 160px;
          height: 160px;
          border: 1px solid #ffffff42;
          border-radius: 38px;
          background: linear-gradient(145deg,#ffffff2b,#ffffff0b);
          transform: rotate(-5deg);
        }

        .nx-hero-art-inner {
          display: grid;
          place-items: center;
          width: 108px;
          height: 108px;
          border-radius: 30px;
          background: #ffffffed;
          color: #4263d1;
          box-shadow: 0 14px 30px #172d7833;
          transform: rotate(5deg);
        }

        .nx-stat-row {
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 14px;
          margin: 18px 0 34px;
        }

        .nx-stat {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 17px 18px;
          border: 1px solid #e8edf6;
          border-radius: 17px;
          background: #fff;
        }

        .nx-stat-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 13px;
          background: #edf2ff;
          color: #4c66d3;
        }

        .nx-stat strong {
          display: block;
          margin-bottom: 4px;
          font-size: 13px;
        }

        .nx-stat span {
          color: #8290a6;
          font-size: 11px;
          line-height: 1.5;
        }

        .nx-section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .nx-eyebrow {
          display: block;
          margin-bottom: 8px;
          color: #526bc9;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.7px;
        }

        .nx-section-head h2 {
          margin: 0;
          color: #1c2a48;
          font-size: clamp(22px,3vw,29px);
          letter-spacing: -.7px;
        }

        .nx-section-head p {
          margin: 7px 0 0;
          color: #7a879d;
          font-size: 13px;
          line-height: 1.7;
        }

        .nx-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: 20px 0;
        }

        .nx-filter {
          padding: 9px 13px;
          border: 1px solid #e2e8f3;
          border-radius: 9px;
          background: #fff;
          color: #718099;
          font-size: 11px;
          font-weight: 800;
        }

        .nx-filter.active {
          border-color: #4263eb;
          background: #4263eb;
          color: #fff;
          box-shadow: 0 5px 14px #4263eb2b;
        }

        .nx-cards {
          display: grid;
          grid-template-columns: repeat(4,minmax(0,1fr));
          gap: 14px;
        }

        .nx-card {
          min-width: 0;
          min-height: 225px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 20px;
          border: 1px solid #e7ecf5;
          border-radius: 18px;
          background: #fff;
          text-align: left;
          transition: transform .2s,border-color .2s,box-shadow .2s;
        }

        .nx-card:hover {
          transform: translateY(-4px);
          border-color: #cbd6ff;
          box-shadow: 0 16px 32px #1d31510d;
        }

        .nx-card-top {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .nx-card-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 15px;
        }

        .nx-save {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid #e8edf6;
          border-radius: 10px;
          background: #fff;
          color: #8995a8;
        }

        .nx-save.saved {
          color: #4263eb;
          background: #edf2ff;
          border-color: #dce5ff;
        }

        .nx-card h3 {
          margin: 20px 0 8px;
          font-size: 15px;
          letter-spacing: -.2px;
        }

        .nx-card p {
          margin: 0;
          color: #7b879b;
          font-size: 12px;
          line-height: 1.75;
        }

        .nx-card-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          width: 100%;
          margin-top: auto;
          padding-top: 18px;
          color: #5069ca;
          font-size: 11px;
          font-weight: 800;
        }

        .nx-status {
          padding: 6px 8px;
          border-radius: 7px;
          background: #f2f5fb;
          color: #7a879d;
          font-size: 9px;
          font-weight: 900;
          white-space: nowrap;
        }

        .nx-lower {
          display: grid;
          grid-template-columns: minmax(0,1.35fr) minmax(260px,.65fr);
          gap: 16px;
          margin-top: 25px;
        }

        .nx-panel {
          padding: 22px;
          border: 1px solid #e7ecf5;
          border-radius: 18px;
          background: #fff;
        }

        .nx-panel-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
          font-size: 15px;
          font-weight: 900;
        }

        .nx-tip {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 13px 0;
          border-bottom: 1px solid #eff2f8;
        }

        .nx-tip:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }

        .nx-tip-icon {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 11px;
          background: #f0eaff;
          color: #8254d4;
        }

        .nx-tip strong {
          display: block;
          margin: 1px 0 5px;
          font-size: 12px;
        }

        .nx-tip p {
          margin: 0;
          color: #7b879b;
          font-size: 11px;
          line-height: 1.6;
        }

        .nx-account-email {
          overflow-wrap: anywhere;
          color: #77859b;
          font-size: 12px;
          line-height: 1.6;
        }

        .nx-account-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 16px 0;
          padding: 13px;
          border-radius: 13px;
          background: #f7f9fe;
        }

        .nx-account-row strong {
          display: block;
          margin-bottom: 4px;
          font-size: 12px;
        }

        .nx-account-message {
          color: #7b879b;
          font-size: 12px;
          line-height: 1.75;
        }

        .nx-session {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 14px;
          color: #258660;
          font-size: 11px;
          font-weight: 800;
        }

        .nx-footer {
          padding: 0 18px 26px;
          text-align: center;
          color: #98a2b4;
          font-size: 11px;
        }

        @media (max-width: 900px) {
          .nx-cards {
            grid-template-columns: repeat(2,minmax(0,1fr));
          }

          .nx-hero {
            grid-template-columns: minmax(0,1fr) 150px;
            padding: 26px;
          }

          .nx-hero-art {
            width: 125px;
            height: 125px;
            border-radius: 30px;
          }

          .nx-hero-art-inner {
            width: 85px;
            height: 85px;
            border-radius: 24px;
          }

          .nx-hero-art-inner svg {
            width: 44px;
            height: 44px;
          }
        }

        @media (max-width: 600px) {
          .nx-topbar-inner,
          .nx-wrap {
            width: calc(100% - 24px);
          }

          .nx-topbar-inner {
            min-height: 66px;
          }

          .nx-brand {
            font-size: 18px;
          }

          .nx-brand-mark {
            width: 36px;
            height: 36px;
          }

          .nx-user-chip {
            display: none;
          }

          .nx-logout {
            padding: 10px;
          }

          .nx-logout span {
            display: none;
          }

          .nx-wrap {
            padding-top: 18px;
          }

          .nx-hero {
            grid-template-columns: 1fr;
            padding: 24px 20px;
            border-radius: 21px;
          }

          .nx-hero-art {
            display: none;
          }

          .nx-hero h1 {
            font-size: 29px;
          }

          .nx-hero p {
            font-size: 13px;
          }

          .nx-stat-row {
            gap: 8px;
            margin: 12px 0 29px;
          }

          .nx-stat {
            align-items: flex-start;
            flex-direction: column;
            gap: 9px;
            padding: 12px 10px;
            border-radius: 13px;
          }

          .nx-stat-icon {
            width: 35px;
            height: 35px;
            border-radius: 10px;
          }

          .nx-stat strong {
            font-size: 11px;
          }

          .nx-stat span {
            font-size: 10px;
          }

          .nx-section-head {
            align-items: flex-start;
            flex-direction: column;
          }

          .nx-section-head p {
            font-size: 12px;
          }

          .nx-cards {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .nx-card {
            min-height: 0;
            padding: 17px;
          }

          .nx-card h3 {
            margin-top: 14px;
          }

          .nx-card-foot {
            padding-top: 14px;
          }

          .nx-lower {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-top: 18px;
          }

          .nx-panel {
            padding: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nx-card {
            transition: none;
          }

          .nx-card:hover {
            transform: none;
          }
        }
      `}</style>

      <header className="nx-topbar">
        <div className="nx-topbar-inner">
          <div className="nx-brand">
            <span className="nx-brand-mark">
              <ArrowUpRight size={24} />
            </span>
            <span>NEXTORA</span>
          </div>

          <div className="nx-top-actions">
            <button
              className="nx-icon-btn"
              aria-label="Notifications"
              title="Notifications coming soon"
              onClick={() =>
                window.alert(
                  "Notifications will be available when NEXTORA opportunities are connected."
                )
              }
            >
              <Bell size={18} />
            </button>

            <div className="nx-user-chip">
              <span className="nx-avatar">{initials || "N"}</span>
              <span className="nx-user-name">{fullName}</span>
            </div>

            <button
              className="nx-logout"
              onClick={onSignOut}
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="nx-wrap">
        <section className="nx-hero">
          <div>
            <div className="nx-kicker">
              <Sparkles size={14} />
              YOUR NEXT CHAPTER STARTS HERE
            </div>

            <h1>
              Welcome back, {firstName}{" "}
              <span aria-hidden="true">✦</span>
            </h1>

            <p>
              Your future has possibilities. Explore pathways for
              education, careers, funding, and skills—all in one
              place to help you take your next step with confidence.
            </p>
          </div>

          <div className="nx-hero-art" aria-hidden="true">
            <div className="nx-hero-art-inner">
              <Compass size={56} strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <section
          className="nx-stat-row"
          aria-label="Your NEXTORA overview"
        >
          <div className="nx-stat">
            <div className="nx-stat-icon">
              <Compass size={20} />
            </div>
            <div>
              <strong>Find your path</strong>
              <span>Explore different directions</span>
            </div>
          </div>

          <div className="nx-stat">
            <div
              className="nx-stat-icon"
              style={{
                background: "#F2EAFE",
                color: "#8155C8",
              }}
            >
              <Bookmark size={20} />
            </div>
            <div>
              <strong>{saved.length} saved</strong>
              <span>Your personal shortlist</span>
            </div>
          </div>

          <div className="nx-stat">
            <div
              className="nx-stat-icon"
              style={{
                background: "#E5F7F0",
                color: "#258660",
              }}
            >
              <CheckCircle2 size={20} />
            </div>
            <div>
              <strong>One step at a time</strong>
              <span>Build your next chapter</span>
            </div>
          </div>
        </section>

        <section>
          <div className="nx-section-head">
            <div>
              <span className="nx-eyebrow">
                YOUR OPPORTUNITY SPACE
              </span>
              <h2>What are you looking for?</h2>
              <p>
                Choose an area to explore. Full listings are being
                pr
