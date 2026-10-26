import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Heart,
  LogOut,
  ShieldCheck,
  Sparkles,
  User,
  Wallet,
  X,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedItems, setSavedItems] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profileName, setProfileName] = useState(
    user?.user_metadata?.full_name ||
      user?.email?.split("@")[0] ||
      "NEXTORA Member"
  );
  const [editingProfile, setEditingProfile] = useState(false);
  const [notice, setNotice] = useState("");

  const firstName = profileName.trim().split(/\s+/)[0] || "Member";

  const initials =
    profileName
      .trim()
      .split(/\s+/)
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
      description: "Discover educational funding opportunities.",
      icon: GraduationCap,
      background: "#EAF0FF",
      color: "#3659A8",
    },
    {
      title: "Jobs & Careers",
      description: "Explore jobs, internships, and career opportunities.",
      icon: BriefcaseBusiness,
      background: "#F0EAFE",
      color: "#7451B8",
    },
    {
      title: "Grants & Funding",
      description: "Explore funding opportunities for projects and businesses.",
      icon: Wallet,
      background: "#FFF0E3",
      color: "#B86A27",
    },
    {
      title: "Training & Skills",
      description: "Discover ways to develop practical skills.",
      icon: BookOpen,
      background: "#E4F7EF",
      color: "#238263",
    },
    {
      title: "Competitions",
      description: "Explore challenges, awards, and competitions.",
      icon: Sparkles,
      background: "#FFF0F2",
      color: "#B84C67",
    },
    {
      title: "Fellowships",
      description: "Explore leadership and development programmes.",
      icon: ShieldCheck,
      background: "#E7F5FA",
      color: "#26728C",
    },
  ];

  const sampleOpportunities = [
    {
      id: "sample-scholarship",
      title: "Scholarship Opportunities",
      category: "Scholarships",
      description:
        "Explore scholarship programmes and educational funding options.",
      provider: "NEXTORA Opportunity Directory",
      deadline: "To be announced",
    },
    {
      id: "sample-jobs",
      title: "Career and Internship Opportunities",
      category: "Jobs & Careers",
      description:
        "Prepare to explore job openings and internship programmes.",
      provider: "NEXTORA Opportunity Directory",
      deadline: "To be announced",
    },
    {
      id: "sample-grants",
      title: "Grants for Ideas and Businesses",
      category: "Grants & Funding",
      description:
        "Learn about funding opportunities for eligible projects and businesses.",
      provider: "NEXTORA Opportunity Directory",
      deadline: "To be announced",
    },
    {
      id: "sample-training",
      title: "Skills and Training Programmes",
      category: "Training & Skills",
      description:
        "Identify learning opportunities that can help develop your skills.",
      provider: "NEXTORA Opportunity Directory",
      deadline: "To be announced",
    },
    {
      id: "sample-competitions",
      title: "Competitions and Awards",
      category: "Competitions",
      description:
        "Prepare to discover competitions and awards relevant to your interests.",
      provider: "NEXTORA Opportunity Directory",
      deadline: "To be announced",
    },
    {
      id: "sample-fellowships",
      title: "Leadership Fellowships",
      category: "Fellowships",
      description:
        "Explore leadership and professional development programmes.",
      provider: "NEXTORA Opportunity Directory",
      deadline: "To be announced",
    },
  ];

  const navigate = (label) => {
    setActive(label);
    setMobileMenu(false);
    setNotice("");
    setEditingProfile(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => {
      setNotice((current) => (current === message ? "" : current));
    }, 4000);
  };

  const toggleSaved = (opportunity) => {
    const alreadySaved = savedItems.some(
      (item) => item.id === opportunity.id
    );

    if (alreadySaved) {
      setSavedItems((current) =>
        current.filter((item) => item.id !== opportunity.id)
      );
      showNotice("Opportunity removed from your saved list.");
      return;
    }

    setSavedItems((current) => [...current, opportunity]);
    showNotice("Opportunity saved successfully.");
  };

  const applyToOpportunity = (opportunity) => {
    const alreadyApplied = applications.some(
      (item) => item.id === opportunity.id
    );

    if (alreadyApplied) {
      showNotice("You have already added this item to your application tracker.");
      return;
    }

    setApplications((current) => [
      ...current,
      {
        ...opportunity,
        applicationStatus: "Planning to apply",
        addedAt: new Date().toISOString(),
      },
    ]);

    setNotifications((current) => [
      {
        id: `${opportunity.id}-${Date.now()}`,
        title: "Application tracker updated",
        message: `${opportunity.title} was added to your tracker.`,
        date: new Date().toISOString(),
      },
      ...current,
    ]);

    showNotice(
      "Added to your application tracker. This does not submit an application to an external provider."
    );
  };

  const EmptyState = ({ title, description, action, onAction }) => (
    <div className="nx-empty">
      <span className="nx-empty-icon">
        <Sparkles size={24} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action && (
        <button className="nx-primary-button" onClick={onAction}>
          {action}
          <ArrowRight size={15} />
        </button>
      )}
    </div>
  );

  const OpportunityCard = ({ opportunity }) => {
    const category = categories.find(
      (item) => item.title === opportunity.category
    );

    const Icon = category?.icon || BriefcaseBusiness;

    const isSaved = savedItems.some(
      (item) => item.id === opportunity.id
    );

    const isApplied = applications.some(
      (item) => item.id === opportunity.id
    );

    return (
      <article className="nx-opportunity-card">
        <div className="nx-opportunity-top">
          <span
            className="nx-category-icon"
            style={{
              background: category?.background || "#EAF0FF",
              color: category?.color || "#3659A8",
            }}
          >
            <Icon size={23} />
          </span>

          <button
            className={`nx-save-button ${isSaved ? "saved" : ""}`}
            aria-label={isSaved ? "Remove saved opportunity" : "Save opportunity"}
            title={isSaved ? "Remove from saved" : "Save opportunity"}
            onClick={() => toggleSaved(opportunity)}
          >
            <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        <span className="nx-category-label">
          {opportunity.category}
        </span>

        <h3>{opportunity.title}</h3>
        <p>{opportunity.description}</p>

        <div className="nx-opportunity-meta">
          <span>
            <ShieldCheck size={14} />
            {opportunity.provider}
          </span>
          <span>
            <Wallet size={14} />
            {opportunity.deadline}
          </span>
        </div>

        <div className="nx-opportunity-actions">
          <button
            className="nx-primary-button"
            onClick={() => applyToOpportunity(opportunity)}
            disabled={isApplied}
          >
            {isApplied ? "Added to tracker" : "Track opportunity"}
            {!isApplied && <ArrowRight size={15} />}
          </button>
        </div>

        <div className="nx-demo-label">
          Directory preview · Not a verified live listing
        </div>
      </article>
    );
  };

  const filteredOpportunities = sampleOpportunities.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    const query = searchTerm.trim().toLowerCase();

    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const sectionTitle = {
    Overview: "Your opportunity overview",
    Opportunities: "Explore opportunities",
    "Saved Opportunities": "Your saved opportunities",
    "My Applications": "Your application tracker",
    Recommendations: "Recommended for your journey",
    Deadlines: "Your upcoming deadlines",
    Notifications: "Your notifications",
    "NEXTORA Academy": "Learn, grow, and prepare",
    "My Profile": "Your personal profile",
  };

  const pageDescription = {
    Opportunities:
      "Search and browse the directory preview. Listings are not yet connected to a live opportunities database.",
    Recommendations:
      "Suggestions can become more personalised when your interests and a live opportunity catalogue are connected.",
    Deadlines:
      "Your tracked items currently have no verified closing dates.",
  };

  const renderHeading = (eyebrow, title, description) => (
    <section className="nx-section-heading">
      <div>
        <span className="nx-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );

  const renderOpportunityGrid = (items) =>
    items.length ? (
      <div className="nx-opportunity-grid">
        {items.map((item) => (
          <OpportunityCard key={item.id} opportunity={item} />
        ))}
      </div>
    ) : (
      <EmptyState
        title="Nothing found"
        description="Try another search term or choose a different category."
        action="Clear search"
        onAction={() => {
          setSearchTerm("");
          setSelectedCategory("All");
        }}
      />
    );
    const renderOverview = () => (
    <>
      <section className="nx-welcome">
        <div className="nx-welcome-copy">
          <span className="nx-eyebrow nx-light">
            YOUR NEXT CHAPTER STARTS HERE
          </span>
          <h1>
            Welcome back, {firstName} <span>✦</span>
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

      {renderHeading(
        "YOUR PROGRESS",
        "Your opportunity overview",
        "Your workspace keeps your saved items and tracked opportunities together."
      )}

      <section className="nx-stats">
        {[
          {
            title: "Saved opportunities",
            value: savedItems.length,
            detail: "Items in your saved list",
            icon: Heart,
            background: "#FCECF1",
            color: "#B94D70",
          },
          {
            title: "Tracked applications",
            value: applications.length,
            detail: "Items in your tracker",
            icon: ArrowUpRight,
            background: "#EAF0FF",
            color: "#3659A8",
          },
          {
            title: "Academy courses",
            value: "Coming soon",
            detail: "Learning features in development",
            icon: BookOpen,
            background: "#E5F7EF",
            color: "#238263",
          },
          {
            title: "Verified deadlines",
            value: "—",
            detail: "Live listings not connected",
            icon: Wallet,
            background: "#FFF1E3",
            color: "#B86A27",
          },
        ].map((item) => {
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
              <h3>Explore opportunity categories</h3>
              <p>Choose an area to start exploring.</p>
            </div>
            <span className="nx-soft-pill">6 categories</span>
          </div>

          <div className="nx-category-summary">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  className="nx-category-row"
                  key={category.title}
                  onClick={() => {
                    setSelectedCategory(category.title);
                    navigate("Opportunities");
                  }}
                >
                  <span
                    style={{
                      background: category.background,
                      color: category.color,
                    }}
                  >
                    <Icon size={17} />
                  </span>
                  <b>{category.title}</b>
                  <ArrowRight size={16} />
                </button>
              );
            })}
          </div>

          <button
            className="nx-text-button"
            onClick={() => navigate("Opportunities")}
          >
            Browse directory <ArrowRight size={15} />
          </button>
        </article>

        <article className="nx-panel">
          <div className="nx-panel-head">
            <div>
              <h3>Your activity</h3>
              <p>A quick look at your NEXTORA workspace.</p>
            </div>
            <span className="nx-soft-pill">Overview</span>
          </div>

          <div className="nx-activity-item">
            <span className="nx-activity-icon">
              <Heart size={17} />
            </span>
            <div>
              <b>Saved opportunities</b>
              <p>
                {savedItems.length
                  ? `${savedItems.length} item(s) saved in this session.`
                  : "Your saved items will appear here."}
              </p>
            </div>
          </div>

          <div className="nx-activity-item">
            <span className="nx-activity-icon">
              <BriefcaseBusiness size={17} />
            </span>
            <div>
              <b>Application tracker</b>
              <p>
                {applications.length
                  ? `${applications.length} item(s) in your tracker.`
                  : "Start tracking an opportunity when you're ready."}
              </p>
            </div>
          </div>

          <div className="nx-activity-item">
            <span className="nx-activity-icon">
              <ShieldCheck size={17} />
            </span>
            <div>
              <b>Account</b>
              <p>Your NEXTORA account is signed in.</p>
            </div>
          </div>

          <button
            className="nx-text-button"
            onClick={() => navigate("My Profile")}
          >
            View profile <ArrowRight size={15} />
          </button>
        </article>
      </section>

      <section className="nx-panel nx-feature-panel">
        <div className="nx-panel-head">
          <div>
            <h3>Start your next step</h3>
            <p>Choose an area that matches your goals.</p>
          </div>
        </div>

        <div className="nx-feature-grid">
          <button
            className="nx-feature-card"
            onClick={() => navigate("Opportunities")}
          >
            <span className="nx-feature-icon feature-blue">
              <BriefcaseBusiness size={21} />
            </span>
            <b>Find opportunities</b>
            <small>Browse the directory preview.</small>
            <ArrowRight size={16} />
          </button>

          <button
            className="nx-feature-card"
            onClick={() => navigate("NEXTORA Academy")}
          >
            <span className="nx-feature-icon feature-gold">
              <GraduationCap size={21} />
            </span>
            <b>Build your skills</b>
            <small>Explore the Academy preview.</small>
            <ArrowRight size={16} />
          </button>

          <button
            className="nx-feature-card"
            onClick={() => navigate("My Profile")}
          >
            <span className="nx-feature-icon feature-purple">
              <User size={21} />
            </span>
            <b>Update your profile</b>
            <small>Review your account information.</small>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </>
  );

  const renderOpportunities = () => (
    <>
      {renderHeading(
        "OPPORTUNITY DIRECTORY",
        "Explore opportunities",
        pageDescription.Opportunities
      )}

      <div className="nx-notice">
        <ShieldCheck size={18} />
        <div>
          <b>Directory preview</b>
          <br />
          These are sample directory cards, not verified live opportunities.
          NEXTORA does not currently submit applications to external providers.
          Verify eligibility, providers, and closing dates before applying anywhere.
        </div>
      </div>

      <section className="nx-search-panel">
        <label htmlFor="nx-opportunity-search">
          Search the directory
        </label>

        <div className="nx-search-box">
          <span>
            <BookOpen size={18} />
          </span>
          <input
            id="nx-opportunity-search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search scholarships, jobs, grants..."
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="nx-filter-label">FILTER BY CATEGORY</div>

        <div className="nx-filter-list">
          {["All", ...categories.map((item) => item.title)].map((label) => (
            <button
              key={label}
              className={`nx-filter-chip ${
                selectedCategory === label ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(label)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="nx-results-count">
          Showing {filteredOpportunities.length} directory preview item(s)
        </div>
      </section>

      {renderOpportunityGrid(filteredOpportunities)}
    </>
  );

  const renderSaved = () => (
    <>
      {renderHeading(
        "YOUR WORKSPACE",
        "Saved opportunities",
        "Keep useful directory items together for future reference."
      )}

      {savedItems.length ? (
        renderOpportunityGrid(savedItems)
      ) : (
        <div className="nx-panel">
          <EmptyState
            title="Nothing saved yet"
            description="Explore the directory and tap the heart icon to save an item."
            action="Explore opportunities"
            onAction={() => navigate("Opportunities")}
          />
        </div>
      )}
    </>
  );

  const renderApplications = () => (
    <>
      {renderHeading(
        "YOUR WORKSPACE",
        "My applications",
        "Track items you intend to explore or apply for."
      )}

      <div className="nx-notice">
        <ShieldCheck size={18} />
        <div>
          <b>Personal tracking only</b>
          <br />
          Adding an item here does not submit an application to a school,
          employer, funder, or other external provider.
        </div>
      </div>

      {applications.length ? (
        <section className="nx-panel">
          <div className="nx-table-wrap">
            <table className="nx-table">
              <thead>
                <tr>
                  <th>Opportunity</th>
                  <th>Category</th>
                  <th>Tracking status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <b>{item.title}</b>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <span className="nx-status-pill">
                        {item.applicationStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        className="nx-small-link"
                        onClick={() => {
                          setApplications((current) =>
                            current.filter((app) => app.id !== item.id)
                          );
                          showNotice("Item removed from your tracker.");
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="nx-panel">
          <EmptyState
            title="Your tracker is empty"
            description="Visit the directory and select Track opportunity to add a sample item."
            action="Browse directory"
            onAction={() => navigate("Opportunities")}
          />
        </div>
      )}
    </>
  );

  const renderRecommendations = () => (
    <>
      {renderHeading(
        "DISCOVER",
        "Recommendations",
        pageDescription.Recommendations
      )}

      <div className="nx-notice">
        <Sparkles size={18} />
        <div>
          <b>Recommendations are not personalised yet.</b>
          <br />
          Explore the categories below. Personalised matching will require
          user preferences and a connected opportunity catalogue.
        </div>
      </div>

      {renderOpportunityGrid(sampleOpportunities.slice(0, 3))}
    </>
  );

  const renderDeadlines = () => (
    <>
      {renderHeading(
        "PLAN AHEAD",
        "Your deadlines",
        pageDescription.Deadlines
      )}

      <div className="nx-panel">
        <EmptyState
          title="No verified deadlines"
          description="The current directory contains sample items without real closing dates. Verified dates can appear here when a live listings source is connected."
          action="Browse directory"
          onAction={() => navigate("Opportunities")}
        />
      </div>
    </>
  );

  const renderNotifications = () => (
    <>
      {renderHeading(
        "YOUR UPDATES",
        "Notifications",
        "Review recent activity in your current dashboard session."
      )}

      {notifications.length ? (
        <div className="nx-notification-list">
          {notifications.map((item) => (
            <article className="nx-notification" key={item.id}>
              <span className="nx-notification-icon">
                <BellIcon />
              </span>
              <div>
                <b>{item.title}</b>
                <p>{item.message}</p>
                <small>
                  {new Date(item.date).toLocaleString()}
                </small>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="nx-panel">
          <EmptyState
            title="You're all caught up"
            description="Updates created during this dashboard session will appear here."
            action="Explore opportunities"
            onAction={() => navigate("Opportunities")}
          />
        </div>
      )}
    </>
  );

  const renderAcademy = () => (
    <>
      <section className="nx-academy-hero">
        <div>
          <span className="nx-eyebrow nx-light">LEARN AT YOUR PACE</span>
          <h1>Welcome to NEXTORA Academy</h1>
          <p>
            Build knowledge, strengthen practical skills, and prepare
            for your next opportunity.
          </p>
        </div>
        <span className="nx-academy-art">
          <GraduationCap size={43} />
        </span>
      </section>

      {renderHeading(
        "LEARNING DIRECTORY",
        "Explore learning paths",
        "These are learning categories for the planned Academy."
      )}

      <div className="nx-notice">
        <BookOpen size={18} />
        <div>
          <b>Courses are not connected yet.</b>
          <br />
          This section previews future learning categories. It does not
          currently provide enrolled courses, lessons, or certificates.
        </div>
      </div>

      <div className="nx-category-grid">
        {[
          {
            title: "Digital Skills",
            description: "Build digital confidence and practical technology skills.",
            icon: Sparkles,
            background: "#EAF0FF",
            color: "#3659A8",
          },
          {
            title: "Career Readiness",
            description: "Prepare for interviews, applications, and the workplace.",
            icon: BriefcaseBusiness,
            background: "#F0EAFE",
            color: "#7451B8",
          },
          {
            title: "Business Skills",
            description: "Learn about planning, entrepreneurship, and productivity.",
            icon: Wallet,
            background: "#FFF0E3",
            color: "#B86A27",
          },
          {
            title: "Study Skills",
            description: "Develop study habits and effective learning methods.",
            icon: GraduationCap,
            background: "#E4F7EF",
            color: "#238263",
          },
          {
            title: "Communication",
            description: "Improve writing, presentation, and communication skills.",
            icon: BookOpen,
            background: "#FFF0F2",
            color: "#B84C67",
          },
          {
            title: "Personal Growth",
            description: "Explore goal setting, confidence, and time management.",
            icon: ShieldCheck,
            background: "#E7F5FA",
            color: "#26728C",
          },
        ].map((course) => {
          const Icon = course.icon;

          return (
            <article className="nx-category-card" key={course.title}>
              <span
                className="nx-category-icon"
                style={{
                  background: course.background,
                  color: course.color,
                }}
              >
                <Icon size={24} />
              </span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <span className="nx-coming-soon">COMING SOON</span>
            </article>
          );
        })}
      </div>
    </>
  );

  const renderProfile = () => (
    <>
      {renderHeading(
        "ACCOUNT SETTINGS",
        "My profile",
        "Review the account details currently available to NEXTORA."
      )}

      <section className="nx-panel nx-profile-card">
        <div className="nx-profile-top">
          <span className="nx-avatar nx-avatar-large">{initials}</span>
          <div>
            <h2>{profileName}</h2>
            <p>{user?.email || "Email unavailable"}</p>
            <span className="nx-status-pill">Signed in</span>
          </div>
        </div>

        <div className="nx-profile-detail">
          <span>Full name</span>
          <b>{profileName}</b>
        </div>

        <div className="nx-profile-detail">
          <span>Email address</span>
          <b>{user?.email || "Not available"}</b>
        </div>

        <div className="nx-profile-detail">
          <span>Account ID</span>
          <b className="nx-account-id">
            {user?.id || "Not available"}
          </b>
        </div>

        {editingProfile ? (
          <form
            className="nx-profile-form"
            onSubmit={async (event) => {
              event.preventDefault();

              const newName = profileName.trim();

              if (newName.length < 2) {
                showNotice("Please enter a name with at least two characters.");
                return;
              }

              try {
                const { error } = await supabase.auth.updateUser({
                  data: { full_name: newName },
                });

                if (error) throw error;

                setProfileName(newName);
                setEditingProfile(false);
                showNotice("Your profile name was updated.");
              } catch (error) {
                showNotice(
                  error?.message ||
                    "We couldn't update your profile. Please try again."
                );
              }
            }}
          >
            <label htmlFor="nx-profile-name">Update your full name</label>
                        <input
              id="nx-profile-name"
              value={profileName}
              onChange={(event) =>
                setProfileName(event.target.value)
              }
              minLength={2}
              required
            />

            <div className="nx-profile-actions">
              <button
                type="submit"
                className="nx-primary-button"
              >
                Save changes
                <CheckCircle2 size={16} />
              </button>

              <button
                type="button"
                className="nx-secondary-button"
                onClick={() => {
                  setProfileName(
                    user?.user_metadata?.full_name ||
                      user?.email?.split("@")[0] ||
                      "NEXTORA Member"
                  );
                  setEditingProfile(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            className="nx-primary-button nx-edit-profile"
            onClick={() => setEditingProfile(true)}
          >
            Edit profile
            <ArrowRight size={16} />
          </button>
        )}
      </section>

      <div className="nx-notice">
        <ShieldCheck size={18} />
        <div>
          Your account is managed by Supabase. Keep your
          login details private and secure.
        </div>
      </div>
    </>
  );

  const renderActivePage = () => {
    switch (active) {
      case "Overview":
        return renderOverview();

      case "Opportunities":
        return renderOpportunities();

      case "Saved Opportunities":
        return renderSaved();

      case "My Applications":
        return renderApplications();

      case "Recommendations":
        return renderRecommendations();

      case "Deadlines":
        return renderDeadlines();

      case "Notifications":
        return renderNotifications();

      case "NEXTORA Academy":
        return renderAcademy();

      case "My Profile":
        return renderProfile();

      default:
        return renderOverview();
    }
  };

  return (
    <div className="nx-dashboard">
      {mobileMenu && (
        <button
          type="button"
          className="nx-sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMobileMenu(false)}
        />
      )}

      <aside
        className={`nx-sidebar ${
          mobileMenu ? "nx-sidebar-open" : ""
        }`}
      >
        <button
          type="button"
          className="nx-sidebar-brand"
          onClick={() => navigate("Overview")}
        >
          <span className="nx-brand-mark">
            <ArrowUpRight size={25} />
          </span>

          <span>
            NEXTORA
            <small>WHERE OPPORTUNITIES BEGIN</small>
          </span>
        </button>

        <div className="nx-sidebar-label">
          WORKSPACE
        </div>

        <nav className="nx-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;

            const badge =
              item.label === "Saved Opportunities"
                ? savedItems.length
                : item.label === "My Applications"
                  ? applications.length
                  : item.label === "Notifications"
                    ? notifications.length
                    : 0;

            return (
              <button
                type="button"
                key={item.label}
                className={`nx-nav-item ${
                  isActive ? "nx-nav-active" : ""
                }`}
                onClick={() => navigate(item.label)}
              >
                <Icon size={19} />

                <span>{item.label}</span>

                {badge > 0 && (
                  <span className="nx-nav-badge">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="nx-sidebar-bottom">
          <div className="nx-sidebar-help">
            <span className="nx-help-icon">
              <Sparkles size={20} />
            </span>

            <strong>Your next chapter</strong>

            <p>
              Keep learning and exploring possibilities.
            </p>

            <button
              type="button"
              onClick={() => navigate("NEXTORA Academy")}
            >
              Explore Academy
              <ArrowRight size={15} />
            </button>
          </div>

          <button
            type="button"
            className="nx-signout-button"
            onClick={onSignOut}
          >
            <LogOut size={18} />
            Sign out
          </button>

          <div className="nx-sidebar-footer">
            © {new Date().getFullYear()} NEXTORA
            <br />
            Ayanfe Innovation Labs Limited
          </div>
        </div>
      </aside>

      <div className="nx-dashboard-main">
        <header className="nx-topbar">
          <div className="nx-topbar-left">
            <button
              type="button"
              className="nx-mobile-menu-button"
              onClick={() =>
                setMobileMenu((current) => !current)
              }
              aria-label="Toggle navigation"
            >
              <Menu size={22} />
            </button>

            <div>
              <span className="nx-topbar-eyebrow">
                YOUR NEXT CHAPTER
              </span>

              <strong>{sectionTitle[active] || active}</strong>
            </div>
          </div>

          <div className="nx-topbar-right">
            <button
              type="button"
              className="nx-topbar-icon"
              aria-label="View notifications"
              onClick={() => navigate("Notifications")}
            >
              <BookOpen size={19} />

              {notifications.length > 0 && (
                <span className="nx-notification-dot" />
              )}
            </button>

            <button
              type="button"
              className="nx-user-button"
              onClick={() => navigate("My Profile")}
            >
              <span className="nx-avatar">{initials}</span>

              <span className="nx-user-info">
                <strong>{firstName}</strong>
                <small>Member</small>
              </span>

              <ArrowUpRight size={16} />
            </button>
          </div>
        </header>

        <main className="nx-content">
          {notice && (
            <div className="nx-toast" role="status">
              <CheckCircle2 size={18} />
              <span>{notice}</span>

              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => setNotice("")}
              >
                <X size={17} />
              </button>
            </div>
          )}

          {renderActivePage()}

          <footer className="nx-content-footer">
            <span>
              © {new Date().getFullYear()} NEXTORA
            </span>

            <span>
              Created by Ayanfe Innovation Labs Limited
            </span>

            <span>
              Discover. Learn. Grow.
            </span>
          </footer>
        </main>
      </div>

      <style>{`
        .nx-dashboard {
          min-height: 100vh;
          display: flex;
          background: #f6f8fc;
          color: #202b46;
          font-family: inherit;
        }

        .nx-dashboard * {
          box-sizing: border-box;
        }

        .nx-sidebar {
          width: 258px;
          min-width: 258px;
          min-height: 100vh;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 24px 16px 16px;
          background: #fff;
          border-right: 1px solid #e8ecf4;
          overflow-y: auto;
          z-index: 50;
        }

        .nx-sidebar-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          border: 0;
          background: transparent;
          color: #243d85;
          text-align: left;
          padding: 0 5px 27px;
          cursor: pointer;
          font-size: 19px;
          font-weight: 900;
          letter-spacing: -.5px;
        }

        .nx-sidebar-brand > span:last-child {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nx-sidebar-brand small {
          font-size: 8px;
          letter-spacing: .9px;
          color: #8993aa;
          font-weight: 800;
        }

        .nx-brand-mark {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: #eaf0ff;
          color: #29458f;
        }

        .nx-sidebar-label {
          padding: 0 12px;
          margin: 8px 0 12px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.4px;
          color: #9aa3b7;
        }

        .nx-sidebar-nav {
          display: grid;
          gap: 5px;
        }

        .nx-nav-item {
          width: 100%;
          min-height: 45px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border: 0;
          border-radius: 11px;
          background: transparent;
          color: #69758e;
          text-align: left;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background .2s, color .2s;
        }

        .nx-nav-item:hover {
          background: #f3f6fc;
          color: #29458f;
        }

        .nx-nav-active {
          background: #eaf0ff;
          color: #29458f;
        }

        .nx-nav-item > span:nth-child(2) {
          flex: 1;
        }

        .nx-nav-badge {
          min-width: 22px;
          height: 22px;
          padding: 0 6px;
          display: grid;
          place-items: center;
          border-radius: 20px;
          background: #dce6ff;
          color: #29458f;
          font-size: 10px;
          font-weight: 900;
        }

        .nx-sidebar-bottom {
          margin-top: auto;
          padding-top: 25px;
        }

        .nx-sidebar-help {
          padding: 16px;
          border: 1px solid #e8ecf7;
          border-radius: 15px;
          background: #f8f9fe;
        }

        .nx-help-icon {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          margin-bottom: 12px;
          border-radius: 11px;
          background: #eaf0ff;
          color: #29458f;
        }

        .nx-sidebar-help strong {
          display: block;
          font-size: 12px;
        }

        .nx-sidebar-help p {
          color: #78839b;
          font-size: 11px;
          line-height: 1.6;
          margin: 7px 0 12px;
        }

        .nx-sidebar-help button {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #29458f;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        .nx-signout-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 15px;
          padding: 12px;
          border: 0;
          border-radius: 10px;
          background: transparent;
          color: #7c8498;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .nx-signout-button:hover {
          background: #fff0f0;
          color: #ad3947;
        }

        .nx-sidebar-footer {
          padding: 13px 12px 0;
          color: #a0a8b9;
          font-size: 9px;
          line-height: 1.7;
        }

        .nx-dashboard-main {
          flex: 1;
          min-width: 0;
        }

        .nx-topbar {
          min-height: 82px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 15px 34px;
          background: #fff;
          border-bottom: 1px solid #e8ecf4;
        }

        .nx-topbar-left,
        .nx-topbar-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .nx-topbar-left > div {
          display: grid;
          gap: 5px;
        }

        .nx-topbar-eyebrow {
          color: #8792aa;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 1.3px;
        }

        .nx-topbar-left strong {
          font-size: 16px;
          color: #202b46;
        }

        .nx-mobile-menu-button {
          display: none;
          width: 40px;
          height: 40px;
          place-items: center;
          border: 1px solid #e6eaf2;
          border-radius: 11px;
          background: #fff;
          color: #29458f;
          cursor: pointer;
        }

        .nx-topbar-icon {
          width: 40px;
          height: 40px;
          position: relative;
          display: grid;
          place-items: center;
          border: 1px solid #e6eaf2;
          border-radius: 12px;
          background: #fff;
          color: #596681;
          cursor: pointer;
        }

        .nx-notification-dot {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 8px;
          height: 8px;
          border: 2px solid #fff;
          border-radius: 50%;
          background: #e66d84;
        }

        .nx-user-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0;
          border: 0;
          background: transparent;
          text-align: left;
          color: #738099;
          cursor: pointer;
        }

        .nx-user-info {
          display: grid;
          gap: 4px;
        }

        .nx-user-info strong {
          color: #27344f;
          font-size: 12px;
        }

        .nx-user-info small {
          color: #929bb0;
          font-size: 10px;
        }

        .nx-avatar {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 13px;
          background: #eaf0ff;
          color: #29458f;
          font-size: 12px;
          font-weight: 900;
        }

        .nx-avatar-large {
          width: 68px;
          height: 68px;
          border-radius: 20px;
          font-size: 20px;
        }

        .nx-content {
          width: min(100%, 1400px);
          margin: 0 auto;
          padding: 30px 34px 20px;
        }

        .nx-toast {
          position: sticky;
          top: 12px;
          z-index: 30;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
          padding: 14px 15px;
          border: 1px solid #cfe9dd;
          border-radius: 12px;
          background: #f0fbf5;
          color: #237452;
          font-size: 12px;
          line-height: 1.6;
          box-shadow: 0 8px 24px rgba(30, 50, 80, .06);
        }

        .nx-toast span {
          flex: 1;
        }

        .nx-toast button {
          display: grid;
          place-items: center;
          padding: 0;
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }

        .nx-section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin: 5px 0 23px;
        }

        .nx-eyebrow {
          display: block;
          margin-bottom: 10px;
          color: #526fc4;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.5px;
        }

        .nx-section-heading h1 {
          margin: 0;
          color: #202b46;
          font-size: clamp(24px, 3vw, 33px);
          line-height: 1.2;
          letter-spacing: -1px;
        }

        .nx-section-heading p {
          max-width: 650px;
          margin: 10px 0 0;
          color: #77839b;
          font-size: 13px;
          line-height: 1.7;
        }

        .nx-welcome {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          min-height: 245px;
          overflow: hidden;
          padding: 35px;
          border-radius: 23px;
          background: linear-gradient(120deg, #243d85, #4967b7 75%, #7188ce);
          color: #fff;
          margin-bottom: 33px;
        }

        .nx-welcome-copy {
          position: relative;
          z-index: 2;
          max-width: 640px;
        }

        .nx-light {
          color: #dbe5ff;
        }

        .nx-welcome h1 {
          margin: 0 0 13px;
          font-size: clamp(27px, 4vw, 39px);
          line-height: 1.2;
          letter-spacing: -1.3px;
        }

        .nx-welcome h1 span {
          color: #ffd98c;
        }

        .nx-welcome p {
          max-width: 560px;
          margin: 0 0 23px;
          color: #e4eaff;
          font-size: 13px;
          line-height: 1.8;
        }

        .nx-white-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 17px;
          border: 0;
          border-radius: 10px;
          background: #fff;
          color: #29458f;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
        }

        .nx-orbit-art {
          position: relative;
          width: 190px;
          height: 190px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
        }

        .nx-orbit {
          position: absolute;
          border: 1px solid rgba(255,255,255,.35);
          border-radius: 50%;
        }

        .nx-orbit-one {
          width: 135px;
          height: 135px;
        }

        .nx-orbit-two {
          width: 185px;
          height: 185px;
          border-style: dashed;
        }

        .nx-orbit-core {
          width: 76px;
          height: 76px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.5);
          border-radius: 24px;
          background: rgba(255,255,255,.15);
          color: #ffe0a1;
          transform: rotate(-8deg);
        }

        .nx-orbit-dot {
          position: absolute;
          width: 13px;
          height: 13px;
          border: 3px solid #fff;
          border-radius: 50%;
          background: #ffcb75;
        }

        .dot-one { top: 20px; right: 42px; }
        .dot-two { bottom: 18px; left: 30px; }
        .dot-three { top: 85px; left: 0; }

        .nx-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 27px;
        }

        .nx-stat {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          min-width: 0;
          padding: 19px 16px;
          border: 1px solid #e8ecf4;
          border-radius: 15px;
          background: #fff;
        }

        .nx-stat-icon {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 13px;
        }

        .nx-stat p {
          margin: 1px 0 7px;
          color: #77839b;
          font-size: 10px;
          line-height: 1.5;
        }

        .nx-stat strong {
          display: block;
          color: #25324e;
          font-size: 19px;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }

        .nx-stat small {
                    display: block;
          margin-top: 5px;
          color: #8b96aa;
          font-size: 10px;
          line-height: 1.5;
        }

        .nx-content-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 24px 0 10px;
          color: #929bb0;
          font-size: 10px;
        }

        .nx-toast {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
          padding: 14px 16px;
          border: 1px solid #ccebdc;
          border-radius: 13px;
          background: #f0fbf5;
          color: #24764d;
          font-size: 12px;
        }

        .nx-toast span {
          flex: 1;
        }

        .nx-toast button {
          display: grid;
          place-items: center;
          padding: 4px;
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
        }

        .nx-page-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
          margin-bottom: 27px;
        }

        .nx-page-heading h1 {
          margin: 0;
          color: #202d49;
          font-size: clamp(23px, 3vw, 31px);
          font-weight: 900;
          letter-spacing: -1px;
        }

        .nx-page-heading p {
          margin: 9px 0 0;
          color: #8792a8;
          font-size: 12px;
          line-height: 1.8;
        }

        .nx-primary-button,
        .nx-secondary-button {
          min-height: 43px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 11px 16px;
          border-radius: 11px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          transition: transform .2s, box-shadow .2s;
        }

        .nx-primary-button {
          border: 1px solid #29458f;
          background: #29458f;
          color: #fff;
          box-shadow: 0 7px 16px rgba(41,69,143,.12);
        }

        .nx-secondary-button {
          border: 1px solid #e0e6f0;
          background: #fff;
          color: #34415d;
        }

        .nx-primary-button:hover,
        .nx-secondary-button:hover {
          transform: translateY(-2px);
        }

        .nx-panel {
          min-width: 0;
          padding: 23px;
          border: 1px solid #e8ecf4;
          border-radius: 17px;
          background: #fff;
          box-shadow: 0 4px 18px rgba(36,52,87,.025);
        }

        .nx-panel-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
        }

        .nx-panel-heading h2 {
          margin: 0;
          color: #27344f;
          font-size: 15px;
          font-weight: 900;
        }

        .nx-panel-heading p {
          margin: 6px 0 0;
          color: #929bb0;
          font-size: 11px;
          line-height: 1.7;
        }

        .nx-dashboard-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(260px, 1fr);
          gap: 20px;
          margin-bottom: 22px;
        }

        .nx-section-title {
          margin: 0 0 15px;
          color: #27344f;
          font-size: 14px;
          font-weight: 900;
        }

        .nx-empty-state {
          display: grid;
          justify-items: center;
          gap: 10px;
          padding: 36px 20px;
          border: 1px dashed #dfe5f0;
          border-radius: 13px;
          text-align: center;
        }

        .nx-empty-state strong {
          color: #34415d;
          font-size: 12px;
        }

        .nx-empty-state p {
          max-width: 330px;
          margin: 0;
          color: #929bb0;
          font-size: 11px;
          line-height: 1.8;
        }

        .nx-empty-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          background: #edf2ff;
          color: #29458f;
        }

        .nx-list {
          display: grid;
          gap: 12px;
        }

        .nx-list-item {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px 0;
          border-bottom: 1px solid #f0f2f7;
        }

        .nx-list-item:last-child {
          border-bottom: 0;
        }

        .nx-list-item-icon {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 13px;
          background: #f0f3ff;
          color: #425da5;
        }

        .nx-list-item-main {
          flex: 1;
          min-width: 0;
        }

        .nx-list-item-main strong {
          display: block;
          overflow-wrap: anywhere;
          color: #34415d;
          font-size: 12px;
        }

        .nx-list-item-main small {
          display: block;
          margin-top: 5px;
          color: #929bb0;
          font-size: 10px;
        }

        .nx-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 9px;
          border-radius: 20px;
          background: #edf8f1;
          color: #28774d;
          font-size: 9px;
          font-weight: 800;
          white-space: nowrap;
        }

        .nx-badge.pending {
          background: #fff5e7;
          color: #a66b1b;
        }

        .nx-badge.inactive {
          background: #f0f2f6;
          color: #79849a;
        }

        .nx-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .nx-form-field {
          display: grid;
          gap: 8px;
          min-width: 0;
        }

        .nx-form-field.full-width {
          grid-column: 1 / -1;
        }

        .nx-form-field label {
          color: #45516b;
          font-size: 11px;
          font-weight: 800;
        }

        .nx-form-field input,
        .nx-form-field select,
        .nx-form-field textarea {
          width: 100%;
          min-width: 0;
          min-height: 45px;
          padding: 12px 13px;
          border: 1px solid #e0e6f0;
          border-radius: 10px;
          outline: none;
          background: #fff;
          color: #27344f;
          font: inherit;
          font-size: 12px;
          transition: border-color .2s, box-shadow .2s;
        }

        .nx-form-field textarea {
          min-height: 110px;
          resize: vertical;
        }

        .nx-form-field input:focus,
        .nx-form-field select:focus,
        .nx-form-field textarea:focus {
          border-color: #7188c8;
          box-shadow: 0 0 0 3px rgba(65,92,165,.09);
        }

        .nx-form-field input:disabled,
        .nx-form-field select:disabled,
        .nx-form-field textarea:disabled {
          background: #f7f8fb;
          color: #8b95a9;
          cursor: not-allowed;
        }

        .nx-form-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 23px;
        }

        .nx-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .nx-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          white-space: nowrap;
        }

        .nx-table th {
          padding: 13px 14px;
          border-bottom: 1px solid #e9edf5;
          background: #f8f9fc;
          color: #8a95aa;
          font-size: 10px;
          font-weight: 900;
        }

        .nx-table td {
          padding: 16px 14px;
          border-bottom: 1px solid #f0f2f7;
          color: #56627a;
          font-size: 11px;
        }

        .nx-table td strong {
          color: #34415d;
        }

        .nx-table tr:last-child td {
          border-bottom: 0;
        }

                .nx-search-box {
          display: flex;
          align-items: center;
          gap: 9px;
          min-height: 42px;
          padding: 0 12px;
          border: 1px solid #e0e6f0;
          border-radius: 10px;
          background: #fff;
          color: #929bb0;
        }

        .nx-search-box input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: none;
          background: transparent;
          color: #34415d;
          font: inherit;
          font-size: 11px;
        }

        .nx-filter-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 18px;
        }

        .nx-filter-select {
          min-height: 42px;
          padding: 0 12px;
          border: 1px solid #e0e6f0;
          border-radius: 10px;
          outline: none;
          background: #fff;
          color: #56627a;
          font-size: 11px;
        }

        .nx-profile-header {
          display: flex;
          align-items: center;
          gap: 17px;
          margin-bottom: 25px;
        }

        .nx-profile-header h2 {
          margin: 0;
          color: #27344f;
          font-size: 18px;
          font-weight: 900;
        }

        .nx-profile-header p {
          margin: 6px 0 0;
          color: #929bb0;
          font-size: 11px;
          line-height: 1.7;
        }

        .nx-profile-avatar {
          width: 72px;
          height: 72px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border: 1px solid #dfe6fb;
          border-radius: 22px;
          background: #edf2ff;
          color: #29458f;
          font-size: 21px;
          font-weight: 900;
        }

        .nx-settings-list {
          display: grid;
          gap: 0;
        }

        .nx-settings-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 0;
          border-bottom: 1px solid #edf0f6;
        }

        .nx-settings-item:last-child {
          border-bottom: 0;
        }

        .nx-settings-item strong {
          display: block;
          color: #34415d;
          font-size: 12px;
        }

        .nx-settings-item p {
          margin: 6px 0 0;
          color: #929bb0;
          font-size: 10px;
          line-height: 1.7;
        }

        .nx-link-button {
          border: 0;
          background: transparent;
          color: #29458f;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        .nx-divider {
          height: 1px;
          margin: 22px 0;
          border: 0;
          background: #edf0f6;
        }

        .nx-message {
          padding: 13px 15px;
          border-radius: 11px;
          background: #f0f4ff;
          color: #40578e;
          font-size: 11px;
          line-height: 1.8;
        }

        .nx-message.error {
          background: #fff0f0;
          color: #a63b46;
        }

        .nx-message.success {
          background: #eefaf3;
          color: #26774d;
        }

        .nx-progress-track {
          width: 100%;
          height: 7px;
          overflow: hidden;
          border-radius: 10px;
          background: #edf0f6;
        }

        .nx-progress-bar {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #29458f, #6b83c6);
          transition: width .3s ease;
        }

        .nx-two-column {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .nx-feature-card {
          padding: 20px;
          border: 1px solid #e8ecf4;
          border-radius: 15px;
          background: #fff;
        }

        .nx-feature-card h3 {
          margin: 13px 0 8px;
          color: #34415d;
          font-size: 13px;
        }

        .nx-feature-card p {
          margin: 0;
          color: #8792a8;
          font-size: 11px;
          line-height: 1.8;
        }

        .nx-feature-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: #edf2ff;
          color: #29458f;
        }

        .nx-chart-placeholder {
          min-height: 190px;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          gap: 12px;
          padding: 25px 8px 0;
          border-bottom: 1px solid #edf0f6;
        }

        .nx-chart-column {
          flex: 1;
          max-width: 55px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 9px;
          height: 165px;
        }

        .nx-chart-bar {
          width: 100%;
          min-height: 5px;
          border-radius: 7px 7px 0 0;
          background: linear-gradient(180deg, #7188c8, #29458f);
        }

        .nx-chart-column small {
          color: #929bb0;
          font-size: 9px;
        }

        .nx-loading {
          min-height: 200px;
          display: grid;
          place-items: center;
          color: #8792a8;
          font-size: 12px;
        }

        .nx-spinner {
          width: 25px;
          height: 25px;
          border: 3px solid #e4e9f4;
          border-top-color: #29458f;
          border-radius: 50%;
          animation: nx-spin .8s linear infinite;
        }

        @keyframes nx-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .nx-dashboard button:focus-visible {
          outline: 3px solid rgba(65,92,165,.35);
          outline-offset: 3px;
        }

        @media (max-width: 1100px) {
          .nx-sidebar {
            width: 225px;
            flex-basis: 225px;
          }

          .nx-content {
            padding: 25px 23px 18px;
          }

          .nx-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .nx-dashboard-grid {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        @media (max-width: 760px) {
          .nx-dashboard {
            display: block;
          }

          .nx-sidebar {
            position: fixed;
            z-index: 100;
            top: 0;
            bottom: 0;
            left: 0;
            width: min(290px, 85vw);
            height: 100dvh;
            transform: translateX(-105%);
            transition: transform .25s ease;
            box-shadow: 15px 0 40px rgba(28,39,67,.12);
          }

          .nx-sidebar.open {
            transform: translateX(0);
          }

          .nx-mobile-menu-button {
            display: grid;
          }

          .nx-main {
            width: 100%;
          }

          .nx-topbar {
            min-height: 72px;
            padding: 12px 16px;
          }

          .nx-topbar-title {
            font-size: 14px;
          }

          .nx-topbar-subtitle {
            display: none;
          }

          .nx-content {
            padding: 23px 15px 16px;
          }

          .nx-stats {
            gap: 10px;
          }

          .nx-stat {
            gap: 10px;
            padding: 14px 11px;
          }

          .nx-stat-icon {
            width: 35px;
            height: 35px;
            border-radius: 10px;
          }

          .nx-stat strong {
            font-size: 16px;
          }

          .nx-panel {
            padding: 17px;
          }

          .nx-page-heading {
            margin-bottom: 20px;
          }

          .nx-content-footer {
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
            gap: 7px;
          }
        }

        @media (max-width: 480px) {
          .nx-stats {
            grid-template-columns: minmax(0, 1fr);
          }

          .nx-form-grid,
          .nx-two-column {
            grid-template-columns: minmax(0, 1fr);
          }

          .nx-form-field.full-width {
            grid-column: auto;
          }

          .nx-topbar {
            gap: 9px;
          }

          .nx-topbar-actions {
            gap: 7px;
          }

          .nx-user-info {
            display: none;
          }

          .nx-page-heading h1 {
            font-size: 24px;
          }

          .nx-profile-header {
            align-items: flex-start;
          }

          .nx-form-actions {
            justify-content: stretch;
          }

          .nx-form-actions button {
            flex: 1;
          }

          .nx-table th,
          .nx-table td {
            padding: 12px 10px;
          }
        }
      `}</style>
    </div>
  );
}
