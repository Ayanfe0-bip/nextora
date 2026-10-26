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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard");
  const [notice, setNotice] = useState("");

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

  function navigate(view) {
    setActiveView(view);
    setMenuOpen(false);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const menuItems = [
    { label: "Dashboard", icon: Compass },
    { label: "Saved Categories", icon: Bookmark },
    { label: "My Submissions", icon: CheckCircle2 },
    { label: "Saved Opportunities", icon: Sparkles },
    { label: "Notifications", icon: Bell },
    { label: "My Profile", icon: User },
    { label: "Account Settings", icon: ShieldCheck },
    { label: "Help & Support", icon: BookOpen },
  ];

  return (
    <div className="nx-dashboard">
      <style>{`
        .nx-dashboard {
          min-height: 100vh;
          background: #f6f8fe;
          color: #192744;
          font-family: inherit;
        }
        .nx-dashboard * { box-sizing: border-box; }
        .nx-topbar {
          position: sticky;
          top: 0;
          z-index: 30;
          background: rgba(255,255,255,.97);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid #e8edf6;
        }
        .nx-topbar-inner {
          width: min(1180px, calc(100% - 32px));
          min-height: 72px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .nx-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: 900;
          color: #243d85;
          letter-spacing: -.6px;
        }
        .nx-brand-mark {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: linear-gradient(145deg,#7891ff,#3855ce);
          color: white;
        }
        .nx-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .nx-icon-btn {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border: 1px solid #e6ebf5;
          border-radius: 12px;
          background: white;
          color: #5e6e89;
          cursor: pointer;
        }
        .nx-icon-btn:hover { background: #f3f6ff; }
        .nx-user-chip {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 5px 10px 5px 5px;
          border: 1px solid #e8edf6;
          border-radius: 13px;
          background: white;
          max-width: 200px;
        }
        .nx-avatar {
          width: 36px;
          height: 36px;
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
          font-weight: 800;
        }
        .nx-menu-wrap { position: relative; }
        .nx-menu {
          position: absolute;
          top: 50px;
          right: 0;
          width: 255px;
          max-height: min(75vh, 520px);
          overflow-y: auto;
          padding: 10px;
          border: 1px solid #e5eaf4;
          border-radius: 17px;
          background: white;
          box-shadow: 0 18px 55px #1e315522;
          z-index: 50;
        }
        .nx-menu-heading {
          padding: 8px 10px 12px;
          color: #8b96aa;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.4px;
        }
        .nx-menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px 10px;
          border: 0;
          border-radius: 10px;
          background: transparent;
          color: #455571;
          text-align: left;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
        }
        .nx-menu-item:hover,
        .nx-menu-item.selected {
          background: #eef2ff;
          color: #3453c4;
        }
        .nx-menu-divider {
          height: 1px;
          margin: 8px 2px;
          background: #edf0f6;
        }
        .nx-menu-item.danger { color: #b63d4b; }
        .nx-menu-item.danger:hover { background: #fff0f0; }
        .nx-logout {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 12px;
          border: 0;
          border-radius: 11px;
          background: #fff0f0;
          color: #a73c48;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }
        .nx-wrap {
          width: min(1180px, calc(100% - 32px));
          margin: auto;
          padding: 28px 0 48px;
        }
        .nx-view-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .nx-view-heading h2 {
          margin: 0;
          font-size: 25px;
          letter-spacing: -.7px;
        }
        .nx-view-heading p {
          margin: 7px 0 0;
          color: #7b879b;
          font-size: 13px;
          line-height: 1.7;
        }
        .nx-back-btn {
          padding: 10px 13px;
          border: 1px solid #e0e7f3;
          border-radius: 10px;
          background: white;
          color: #4056a1;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }
        .nx-notice {
          margin: 0 0 18px;
          padding: 13px 15px;
          border: 1px solid #dce6ff;
          border-radius: 12px;
          background: #f0f5ff;
          color: #3453a0;
          font-size: 13px;
          line-height: 1.6;
        }
      `}</style>

      <header className="nx-topbar">
        <div className="nx-topbar-inner">
          <div className="nx-brand">
            <span className="nx-brand-mark">
              <ArrowUpRight size={24} />
            </span>
            NEXTORA
          </div>

          <div className="nx-actions">
            <button
              className="nx-icon-btn"
              aria-label="Notifications"
              title="Notifications"
              onClick={() => navigate("Notifications")}
            >
              <Bell size={18} />
            </button>

            <div className="nx-user-chip">
              <span className="nx-avatar">{initials || "N"}</span>
              <span className="nx-user-name">{fullName}</span>
            </div>

            <div className="nx-menu-wrap">
              <button
                className="nx-icon-btn"
                aria-label="Open dashboard menu"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                title="Dashboard menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span style={{
                  fontSize: 25,
                  fontWeight: 900,
                  lineHeight: 1,
                  transform: "translateY(-2px)",
                }}>⋮</span>
              </button>

              {menuOpen && (
                <div className="nx-menu" role="menu">
                  <div className="nx-menu-heading">
                    DASHBOARD MENU
                  </div>

                  {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.label}
                        role="menuitem"
                        className={`nx-menu-item ${
                          activeView === item.label ? "selected" : ""
                        }`}
                        onClick={() => navigate(item.label)}
                      >
                        <Icon size={17} />
                        {item.label}
                      </button>
                    );
                  })}

                  <div className="nx-menu-divider" />

                  <button
                    className="nx-menu-item danger"
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      onSignOut?.();
                    }}
                  >
                    <LogOut size={17} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="nx-wrap">
        {notice && (
          <div className="nx-notice" role="status">
            {notice}
          </div>
        )}
                {activeView === "Dashboard" && (
          <>
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
                  Explore pathways for education, careers, funding,
                  and skills—all in one place to help you take your
                  next step with confidence.
                </p>
              </div>

              <div className="nx-hero-art" aria-hidden="true">
                <div className="nx-hero-art-inner">
                  <Compass size={55} strokeWidth={1.5} />
                </div>
              </div>
            </section>

            <section className="nx-stat-row">
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
                <div className="nx-stat-icon purple">
                  <Bookmark size={20} />
                </div>
                <div>
                  <strong>{saved.length} saved</strong>
                  <span>Your personal shortlist</span>
                </div>
              </div>

              <div className="nx-stat">
                <div className="nx-stat-icon green">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <strong>Keep progressing</strong>
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
                    Choose an area to explore. Full listings are
                    being prepared for a future update.
                  </p>
                </div>
              </div>

              <div className="nx-filters">
                {categoryNames.map((name) => (
                  <button
                    key={name}
                    className={`nx-filter ${
                      activeCategory === name ? "active" : ""
                    }`}
                    onClick={() => setActiveCategory(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <div className="nx-cards">
                {visibleCards.map((item) => {
                  const Icon = item.icon;
                  const isSaved = saved.includes(item.title);

                  return (
                    <article className="nx-card" key={item.title}>
                      <div className="nx-card-top">
                        <div
                          className="nx-card-icon"
                          style={{
                            background: item.tint,
                            color: item.ink,
                          }}
                        >
                          <Icon size={24} />
                        </div>

                        <button
                          className={`nx-save ${
                            isSaved ? "saved" : ""
                          }`}
                          aria-label={
                            isSaved
                              ? `Remove ${item.title} from saved categories`
                              : `Save ${item.title} category`
                          }
                          title={
                            isSaved ? "Remove saved category" : "Save category"
                          }
                          onClick={() =>
                            setSaved((previous) =>
                              isSaved
                                ? previous.filter(
                                    (title) => title !== item.title
                                  )
                                : [...previous, item.title]
                            )
                          }
                        >
                          <Bookmark
                            size={16}
                            fill={isSaved ? "currentColor" : "none"}
                          />
                        </button>
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>

                      <div className="nx-card-foot">
                        <span>{item.tag}</span>
                        <span className="nx-status">COMING SOON</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="nx-lower">
              <div className="nx-panel">
                <div className="nx-panel-title">
                  <Sparkles size={19} color="#5269c6" />
                  A few ways to get ready
                </div>

                <div className="nx-tip">
                  <div className="nx-tip-icon">
                    <User size={18} />
                  </div>
                  <div>
                    <strong>Keep your profile details ready</strong>
                    <p>
                      Use a professional email and make sure your
                      name is correct for future applications.
                    </p>
                  </div>
                </div>

                <div className="nx-tip">
                  <div className="nx-tip-icon blue">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <strong>Gather your education documents</strong>
                    <p>
                      Certificates, results, and a simple CV may be
                      useful when opportunities open.
                    </p>
                  </div>
                </div>

                <div className="nx-tip">
                  <div className="nx-tip-icon orange">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <strong>Keep learning</strong>
                    <p>
                      Small, consistent steps can help you prepare
                      for future opportunities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="nx-panel">
                <div className="nx-panel-title">
                  <User size={19} color="#5269c6" />
                  Your account
                </div>

                <div className="nx-account-row">
                  <span className="nx-avatar">{initials || "N"}</span>
                  <div>
                    <strong>{fullName}</strong>
                    <div className="nx-account-email">
                      {user?.email || "Email not available"}
                    </div>
                  </div>
                </div>

                <p className="nx-account-message">
                  You're signed in and ready to explore NEXTORA.
                  Your saved categories currently last only while
                  this dashboard remains open.
                </p>

                <div className="nx-session">
                  <ShieldCheck size={16} />
                  Account session active
                </div>
              </div>
            </section>
          </>
        )}

        {activeView === "Saved Categories" && (
          <section className="nx-page-panel">
            <div className="nx-view-heading">
              <div>
                <h2>Saved Categories</h2>
                <p>Find the categories you bookmarked on this visit.</p>
              </div>
              <button
                className="nx-back-btn"
                onClick={() => navigate("Dashboard")}
              >
                Back to dashboard
              </button>
            </div>

            {saved.length === 0 ? (
              <div className="nx-empty">
                <Bookmark size={35} />
                <h3>No saved categories yet</h3>
                <p>
                  Visit your dashboard and tap the bookmark icon on
                  a category to add it here.
                </p>
                <button
                  className="nx-primary-btn"
                  onClick={() => navigate("Dashboard")}
                >
                  Explore categories
                </button>
              </div>
            ) : (
              <div className="nx-cards">
                {cards.filter((card) => saved.includes(card.title))
                  .map((item) => {
                    const Icon = item.icon;

                    return (
                      <article className="nx-card" key={item.title}>
                        <div
                          className="nx-card-icon"
                          style={{
                            background: item.tint,
                            color: item.ink,
                          }}
                        >
                          <Icon size={24} />
                        </div>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                        <button
                          className="nx-back-btn"
                          onClick={() =>
                            setSaved((previous) =>
                              previous.filter((title) => title !== item.title)
                            )
                          }
                        >
                          Remove saved category
                        </button>
                      </article>
                    );
                  })}
              </div>
            )}
          </section>
        )}

        {activeView === "Saved Opportunities" && (
          <section className="nx-page-panel">
            <div className="nx-view-heading">
              <div>
                <h2>Saved Opportunities</h2>
                <p>Keep track of opportunities you want to revisit.</p>
              </div>
              <button
                className="nx-back-btn"
                onClick={() => navigate("Dashboard")}
              >
                Back to dashboard
              </button>
            </div>

            <div className="nx-empty">
              <Sparkles size={35} />
              <h3>Opportunity listings are coming soon</h3>
              <p>
                There are no individual opportunities to save yet.
                When real listings become available, this section
                can show the ones you bookmark.
              </p>
            </div>
          </section>
        )}

        {activeView === "My Submissions" && (
          <section className="nx-page-panel">
            <div className="nx-view-heading">
              <div>
                <h2>My Submissions</h2>
                <p>Review your applications and submission progress.</p>
              </div>
              <button
                className="nx-back-btn"
                onClick={() => navigate("Dashboard")}
              >
                Back to dashboard
              </button>
            </div>

            <div className="nx-empty">
              <CheckCircle2 size={35} />
              <h3>Submission tracking is not connected yet</h3>
              <p>
                No submission records are being loaded here yet.
                We need to connect this section to a real database
                before it can show applications or statuses.
              </p>
            </div>
          </section>
        )}

        {activeView === "Notifications" && (
          <section className="nx-page-panel">
            <div className="nx-view-heading">
              <div>
                <h2>Notifications</h2>
                <p>Updates about your NEXTORA account and activity.</p>
              </div>
              <button
                className="nx-back-btn"
                onClick={() => navigate("Dashboard")}
              >
                Back to dashboard
              </button>
            </div>

            <div className="nx-empty">
              <Bell size={35} />
              <h3>You're all caught up</h3>
              <p>
                Notifications will appear here when the notification
                service is connected. There are no new updates to show.
              </p>
            </div>
          </section>
        )}
                {activeView === "My Profile" && (
          <section className="nx-page-panel">
            <div className="nx-view-heading">
              <div>
                <h2>My Profile</h2>
                <p>View the account information linked to your session.</p>
              </div>
              <button
                className="nx-back-btn"
                onClick={() => navigate("Dashboard")}
              >
                Back to dashboard
              </button>
            </div>

            <div className="nx-panel nx-profile-panel">
              <div className="nx-profile-avatar">{initials || "N"}</div>
              <h3>{fullName}</h3>
              <p>{user?.email || "Email not available"}</p>
              <div className="nx-profile-note">
                Your profile information is read from your current
                signed-in account. Profile editing has not been
                connected yet.
              </div>
            </div>
          </section>
        )}

        {activeView === "Account Settings" && (
          <section className="nx-page-panel">
            <div className="nx-view-heading">
              <div>
                <h2>Account Settings</h2>
                <p>Manage your NEXTORA account.</p>
              </div>
              <button
                className="nx-back-btn"
                onClick={() => navigate("Dashboard")}
              >
                Back to dashboard
              </button>
            </div>

            <div className="nx-panel nx-settings-panel">
              <div className="nx-setting-row">
                <ShieldCheck size={22} />
                <div>
                  <strong>Authentication</strong>
                  <p>Your account is managed securely through Supabase.</p>
                </div>
              </div>

              <div className="nx-setting-row">
                <User size={22} />
                <div>
                  <strong>Signed-in account</strong>
                  <p>{user?.email || "Email not available"}</p>
                </div>
              </div>

              <div className="nx-setting-row">
                <Bookmark size={22} />
                <div>
                  <strong>Saved categories</strong>
                  <p>
                    {saved.length} saved in the current dashboard session.
                    These are not yet stored permanently.
                  </p>
                </div>
              </div>

              <button
                className="nx-signout-large"
                onClick={() => onSignOut?.()}
              >
                <LogOut size={17} />
                Sign out of NEXTORA
              </button>
            </div>
          </section>
        )}

        {activeView === "Help & Support" && (
          <section className="nx-page-panel">
            <div className="nx-view-heading">
              <div>
                <h2>Help & Support</h2>
                <p>Helpful information for using NEXTORA.</p>
              </div>
              <button
                className="nx-back-btn"
                onClick={() => navigate("Dashboard")}
              >
                Back to dashboard
              </button>
            </div>

            <div className="nx-panel nx-help-panel">
              <div className="nx-setting-row">
                <Compass size={22} />
                <div>
                  <strong>Explore categories</strong>
                  <p>
                    Browse education, careers, funding, and skills
                    from your dashboard.
                  </p>
                </div>
              </div>

              <div className="nx-setting-row">
                <Bookmark size={22} />
                <div>
                  <strong>Save categories</strong>
                  <p>
                    Tap the bookmark icon on a category to add it
                    to Saved Categories during your current visit.
                  </p>
                </div>
              </div>

              <div className="nx-setting-row">
                <ShieldCheck size={22} />
                <div>
                  <strong>Account security</strong>
                  <p>
                    Never share your password. Sign out when using
                    a device that other people can access.
                  </p>
                </div>
              </div>

              <p className="nx-help-note">
                More support options can be added when NEXTORA's
                official support channel is ready.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="nx-footer">
        © {new Date().getFullYear()} NEXTORA · Ayanfe Innovation Labs Limited
      </footer>

      <style>{`
        .nx-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: grid;
          grid-template-columns: minmax(0,1fr) 180px;
          align-items: center;
          gap: 20px;
          padding: 30px;
          border-radius: 24px;
          background: linear-gradient(115deg,#233c85,#4868d7 68%,#7887ee);
          color: white;
          box-shadow: 0 18px 44px #304bc425;
        }
        .nx-hero:after {
          content: "";
          position: absolute;
          z-index: -1;
          width: 280px;
          height: 280px;
          right: -80px;
          top: -160px;
          border: 1px solid #ffffff35;
          border-radius: 50%;
        }
        .nx-kicker {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 13px;
          color: #e0e7ff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.4px;
        }
        .nx-hero h1 {
          margin: 0 0 12px;
          font-size: clamp(27px,4vw,38px);
          line-height: 1.2;
          letter-spacing: -1px;
          overflow-wrap: anywhere;
        }
        .nx-hero p {
          max-width: 600px;
          margin: 0;
          color: #e8edff;
          font-size: 13px;
          line-height: 1.8;
        }
        .nx-hero-art {
          width: 145px;
          height: 145px;
          display: grid;
          place-items: center;
          justify-self: center;
          border: 1px solid #ffffff42;
          border-radius: 34px;
          background: #ffffff18;
          transform: rotate(-5deg);
        }
        .nx-hero-art-inner {
          width: 100px;
          height: 100px;
          display: grid;
          place-items: center;
          border-radius: 27px;
          background: white;
          color: #4263d1;
          transform: rotate(5deg);
        }
        .nx-stat-row {
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 13px;
          margin: 17px 0 32px;
        }
        .nx-stat {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border: 1px solid #e8edf6;
          border-radius: 16px;
          background: white;
        }
        .nx-stat-icon {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: #edf2ff;
          color: #4c66d3;
        }
        .nx-stat-icon.purple {
          background: #f2eafe;
          color: #8155c8;
        }
        .nx-stat-icon.green {
          background: #e5f7f0;
          color: #258660;
        }
        .nx-stat strong {
          display: block;
          margin-bottom: 5px;
          font-size: 12px;
        }
        .nx-stat span {
          color: #8290a6;
          font-size: 10px;
          line-height: 1.5;
        }
        .nx-section-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 17px;
        }
        .nx-eyebrow {
          display: block;
          margin-bottom: 8px;
          color: #526bc9;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }
        .nx-section-head h2 {
          margin: 0;
          font-size: clamp(22px,3vw,28px);
          letter-spacing: -.6px;
        }
        .nx-section-head p {
          margin: 7px 0 0;
          color: #7a879d;
          font-size: 12px;
          line-height: 1.7;
        }
        .nx-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: 18px 0;
        }
        .nx-filter {
          padding: 9px 13px;
          border: 1px solid #e2e8f3;
          border-radius: 9px;
          background: white;
          color: #718099;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }
        .nx-filter.active {
          border-color: #4263eb;
          background: #4263eb;
          color: white;
        }
        .nx-cards {
          display: grid;
          grid-template-columns: repeat(4,minmax(0,1fr));
          gap: 13px;
        }
        .nx-card {
          min-width: 0;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 19px;
          border: 1px solid #e7ecf5;
          border-radius: 17px;
          background: white;
          text-align: left;
        }
        .nx-card-top {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .nx-card-icon {
          width: 47px;
          height: 47px;
          display: grid;
          place-items: center;
          border-radius: 14px;
        }
        .nx-save {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid #e8edf6;
          border-radius: 10px;
          background: white;
          color: #8995a8;
          cursor: pointer;
        }
        .nx-save.saved {
          color: #4263eb;
          background: #edf2ff;
        }
        .nx-card h3 {
          margin: 17px 0 8px;
          font-size: 14px;
        }
        .nx-card p {
          margin: 0;
          color: #7b879b;
          font-size: 11px;
          line-height: 1.75;
        }
        .nx-card-foot {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
          padding-top: 16px;
          color: #5069ca;
          font-size: 10px;
          font-weight: 800;
        }
        .nx-status {
          padding: 6px 8px;
          border-radius: 7px;
          background: #f2f5fb;
          color: #7a879d;
          font-size: 9px;
        }
        .nx-lower {
          display: grid;
          grid-template-columns: minmax(0,1.3fr) minmax(0,.7fr);
          gap: 15px;
          margin-top: 24px;
        }
        .nx-panel, .nx-page-panel {
          padding: 22px;
          border: 1px solid #e7ecf5;
          border-radius: 17px;
          background: white;
        }
        .nx-page-panel { margin-bottom: 22px; }
        .nx-panel-title {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 13px;
          font-size: 14px;
          font-weight: 900;
        }
        .nx-tip {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 13px 0;
          border-bottom: 1px solid #eff2f8;
        }
        .nx-tip:last-child { border-bottom: 0; }
        .nx-tip-icon {
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #f0eaff;
          color: #8254d4;
        }
        .nx-tip-icon.blue {
          background: #eaf0ff;
          color: #4565d8;
        }
        .nx-tip-icon.orange {
          background: #fff0e3;
          color: #c47735;
        }
        .nx-tip strong {
          display: block;
          margin: 1px 0 5px;
          font-size: 11px;
        }
        .nx-tip p, .nx-account-message {
          margin: 0;
          color: #7b879b;
          font-size: 11px;
          line-height: 1.7;
        }
        .nx-account-row {
          display: flex;
          align-items: center;
          gap: 11px;
          margin: 15px 0;
          padding: 12px;
          border-radius: 12px;
          background: #f7f9fe;
        }
        .nx-account-row strong {
          display: block;
          margin-bottom: 4px;
          font-size: 12px;
        }
        .nx-account-email {
          overflow-wrap: anywhere;
          color: #77859b;
          font-size: 11px;
          line-height: 1.6;
        }
        .nx-session {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 13px;
          color: #258660;
          font-size: 11px;
          font-weight: 800;
        }
        .nx-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 35px 18px;
          text-align: center;
          color: #5269c6;
        }
        .nx-empty h3 {
          margin: 14px 0 8px;
          color: #233250;
          font-size: 17px;
        }
        .nx-empty p {
          max-width: 470px;
          margin: 0;
          color: #78869c;
          font-size: 12px;
          line-height: 1.8;
        }
        .nx-primary-btn {
          margin-top: 17px;
          padding: 11px 15px;
          border: 0;
          border-radius: 10px;
          background: #3456ce;
          color: white;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }
        .nx-profile-panel {
          text-align: center;
          padding: 35px 20px;
        }
        .nx-profile-avatar {
          width: 72px;
          height: 72px;
          margin: auto;
          display: grid;
          place-items: center;
          border-radius: 22px;
          background: #eaf0ff;
          color: #3855ce;
          font-size: 22px;
          font-weight: 900;
        }
        .nx-profile-panel h3 {
          margin: 15px 0 6px;
          font-size: 19px;
        }
        .nx-profile-panel > p {
          color: #78869c;
          font-size: 13px;
          overflow-wrap: anywhere;
        }
        .nx-profile-note, .nx-help-note {
          margin: 17px auto 0;
          max-width: 520px;
          padding: 13px;
          border-radius: 11px;
          background: #f5f7fd;
          color: #77859b;
          font-size: 12px;
          line-height: 1.7;
        }
        .nx-setting-row {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          padding: 15px 0;
          border-bottom: 1px solid #edf0f6;
          color: #5067bd;
        }
        .nx-setting-row strong {
          display: block;
          margin-bottom: 5px;
          color: #253451;
          font-size: 13px;
        }
        .nx-setting-row p {
          margin: 0;
          color: #78869c;
          font-size: 12px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }
        .nx-signout-large {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          margin-top: 20px;
          padding: 13px;
          border: 0;
          border-radius: 11px;
          background: #fff0f0;
          color: #a73c48;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }
        .nx-footer {
          padding: 0 15px 25px;
          text-align: center;
          color: #98a2b4;
          font-size: 11px;
        }
        @media (max-width: 900px) {
          .nx-cards { grid-template-columns: repeat(2,minmax(0,1fr)); }
          .nx-hero { grid-template-columns: minmax(0,1fr) 130px; padding: 24px; }
          .nx-hero-art { width: 115px; height: 115px; }
          .nx-hero-art-inner { width: 82px; height: 82px; }
        }
        @media (max-width: 600px) {
          .nx-topbar-inner, .nx-wrap {
            width: calc(100% - 24px);
          }
          .nx-topbar-inner { min-height: 64px; }
          .nx-brand { font-size: 17px; gap: 7px; }
          .nx-brand-mark { width: 34px; height: 34px; }
          .nx-actions { gap: 6px; }
          .nx-icon-btn { width: 38px; height: 38px; }
          .nx-user-chip { display: none; }
          .nx-wrap { padding-top: 18px; }
          .nx-hero {
            grid-template-columns: 1fr;
            padding: 23px 19px;
            border-radius: 20px;
          }
          .nx-hero-art { display: none; }
          .nx-hero h1 { font-size: 28px; }
          .nx-hero p { font-size: 12px; }
          .nx-stat-row { gap: 7px; margin: 12px 0 27px; }
          .nx-stat {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 11px 9px;
          }
          .nx-stat-icon { width: 33px; height: 33px; }
          .nx-stat strong { font-size: 10px; }
          .nx-stat span { font-size: 9px; }
          .nx-cards { grid-template-columns: 1fr; gap: 10px; }
          .nx-card { min-height: 0; padding: 16px; }
          .nx-card h3 { margin-top: 13px; }
          .nx-lower { grid-template-columns: 1fr; gap: 12px; }
          .nx-panel, .nx-page-panel { padding: 17px; }
          .nx-view-heading {
            align-items: flex-start;
            flex-direction: column;
          }
          .nx-menu { width: min(255px, calc(100vw - 24px)); }
        }
      `}</style>
    </div>
  );
}
