import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  Compass,
  GraduationCap,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  User,
  Wallet,
  X,
  Bell,
  Settings,
  HelpCircle,
  FileText,
  LayoutDashboard,
  Heart,
} from "lucide-react";

import { supabase } from "./lib/supabaseclient";
import AcademyPage from "./AcademyPage";

const categories = [
"All",
"Education",
"Careers",
"Funding",
"Internships",
"Training",
"Competitions",
"Fellowships",
"Skills",
];

const opportunities = [
  {
    id: "scholarships",
    title: "Scholarships",
    description:
      "Explore educational funding opportunities and scholarship resources.",
    category: "Education",
    tag: "Education",
    icon: GraduationCap,
    color: "#e9efff",
    ink: "#415edb",
    url: "https://scholarship.education.gov.ng/",
  },
  {
    id: "careers",
    title: "Jobs & Careers",
    description:
      "Discover career resources and opportunities to grow professionally.",
    category: "Careers",
    tag: "Career growth",
    icon: BriefcaseBusiness,
    color: "#fff0e4",
    ink: "#c46b27",
  },
  {
    id: "funding",
    title: "Grants & Funding",
    description:
      "Find funding resources that may help you develop your ideas.",
    category: "Funding",
    tag: "Financial support",
    icon: Wallet,
    color: "#e4f7ed",
    ink: "#20875b",
  },
  {
    id: "academy",
    title: "NEXTORA Academy",
    description:
      "Build practical knowledge through guided lessons and learning exercises.",
    category: "Skills",
    tag: "Learn new skills",
    icon: BookOpen,
    color: "#f0e9ff",
    ink: "#7950c8",
  },
];

