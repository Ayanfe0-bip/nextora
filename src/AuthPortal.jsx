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
            <in
                
