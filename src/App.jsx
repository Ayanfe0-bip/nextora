import { useState } from "react";
import {
ArrowDown,
ArrowRight,
ArrowUpRight,
BookOpen,
BriefcaseBusiness,
CheckCircle2,
ChevronDown,
GraduationCap,
Menu,
Search,
Sparkles,
Trophy,
Wallet,
X,
} from "lucide-react";

const categories = [
{ name: "Jobs", detail: "Find your next career move", icon: BriefcaseBusiness, color: "blue" },
{ name: "Scholarships", detail: "Explore education funding", icon: GraduationCap, color: "purple" },
{ name: "Grants", detail: "Discover funding opportunities", icon: Wallet, color: "orange" },
{ name: "Internships", detail: "Gain real-world experience", icon: Sparkles, color: "pink" },
{ name: "Training", detail: "Learn valuable new skills", icon: BookOpen, color: "cyan" },
{ name: "Competitions", detail: "Show what you can do", icon: Trophy, color: "yellow" },
];

const opportunities = [
{
id: 1,
type: "Scholarship",
title: "NNPC–SNEPCo National University Scholarship",
organisation: "NNPC Limited & SNEPCo",
location: "Nigeria",
deadline: "30 November 2026",
description: "Scholarship opportunity for eligible Nigerian undergraduates. Review the official requirements before applying.",
tags: ["Undergraduates", "Education"],
officialUrl: "https://candidate.scholastica.ng/schemes/NNPCLTDSNEPCo26",
category: "Scholarships",
status: "Check eligibility",
},
{
id: 2,
type: "Career",
title: "Explore UNICEF Career Opportunities",
organisation: "UNICEF",
location: "Nigeria",
deadline: "Varies by vacancy",
description: "Explore vacancies on UNICEF's official careers portal and confirm each role's location and deadline.",
tags: ["Career", "Various roles"],
officialUrl: "https://jobs.unicef.org/en-us/search/?location=nigeria&search-keyword=",
category: "Jobs",
status: "Check vacancies",
},
{
id: 3,
type: "Training",
title: "Federal Digital Training Academy",
organisation: "Digital Training Academy",
location: "Nigeria",
deadline: "Check official website",
description: "Visit the official portal to check available digital skills programmes and whether registration is open.",
tags: ["Digital skills", "Learning"],
officialUrl: "https://www.dta.education.gov.ng/",
category: "Training",
status: "Check availability",
},
];

const features = [
{
number: "01",
title: "Discover opportunities",
text: "Explore jobs, scholarships, grants and more in one organised place.",
},
{
number: "02",
title: "Build valuable skills",
text: "Learn practical digital skills through our growing learning academy.",
},
{
number: "03",
title: "Move forward confidently",
text: "Find official application links and clear information to plan your next step.",
},
];

function Brand({ onClick }) {
return (
<button className="brand" onClick={onClick} aria-label="Nextora home">
<span className="brand-symbol">
<ArrowUpRight size={23} strokeWidth={2.8} />
</span>
<span className="brand-name">nextora<span>.</span></span>
</button>
);
}

function SectionHeading({ eyebrow, title, description, action }) {
return (
<div className="section-heading">
<div>
<span className="eyebrow">{eyebrow}</span>
<h2>{title}</h2>
{description && <p>{description}</p>}
</div>
{action}
</div>
);
}