export function AuthPortal({
  initialMode = "signup",
  onBack,
}) {
  const [mode, setMode] = useState(initialMode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    if (mode === "signup") {
      if (!fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (password.length < 6) {
        setError("Your password must contain at least 6 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Your passwords do not match.");
        return;
      }

      if (!acceptedTerms) {
        setError("Please accept the terms to create your account.");
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error: signupError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (signupError) throw signupError;

        if (data?.session) {
          setMessage("Your account has been created successfully.");
        } else {
          setMessage(
            "Account created. Please check your email for a confirmation link."
          );
        }
      } else {
        const { error: signinError } =
          await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password,
          });

        if (signinError) throw signinError;
      }
    } catch (err) {
      setError(
        err?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setError("");
    setMessage("");
  }

  return (
    <main className="nx-auth-page">
      <style>{`
        .nx-auth-page {
          min-height: 100vh;
          padding: 28px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at 10% 10%, #e8f0ff 0, transparent 36%),
            radial-gradient(circle at 90% 90%, #f3eaff 0, transparent 35%),
            #f8f9fd;
          color: #20243a;
          font-family: Inter, system-ui, sans-serif;
        }
        .nx-auth-shell {
          width: 100%;
          max-width: 440px;
        }
        .nx-auth-back {
          border: 0;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #626a80;
          cursor: pointer;
          margin-bottom: 22px;
          padding: 8px 0;
        }
        .nx-auth-card {
          background: rgba(255,255,255,.96);
          border: 1px solid #e8eaf2;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 18px 60px rgba(40,48,90,.09);
        }
        .nx-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 21px;
          font-weight: 850;
          letter-spacing: -.7px;
        }
        .nx-brand-mark {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: linear-gradient(135deg,#6478f2,#a079e9);
          color: white;
        }
        .nx-auth-card h1 {
          margin: 28px 0 8px;
          font-size: 29px;
          letter-spacing: -1px;
        }
        .nx-auth-subtitle {
          margin: 0 0 24px;
          color: #737a90;
          line-height: 1.6;
          font-size: 14px;
        }
        .nx-auth-field {
          display: block;
          margin: 15px 0;
        }
        .nx-auth-field span {
          display: block;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .nx-auth-field input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 14px;
          border: 1px solid #dfe3ee;
          border-radius: 12px;
          background: #fff;
          color: #20243a;
          outline: none;
          font-size: 14px;
        }
        .nx-auth-field input:focus {
          border-color: #7180ed;
          box-shadow: 0 0 0 3px #7180ed20;
        }
        .nx-auth-terms {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 12px;
          color: #6f768c;
          line-height: 1.5;
          margin: 16px 0;
        }
        .nx-auth-terms input {
          margin-top: 3px;
        }
        .nx-auth-submit {
          width: 100%;
          padding: 14px;
          border: 0;
          border-radius: 12px;
          background: linear-gradient(110deg,#5b70e9,#9271e9);
          color: white;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          margin-top: 6px;
        }
        .nx-auth-submit:disabled {
          opacity: .65;
          cursor: wait;
        }
        .nx-auth-switch {
          text-align: center;
          font-size: 13px;
          color: #72798e;
          margin: 20px 0 0;
        }
        .nx-auth-switch button {
          border: 0;
          background: none;
          color: #5969d8;
          font-weight: 800;
          cursor: pointer;
        }
        .nx-auth-message {
          padding: 12px;
          border-radius: 10px;
          font-size: 13px;
          line-height: 1.5;
          margin: 14px 0;
          overflow-wrap: anywhere;
        }
        .nx-auth-error {
          background: #fff0f0;
          color: #b42332;
        }
        .nx-auth-success {
          background: #eaf9f0;
          color: #187747;
        }
        .nx-auth-security {
          display: flex;
          justify-content: center;
          gap: 7px;
          align-items: center;
          color: #858ba0;
          font-size: 11px;
          margin-top: 20px;
        }
        @media(max-width:480px) {
          .nx-auth-card { padding: 24px 20px; }
          .nx-auth-card h1 { font-size: 26px; }
        }
      `}</style>

      <div className="nx-auth-shell">
        {onBack && (
          <button className="nx-auth-back" onClick={onBack}>
            <ArrowLeft size={17} />
            Back
          </button>
        )}

        <section className="nx-auth-card">
          <div className="nx-brand">
            <span className="nx-brand-mark">
              <Sparkles size={23} />
            </span>
            NEXTORA
          </div>

          <h1>
            {mode === "signup"
              ? "Create your account"
              : "Welcome back"}
          </h1>

          <p className="nx-auth-subtitle">
            {mode === "signup"
              ? "Your next opportunity could start here."
              : "Sign in to continue your journey with NEXTORA."}
          </p>

          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <label className="nx-auth-field">
                <span>Full name</span>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </label>
            )}

            <label className="nx-auth-field">
              <span>Email address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="nx-auth-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete={
                  mode === "signup"
                    ? "new-password"
                    : "current-password"
                }
                required
              />
            </label>

            {mode === "signup" && (
              <>
                <label className="nx-auth-field">
                  <span>Confirm password</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    required
                  />
                </label>

                <label className="nx-auth-terms">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) =>
                      setAcceptedTerms(e.target.checked)
                    }
                  />
                  <span>
                    I agree to use NEXTORA responsibly and accept its
                    terms and privacy practices.
                  </span>
                </label>
              </>
            )}

            {error && (
              <div className="nx-auth-message nx-auth-error">
                {error}
              </div>
            )}

            {message && (
              <div className="nx-auth-message nx-auth-success">
                {message}
              </div>
            )}

            <button
              className="nx-auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : mode === "signup"
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          <p className="nx-auth-switch">
            {mode === "signup"
              ? "Already have an account? "
              : "New to NEXTORA? "}
            <button
              type="button"
              onClick={() =>
                changeMode(
                  mode === "signup" ? "signin" : "signup"
                )
              }
            >
              {mode === "signup" ? "Sign in" : "Create account"}
            </button>
          </p>

          <div className="nx-auth-security">
            <ShieldCheck size={15} />
            Secure authentication powered by Supabase
          </div>
        </section>
      </div>
    </main>
  );
}

