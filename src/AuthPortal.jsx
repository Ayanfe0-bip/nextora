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
  const fullName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "NEXTORA member";

  return (
    <div style={styles.page}>
      <Header dashboard onSignOut={onSignOut} />

      <main style={styles.dashboardMain}>
        <section style={styles.welcome}>
          <div style={{ opacity: 0.85, fontSize: 13, marginBottom: 10 }}>
            YOUR NEXT CHAPTER STARTS HERE
          </div>

          <h1 style={{ margin: "0 0 12px", fontSize: "clamp(26px, 5vw, 38px)" }}>
            Welcome, {fullName}!
          </h1>

          <p style={{ lineHeight: 1.7, margin: 0, maxWidth: 620 }}>
            Your NEXTORA journey starts here. Explore opportunity categories
            and keep preparing for your next step.
          </p>
        </section>

        <div style={styles.eyebrow}>YOUR OPPORTUNITY SPACE</div>
        <h2 style={{ fontSize: 25, margin: "8px 0" }}>
          What are you looking for?
        </h2>
        <p style={{ color: "#69738C", lineHeight: 1.7 }}>
          Choose a category to get started. Opportunity listings and learning
          resources will be connected in a later step.
        </p>

        <section style={styles.grid}>
          {opportunities.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} style={styles.tile}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: item.color,
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 18,
                  }}
                >
                  <Icon size={24} />
                </div>

                <h3 style={{ margin: "0 0 8px", fontSize: 17 }}>
                  {item.title}
                </h3>

                <p
                  style={{
                    color: "#69738C",
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </section>

        <section
          style={{
            marginTop: 28,
            background: "#FFFFFF",
            border: "1px solid #E9ECF4",
            borderRadius: 17,
            padding: 22,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <User size={22} />
            <div style={{ minWidth: 0 }}>
              <strong>Your account</strong>
              <p
                style={{
                  color: "#69738C",
                  fontSize: 13,
                  overflowWrap: "anywhere",
                }}
              >
                {user?.email}
              </p>
            </div>
          </div>

          <p style={{ color: "#69738C", fontSize: 13, lineHeight: 1.7 }}>
            Your account is signed in. We'll add profile editing, saved
            opportunities, and personalized recommendations as NEXTORA grows.
          </p>

          <button
            style={{ ...styles.primary, maxWidth: 180 }}
            onClick={onSignOut}
          >
            <LogOut size={17} /> Sign out
          </button>
        </section>
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