function App() {
const [search, setSearch] = useState("");
const [activeCategory, setActiveCategory] = useState("All");
const [mobileMenu, setMobileMenu] = useState(false);
const [saved, setSaved] = useState([]);
const [notice, setNotice] = useState("");

const visibleOpportunities = opportunities.filter((item) => {
const matchesCategory =
activeCategory === "All" || item.category === activeCategory;

const text = [
  item.title,
  item.organisation,
  item.description,
  item.category,
  ...item.tags,
]
  .join(" ")
  .toLowerCase();

return matchesCategory && text.includes(search.toLowerCase());

});

function showNotice(message) {
setNotice(message);
window.setTimeout(() => setNotice(""), 3000);
}

function goTo(id) {
setMobileMenu(false);
document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function toggleSaved(id) {
setSaved((current) =>
current.includes(id)
? current.filter((item) => item !== id)
: [...current, id]
);
showNotice(
saved.includes(id)
? "Opportunity removed from this session's saved list."
: "Opportunity saved for this session."
);
}

return (
<div className="app-shell">
<div className="announcement">
<span className="announcement-dot" />
Your next opportunity could change everything.
<button onClick={() => goTo("opportunities")}>
Explore opportunities <ArrowRight size={14} />
</button>
</div>

  <header className="site-header">
    <div className="container nav-container">
      <Brand onClick={() => goTo("home")} />

      <nav className={mobileMenu ? "nav-links nav-open" : "nav-links"}>
        <button onClick={() => goTo("home")}>Home</button>
        <button onClick={() => goTo("opportunities")}>
          Opportunities
        </button>
        <button onClick={() => goTo("academy")}>Academy</button>
        <button onClick={() => goTo("about")}>About</button>
        <button className="mobile-signin" onClick={() => showNotice("Account sign-in will be added in a future development step.")}>
          Sign in
        </button>
      </nav>

      <div className="nav-actions">
        <button
          className="signin-button"
          onClick={() =>
            showNotice("Account sign-in will be added in a future development step.")
          }
        >
          Sign in
        </button>
        <button
          className="get-started-button"
          onClick={() => goTo("opportunities")}
        >
          Get started <ArrowUpRight size={16} />
        </button>
      </div>

      <button
        className="menu-toggle"
        aria-label={mobileMenu ? "Close menu" : "Open menu"}
        onClick={() => setMobileMenu((open) => !open)}
      >
        {mobileMenu ? <X size={23} /> : <Menu size={23} />}
      </button>
    </div>
  </header>

  <main>
    <section className="hero" id="home">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-badge">
            <Sparkles size={15} />
            <span>Opportunities meet preparation</span>
          </div>

          <h1>
            Your next chapter
            <br />
            starts <span>right here.</span>
          </h1>

          <p className="hero-description">
            Discover opportunities. Develop skills. Build the future you
            deserve. Your journey to something greater starts with Nextora.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() => goTo("opportunities")}
            >
              Explore opportunities <ArrowRight size={17} />
            </button>
            <button
              className="secondary-button"
              onClick={() => goTo("academy")}
            >
              Discover the Academy <BookOpen size={17} />
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-icon">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <strong>Start with clarity</strong>
              <span>Official links. Clear next steps.</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-topline">
            <span className="live-indicator" />
            YOUR FUTURE, IN FOCUS
          </div>

          <div className="visual-card visual-card-main">
            <div className="visual-card-heading">
              <div>
                <span className="mini-label">YOUR NEXT MOVE</span>
                <h3>Make room for more.</h3>
              </div>
              <div className="visual-sparkle">
                <Sparkles size={20} />
              </div>
            </div>

            <div className="visual-progress">
              <div className="progress-label">
                <span>Your growth journey</span>
                <strong>Just beginning</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill" />
              </div>
              <span className="progress-caption">
                One discovery can open a new door.
              </span>
            </div>

            <div className="visual-opportunity">
              <div className="opportunity-icon blue-icon">
                <GraduationCap size={22} />
              </div>
              <div>
                <strong>Learn something new</strong>
                <span>Skills that move you forward</span>
              </div>
              <ArrowUpRight size={19} />
            </div>

            <div className="visual-opportunity">
              <div className="opportunity-icon purple-icon">
                <BriefcaseBusiness size={21} />
              </div>
              <div>
                <strong>Find your next step</strong>
                <span>Opportunities worth exploring</span>
              </div>
              <ArrowUpRight size={19} />
            </div>
          </div>

          <div className="floating-note floating-note-top">
            <span className="floating-note-icon">
              <Sparkles size={17} />
            </span>
            <div>
              <strong>Possibility starts here</strong>
              <span>Discover. Prepare. Progress.</span>
            </div>
          </div>

          <div className="floating-note floating-note-bottom">
            <span className="floating-check">
              <CheckCircle2 size={19} />
            </span>
            <div>
              <strong>Your next chapter</strong>
              <span>Begins with one step</span>
            </div>
          </div>

          <div className="visual-decoration decoration-one" />
          <div className="visual-decoration decoration-two" />
        </div>
      </div>

      <div className="container hero-bottom">
        <span>ONE PLATFORM. MORE POSSIBILITIES.</span>
        <button onClick={() => goTo("categories")}>
          Find your path <ArrowDown size={15} />
        </button>
      </div>
    </section>

    <section className="categories-section section-padding" id="categories">
      <div className="container">
        <SectionHeading
          eyebrow="A WORLD OF POSSIBILITIES"
          title="What are you looking for?"
          description="Start with what matters to you. We'll help you find where to look next."
        />

        <div className="category-grid">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                className="category-card"
                key={category.name}
                onClick={() => {
                  setActiveCategory(
                    category.name === "Scholarships" ||
                      category.name === "Grants" ||
                      category.name === "Jobs" ||
                      category.name === "Training"
                      ? category.name
                      : "All"
                  );
                  goTo("opportunities");
                }}
              >
                <span className={`category-icon ${category.color}`}>
                  <Icon size={23} />
                </span>
                <span className="category-name">{category.name}</span>
                <span className="category-detail">{category.detail}</span>
                <span className="category-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>

    <section className="opportunities-section section-padding" id="opportunities">
      <div className="container">
        <SectionHeading
          eyebrow="YOUR NEXT OPPORTUNITY"
          title="A good place to start."
          description="Explore official opportunity sources and check the requirements before applying."
          action={
            <span className="listing-count">
              {visibleOpportunities.length} featured sources
            </span>
          }
        />

        <div className="opportunity-toolbar">
          <div className="search-box">
            <Search size={19} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search opportunities..."
              aria-label="Search opportunities"
            />
            <span className="search-shortcut">Search</span>
          </div>

          <div className="filter-wrap">
            <label htmlFor="category-filter">Category</label>
            <div className="select-wrap">
              <select
                id="category-filter"
                value={activeCategory}
                onChange={(event) => setActiveCategory(event.target.value)}
              >
                <option value="All">All categories</option>
                <option value="Jobs">Jobs</option>
                <option value="Scholarships">Scholarships</option>
                <option value="Grants">Grants</option>
                <option value="Internships">Internships</option>
                <option value="Training">Training</option>
                <option value="Competitions">Competitions</option>
              </select>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        <div className="opportunity-grid">
          {visibleOpportunities.map((item) => (
            <article className="listing-card" key={item.id}>
              <div className="listing-card-top">
                <span className="listing-type">{item.type}</span>
                <button
                  className={saved.includes(item.id) ? "save-button is-saved" : "save-button"}
                  aria-label={
                    saved.includes(item.id)
                      ? "Remove saved opportunity"
                      : "Save opportunity"
                  }
                  onClick={() => toggleSaved(item.id)}
                >
                  {saved.includes(item.id) ? "Saved ✓" : "＋ Save"}
                </button>
              </div>

              <div className="organisation-name">{item.organisation}</div>
              <h3>{item.title}</h3>
              <p className="listing-description">{item.description}</p>

              <div className="listing-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="listing-deadline">
                <span>Deadline / status</span>
                <strong>{item.deadline}</strong>
              </div>

              <div className="listing-card-bottom">
                <span className="status-note">{item.status}</span>
                <a
                  href={item.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="listing-link"
                >
                  Official source <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {visibleOpportunities.length === 0 && (
          <div className="empty-state">
            <Search size={28} />
            <h3>No matching opportunities</h3>
            <p>Try another search or choose a different category.</p>
            <button
              className="secondary-button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="verification-notice">
          <span className="verification-icon">
            <CheckCircle2 size={20} />
          </span>
          <p>
            <strong>Always verify before applying.</strong> Listings link to
            official sources. Confirm the current deadline, eligibility,
            and application requirements on the provider's website.
            Nextora does not charge application fees.
          </p>
        </div>
      </div>
    </section>

    <section className="academy-section section-padding" id="academy">
      <div className="container academy-grid">
        <div className="academy-art">
          <div className="academy-art-glow" />
          <div className="academy-window">
            <div className="academy-window-bar">
              <span />
              <span />
              <span />
              <strong>nextora academy</strong>
            </div>

            <div className="academy-window-content">
              <div className="academy-welcome">YOUR LEARNING SPACE</div>
              <h3>Learn today.<br />Go further tomorrow.</h3>
              <p>Small steps. Practical skills. Bigger possibilities.</p>

              <div className="learning-path">
                <div className="learning-icon">
                  <Sparkles size={21} />
                </div>
                <div>
                  <strong>AI for Beginners</strong>
                  <span>Start with the fundamentals</span>
                </div>
                <ArrowUpRight size={18} />
              </div>

              <div className="learning-path">
                <div className="learning-icon learning-icon-purple">
                  <BookOpen size={21} />
                </div>
                <div>
                  <strong>Web Development</strong>
                  <span>Build your digital foundation</span>
                </div>
                <ArrowUpRight size={18} />
              </div>

              <div className="learning-path">
                <div className="learning-icon learning-icon-orange">
                  <Wallet size={21} />
                </div>
                <div>
                  <strong>Digital Skills for Business</strong>
                  <span>Put skills into practice</span>
                </div>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>

          <div className="academy-floating">
            <GraduationCap size={22} />
            <div>
              <strong>Keep growing</strong>
              <span>Your journey, your pace</span>
            </div>
          </div>
        </div>

        <div className="academy-copy">
          <span className="eyebrow">INTRODUCING NEXTORA ACADEMY</span>
          <h2>
            Don't just find
            <br />
            opportunities.
            <br />
            <span>Get ready for them.</span>
          </h2>
          <p>
            Opportunities are powerful. The right skills help you make the
            most of them. Nextora Academy is designed to help you learn,
            build confidence, and prepare for your next big step.
          </p>

          <div className="academy-benefits">
            <div>
              <CheckCircle2 size={19} />
              <span>Beginner-friendly learning paths</span>
            </div>
            <div>
              <CheckCircle2 size={19} />
              <span>Practical digital and AI skills</span>
            </div>
            <div>
              <CheckCircle2 size={19} />
              <span>Learn at your own pace</span>
            </div>
          </div>

          <button
            className="primary-button"
            onClick={() =>
              showNotice("Academy courses and lessons will be developed in the next phase.")
            }
          >
            Explore the Academy <ArrowRight size={17} />
          </button>

          <span className="academy-note">
            Course enrolment and progress tracking are coming in a future phase.
          </span>
        </div>
      </div>
    </section>

   <div className="journey-section section-padding" id="about">
      <div className="container">
        <div className="journey-intro">
          <span className="eyebrow">THE NEXTORA APPROACH</span>
          <h2>
            Your ambition deserves
            <br />
            <span>a clear path.</span>
          </h2>
          <p>
            Finding an opportunity is one thing. Knowing what to do next
            is another. We're building a platform that brings discovery
            and preparation closer together.
          </p>
        </div>

        <div className="journey-grid">
          {features.map((feature) => (
            <article className="journey-card" key={feature.number}>
              <span className="journey-number">{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <span className="journey-card-arrow">
                <ArrowUpRight size={19} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <div className="cta-decoration cta-decoration-one" />
          <div className="cta-decoration cta-decoration-two" />

          <div className="cta-content">
            <span className="cta-eyebrow">
              <Sparkles size={15} /> YOUR FUTURE IS WORTH EXPLORING
            </span>
            <h2>
              Ready to discover
              <br />
              what's next?
            </h2>
            <p>
              Take the first step. Find an opportunity, learn a skill, and
              give your next chapter room to begin.
            </p>
            <button
              className="cta-button"
              onClick={() => goTo("opportunities")}
            >
              Start exploring <ArrowRight size={17} />
            </button>
          </div>
          <div className="cta-symbol">
            <ArrowUpRight size={78} strokeWidth={1.2} />
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer className="site-footer">
    <div className="container footer-main">
      <div className="footer-brand-column">
        <Brand onClick={() => goTo("home")} />
        <p>
          Where opportunities begin. Discover possibilities, develop
          skills, and take your next step with confidence.
        </p>
      </div>

      <div className="footer-column">
        <h4>Explore</h4>
        <button onClick={() => goTo("opportunities")}>Opportunities</button>
        <button onClick={() => goTo("categories")}>Categories</button>
        <button onClick={() => goTo("academy")}>Nextora Academy</button>
      </div>

      <div className="footer-column">
        <h4>About</h4>
        <button onClick={() => goTo("about")}>Our mission</button>
        <button onClick={() => showNotice("Contact information will be added before launch.")}>
          Contact us
        </button>
        <button onClick={() => showNotice("Our opportunity review policy will be published before launch.")}>
          How we review listings
        </button>
      </div>

      <div className="footer-column footer-help">
        <h4>Our promise</h4>
        <div><CheckCircle2 size={16} /> Official source links</div>
        <div><CheckCircle2 size={16} /> Clear information</div>
        <div><CheckCircle2 size={16} /> No application fees charged by Nextora</div>
      </div>
    </div>

    <div className="container footer-bottom">
      <span>© {new Date().getFullYear()} NEXTORA. All rights reserved.</span>
      <span>Where Opportunities Begin.</span>
    </div>
  </footer>

  {notice && (
    <div className="toast-message" role="status">
      <CheckCircle2 size={19} />
      <span>{notice}</span>
      <button onClick={() => setNotice("")} aria-label="Dismiss notification">
        <X size={17} />
      </button>
    </div>
  )}
</div>
); }
export default App;
