import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Heart,
  Lightbulb,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wallet,
  X,
  Globe2,
} from "lucide-react";

const categories = [
  {
    name: "Scholarships",
    description: "Find support for your education.",
    icon: GraduationCap,
    color: "blue",
  },
  {
    name: "Jobs",
    description: "Discover your next career move.",
    icon: BriefcaseBusiness,
    color: "purple",
  },
  {
    name: "Grants",
    description: "Find funding for your ideas.",
    icon: Wallet,
    color: "orange",
  },
  {
    name: "Internships",
    description: "Gain experience and grow.",
    icon: Users,
    color: "green",
  },
  {
    name: "Training",
    description: "Build useful new skills.",
    icon: BookOpen,
    color: "pink",
  },
  {
    name: "Competitions",
    description: "Show the world what you can do.",
    icon: Trophy,
    color: "yellow",
  },
];

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.nextoraToastTimer);
    window.nextoraToastTimer = window.setTimeout(
      () => setToast(""),
      3000
    );
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setMobileMenu(false);
  };

  return (
    <div className="nextora-app">
      <div className="announcement">
        <div className="announcement-inner">
          <Sparkles size={15} />
          <span>
            Your next opportunity could change everything.
          </span>
          <button onClick={() => scrollTo("about")}>
            Learn more <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <header className="site-header">
        <div className="nav-container">
          <button
            className="brand"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="NEXTORA home"
          >
            <span className="brand-symbol">
              <ArrowUpRight size={24} strokeWidth={2.6} />
            </span>

            <span className="brand-text">
              NEXTORA
              <small>WHERE OPPORTUNITIES BEGIN.</small>
            </span>
          </button>

          <nav
            className={`main-nav ${
              mobileMenu ? "nav-open" : ""
            }`}
          >
            <button
              className="nav-link active"
              onClick={() => scrollTo("home")}
            >
              Home
            </button>

            <button
              className="nav-link"
              onClick={() => scrollTo("academy")}
            >
              Academy
            </button>

            <button
              className="nav-link"
              onClick={() => scrollTo("about")}
            >
              About
            </button>

            <button
              className="mobile-signin"
              onClick={() =>
                notify("Account registration is coming soon.")
              }
            >
              Sign in <ArrowRight size={16} />
            </button>
          </nav>

          <div className="nav-actions">
            <button
              className="signin-button"
              onClick={() =>
                notify("Sign-in will be available soon.")
              }
            >
              Sign in
            </button>

            <button
              className="nav-cta"
              onClick={() =>
                notify("Account registration is coming soon.")
              }
            >
              Get started <ArrowRight size={16} />
            </button>
          </div>

          <button
            className="menu-toggle"
            onClick={() =>
              setMobileMenu((open) => !open)
            }
            aria-label={
              mobileMenu ? "Close menu" : "Open menu"
            }
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />
                YOUR FUTURE STARTS HERE
              </div>

              <h1>
                Big dreams.
                <br />
                <span>Real opportunities.</span>
                <br />
                One place.
              </h1>

              <p className="hero-description">
                Discover scholarships, jobs, grants and
                learning opportunities designed to help
                you move forward.
              </p>

              <div className="hero-search">
                <Sparkles size={20} />

                <span>
                  Create an account to discover your next
                  opportunity.
                </span>

                <button
                  type="button"
                  onClick={() =>
                    notify(
                      "Account registration is coming soon."
                    )
                  }
                >
                  Get started <ArrowRight size={17} />
                </button>
              </div>

              <div className="hero-trust">
                <div className="trust-icon">
                  <ShieldCheck size={18} />
                </div>

                <span>
                  Discover opportunities. Verify details.
                  Apply with confidence.
                </span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-photo-frame">
                <img
                  src="/images/nextora-hero.jpg"
                  alt="A student ready to pursue new opportunities"
                  className="hero-photo"
                  fetchPriority="high"
                />

                <div className="hero-photo-overlay" />

                <div className="hero-photo-caption">
                  <span className="caption-kicker">
                    YOUR NEXT CHAPTER
                  </span>
                  <strong>
                    Make room for what’s possible.
                  </strong>
                  <span>
                    One opportunity can open many doors.
                  </span>
                </div>
              </div>

              <div className="floating-card floating-card-top">
                <div className="floating-icon scholarship-icon">
                  <GraduationCap size={21} />
                </div>

                <div>
                  <strong>Scholarships</strong>
                  <span>Invest in your future</span>
                </div>

                <ArrowUpRight
                  size={17}
                  className="floating-arrow"
                />
              </div>

              <div className="floating-card floating-card-bottom">
                <div className="floating-icon skill-icon">
                  <Sparkles size={21} />
                </div>

                <div>
                  <strong>Learn something new</strong>
                  <span>Grow with Nextora Academy</span>
                </div>

                <CheckCircle2
                  size={19}
                  className="floating-check"
                />
              </div>

              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
            </div>
          </div>

          <div className="hero-bottom">
            <div className="hero-bottom-inner">
              <span>
                OPPORTUNITIES FOR YOUR NEXT CHAPTER
              </span>

              <div>
                <span>
                  <GraduationCap size={17} /> Education
                </span>
                <span>
                  <BriefcaseBusiness size={17} /> Career
                </span>
                <span>
                  <Lightbulb size={17} /> Skills
                </span>
                <span>
                  <Wallet size={17} /> Funding
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="categories-section section-pad"
          id="categories"
        >
          <div className="section-container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">
                  FIND YOUR PATH
                </span>

                <h2>
                  Opportunity looks
                  <br className="desktop-break" />
                  different for everyone.
                </h2>
              </div>

              <p>
                Whatever your next step looks like,
                NEXTORA gives you a place to begin.
                Create an account to explore opportunities
                when the platform launches.
              </p>
            </div>

            <div className="category-grid">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    className={`category-card category-${category.color}`}
                    key={category.name}
                    onClick={() =>
                      notify(
                        "Create an account to explore " +
                          category.name.toLowerCase() +
                          " opportunities."
                      )
                    }
                  >
                    <span className="category-icon">
                      <Icon
                        size={25}
                        strokeWidth={1.8}
                      />
                    </span>

                    <span className="category-title">
                      {category.name}
                    </span>

                    <span className="category-description">
                      {category.description}
                    </span>

                    <span className="category-bottom">
                      <span>Explore inside NEXTORA</span>
                      <ArrowUpRight size={18} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
                <section
          className="academy-section section-pad"
          id="academy"
        >
          <div className="section-container">
            <div className="academy-panel">
              <div className="academy-content">
                <span className="section-kicker light-kicker">
                  NEXTORA ACADEMY
                </span>

                <h2>
                  Learn new skills.
                  <br />
                  <span>Prepare for your future.</span>
                </h2>

                <p>
                  Your future deserves more than opportunities
                  alone. NEXTORA Academy will help you develop
                  practical skills, build confidence, and
                  prepare for new possibilities.
                </p>

                <button
                  className="academy-button"
                  onClick={() =>
                    notify(
                      "NEXTORA Academy learning resources are coming soon."
                    )
                  }
                >
                  Explore the Academy{" "}
                  <ArrowRight size={17} />
                </button>

                <div className="academy-benefits">
                  <span>
                    <CheckCircle2 size={16} />
                    Beginner-friendly learning
                  </span>

                  <span>
                    <CheckCircle2 size={16} />
                    Practical digital skills
                  </span>

                  <span>
                    <CheckCircle2 size={16} />
                    Learn at your own pace
                  </span>
                </div>
              </div>

              <div className="academy-visual">
                <div className="academy-photo-frame">
                  <img
                    src="/images/nextora-cta.jpg"
                    alt="A student looking ahead toward future possibilities"
                    loading="lazy"
                  />
                </div>

                <div className="academy-sticker">
                  <Sparkles size={20} />
                  <span>Learn today.</span>
                  <strong>Grow tomorrow.</strong>
                </div>

                <div className="academy-dots" />
              </div>
            </div>
          </div>
        </section>

        <section
          className="about-section section-pad"
          id="about"
        >
          <div className="section-container about-grid">
            <div className="about-copy">
              <span className="section-kicker">
                WHY NEXTORA EXISTS
              </span>

              <h2>
                Your background
                <br />
                shouldn't limit
                <br />
                <span>your possibilities.</span>
              </h2>

              <p>
                Great opportunities can be difficult to find.
                Information is scattered across websites,
                social media pages and communities. NEXTORA
                aims to bring opportunity discovery and
                learning together in one accessible place.
              </p>

              <p>
                Whether you're a student, graduate, job seeker
                or aspiring entrepreneur, your next chapter
                deserves a starting point.
              </p>

              <div className="creator-attribution">
                <h3>
                  Created by Ayanfe Innovation Labs Limited
                </h3>

                <p>
                  NEXTORA is a platform created to help people
                  discover opportunities, develop valuable
                  skills, and take meaningful steps toward
                  their future.
                </p>

                <p>
                  We believe access to the right information
                  and learning resources can open doors to
                  new possibilities.
                </p>
              </div>

              <button
                className="dark-outline-button"
                onClick={() =>
                  notify(
                    "NEXTORA account registration is coming soon."
                  )
                }
              >
                Join NEXTORA <ArrowRight size={17} />
              </button>
            </div>

            <div className="about-features">
              <div className="about-feature">
                <span className="feature-number">01</span>

                <div>
                  <h3>Opportunity discovery</h3>
                  <p>
                    Find pathways for education, employment,
                    funding and personal growth.
                  </p>
                </div>

                <Globe2 size={22} />
              </div>

              <div className="about-feature">
                <span className="feature-number">02</span>

                <div>
                  <h3>Learning in one place</h3>
                  <p>
                    Build practical skills to prepare for
                    your next step.
                  </p>
                </div>

                <BookOpen size={22} />
              </div>

              <div className="about-feature">
                <span className="feature-number">03</span>

                <div>
                  <h3>Clearer next steps</h3>
                  <p>
                    Discover useful resources and check
                    official sources before applying.
                  </p>
                </div>

                <ShieldCheck size={22} />
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta-section">
          <div className="final-cta-container">
            <div className="final-cta-icon">
              <Heart size={25} />
            </div>

            <span className="section-kicker light-kicker">
              YOUR JOURNEY STARTS HERE
            </span>

            <h2>
              The next opportunity
              <br />
              could be <span>yours.</span>
            </h2>

            <p>
              Take the first step toward discovering new
              possibilities. Your future is worth investing
              in, one step at a time.
            </p>

            <button
              className="final-cta-button"
              onClick={() =>
                notify(
                  "NEXTORA account registration is coming soon."
                )
              }
            >
              Get started <ArrowUpRight size={18} />
            </button>

            <div className="final-cta-decoration decoration-one" />
            <div className="final-cta-decoration decoration-two" />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-container">
          <div className="footer-main">
            <div className="footer-brand-column">
              <button
                className="brand footer-brand"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
              >
                <span className="brand-symbol">
                  <ArrowUpRight
                    size={24}
                    strokeWidth={2.6}
                  />
                </span>

                <span className="brand-text">
                  NEXTORA
                  <small>WHERE OPPORTUNITIES BEGIN.</small>
                </span>
              </button>

              <p>
                Discover opportunities. Develop skills.
                <br />
                Build the future you imagine.
              </p>

              <span className="footer-location">
                <Globe2 size={15} />
                Built with ambition in Nigeria.
              </span>
            </div>

            <div className="footer-links-column">
              <h4>Explore</h4>

              <button onClick={() => scrollTo("categories")}>
                Categories
              </button>

              <button onClick={() => scrollTo("academy")}>
                NEXTORA Academy
              </button>
            </div>

            <div className="footer-links-column">
              <h4>NEXTORA</h4>

              <button onClick={() => scrollTo("about")}>
                About us
              </button>

              <button
                onClick={() =>
                  notify(
                    "Contact and support information will be added soon."
                  )
                }
              >
                Contact &amp; support
              </button>

              <button
                onClick={() =>
                  notify(
                    "Terms and privacy information will be published before launch."
                  )
                }
              >
                Terms &amp; privacy
              </button>
            </div>

            <div className="footer-newsletter">
              <h4>Stay in the loop</h4>

              <p>
                Keep an eye out for new opportunities and
                learning resources.
              </p>

              <button
                className="newsletter-button"
                onClick={() =>
                  notify(
                    "Newsletter signup will be available soon."
                  )
                }
              >
                <Mail size={17} />
                Get updates
                <ArrowRight size={16} />
              </button>

              <span className="newsletter-note">
                No promises of guaranteed funding or employment.
              </span>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} NEXTORA.
              Created by Ayanfe Innovation Labs Limited.
            </span>

            <span className="footer-tagline">
              Where Opportunities Begin.
            </span>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              Back to top <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </footer>

      {toast && (
        <div className="toast-message" role="status">
          <CheckCircle2 size={19} />
          <span>{toast}</span>

          <button
            onClick={() => setToast("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