export function Dashboard({ user, onSignOut }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [saved, setSaved] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState("Dashboard");
  const [notice, setNotice] = useState("");

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Explorer";

  function navigate(view) {
    setActiveView(view);
    setMenuOpen(false);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleSaved(id) {
    setSaved((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  const visibleCards = opportunities.filter((item) => {
    const matchesCategory =
      activeCategory === "All" ||
      item.category === activeCategory;

    const query = searchQuery.trim().toLowerCase();

    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query);

    const matchesView =
      activeView !== "Saved Categories" ||
      saved.includes(item.id);

    return matchesCategory && matchesSearch && matchesView;
  });

  if (activeView === "Academy") {
    return (
      <AcademyPage
        onBack={() => navigate("Dashboard")}
      />
    );
  }
    const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Saved Categories",
      icon: Bookmark,
    },
    {
      label: "My Submissions",
      icon: FileText,
    },
    {
      label: "Saved Opportunities",
      icon: Heart,
    },
    {
      label: "Notifications",
      icon: Bell,
    },
    {
      label: "My Profile",
      icon: User,
    },
    {
      label: "Account Settings",
      icon: Settings,
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
    },
  ];

  return (
    <div className="nx-dashboard">
      <style>{`
        .nx-dashboard {
          min-height: 100vh;
          background: #f7f8fc;
          color: #20243a;
          font-family: Inter, system-ui, sans-serif;
        }
        .nx-dashboard * { box-sizing: border-box; }
        .nx-topbar {
          position: sticky;
          top: 0;
          z-index: 30;
          background: rgba(255,255,255,.94);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #e9ebf3;
        }
        .nx-topbar-inner {
          max-width: 1180px;
          margin: auto;
          min-height: 76px;
          padding: 12px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .nx-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #222640;
          font-weight: 900;
          font-size: 21px;
          letter-spacing: -.7px;
        }
        .nx-brand-mark {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          color: white;
          background: linear-gradient(135deg,#6478f2,#a079e9);
        }
        .nx-top-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nx-icon-button {
          position: relative;
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border: 1px solid #e6e8f0;
          border-radius: 13px;
          color: #59617a;
          background: white;
          cursor: pointer;
        }
        .nx-avatar {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #e9eaff;
          color: #5867d9;
          font-weight: 900;
        }
        .nx-menu-wrap { position: relative; }
        .nx-dropdown {
          position: absolute;
          top: 51px;
          right: 0;
          z-index: 50;
          width: 245px;
          padding: 9px;
          border: 1px solid #e6e8f0;
          border-radius: 17px;
          background: white;
          box-shadow: 0 16px 45px #26305b1c;
        }
        .nx-dropdown-user {
          padding: 12px;
          border-bottom: 1px solid #eff0f5;
          margin-bottom: 6px;
          overflow-wrap: anywhere;
        }
        .nx-dropdown-user strong {
          display: block;
          font-size: 14px;
        }
        .nx-dropdown-user span {
          display: block;
          margin-top: 4px;
          font-size: 12px;
          color: #81879b;
        }
        .nx-dropdown button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 0;
          border-radius: 10px;
          padding: 11px;
          text-align: left;
          background: transparent;
          color: #505870;
          font-size: 13px;
          cursor: pointer;
        }
        .nx-dropdown button:hover { background: #f3f4fc; }
        .nx-dropdown .nx-logout { color: #c44755; }
        .nx-main {
          max-width: 1180px;
          margin: auto;
          padding: 35px 22px 48px;
        }
       .nx-welcome {
position: relative;
overflow: hidden;
border-radius: 28px;
padding: clamp(26px, 5vw, 46px);
color: #29234f;
background:
radial-gradient(circle at 90% 10%, rgba(151, 126, 255, .15), transparent 32%),
linear-gradient(135deg, #ffffff 0%, #f3efff 62%, #faf7ff 100%);
border: 1px solid #e8e0ff;
box-shadow: 0 14px 38px rgba(76, 56, 151, .07);
}

    .nx-welcome:after {
      content: "";
      position: absolute;
      width: 230px;
      height: 230px;
      right: -95px;
      bottom: -125px;
      border-radius: 50%;
      border: 35px solid rgba(117, 86, 217, .08);
      pointer-events: none;
    }

    .nx-eyebrow {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px;
      border-radius: 30px;
      background: #ebe5ff;
      color: #6950c8;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .nx-welcome h1 {
      position: relative;
      z-index: 1;
      margin: 22px 0 12px;
      max-width: 650px;
      font-size: clamp(30px, 5vw, 46px);
      line-height: 1.12;
      letter-spacing: -1.5px;
      font-weight: 900;
      color: #282248;
    }

    .nx-welcome p {
      position: relative;
      z-index: 1;
      max-width: 590px;
      margin: 0;
      font-size: 15px;
      line-height: 1.9;
      color: #6c6685;
    }

    .nx-stats {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 15px;
      margin: 20px 0 38px;
    }

    .nx-stat {
      display: flex;
      align-items: center;
      gap: 14px;
      min-width: 0;
      padding: 20px;
      border: 1px solid #e9e4f8;
      border-radius: 19px;
      background: #ffffff;
      box-shadow: 0 7px 22px rgba(65, 49, 120, .045);
      transition: transform .2s ease, box-shadow .2s ease;
    }

    .nx-stat-icon {
      width: 46px;
      height: 46px;
      flex: 0 0 46px;
      display: grid;
      place-items: center;
      border-radius: 15px;
      background: #eee9ff;
      color: #7056d9;
      } 
        .nx-stat strong {
          display: block;
          font-size: 22px;
          letter-spacing: -.5px;
        }
        .nx-stat span {
          display: block;
          margin-top: 4px;
          color: #81879b;
          font-size: 12px;
        }
        .nx-section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          margin: 0 0 18px;
        }
        .nx-section-heading h2 {
          margin: 0;
          font-size: 23px;
          letter-spacing: -.7px;
        }
        .nx-section-heading p {
          margin: 7px 0 0;
          color: #7b8297;
          font-size: 13px;
          line-height: 1.6;
        }
        .nx-search {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: 380px;
          padding: 0 14px;
          border: 1px solid #e2e5ef;
          border-radius: 13px;
          background: white;
          color: #7d8499;
        }
        .nx-search input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          padding: 13px 0;
          background: transparent;
          color: #252a43;
          font-size: 13px;
        }
        .nx-search:focus-within {
          border-color: #8189e9;
          box-shadow: 0 0 0 3px #8189e918;
        }
        .nx-filters {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
          margin: 20px 0;
        }
        .nx-filter {
          padding: 9px 15px;
          border: 1px solid #e5e7f0;
          border-radius: 30px;
          background: white;
          color: #6e758c;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
        }
        .nx-filter.active {
          border-color: #6476e6;
          background: #6476e6;
          color: white;
        }
        .nx-cards {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 17px;
        }
        .nx-card {
          min-width: 0;
          display: flex;
          flex-direction: column;
          padding: 23px;
          border: 1px solid #e8eaf2;
          border-radius: 20px;
          background: white;
          transition: transform .2s, box-shadow .2s;
        }
        .nx-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px #343c6b0c;
        }
        .nx-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .nx-card-icon {
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 15px;
        }
        .nx-save {
          display: grid;
          place-items: center;
          width: 37px;
          height: 37px;
          border: 1px solid #e9ebf2;
          border-radius: 11px;
          background: white;
          color: #7c8398;
          cursor: pointer;
        }
        .nx-save.saved {
          background: #eeefff;
          border-color: #dfe1ff;
          color: #6372e3;
        }
        .nx-card h3 {
          margin: 20px 0 8px;
          font-size: 18px;
          letter-spacing: -.4px;
        }
        .nx-card p {
          flex: 1;
          min-height: 44px;
          margin: 0;
          color: #7a8196;
          font-size: 13px;
          line-height: 1.7;
        }
        .nx-card-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 22px;
          padding-top: 17px;
          border-top: 1px solid #eff0f5;
        }
        .nx-tag {
          padding: 7px 10px;
          border-radius: 20px;
          background: #f2f3fa;
          color: #737a90;
          font-size: 11px;
          font-weight: 750;
        }
        .nx-open-card {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border: 0;
          background: transparent;
          color: #596cdd;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          padding: 7px 0;
        }
        .nx-empty {
          grid-column: 1/-1;
          padding: 35px 20px;
          border: 1px dashed #dfe2ee;
          border-radius: 18px;
          background: white;
          text-align: center;
          color: #7b8297;
        }
        .nx-empty strong {
          display: block;
          margin: 12px 0 6px;
          color: #30354e;
        }
        .nx-lower {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 17px;
          margin-top: 28px;
        }
        .nx-lower-card {
          padding: 23px;
          border: 1px solid #e8eaf2;
          border-radius: 20px;
          background: white;
        }
        .nx-lower-card h3 {
          margin: 0 0 9px;
          font-size: 17px;
        }
        .nx-lower-card p {
          margin: 0;
          color: #7b8297;
          font-size: 13px;
          line-height: 1.7;
        }
        .nx-small-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 16px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #5b6ddf;
          font-weight: 800;
          font-size: 12px;
          cursor: pointer;
        }
        .nx-notice {
          margin-bottom: 18px;
          padding: 13px 15px;
          border: 1px solid #d9e9dd;
          border-radius: 12px;
          background: #edf8f0;
          color: #287347;
          font-size: 13px;
        }
        .nx-footer {
          max-width: 1180px;
          margin: auto;
          padding: 22px;
          border-top: 1px solid #e8eaf2;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          color: #9298aa;
          font-size: 11px;
        }
        .nx-page-heading {
          margin-bottom: 23px;
        }
        .nx-page-heading h1 {
          margin: 0 0 8px;
          font-size: 27px;
        }
        .nx-page-heading p {
          margin: 0;
          color: #7b8297;
          font-size: 14px;
          line-height: 1.6;
        }
        .nx-back-button {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 20px;
          padding: 9px 0;
          border: 0;
          background: transparent;
          color: #5b6ddf;
          font-weight: 800;
          cursor: pointer;
        }
        @media(max-width:760px) {
          .nx-main { padding: 22px 15px 35px; }
          .nx-topbar-inner { padding: 11px 15px; }
          .nx-welcome { padding: 25px 22px; }
          .nx-stats { gap: 9px; }
          .nx-stat { padding: 13px 10px; gap: 9px; }
          .nx-stat-icon { width: 37px; height: 37px; }
          .nx-stat strong { font-size: 18px; }
          .nx-stat span { font-size: 10px; }
          .nx-section-heading {
            align-items: stretch;
            flex-direction: column;
          }
          .nx-search { max-width: none; }
          .nx-lower { grid-template-columns: 1fr; }
        }
        @media(max-width:520px) {
          .nx-brand { font-size: 18px; }
          .nx-brand-mark { width: 36px; height: 36px; }
          .nx-top-actions { gap: 6px; }
          .nx-icon-button { width: 38px; height: 38px; }
          .nx-avatar { width: 36px; height: 36px; }
          .nx-stats { grid-template-columns: 1fr; }
          .nx-stat { padding: 13px; }
          .nx-cards { grid-template-columns: 1fr; }
          .nx-card { padding: 20px; }
          .nx-welcome h1 { font-size: 29px; }
          .nx-section-heading h2 { font-size: 21px; }
        }
      `}</style>

      <header className="nx-topbar">
        <div className="nx-topbar-inner">
          <div className="nx-brand">
            <span className="nx-brand-mark">
              <Sparkles size={22} />
            </span>
            NEXTORA
          </div>

          <div className="nx-top-actions">
            <button
              className="nx-icon-button"
              aria-label="Open notifications"
              onClick={() => navigate("Notifications")}
            >
              <Bell size={19} />
            </button>

            <div className="nx-menu-wrap">
              <button
                className="nx-icon-button"
                aria-label="Open account menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {menuOpen && (
                <div className="nx-dropdown">
                  <div className="nx-dropdown-user">
                    <strong>{displayName}</strong>
                    <span>{user?.email || "NEXTORA member"}</span>
                  </div>

                  {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.label}
                        onClick={() => navigate(item.label)}
                      >
                        <Icon size={17} />
                        {item.label}
                      </button>
                    );
                  })}

                  <button
                    className="nx-logout"
                    onClick={() => {
                      setMenuOpen(false);
                      if (onSignOut) onSignOut();
                    }}
                  >
                    <LogOut size={17} />
                    Sign out
                  </button>
                </div>
              )}
            </div>

            <div className="nx-avatar" title={displayName}>
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>
            <main className="nx-main">
        {notice && (
          <div className="nx-notice" role="status">
            {notice}
          </div>
        )}

        {activeView === "Dashboard" && (
          <>
            <section className="nx-welcome">
              <span className="nx-eyebrow">
                <Sparkles size={14} />
                YOUR NEXT CHAPTER STARTS HERE
              </span>

              <h1>
                Welcome back, {displayName.split(" ")[0]}.
              </h1>

              <p>
                Discover learning resources, career guidance, funding
                information, and new ways to build your future—all in
                one place.
              </p>
            </section>

            <section className="nx-stats">
              <div className="nx-stat">
                <div className="nx-stat-icon">
                  <Compass size={21} />
                </div>
                <div>
                  <strong>{opportunities.length}</strong>
                  <span>Explore categories</span>
                </div>
              </div>

              <div className="nx-stat">
                <div className="nx-stat-icon">
                  <Bookmark size={21} />
                </div>
                <div>
                  <strong>{saved.length}</strong>
                  <span>Saved categories</span>
                </div>
              </div>

              <div className="nx-stat">
                <div className="nx-stat-icon">
                  <CheckCircle2 size={21} />
                </div>
                <div>
                  <strong>1</strong>
                  <span>Place to start</span>
                </div>
              </div>
            </section>
          </>
        )}

        {activeView !== "Dashboard" && (
          <>
            <button
              className="nx-back-button"
              onClick={() => navigate("Dashboard")}
            >
              <ArrowLeft size={17} />
              Back to dashboard
            </button>

            <div className="nx-page-heading">
              <h1>{activeView}</h1>
              <p>
                Manage your NEXTORA experience from this section.
              </p>
            </div>
          </>
        )}

        {activeView === "My Profile" && (
          <section className="nx-lower-card">
            <h3>
              <User
                size={18}
                style={{
                  verticalAlign: "middle",
                  marginRight: 8,
                }}
              />
              Your account
            </h3>
            <p>
              <strong>Name:</strong> {displayName}
            </p>
            <p style={{ marginTop: 8 }}>
              <strong>Email:</strong> {user?.email || "Not available"}
            </p>
            <p style={{ marginTop: 12 }}>
              Your account is managed through NEXTORA's authentication
              provider.
            </p>
          </section>
        )}

        {activeView === "Account Settings" && (
          <section className="nx-lower-card">
            <h3>
              <Settings
                size={18}
                style={{
                  verticalAlign: "middle",
                  marginRight: 8,
                }}
              />
              Account settings
            </h3>
            <p>
              Your account uses secure authentication. To protect your
              account, always keep your password private and sign out
              when using a shared device.
            </p>
            <button
              className="nx-small-link"
              onClick={() => {
                if (onSignOut) onSignOut();
              }}
            >
              <LogOut size={16} />
              Sign out
            </button>
          </section>
        )}

        {activeView === "Help & Support" && (
          <section className="nx-lower-card">
            <h3>
              <HelpCircle
                size={18}
                style={{
                  verticalAlign: "middle",
                  marginRight: 8,
                }}
              />
              How can we help?
            </h3>
            <p>
              If you experience an issue, note what you were doing and
              the message displayed. This will make it easier to
              investigate and resolve the problem.
            </p>
            <button
              className="nx-small-link"
              onClick={() =>
                setNotice(
                  "Support information: please record the issue and the error message you see."
                )
              }
            >
              View support guidance
              <ArrowRight size={16} />
            </button>
          </section>
        )}

        {activeView === "Notifications" && (
          <section className="nx-lower-card">
            <h3>
              <Bell
                size={18}
                style={{
                  verticalAlign: "middle",
                  marginRight: 8,
                }}
              />
              Notifications
            </h3>
            <p>
              You're all caught up. Updates can appear here when
              notification features are connected.
            </p>
          </section>
        )}

        {activeView === "My Submissions" && (
          <section className="nx-lower-card">
            <h3>
              <FileText
                size={18}
                style={{
                  verticalAlign: "middle",
                  marginRight: 8,
                }}
              />
              My submissions
            </h3>
            <p>
              Your submissions will appear here when application and
              submission tracking is connected.
            </p>
          </section>
        )}

        {activeView === "Saved Opportunities" && (
          <section className="nx-lower-card">
            <h3>
              <Heart
                size={18}
                style={{
                  verticalAlign: "middle",
                  marginRight: 8,
                }}
              />
              Saved opportunities
            </h3>
            <p>
              Your saved categories are shown in the Saved Categories
              section. Saving a category here does not submit an
              application.
            </p>
            <button
              className="nx-small-link"
              onClick={() => navigate("Saved Categories")}
            >
              View saved categories
              <ArrowRight size={16} />
            </button>
          </section>
        )}

        {(activeView === "Dashboard" ||
          activeView === "Saved Categories") && (
          <section style={{ marginTop: activeView === "Dashboard" ? 0 : 4 }}>
            <div className="nx-section-heading">
              <div>
                <h2>
                  {activeView === "Saved Categories"
                    ? "Your saved categories"
                    : "Explore NEXTORA"}
                </h2>
                <p>
                  {activeView === "Saved Categories"
                    ? "Quickly return to the categories you saved."
                    : "Search and discover resources that match your goals."}
                </p>
              </div>

              <label className="nx-search">
                <Search size={19} />
                <input
                  type="search"
                  placeholder="Search categories, skills, careers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search NEXTORA categories"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearchQuery("")}
                    style={{
                      border: 0,
                      background: "transparent",
                      color: "#777f96",
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
              </label>
            </div>

            {activeView === "Dashboard" && (
              <div className="nx-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={
                      activeCategory === category
                        ? "nx-filter active"
                        : "nx-filter"
                    }
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            <div className="nx-cards">
              {visibleCards.map((item) => {
                const Icon = item.icon;
                const isAcademy = item.id === "academy";
                const isSaved = saved.includes(item.id);

                return (
                  <article className="nx-card" key={item.id}>
                    <div className="nx-card-top">
                      <div
                        className="nx-card-icon"
                        style={{
                          background: item.color,
                          color: item.ink,
                        }}
                      >
                        <Icon size={25} />
                      </div>

                      <button
                        className={
                          isSaved
                            ? "nx-save saved"
                            : "nx-save"
                        }
                        aria-label={
                          isSaved
                            ? `Unsave ${item.title}`
                            : `Save ${item.title}`
                        }
                        title={
                          isSaved
                            ? "Remove from saved categories"
                            : "Save category"
                        }
                        onClick={() => toggleSaved(item.id)}
                      >
                        <Bookmark
                          size={18}
                          fill={isSaved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <div className="nx-card-foot">
                      <span className="nx-tag">{item.tag}</span>
                      
          <button
  className="nx-open-card"
  onClick={() => {
    if (isAcademy) {
      navigate("Academy");
    } else if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      setNotice("This opportunity website is not available yet.");
    }
  }}
>
  {isAcademy ? "Open Academy" : "Explore"}
  <ArrowUpRight size={16} />
</button>
                    </div>
                  </article>
                );
              })}

              {visibleCards.length === 0 && (
                <div className="nx-empty">
                  <Search size={26} />
                  <strong>
                    {activeView === "Saved Categories" &&
                    !searchQuery.trim()
                      ? "No saved categories yet"
                      : "No matching categories"}
                  </strong>
                  <span>
                    {activeView === "Saved Categories" &&
                    !searchQuery.trim()
                      ? "Save a category using the bookmark icon to find it here."
                      : "Try a different search word or select another category."}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {activeView === "Dashboard" && (
          <section className="nx-lower">
            <div className="nx-lower-card">
              <h3>
                <BookOpen
                  size={19}
                  style={{
                    verticalAlign: "middle",
                    marginRight: 8,
                    color: "#7657cf",
                  }}
                />
                Learn something new
              </h3>
              <p>
                Visit NEXTORA Academy to explore learning departments,
                work through lessons, and practise what you learn.
              </p>
              <button
                className="nx-small-link"
                onClick={() => navigate("Academy")}
              >
                Explore NEXTORA Academy
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="nx-lower-card">
              <h3>
                <ShieldCheck
                  size={19}
                  style={{
                    verticalAlign: "middle",
                    marginRight: 8,
                    color: "#4a9b79",
                  }}
                />
                Your journey, your pace
              </h3>
              <p>
                Explore the available resources at your own pace.
                Always check the eligibility and requirements of an
                opportunity before sharing personal information.
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="nx-footer">
        <span>© {new Date().getFullYear()} NEXTORA</span>
        <span>Discover. Learn. Move Forward.</span>
      </footer>
    </div>
  );
              }
