import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  Heart,
  LogOut,
  ShieldCheck,
  Sparkles,
  User,
  Wallet,
} from "lucide-react";
import { supabase } from "./lib/supabaseclient";

const opportunities = [
  {
    title: "Scholarships",
    description: "Discover educational funding opportunities.",
    icon: GraduationCap,
    color: "#EAF1FF",
  },
  {
    title: "Jobs & Careers",
    description: "Explore career opportunities and internships.",
    icon: BriefcaseBusiness,
    color: "#F2EAFE",
  },
  {
    title: "Grants & Funding",
    description: "Find support for your ideas and projects.",
    icon: Wallet,
    color: "#FFF0E3",
  },
  {
    title: "NEXTORA Academy",
    description: "Prepare for your future with useful skills.",
    icon: BookOpen,
    color: "#E5F7F0",
  },
];

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
    padding: "18px 6%",
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
  dashboardMain: {
    width: "min(100% - 32px, 1050px)",
    margin: "35px auto 60px",
  },
  welcome: {
    background: "linear-gradient(120deg, #243D85, #526FC4)",
    color: "#FFFFFF",
    padding: "30px 25px",
    borderRadius: 22,
    marginBottom: 28,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    marginTop: 20,
  },
  tile: {
    padding: 22,
    background: "#FFFFFF",
    border: "1px solid #E9ECF4",
    borderRadius: 17,
    textAlign: "left",
    color: "#18213B",
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
            <Sparkles size={14} style={{ verticalAlign: "middle" }} />{" "}
            WHERE OPPORTUNITIES BEGIN
          </div>

          <h1 style={styles.title}>
            {isSignup ? "Create your NEXTORA account." : "Welcome back."}
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
                  onChange={(event) => setFullName(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={isSignup ? "new-password" : "current-password"}
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

            <button style={styles.primary} type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : isSignup
                  ? "Create account"
                  : "Sign in"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <div style={styles.switch}>
            {isSignup ? "Already have an account? " : "New to NEXTORA? "}
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
          <ShieldCheck size={14} style={{ verticalAlign: "middle" }} />{" "}
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
  const [active, setActive] = useState("Overview");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileName, setProfileName] = useState(
    user?.user_metadata?.full_name ||
      user?.email?.split("@")[0] ||
      "NEXTORA member"
  );
  const [editingProfile, setEditingProfile] = useState(false);
  const [notice, setNotice] = useState("");

  const initials = profileName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase() || "N";

  const navItems = [
    { label: "Overview", icon: Sparkles },
    { label: "Opportunities", icon: BriefcaseBusiness },
    { label: "Saved Opportunities", icon: Heart },
    { label: "My Applications", icon: ArrowUpRight },
    { label: "Recommendations", icon: ShieldCheck },
    { label: "Deadlines", icon: Wallet },
    { label: "Notifications", icon: BookOpen },
    { label: "NEXTORA Academy", icon: GraduationCap },
    { label: "My Profile", icon: User },
  ];

  const categories = [
    {
      title: "Scholarships",
      description: "Education funding and study opportunities.",
      icon: GraduationCap,
      background: "#EAF0FF",
      color: "#3659A8",
    },
    {
      title: "Jobs & Careers",
      description: "Jobs, internships and career development.",
      icon: BriefcaseBusiness,
      background: "#F0EAFE",
      color: "#7451B8",
    },
    {
      title: "Grants & Funding",
      description: "Support for ideas, projects and businesses.",
      icon: Wallet,
      background: "#FFF0E3",
      color: "#B86A27",
    },
    {
      title: "Training & Skills",
      description: "Build practical skills for your next step.",
      icon: BookOpen,
      background: "#E4F7EF",
      color: "#238263",
    },
    {
      title: "Competitions",
      description: "Challenges, awards and talent opportunities.",
      icon: Sparkles,
      background: "#FFF0F2",
      color: "#B84C67",
    },
    {
      title: "Fellowships",
      description: "Leadership, research and development programmes.",
      icon: ShieldCheck,
      background: "#E7F5FA",
      color: "#26728C",
    },
  ];

  const sectionDescriptions = {
    "Saved Opportunities":
      "Keep promising opportunities together so you can return to them later.",
    "My Applications":
      "Follow the progress of opportunities you apply for through NEXTORA.",
    Recommendations:
      "Discover suggestions tailored to your interests as recommendation features become available.",
    Deadlines:
      "Keep important closing dates in view and plan your next steps.",
    Notifications:
      "Find important account and opportunity updates in one place.",
  };

  function navigate(label) {
    setActive(label);
    setMobileMenu(false);
    setNotice("");
    setEditingProfile(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function EmptyState({ title, description }) {
    return (
      <div className="nx-empty">
        <span className="nx-empty-icon">
          <Sparkles size={23} />
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }

  function Overview() {
    const statistics = [
      {
        title: "Saved opportunities",
        value: "0",
        detail: "Nothing saved yet",
        icon: Heart,
        background: "#FCECF1",
        color: "#B94D70",
      },
      {
        title: "Applications",
        value: "0",
        detail: "No applications tracked",
        icon: ArrowUpRight,
        background: "#EAF0FF",
        color: "#3659A8",
      },
      {
        title: "Courses in progress",
        value: "0",
        detail: "Your learning journey",
        icon: BookOpen,
        background: "#E5F7EF",
        color: "#238263",
      },
      {
        title: "Upcoming deadlines",
        value: "0",
        detail: "No deadlines tracked",
        icon: Wallet,
        background: "#FFF1E3",
        color: "#B86A27",
      },
    ];

    return (
      <>
        <section className="nx-welcome">
          <div className="nx-welcome-copy">
            <span className="nx-eyebrow nx-light">
              YOUR NEXT CHAPTER STARTS HERE
            </span>

            <h1>
              Welcome back, {profileName.split(" ")[0]} <span>✦</span>
            </h1>

            <p>
              Discover possibilities, build useful skills, and prepare
              confidently for your next opportunity. Your journey starts
              with one step.
            </p>

            <button
              className="nx-white-button"
              onClick={() => navigate("Opportunities")}
            >
              Explore opportunities <ArrowRight size={16} />
            </button>
          </div>

          <div className="nx-orbit-art" aria-hidden="true">
            <div className="nx-orbit nx-orbit-one" />
            <div className="nx-orbit nx-orbit-two" />
            <div className="nx-orbit-core">
              <Sparkles size={35} />
            </div>
            <span className="nx-orbit-dot dot-one" />
            <span className="nx-orbit-dot dot-two" />
            <span className="nx-orbit-dot dot-three" />
          </div>
        </section>

        <section className="nx-section-heading">
          <div>
            <span className="nx-eyebrow">YOUR PROGRESS</span>
            <h1>Your opportunity overview</h1>
            <p>
              Your dashboard will reflect your activity as more NEXTORA
              features become available.
            </p>
          </div>
        </section>

        <section className="nx-stats">
          {statistics.map((item) => {
            const Icon = item.icon;

            return (
              <article className="nx-stat" key={item.title}>
                <span
                  className="nx-stat-icon"
                  style={{
                    background: item.background,
                    color: item.color,
                  }}
                >
                  <Icon size={20} />
                </span>

                <div>
                  <p>{item.title}</p>
                  <strong>{item.value}</strong>
                  <small>{item.detail}</small>
                </div>
              </article>
            );
          })}
        </section>

        <section className="nx-overview-grid">
          <article className="nx-panel">
            <div className="nx-panel-head">
              <div>
                <h3>Your activity</h3>
                <p>A visual overview of your NEXTORA journey.</p>
              </div>
              <span className="nx-soft-pill">Activity chart</span>
            </div>

            <div className="nx-chart-wrap">
              <svg
                viewBox="0 0 560 180"
                className="nx-line-chart"
                role="img"
                aria-label="Activity chart awaiting your activity data"
              >
                {[25, 65, 105, 145].map((y) => (
                  <line
                    key={y}
                    x1="24"
                    y1={y}
                    x2="540"
                    y2={y}
                    stroke="#E9EDF5"
                    strokeDasharray="4 5"
                  />
                ))}

                <path
                  d="M24 145 L110 145 L196 145 L282 145 L368 145 L454 145 L540 145"
                  fill="none"
                  stroke="#A9B9E5"
                  strokeWidth="3"
                  strokeDasharray="5 8"
                  strokeLinecap="round"
                />

                {[24, 110, 196, 282, 368, 454, 540].map((x) => (
                  <circle
                    key={x}
                    cx={x}
                    cy="145"
                    r="4"
                    fill="#FFFFFF"
                    stroke="#A9B9E5"
                    strokeWidth="2"
                  />
                ))}

                <text x="24" y="170" fill="#8A94AA" fontSize="11">
                  Start
                </text>
                <text x="500" y="170" fill="#8A94AA" fontSize="11">
                  Later
                </text>
              </svg>

              <div className="nx-chart-empty">
                <span>
                  <Sparkles size={17} />
                </span>
                <b>Your progress story starts here</b>
                <small>
                  This chart is a preview. Real activity data will be
                  connected when the relevant features are implemented.
                </small>
              </div>
            </div>
          </article>

          <article className="nx-panel">
            <div className="nx-panel-head">
              <div>
                <h3>Explore by category</h3>
                <p>Find an area that matches your goals.</p>
              </div>
            </div>

            <div className="nx-category-summary">
              {categories.slice(0, 4).map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    className="nx-category-row"
                    key={category.title}
                    onClick={() => navigate("Opportunities")}
                  >
                    <span
                      style={{
                        background: category.background,
                        color: category.color,
                      }}
                    >
                      <Icon size={18} />
                    </span>

                    <b>{category.title}</b>
                    <ArrowRight size={15} />
                  </button>
                );
              })}
            </div>

            <button
              className="nx-text-button"
              onClick={() => navigate("Opportunities")}
            >
              View all categories <ArrowRight size={15} />
            </button>
          </article>
        </section>

        <section className="nx-overview-grid nx-bottom-grid">
          <article className="nx-panel">
            <div className="nx-panel-head">
              <div>
                <h3>Saved opportunities</h3>
                <p>Your shortlist in one place.</p>
              </div>

              <button
                className="nx-small-link"
                onClick={() => navigate("Saved Opportunities")}
              >
                View all
              </button>
            </div>

            <EmptyState
              title="Nothing saved yet"
              description="Your saved opportunities will appear here once opportunity listings and saving are connected."
            />
          </article>

          <article className="nx-panel">
            <div className="nx-panel-head">
              <div>
                <h3>NEXTORA Academy</h3>
                <p>Learning for your next step.</p>
              </div>

              <button
                className="nx-small-link"
                onClick={() => navigate("NEXTORA Academy")}
              >
                Explore
              </button>
            </div>

            <div className="nx-academy-promo">
              <span>
                <GraduationCap size={26} />
              </span>

              <div>
                <b>Learn. Grow. Move forward.</b>
                <p>
                  Explore the Academy space and prepare to build new skills.
                </p>
              </div>
            </div>

            <button
              className="nx-primary-button"
              onClick={() => navigate("NEXTORA Academy")}
            >
              Visit Academy <ArrowRight size={16} />
            </button>
          </article>
        </section>
      </>
    );
  }

  function Opportunities() {
    return (
      <>
        <section className="nx-section-heading">
          <div>
            <span className="nx-eyebrow">FIND YOUR NEXT STEP</span>
            <h1>Explore opportunities</h1>
            <p>
              Explore opportunity categories that may match your ambitions.
              Live listings will appear here when the opportunity database
              is connected.
            </p>
          </div>
        </section>

        <div className="nx-notice">
          <ShieldCheck size={20} />
          <span>
            <b>Opportunity catalogue coming soon.</b> These are category
            previews, not live opportunities. Applications cannot yet be
            submitted through this screen.
          </span>
        </div>

        <section className="nx-category-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article className="nx-category-card" key={category.title}>
                <span
                  className="nx-category-icon"
                  style={{
                    background: category.background,
                    color: category.color,
                  }}
                >
                  <Icon size={25} />
                </span>

                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span className="nx-coming-soon">Listings coming soon</span>
              </article>
            );
          })}
        </section>
      </>
    );
  }

  function Academy() {
    const courses = [
      {
        title: "Career Readiness",
        description:
          "Prepare for applications, interviews and the world of work.",
        icon: BriefcaseBusiness,
        background: "#EAF0FF",
      },
      {
        title: "Digital Skills",
        description:
          "Build confidence with practical digital knowledge.",
        icon: Sparkles,
        background: "#F0EAFE",
      },
      {
        title: "Personal Development",
        description:
          "Strengthen communication, habits and goal setting.",
        icon: GraduationCap,
        background: "#E4F7EF",
      },
    ];

    return (
      <>
        <section className="nx-section-heading">
          <div>
            <span className="nx-eyebrow">LEARN AT YOUR PACE</span>
            <h1>NEXTORA Academy</h1>
            <p>
              A learning space designed to help you prepare, grow and move
              forward.
            </p>
          </div>
        </section>

        <section className="nx-academy-hero">
          <div>
            <span className="nx-eyebrow nx-light">
              YOUR GROWTH MATTERS
            </span>
            <h2>Small lessons. Bigger possibilities.</h2>
            <p>
              Course lessons, progress tracking and certificates will
              become available as Academy content is developed.
            </p>
          </div>

          <div className="nx-academy-art">
            <BookOpen size={48} />
          </div>
        </section>

        <section className="nx-course-grid">
          {courses.map((course) => {
            const Icon = course.icon;

            return (
              <article className="nx-course-card" key={course.title}>
                <span
                  className="nx-category-icon"
                  style={{ background: course.background }}
                >
                  <Icon size={24} />
                </span>

                <span className="nx-coming-soon">Coming soon</span>
                <h3>{course.title}</h3>
                <p>{course.description}</p>

                <div className="nx-progress-track">
                  <span style={{ width: "0%" }} />
                </div>

                <small>0% progress · Lessons not yet available</small>
              </article>
            );
          })}
        </section>

        <div className="nx-notice" style={{ marginTop: 18 }}>
          <BookOpen size={19} />
          <span>
            These are planned learning areas. Course lessons and
            certificates are not available yet.
          </span>
        </div>
      </>
    );
  }

  function Profile() {
    return (
      <>
        <section className="nx-section-heading">
          <div>
            <span className="nx-eyebrow">YOUR ACCOUNT</span>
            <h1>My profile</h1>
            <p>Review your account information.</p>
          </div>
        </section>

        <section className="nx-panel nx-profile-card">
          <div className="nx-profile-top">
            <span className="nx-avatar nx-avatar-large">{initials}</span>

            <div>
              <h2>{profileName}</h2>
              <p>{user?.email}</p>
              <span className="nx-soft-pill">NEXTORA member</span>
            </div>
          </div>

          <div className="nx-profile-detail">
            <span>Email address</span>
            <b>{user?.email || "Not available"}</b>
          </div>

          <div className="nx-profile-detail">
            <span>Account security</span>
            <b>
              <ShieldCheck size={16} /> Supabase authenticated
            </b>
          </div>

          {editingProfile ? (
            <form
              className="nx-profile-form"
              onSubmit={(event) => {
                event.preventDefault();
                setEditingProfile(false);
                setNotice(
                  "Display name updated for this session only. Database profile saving has not been connected yet."
                );
              }}
            >
              <label htmlFor="nx-display-name">Display name</label>
              <input
                id="nx-display-name"
                value={profileName}
                onChange={(event) => setProfileName(event.target.value)}
                minLength={2}
                required
              />

              <div className="nx-form-actions">
                <button className="nx-primary-button" type="submit">
                  Save display name
                </button>

                <button
                  className="nx-secondary-button"
                  type="button"
                  onClick={() => setEditingProfile(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              className="nx-primary-button"
              style={{ marginTop: 20 }}
              onClick={() => setEditingProfile(true)}
            >
              Edit display name <ArrowRight size={16} />
            </button>
          )}
        </section>
      </>
    );
                }        
  const emptySections = [
    "Saved Opportunities",
    "My Applications",
    "Recommendations",
    "Deadlines",
    "Notifications",
  ];

  const emptyMessages = {
    "Saved Opportunities": {
      title: "No saved opportunities yet",
      description:
        "Your shortlist will appear here once real opportunity listings and the save feature are connected.",
    },
    "My Applications": {
      title: "No applications to track",
      description:
        "Application tracking will appear here after the opportunity application workflow is implemented.",
    },
    Recommendations: {
      title: "Your recommendations are on the way",
      description:
        "Personalized recommendations need your preferences and a connected opportunity catalogue.",
    },
    Deadlines: {
      title: "No upcoming deadlines",
      description:
        "Real opportunity closing dates will appear here when the catalogue is connected.",
    },
    Notifications: {
      title: "You're all caught up",
      description:
        "Account and opportunity notifications will appear here as those features are implemented.",
    },
  };

  return (
    <div className="nx-app-shell">
      <style>{`
        .nx-app-shell {
          --nx-blue: #29458F;
          --nx-muted: #75809A;
          --nx-border: #E7EAF2;
          min-height: 100vh;
          background: #F5F7FC;
          color: #1C2743;
          font-family: inherit;
        }
        .nx-app-shell * { box-sizing: border-box; }
        .nx-layout { display:flex; min-height:100vh; }
        .nx-sidebar {
          width:255px; flex-shrink:0; background:#fff;
          border-right:1px solid var(--nx-border); padding:25px 15px;
          display:flex; flex-direction:column; position:sticky; top:0;
          height:100vh; overflow:auto;
        }
        .nx-brand {
          display:flex; align-items:center; gap:11px; padding:0 12px 28px;
          color:#243D85; font-size:21px; font-weight:900;
        }
        .nx-brand-mark {
          width:39px; height:39px; display:grid; place-items:center;
          background:#EAF0FF; border-radius:13px;
        }
        .nx-side-label {
          font-size:10px; letter-spacing:1.6px; font-weight:800;
          color:#9AA2B5; padding:0 13px; margin:4px 0 12px;
        }
        .nx-nav { display:grid; gap:5px; }
        .nx-nav-button {
          width:100%; display:flex; align-items:center; gap:12px;
          padding:12px 13px; border:0; border-radius:11px;
          background:transparent; color:#69748D; font-size:13px;
          font-weight:650; text-align:left; cursor:pointer;
        }
        .nx-nav-button:hover { background:#F5F7FC; color:#29458F; }
        .nx-nav-button.active { background:#EAF0FF; color:#29458F; font-weight:800; }
        .nx-nav-button svg { flex-shrink:0; }
        .nx-side-bottom { margin-top:auto; padding:22px 7px 0; }
        .nx-side-help { padding:15px; background:#F5F7FC; border-radius:14px; margin-bottom:17px; }
        .nx-side-help b { font-size:12px; }
        .nx-side-help p { font-size:11px; color:var(--nx-muted); line-height:1.6; margin:7px 0 0; }
        .nx-company { font-size:10px; color:#9AA2B5; line-height:1.7; padding:0 7px; }
        .nx-workspace { min-width:0; flex:1; }
        .nx-topbar {
          height:77px; background:#fff; border-bottom:1px solid var(--nx-border);
          display:flex; align-items:center; justify-content:space-between;
          padding:0 34px; gap:15px;
        }
        .nx-topbar-left { display:flex; align-items:center; gap:12px; }
        .nx-page-kicker { font-size:11px; color:#8791A7; font-weight:700; letter-spacing:.7px; }
        .nx-topbar h2 { font-size:17px; margin:4px 0 0; }
        .nx-topbar-right { display:flex; align-items:center; gap:12px; }
        .nx-topbar-email { font-size:12px; color:#68738D; max-width:210px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .nx-avatar { width:39px; height:39px; border-radius:50%; display:grid; place-items:center; background:#EAF0FF; color:#29458F; font-weight:850; font-size:13px; flex-shrink:0; }
        .nx-icon-button { display:none; border:1px solid var(--nx-border); background:#fff; border-radius:10px; padding:9px; color:#29458F; cursor:pointer; }
        .nx-content { max-width:1450px; margin:auto; padding:30px 34px 45px; }
        .nx-welcome {
          position:relative; overflow:hidden; border-radius:22px; padding:34px 35px;
          background:linear-gradient(115deg,#223B82 0%,#3858A6 57%,#687FD0 100%);
          color:#fff; min-height:230px; display:flex; align-items:center;
          justify-content:space-between; gap:20px;
        }
        .nx-welcome-copy { position:relative; z-index:2; max-width:600px; }
        .nx-eyebrow { font-size:10px; letter-spacing:1.7px; font-weight:850; color:#7183B7; display:block; margin-bottom:10px; }
        .nx-eyebrow.nx-light { color:#D9E3FF; }
        .nx-welcome h1 { font-size:clamp(27px,3vw,38px); line-height:1.2; letter-spacing:-1px; margin:0 0 12px; }
        .nx-welcome h1 span { color:#F9D88D; }
        .nx-welcome p { font-size:13px; line-height:1.8; color:#E4EAFF; max-width:490px; margin:0 0 22px; }
        .nx-white-button,.nx-primary-button,.nx-secondary-button {
          display:inline-flex; align-items:center; justify-content:center; gap:9px;
          border:0; border-radius:10px; padding:12px 15px; font-weight:800;
          font-size:12px; cursor:pointer;
        }
        .nx-white-button { background:#fff; color:#29458F; }
        .nx-primary-button { background:#29458F; color:#fff; }
        .nx-secondary-button { background:#F0F2F8; color:#56617A; }
        .nx-orbit-art { width:205px; height:185px; position:relative; flex-shrink:0; display:grid; place-items:center; }
        .nx-orbit { position:absolute; border:1px solid #FFFFFF4A; border-radius:50%; transform:rotate(-28deg); }
        .nx-orbit-one { width:185px; height:115px; }
        .nx-orbit-two { width:145px; height:175px; transform:rotate(42deg); }
        .nx-orbit-core { width:77px; height:77px; border-radius:24px; background:#FFFFFF20; border:1px solid #FFFFFF60; display:grid; place-items:center; color:#FFE3A3; box-shadow:0 15px 35px #172D7030; }
        .nx-orbit-dot { position:absolute; width:12px; height:12px; border-radius:50%; background:#F9D88D; border:3px solid #526FC4; }
        .dot-one { top:24px; right:43px; }
        .dot-two { bottom:24px; left:35px; background:#BDEBDD; }
        .dot-three { right:11px; bottom:54px; background:#fff; }
        .nx-section-heading { display:flex; align-items:flex-end; justify-content:space-between; gap:20px; margin:32px 0 18px; }
        .nx-section-heading h1 { font-size:clamp(23px,2.5vw,29px); letter-spacing:-.7px; margin:0 0 7px; }
        .nx-section-heading p { font-size:12px; color:var(--nx-muted); line-height:1.7; margin:0; max-width:700px; }
        .nx-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; }
        .nx-stat { display:flex; align-items:flex-start; gap:13px; padding:19px 16px; background:#fff; border:1px solid var(--nx-border); border-radius:16px; min-width:0; }
        .nx-stat-icon { width:40px; height:40px; border-radius:12px; display:grid; place-items:center; flex-shrink:0; }
        .nx-stat p { font-size:11px; color:#737E97; margin:1px 0 8px; }
        .nx-stat strong { display:block; font-size:25px; line-height:1.1; }
        .nx-stat small { display:block; font-size:10px; color:#9AA2B4; margin-top:7px; line-height:1.5; }
        .nx-overview-grid { display:grid; grid-template-columns:minmax(0,1.5fr) minmax(270px,1fr); gap:16px; margin-top:18px; }
        .nx-panel { background:#fff; border:1px solid var(--nx-border); border-radius:17px; padding:22px; min-width:0; }
        .nx-panel-head { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; }
        .nx-panel-head h3 { font-size:15px; margin:0 0 6px; }
        .nx-panel-head p { font-size:11px; color:var(--nx-muted); line-height:1.6; margin:0; }
        .nx-soft-pill { display:inline-flex; align-items:center; border-radius:20px; background:#F0F3FB; color:#6879A8; padding:7px 10px; font-size:10px; font-weight:750; white-space:nowrap; }
        .nx-chart-wrap { position:relative; margin-top:17px; min-height:205px; }
        .nx-line-chart { width:100%; height:170px; display:block; }
        .nx-chart-empty { display:flex; align-items:center; flex-direction:column; text-align:center; gap:5px; margin-top:-4px; }
        .nx-chart-empty span { width:31px; height:31px; border-radius:10px; display:grid; place-items:center; background:#EDF1FF; color:#526FC4; }
        .nx-chart-empty b { font-size:11px; }
        .nx-chart-empty small { font-size:10px; line-height:1.6; color:#8A94AA; max-width:270px; }
        .nx-category-summary { display:grid; gap:7px; margin-top:15px; }
        .nx-category-row { display:flex; align-items:center; gap:10px; width:100%; border:0; background:transparent; text-align:left; padding:9px 4px; border-radius:10px; cursor:pointer; color:#35405A; }
        .nx-category-row:hover { background:#F7F8FC; }
        .nx-category-row span { width:34px; height:34px; display:grid; place-items:center; border-radius:10px; }
        .nx-category-row b { font-size:11px; flex:1; }
        .nx-category-row>svg { color:#9BA4B7; }
        .nx-text-button,.nx-small-link { display:inline-flex; align-items:center; gap:6px; border:0; background:transparent; color:#3455A0; font-size:11px; font-weight:800; cursor:pointer; }
        .nx-text-button { margin-top:12px; padding:8px 0; }
        .nx-bottom-grid { grid-template-columns:1fr 1fr; }
        .nx-small-link { padding:3px; }
        .nx-empty { padding:25px 8px 12px; text-align:center; display:flex; flex-direction:column; align-items:center; }
        .nx-empty-icon { width:43px; height:43px; display:grid; place-items:center; background:#F0F3FC; color:#8294CB; border-radius:14px; margin-bottom:10px; }
        .nx-empty h3 { font-size:12px; margin:0 0 6px; }
        .nx-empty p { font-size:10px; color:#8A94AA; line-height:1.7; max-width:270px; margin:0; }
        .nx-academy-promo { display:flex; align-items:center; gap:13px; padding:17px 0; }
        .nx-academy-promo>span { width:47px; height:47px; display:grid; place-items:center; background:#E4F7EF; color:#238263; border-radius:13px; flex-shrink:0; }
        .nx-academy-promo b { font-size:12px; }
        .nx-academy-promo p { font-size:10px; line-height:1.7; color:var(--nx-muted); margin:6px 0 0; }
        .nx-category-grid,.nx-course-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:16px; }
        .nx-category-card,.nx-course-card { background:#fff; border:1px solid var(--nx-border); border-radius:17px; padding:22px; min-width:0; }
        .nx-category-icon { width:49px; height:49px; display:grid; place-items:center; border-radius:14px; margin-bottom:17px; }
        .nx-category-card h3,.nx-course-card h3 { font-size:15px; margin:0 0 8px; }
        .nx-category-card p,.nx-course-card p { font-size:11px; line-height:1.8; color:var(--nx-muted); min-height:39px; margin:0 0 17px; }
        .nx-coming-soon { display:inline-flex; background:#F4F5F9; color:#8A93A7; font-size:9px; font-weight:800; padding:7px 9px; border-radius:20px; }
        .nx-notice { display:flex; align-items:flex-start; gap:11px; background:#EEF3FF; border:1px solid #DDE6FF; color:#4B5E91; border-radius:13px; padding:15px 16px; font-size:11px; line-height:1.8; margin:0 0 19px; }
        .nx-notice svg { flex-shrink:0; margin-top:2px; }
        .nx-notice b { color:#29458F; }
        .nx-academy-hero { border-radius:20px; background:linear-gradient(115deg,#254286,#596FC0); padding:27px 30px; color:#fff; display:flex; align-items:center; justify-content:space-between; gap:15px; margin-bottom:18px; }
        .nx-academy-hero h2 { font-size:clamp(22px,3vw,30px); margin:0 0 9px; }
        .nx-academy-hero p { font-size:12px; line-height:1.8; color:#E4EAFF; max-width:550px; margin:0; }
        .nx-academy-art { width:95px; height:95px; display:grid; place-items:center; flex-shrink:0; border-radius:25px; background:#FFFFFF20; color:#FFE4A7; }
        .nx-course-card .nx-coming-soon { margin-bottom:13px; }
        .nx-course-card .nx-category-icon { margin-bottom:13px; }
        .nx-progress-track { height:6px; border-radius:10px; background:#EDF0F6; overflow:hidden; margin:17px 0 8px; }
        .nx-progress-track span { display:block; height:100%; background:#526FC4; border-radius:10px; }
        .nx-course-card small { font-size:10px; color:#8A94AA; }
        .nx-profile-card { max-width:720px; padding:26px; }
        .nx-profile-top { display:flex; align-items:center; gap:15px; padding-bottom:24px; border-bottom:1px solid var(--nx-border); margin-bottom:20px; }
        .nx-avatar-large { width:62px; height:62px; font-size:19px; }
        .nx-profile-top h2 { font-size:19px; margin:0 0 5px; }
        .nx-profile-top p { font-size:12px; color:var(--nx-muted); overflow-wrap:anywhere; margin:0 0 9px; }
        .nx-profile-detail { display:flex; align-items:center; justify-content:space-between; gap:15px; padding:14px 0; border-bottom:1px solid #F0F1F6; font-size:12px; }
        .nx-profile-detail span { color:var(--nx-muted); }
        .nx-profile-detail b { display:flex; align-items:center; gap:6px; overflow-wrap:anywhere; text-align:right; }
        .nx-profile-form { display:grid; gap:10px; }
        .nx-profile-form label { font-size:12px; font-weight:800; }
        .nx-profile-form input { width:100%; border:1px solid #DDE2EE; border-radius:10px; padding:13px; font:inherit; font-size:13px; outline-color:#526FC4; }
        .nx-form-actions { display:flex; gap:9px; flex-wrap:wrap; margin-top:8px; }
        .nx-inline-notice { padding:12px 14px; margin:0 0 18px; border-radius:10px; background:#FFF5E5; color:#80531D; font-size:11px; line-height:1.7; }
        .nx-footer { padding:18px 20px 25px; text-align:center; color:#9AA2B5; font-size:10px; line-height:1.8; }
        @media(max-width:1100px) {
          .nx-sidebar { width:225px; }
          .nx-content { padding:25px 23px 40px; }
          .nx-topbar { padding:0 23px; }
          .nx-stats { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .nx-category-grid,.nx-course-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .nx-orbit-art { width:160px; }
        }
        @media(max-width:760px) {
          .nx-layout { display:block; }
          .nx-sidebar { position:fixed; z-index:20; top:0; left:0; height:100dvh; width:275px; transform:translateX(-105%); transition:transform .22s ease; box-shadow:15px 0 45px #17264A1A; }
          .nx-sidebar.open { transform:translateX(0); }
          .nx-icon-button { display:inline-flex; align-items:center; justify-content:center; }
          .nx-topbar { height:68px; padding:0 15px; }
          .nx-topbar-email { display:none; }
          .nx-content { padding:18px 14px 30px; }
          .nx-welcome { padding:25px 22px; min-height:0; }
          .nx-orbit-art { width:90px; height:100px; }
          .nx-orbit-one { width:95px; height:60px; }
          .nx-orbit-two { width:75px; height:90px; }
          .nx-orbit-core { width:47px; height:47px; border-radius:15px; }
          .nx-orbit-core svg { width:24px; }
          .nx-orbit-dot { width:8px; height:8px; border-width:2px; }
          .dot-one { top:9px; right:12px; }
          .dot-two { bottom:10px; left:5px; }
          .dot-three { right:0; bottom:30px; }
          .nx-welcome h1 { font-size:27px; }
          .nx-welcome p { font-size:12px; }
          .nx-section-heading { margin:25px 0 15px; }
          .nx-stats { gap:10px; }
          .nx-stat { padding:14px 12px; gap:10px; }
          .nx-stat-icon { width:34px; height:34px; border-radius:10px; }
          .nx-stat p { font-size:10px; }
          .nx-stat strong { font-size:22px; }
          .nx-stat small { font-size:9px; }
          .nx-overview-grid,.nx-bottom-grid { grid-template-columns:1fr; gap:12px; margin-top:12px; }
          .nx-panel { padding:17px; }
          .nx-category-grid,.nx-course-grid { grid-template-columns:1fr 1fr; gap:10px; }
          .nx-category-card,.nx-course-card { padding:16px; }
          .nx-category-card h3,.nx-course-card h3 { font-size:13px; }
          .nx-category-card p,.nx-course-card p { font-size:10px; }
          .nx-academy-hero { padding:22px 18px; }
          .nx-academy-art { width:60px; height:60px; border-radius:17px; }
          .nx-academy-art svg { width:32px; }
          .nx-profile-detail { align-items:flex-start; flex-direction:column; gap:7px; }
          .nx-profile-detail b { text-align:left; }
          .nx-footer { padding-bottom:22px; }
        }
        @media(max-width:390px) {
          .nx-orbit-art { display:none; }
          .nx-category-grid,.nx-course-grid { grid-template-columns:1fr; }
          .nx-stat { display:block; }
          .nx-stat-icon { margin-bottom:10px; }
          .nx-topbar h2 { font-size:15px; }
          .nx-content { padding-left:11px; padding-right:11px; }
          .nx-welcome { padding:23px 18px; }
        }
      `}</style>

      <div className="nx-layout">
        <aside className={`nx-sidebar ${mobileMenu ? "open" : ""}`}>
          <div className="nx-brand">
            <span className="nx-brand-mark">
              <ArrowUpRight size={24} />
            </span>
            <span>NEXTORA</span>
          </div>

          <div className="nx-side-label">YOUR WORKSPACE</div>

          <nav className="nx-nav" aria-label="Dashboard navigation">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`nx-nav-button ${
                    active === item.label ? "active" : ""
                  }`}
                  onClick={() => navigate(item.label)}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="nx-side-bottom">
            <div className="nx-side-help">
              <b>Keep moving forward ✦</b>
              <p>
                Your next opportunity may begin with one small step.
                Keep exploring and learning.
              </p>
            </div>

            <div className="nx-company">
              Created by
              <br />
              <b>Ayanfe Innovation Labs Limited</b>
            </div>
          </div>
        </aside>

        <div className="nx-workspace">
          <header className="nx-topbar">
            <div className="nx-topbar-left">
              <button
                className="nx-icon-button"
                aria-label="Toggle navigation"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? (
                  <ArrowLeft size={19} />
                ) : (
                  <span style={{ fontSize: 20 }}>☰</span>
                )}
              </button>

              <div>
                <div className="nx-page-kicker">NEXTORA WORKSPACE</div>
                <h2>{active}</h2>
              </div>
            </div>

            <div className="nx-topbar-right">
              <span className="nx-topbar-email">{user?.email}</span>
              <span className="nx-avatar" title={profileName}>
                {initials}
              </span>
              <button
                className="nx-icon-button"
                aria-label="Sign out"
                onClick={onSignOut}
              >
                <LogOut size={17} />
              </button>
            </div>
          </header>

          <main className="nx-content">
            {notice && (
              <div className="nx-inline-notice" role="status">
                {notice}
              </div>
         
