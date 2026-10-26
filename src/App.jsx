import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Menu,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";

import { supabase } from "./lib/supabaseclient";
import { AuthPortal, Dashboard } from "./AuthPortal";

const categories = [
  {
    icon: GraduationCap,
    title: "Scholarships",
    description:
      "Discover educational funding and scholarship opportunities.",
    color: "#E9EEFF",
  },
  {
    icon: BriefcaseBusiness,
    title: "Jobs & Careers",
    description:
      "Explore jobs, internships, and opportunities to grow.",
    color: "#F2E9FF",
  },
  {
    icon: Wallet,
    title: "Grants & Funding",
    description:
      "Find funding opportunities for your ideas and projects.",
    color: "#FFF0E3",
  },
  {
    icon: BookOpen,
    title: "NEXTORA Academy",
    description:
      "Build useful skills and prepare for your next chapter.",
    color: "#E2F6EC",
  },
];

const benefits = [
  "Discover opportunities in one place",
  "Explore learning and career resources",
  "Prepare for your next big step",
];

const css = `
  * {
    box-sizing: border-box;
  }

  .nx-app {
    min-height: 100vh;
    background: #ffffff;
    color: #18213b;
    font-family: Inter, Arial, sans-serif;
    overflow-x: hidden;
  }

  .nx-container {
    width: min(1160px, 90%);
    margin: 0 auto;
  }

  .nx-header {
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border-bottom: 1px solid #edf0f6;
    background: rgba(255,255,255,0.97);
    position: sticky;
    top: 0;
    z-index: 20;
    padding: 0 5%;
  }

  .nx-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 0;
    background: transparent;
    color: #29458f;
    font-size: 23px;
    font-weight: 900;
    letter-spacing: -0.8px;
    cursor: pointer;
  }

  .nx-logo-icon {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    background: #eaf0ff;
    border-radius: 13px;
  }

  .nx-nav {
    display: flex;
    align-items: center;
    gap: 28px;
  }

  .nx-nav a {
    color: #566079;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
  }

  .nx-nav a:hover {
    color: #29458f;
  }

  .nx-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .nx-btn {
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 12px 19px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    font-size: 14px;
    font-weight: 750;
    cursor: pointer;
    transition: transform .2s, background .2s;
  }

  .nx-btn:hover {
    transform: translateY(-2px);
  }

  .nx-primary {
    color: #ffffff;
    background: #29458f;
  }

  .nx-primary:hover {
    background: #203873;
  }

  .nx-secondary {
    color: #29458f;
    background: #ffffff;
    border-color: #dfe5f2;
  }

  .nx-menu {
    display: none;
    background: #ffffff;
    border: 1px solid #e5e9f2;
    border-radius: 10px;
    padding: 9px;
    color: #29458f;
  }

  .nx-hero {
    padding: 85px 0 78px;
    background:
      radial-gradient(circle at 85% 20%, #e9efff 0, transparent 35%),
      linear-gradient(135deg, #ffffff 0%, #f7f9ff 100%);
  }

  .nx-hero-grid {
    display: grid;
    grid-template-columns: 1.08fr .92fr;
    align-items: center;
    gap: 55px;
  }

  .nx-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #3859ad;
    background: #edf2ff;
    border: 1px solid #e0e8ff;
    border-radius: 30px;
    padding: 9px 13px;
    font-size: 11px;
    font-weight: 850;
    letter-spacing: 1.1px;
  }

  .nx-hero h1 {
    font-size: clamp(40px, 5.7vw, 67px);
    line-height: 1.07;
    letter-spacing: -2.8px;
    margin: 24px 0 20px;
    color: #18213b;
  }

  .nx-highlight {
    color: #3859ad;
  }

  .nx-hero-copy {
    max-width: 535px;
    color: #69738b;
    font-size: 16px;
    line-height: 1.9;
    margin-bottom: 28px;
  }

  .nx-hero-buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 13px;
  }

  .nx-trust {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #69738b;
    font-size: 12px;
    margin-top: 24px;
  }

  .nx-visual {
    min-height: 390px;
    border-radius: 28px;
    padding: 28px;
    background: linear-gradient(145deg, #e9efff, #f5f0ff);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .nx-visual-card {
    background: #ffffff;
    width: 100%;
    max-width: 365px;
    border: 1px solid #ffffff;
    border-radius: 22px;
    padding: 25px;
    box-shadow: 0 22px 65px rgba(41,69,143,.12);
  }

  .nx-visual-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
  }

  .nx-visual-label {
    color: #8a93a8;
    font-size: 11px;
    font-weight: 750;
    letter-spacing: .7px;
  }

  .nx-status {
    color: #17835d;
    background: #e2f7ed;
    padding: 7px 9px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 800;
  }

  .nx-opportunity {
    display: flex;
    align-items: center;
    gap: 13px;
    border: 1px solid #edf0f6;
    border-radius: 14px;
    padding: 14px;
    margin-top: 12px;
  }

  .nx-opportunity-icon {
    width: 43px;
    height: 43px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .nx-opportunity strong {
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
  }

  .nx-opportunity small {
    color: #8991a4;
    font-size: 11px;
  }

  .nx-section {
    padding: 78px 0;
  }

  .nx-soft {
    background: #f8f9fd;
  }

  .nx-section-heading {
    max-width: 650px;
    margin: 0 auto 38px;
    text-align: center;
  }

  .nx-section-heading h2 {
    font-size: clamp(29px, 4vw, 43px);
    letter-spacing: -1.4px;
    line-height: 1.2;
    margin: 16px 0;
  }

  .nx-section-heading p {
    color: #707990;
    font-size: 15px;
    line-height: 1.9;
  }

  .nx-category-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
  }

  .nx-category {
    padding: 25px 20px;
    border: 1px solid #e9ecf4;
    border-radius: 18px;
    background: #ffffff;
    transition: transform .2s, box-shadow .2s;
  }

  .nx-category:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 35px rgba(35,54,100,.07);
  }

  .nx-category-icon {
    width: 52px;
    height: 52px;
    display: grid;
    place-items: center;
    border-radius: 15px;
    margin-bottom: 20px;
  }

  .nx-category h3 {
    font-size: 16px;
    margin: 0 0 10px;
  }

  .nx-category p {
    color: #747d92;
    font-size: 13px;
    line-height: 1.8;
    margin: 0;
  }

  .nx-about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 60px;
  }

  .nx-about h2 {
    font-size: clamp(30px, 4vw, 44px);
    letter-spacing: -1.5px;
    line-height: 1.2;
    margin: 18px 0;
  }

  .nx-about p {
    color: #707990;
    line-height: 1.9;
    font-size: 15px;
  }

  .nx-benefits {
    padding: 0;
    margin: 24px 0 28px;
    list-style: none;
  }

  .nx-benefits li {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin: 15px 0;
    color: #4c5875;
    font-size: 14px;
    line-height: 1.6;
  }

  .nx-about-visual {
    min-height: 310px;
    border-radius: 25px;
    padding: 32px;
    background: linear-gradient(145deg, #e9efff, #e5f6f0);
    display: grid;
    place-items: center;
  }

  .nx-about-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 30px;
    width: 100%;
    max-width: 360px;
    box-shadow: 0 18px 45px rgba(41,69,143,.1);
  }

  .nx-about-card h3 {
    font-size: 23px;
    line-height: 1.3;
    margin: 15px 0 10px;
  }

  .nx-about-card p {
    font-size: 13px;
    line-height: 1.8;
    color: #737d92;
  }

  .nx-cta {
    padding: 65px 35px;
    border-radius: 26px;
    text-align: center;
    background: linear-gradient(125deg, #243d85, #526fc4);
    color: #ffffff;
  }

  .nx-cta h2 {
    font-size: clamp(28px, 4vw, 43px);
    letter-spacing: -1.4px;
    margin: 0 0 15px;
  }

  .nx-cta p {
    max-width: 580px;
    margin: 0 auto 25px;
    color: #e3e9ff;
    font-size: 14px;
    line-height: 1.9;
  }

  .nx-cta .nx-primary {
    color: #29458f;
    background: #ffffff;
  }

  .nx-footer {
    margin-top: 70px;
    background: #f8f9fd;
    border-top: 1px solid #edf0f6;
    padding: 38px 0 25px;
  }

  .nx-footer-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 30px;
    padding-bottom: 30px;
  }

  .nx-footer p {
    color: #788198;
    font-size: 13px;
    line-height: 1.8;
    max-width: 380px;
  }

  .nx-footer-bottom {
    border-top: 1px solid #e8ebf3;
    padding-top: 20px;
    color: #8991a4;
    font-size: 12px;
    line-height: 1.8;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  @media (max-width: 900px) {
    .nx-nav {
      gap: 15px;
    }

    .nx-nav a {
      font-size: 12px;
    }

    .nx-category-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .nx-hero-grid {
      gap: 30px;
    }

    .nx-hero h1 {
      font-size: 49px;
    }
  }

  @media (max-width: 680px) {
    .nx-header {
      height: 70px;
      padding: 0 5%;
    }

    .nx-logo {
      font-size: 20px;
    }

    .nx-logo-icon {
      width: 38px;
      height: 38px;
    }

    .nx-menu {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .nx-nav {
      display: none;
      position: absolute;
      top: 69px;
      left: 0;
      right: 0;
      padding: 22px 5%;
      background: #ffffff;
      border-bottom: 1px solid #edf0f6;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .nx-nav.nx-nav-open {
      display: flex;
    }

    .nx-actions {
      gap: 7px;
    }

    .nx-actions .nx-btn {
      padding: 10px 12px;
      font-size: 12px;
    }

    .nx-actions .nx-secondary {
      display: none;
    }

    .nx-hero {
      padding: 55px 0;
    }

    .nx-hero-grid,
    .nx-about-grid {
      grid-template-columns: 1fr;
    }

    .nx-hero h1 {
      font-size: clamp(40px, 11vw, 56px);
      letter-spacing: -2px;
    }

    .nx-hero-copy {
      font-size: 14px;
    }

    .nx-visual {
      min-height: 330px;
      padding: 18px;
    }

    .nx-section {
      padding: 58px 0;
    }

    .nx-category-grid {
      grid-template-columns: 1fr;
    }

    .nx-about-grid {
      gap: 30px;
    }

    .nx-cta {
      padding: 45px 22px;
    }

    .nx-footer-top {
      flex-direction: column;
    }
  }
`;

export default function App() {
  const [accountMode, setAccountMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("account");

    return mode === "signup" || mode === "signin" ? mode : null;
  });

  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error("Could not load session:", error.message);
      }

      setSession(data?.session ?? null);
      setCheckingSession(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (mounted) {
        setSession(currentSession);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  function openAccount(mode) {
    window.history.pushState({}, "", `/?account=${mode}`);
    setAccountMode(mode);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    window.history.pushState({}, "", "/");
    setAccountMode(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      window.alert(`Could not sign out: ${error.message}`);
      return;
    }

    goHome();
  }

  if (checkingSession) {
    return (
      <>
        <style>{css}</style>
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#f7f8fc",
            color: "#29458f",
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            padding: 24,
          }}
        >
          <div>
            <div style={{ fontSize: 25, fontWeight: 900 }}>NEXTORA</div>
            <p>Preparing your experience...</p>
          </div>
        </div>
      </>
    );
  }

  if (session) {
    return (
      <>
        <style>{css}</style>
        <Dashboard user={session.user} onSignOut={handleSignOut} />
      </>
    );
  }

  if (accountMode) {
    return (
      <>
        <style>{css}</style>
        <AuthPortal
          key={accountMode}
          initialMode={accountMode}
          onBack={goHome}
        />
      </>
    );
    }
    return (
    <>
      <style>{css}</style>

      <div className="nx-app" id="home">
        <header className="nx-header">
          <button
            className="nx-logo"
            type="button"
            onClick={goHome}
            aria-label="NEXTORA home"
          >
            <span className="nx-logo-icon">
              <ArrowUpRight size={25} />
            </span>
            NEXTORA
          </button>

          <nav
            className={`nx-nav ${mobileMenuOpen ? "nx-nav-open" : ""}`}
          >
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>
              Home
            </a>
            <a href="#opportunities" onClick={() => setMobileMenuOpen(false)}>
              Opportunities
            </a>
            <a href="#academy" onClick={() => setMobileMenuOpen(false)}>
              Academy
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
          </nav>

          <div className="nx-actions">
            <button
              className="nx-btn nx-secondary"
              type="button"
              onClick={() => openAccount("signin")}
            >
              Sign In
            </button>

            <button
              className="nx-btn nx-primary"
              type="button"
              onClick={() => openAccount("signup")}
            >
              Get Started <ArrowRight size={16} />
            </button>

            <button
              className="nx-menu"
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((previous) => !previous)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        <main>
          <section className="nx-hero">
            <div className="nx-container nx-hero-grid">
              <div>
                <div className="nx-eyebrow">
                  <Sparkles size={14} />
                  WHERE OPPORTUNITIES BEGIN
                </div>

                <h1>
                  Your next
                  <br />
                  opportunity
                  <br />
                  starts <span className="nx-highlight">here.</span>
                </h1>

                <p className="nx-hero-copy">
                  Discover scholarships, career opportunities, grants,
                  and learning resources designed to help you move
                  forward with confidence.
                </p>

                <div className="nx-hero-buttons">
                  <button
                    className="nx-btn nx-primary"
                    type="button"
                    onClick={() => openAccount("signup")}
                  >
                    Get Started Today <ArrowRight size={17} />
                  </button>

                  <a
                    className="nx-btn nx-secondary"
                    href="#opportunities"
                    style={{ textDecoration: "none" }}
                  >
                    Explore Opportunities
                  </a>
                </div>

                <div className="nx-trust">
                  <ShieldCheck size={17} />
                  Discover. Learn. Prepare. Grow.
                </div>
              </div>

              <div className="nx-visual">
                <div className="nx-visual-card">
                  <div className="nx-visual-top">
                    <div>
                      <div className="nx-visual-label">
                        YOUR NEXT CHAPTER
                      </div>
                      <h3 style={{ margin: "8px 0 0", fontSize: 20 }}>
                        Find your direction
                      </h3>
                    </div>

                    <span className="nx-status">GET STARTED</span>
                  </div>

                  {categories.slice(0, 3).map((item) => {
                    const Icon = item.icon;

                    return (
                      <div className="nx-opportunity" key={item.title}>
                        <div
                          className="nx-opportunity-icon"
                          style={{ background: item.color }}
                        >
                          <Icon size={23} />
                        </div>

                        <div>
                          <strong>{item.title}</strong>
                          <small>Explore your possibilities</small>
                        </div>

                        <ArrowRight
                          size={16}
                          style={{ marginLeft: "auto", color: "#8a93a8" }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="nx-section" id="opportunities">
            <div className="nx-container">
              <div className="nx-section-heading">
                <div className="nx-eyebrow">
                  EXPLORE YOUR POSSIBILITIES
                </div>

                <h2>
                  Opportunities for your
                  <br />
                  <span className="nx-highlight">next big step.</span>
                </h2>

                <p>
                  Whether you are a student, graduate, job seeker,
                  or aspiring entrepreneur, NEXTORA is being built to
                  help you discover your next opportunity.
                </p>
              </div>

              <div className="nx-category-grid">
                {categories.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article className="nx-category" key={item.title}>
                      <div
                        className="nx-category-icon"
                        style={{ background: item.color }}
                      >
                        <Icon size={27} />
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.description}</p>

                      <button
                        type="button"
                        onClick={() => openAccount("signup")}
                        style={{
                          border: 0,
                          padding: "16px 0 0",
                          background: "transparent",
                          color: "#3859ad",
                          fontWeight: 800,
                          fontSize: 12,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                        }}
                      >
                        Get started <ArrowRight size={14} />
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="nx-section nx-soft" id="academy">
            <div className="nx-container nx-about-grid">
              <div className="nx-about">
                <div className="nx-eyebrow">
                  <BookOpen size={14} />
                  NEXTORA ACADEMY
                </div>

                <h2>
                  Learn today.
                  <br />
                  Prepare for <span className="nx-highlight">tomorrow.</span>
                </h2>

                <p>
                  Opportunities become more meaningful when you have the
                  knowledge and skills to pursue them. NEXTORA Academy
                  aims to support your growth through accessible learning
                  resources and practical guidance.
                </p>

                <button
                  className="nx-btn nx-primary"
                  type="button"
                  onClick={() => openAccount("signup")}
                >
                  Join NEXTORA <ArrowRight size={16} />
                </button>
              </div>

              <div className="nx-about-visual">
                <div className="nx-about-card">
                  <div
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 16,
                      background: "#e5f6ef",
                      color: "#197653",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <GraduationCap size={29} />
                  </div>

                  <h3>Your future deserves preparation.</h3>

                  <p>
                    Explore new possibilities, build your knowledge,
                    and take your next step with purpose.
                  </p>

                  <div
                    style={{
                      height: 5,
                      background: "#e8edf7",
                      borderRadius: 20,
                      overflow: "hidden",
                      marginTop: 20,
                    }}
                  >
                    <div
                      style={{
                        width: "72%",
                        height: "100%",
                        background: "#526fc4",
                        borderRadius: 20,
                      }}
                    />
                  </div>

                  <small
                    style={{
                      display: "block",
                      color: "#8991a4",
                      marginTop: 9,
                    }}
                  >
                    Your journey starts with one step.
                  </small>
                </div>
              </div>
            </div>
          </section>

          <section className="nx-section" id="about">
            <div className="nx-container nx-about-grid">
              <div className="nx-about">
                <div className="nx-eyebrow">ABOUT NEXTORA</div>

                <h2>
                  Built to make
                  <br />
                  discovery <span className="nx-highlight">easier.</span>
                </h2>

                <p>
                  NEXTORA is an opportunity discovery and learning
                  platform being developed to help people find useful
                  opportunities and resources in one place.
                </p>

                <ul className="nx-benefits">
                  {benefits.map((benefit) => (
                    <li key={benefit}>
                      <CheckCircle2
                        size={19}
                        style={{
                          color: "#21845d",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <button
                  className="nx-btn nx-primary"
                  type="button"
                  onClick={() => openAccount("signup")}
                >
                  Become a Member <ArrowRight size={16} />
                </button>
              </div>

              <div className="nx-about-visual">
                <div className="nx-about-card">
                  <div className="nx-eyebrow">OUR MISSION</div>

                  <h3>
                    Helping people take the next step towards their goals.
                  </h3>

                  <p>
                    From education to careers and personal development,
                    we want to make discovering opportunities simpler.
                  </p>

                  <div
                    style={{
                      marginTop: 22,
                      padding: 15,
                      background: "#f2f5ff",
                      borderRadius: 12,
                      color: "#3859ad",
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    NEXTORA — Where Opportunities Begin.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="nx-container">
            <div className="nx-cta">
              <h2>Your next opportunity could start today.</h2>

              <p>
                Create your NEXTORA account and take the first step
                towards discovering opportunities for your future.
              </p>

              <button
                className="nx-btn nx-primary"
                type="button"
                onClick={() => openAccount("signup")}
              >
                Create Your Account <ArrowRight size={17} />
              </button>
            </div>
          </section>
        </main>

        <footer className="nx-footer">
          <div className="nx-container">
            <div className="nx-footer-top">
              <div>
                <button
                  className="nx-logo"
                  type="button"
                  onClick={goHome}
                >
                  <span className="nx-logo-icon">
                    <ArrowUpRight size={25} />
                  </span>
                  NEXTORA
                </button>

                <p>
                  Discover opportunities. Develop your skills.
                  Take your next step.
                </p>
              </div>

              <div>
                <strong style={{ fontSize: 14 }}>Explore</strong>

                <p style={{ marginBottom: 5 }}>
                  <a
                    href="#opportunities"
                    style={{ color: "#69738b", textDecoration: "none" }}
                  >
                    Opportunities
                  </a>
                </p>

                <p style={{ marginBottom: 5 }}>
                  <a
                    href="#academy"
                    style={{ color: "#69738b", textDecoration: "none" }}
                  >
                    Academy
                  </a>
                </p>

                <p style={{ marginBottom: 5 }}>
                  <a
                    href="#about"
                    style={{ color: "#69738b", textDecoration: "none" }}
                  >
                    About Us
                  </a>
                </p>
              </div>

              <div>
                <strong style={{ fontSize: 14 }}>Your Account</strong>

                <p style={{ marginBottom: 5 }}>
                  <button
                    type="button"
                    onClick={() => openAccount("signin")}
                    style={{
                      border: 0,
                      padding: 0,
                      background: "transparent",
                      color: "#69738b",
                      cursor: "pointer",
                    }}
                  >
                    Sign In
                  </button>
                </p>

                <p style={{ marginBottom: 5 }}>
                  <button
                    type="button"
                    onClick={() => openAccount("signup")}
                    style={{
                      border: 0,
                      padding: 0,
                      background: "transparent",
                      color: "#69738b",
                      cursor: "pointer",
                    }}
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>

            <div className="nx-footer-bottom">
              <span>
                © {new Date().getFullYear()} NEXTORA. All rights reserved.
              </span>

              <span>
                A product of Ayanfe Innovation Labs Limited.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
                    }
