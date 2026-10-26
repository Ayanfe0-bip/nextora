import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  Heart,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wallet,
  X,
  BookOpen,
  Globe2,
  Lightbulb,
  Mail,
  MapPin,
  CalendarDays,
} from "lucide-react";

const categories = [
  {
    name: "Scholarships",
    description: "Fund your education",
    icon: GraduationCap,
    color: "blue",
    count: "Explore scholarships",
  },
  {
    name: "Jobs",
    description: "Start your career",
    icon: BriefcaseBusiness,
    color: "purple",
    count: "Explore job openings",
  },
  {
    name: "Grants",
    description: "Funding for your ideas",
    icon: Wallet,
    color: "orange",
    count: "Explore available grants",
  },
  {
    name: "Internships",
    description: "Gain real experience",
    icon: Users,
    color: "green",
    count: "Explore internships",
  },
  {
    name: "Training",
    description: "Learn valuable skills",
    icon: BookOpen,
    color: "pink",
    count: "Explore training",
  },
  {
    name: "Competitions",
    description: "Show what you can do",
    icon: Trophy,
    color: "yellow",
    count: "Explore competitions",
  },
];

const opportunities = [
  {
    id: 1,
    category: "Scholarships",
    title: "NNPC/SNEPCo National University Scholarship",
    organization: "NNPC Limited & SNEPCo",
    description:
      "An undergraduate scholarship opportunity for eligible Nigerian students.",
    location: "Nigeria",
    deadline: "30 Nov 2026",
    type: "Scholarship",
    badge: "Scholarship",
    color: "blue",
    url: "https://candidate.scholastica.ng/schemes/NNPCLTDSNEPCo26",
    featured: true,
  },
  {
    id: 2,
    category: "Jobs",
    title: "Explore Careers with UNICEF",
    organization: "UNICEF",
    description:
      "Explore professional opportunities supporting children and communities.",
    location: "Various locations",
    deadline: "Check official listing",
    type: "Career",
    badge: "Career",
    color: "purple",
    url: "https://jobs.unicef.org/",
    featured: true,
  },
  {
    id: 3,
    category: "Training",
    title: "Federal Digital Training Opportunities",
    organization: "Digital Skills & Training",
    description:
      "Discover digital skills programmes that can help you prepare for the modern workplace.",
    location: "Online / Nigeria",
    deadline: "Check official listing",
    type: "Training",
    badge: "Training",
    color: "green",
    url: "https://www.nitda.gov.ng/",
    featured: false,
  },
  {
    id: 4,
    category: "Grants",
    title: "SME Funding and Support Opportunities",
    organization: "SME Support Resources",
    description:
      "Find official information about funding and support programmes for small businesses.",
    location: "Nigeria",
    deadline: "Varies by programme",
    type: "Funding",
    badge: "Business",
    color: "orange",
    url: "https://www.smedan.gov.ng/",
    featured: false,
  },
  {
    id: 5,
    category: "Internships",
    title: "Discover UN Internship Opportunities",
    organization: "United Nations",
    description:
      "Explore internship listings and learn about eligibility requirements.",
    location: "Various locations",
    deadline: "Check official listing",
    type: "Internship",
    badge: "Internship",
    color: "pink",
    url: "https://careers.un.org/",
    featured: false,
  },
  {
    id: 6,
    category: "Competitions",
    title: "Innovation and Entrepreneurship Opportunities",
    organization: "Innovation Programmes",
    description:
      "Discover programmes and competitions for people building new ideas and solutions.",
    location: "Nigeria / Global",
    deadline: "Varies by programme",
    type: "Competition",
    badge: "Innovation",
    color: "yellow",
    url: "https://www.tonyelumelufoundation.org/",
    featured: false,
  },
];

const academyCourses = [
  {
    number: "01",
    title: "AI for Beginners",
    description:
      "Understand artificial intelligence and learn how to use AI tools productively.",
    level: "Beginner",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "Learn the foundations of websites, coding, and building digital products.",
    level: "Beginner friendly",
    icon: Globe2,
  },
  {
    number: "03",
    title: "Digital Skills for Work",
    description:
      "Build practical digital skills that can support your career and business.",
    level: "All levels",
    icon: Lightbulb,
  },
];

function App() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [showAll, setShowAll] = useState(false);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.nextoraToastTimer);
    window.nextoraToastTimer = window.setTimeout(() => setToast(""), 3000);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const toggleSave = (id) => {
    const alreadySaved = saved.includes(id);

    setSaved((previous) =>
      alreadySaved
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );

    notify(
      alreadySaved
        ? "Opportunity removed from your saved list."
        : "Opportunity saved on this device for this session."
    );
  };

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const query = searchText.trim().toLowerCase();

    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.organization.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const displayedOpportunities = showAll
    ? filteredOpportunities
    : filteredOpportunities.slice(0, 3);

  return (
    <div className="nextora-app">
      <div className="announcement">
        <div className="announcement-inner">
          <Sparkles size={15} />
          <span>
            Your next opportunity could change everything.
          </span>
          <button onClick={() => scrollTo("opportunities")}>
            Start exploring <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <header className="site-header">
        <div className="nav-container">
          <button
            className="brand"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

          <nav className={`main-nav ${mobileMenu ? "nav-open" : ""}`}>
            <button className="nav-link active" onClick={() => scrollTo("home")}>
              Home
            </button>
            <button
              className="nav-link"
              onClick={() => scrollTo("opportunities")}
            >
              Opportunities
            </button>
            <button
              className="nav-link"
              onClick={() => scrollTo("academy")}
            >
              Academy
            </button>
            <button className="nav-link" onClick={() => scrollTo("about")}>
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
              onClick={() => notify("Account registration is coming soon.")}
            >
              Sign in
            </button>
            <button
              className="nav-cta"
              onClick={() => scrollTo("opportunities")}
            >
              Get started <ArrowRight size={16} />
            </button>
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMobileMenu((open) => !open)}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
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
                Discover scholarships, jobs, grants and learning
                opportunities designed to help you move forward.
              </p>

              <form
                className="hero-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  scrollTo("opportunities");
                }}
              >
                <Search size={20} />
                <input
                  type="search"
                  placeholder="What opportunity are you looking for?"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  aria-label="Search opportunities"
                />
                <button type="submit">
                  Search <ArrowRight size={17} />
                </button>
              </form>

              <div className="popular-searches">
                <span>Popular:</span>
                {["Scholarships", "Remote jobs", "Grants"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSearchText(item === "Remote jobs" ? "Jobs" : item);
                      setActiveCategory(item === "Remote jobs" ? "Jobs" : item);
                      scrollTo("opportunities");
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="hero-trust">
                <div className="trust-icon">
                  <ShieldCheck size={18} />
                </div>
                <span>
                  Discover opportunities. Verify details. Apply with confidence.
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
                  <span className="caption-kicker">YOUR NEXT CHAPTER</span>
                  <strong>Make room for what’s possible.</strong>
                  <span>One opportunity can open many doors.</span>
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
                <ArrowUpRight size={17} className="floating-arrow" />
              </div>

              <div className="floating-card floating-card-bottom">
                <div className="floating-icon skill-icon">
                  <Sparkles size={21} />
                </div>
                <div>
                  <strong>Learn something new</strong>
                  <span>Grow with Nextora Academy</span>
                </div>
                <CheckCircle2 size={19} className="floating-check" />
              </div>

              <div className="hero-orbit orbit-one" />
              <div className="hero-orbit orbit-two" />
            </div>
          </div>

          <div className="hero-bottom">
            <div className="hero-bottom-inner">
              <span>OPPORTUNITIES FOR YOUR NEXT CHAPTER</span>
              <div>
                <span><GraduationCap size={17} /> Education</span>
                <span><BriefcaseBusiness size={17} /> Career</span>
                <span><Lightbulb size={17} /> Skills</span>
                <span><Wallet size={17} /> Funding</span>
              </div>
            </div>
          </div>
        </section>

        <section className="categories-section section-pad" id="categories">
          <div className="section-container">
            <div className="section-heading">
              <div>
                <span className="section-kicker">FIND YOUR PATH</span>
                <h2>
                  Opportunity looks
                  <br className="desktop-break" /> different for everyone.
                </h2>
              </div>
              <p>
                Whatever your next step looks like, there’s a place to start.
                Explore opportunities built around your ambitions.
              </p>
            </div>

            <div className="category-grid">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    className={`category-card category-${category.color}`}
                    key={category.name}
                    onClick={() => {
                      setActiveCategory(category.name);
                      setSearchText("");
                      setShowAll(true);
                      scrollTo("opportunities");
                    }}
                  >
                    <span className="category-icon">
                      <Icon size={25} strokeWidth={1.8} />
                    </span>
                    <span className="category-title">{category.name}</span>
                    <span className="category-description">
                      {category.description}
                    </span>
                    <span className="category-bottom">
                      <span>{category.count}</span>
                      <ArrowUpRight size={18} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="opportunities-section section-pad" id="opportunities">
          <div className="section-container">
            <div className="section-heading opportunities-heading">
              <div>
                <span className="section-kicker">YOUR NEXT MOVE</span>
                <h2>Explore opportunities.</h2>
                <p className="heading-subtitle">
                  A starting point for the things you want to achieve.
                </p>
              </div>
              <button
                className="text-link"
                onClick={() => {
                  setActiveCategory("All");
                  setSearchText("");
                  setShowAll(true);
                }}
              >
                Browse all <ArrowRight size={17} />
              </button>
            </div>

            <div className="filter-bar">
              <div className="filter-pills">
                {["All", ...categories.map((item) => item.name)].map(
                  (category) => (
                    <button
                      key={category}
                      className={`filter-pill ${
                        activeCategory === category ? "selected" : ""
                      }`}
                      onClick={() => {
                        setActiveCategory(category);
                        setShowAll(false);
                      }}
                    >
                      {category}
                    </button>
                  )
                )}
              </div>

              <div className="results-count">
                <span>{filteredOpportunities.length}</span> listings
              </div>
            </div>

            {displayedOpportunities.length > 0 ? (
              <div className="opportunity-grid">
                {displayedOpportunities.map((item) => (
                  <article className="opportunity-card" key={item.id}>
                    <div className="opportunity-card-top">
                      <span className={`listing-badge badge-${item.color}`}>
                        <span />
                        {item.badge}
                      </span>
                      <button
                        className={`save-button ${
                          saved.includes(item.id) ? "is-saved" : ""
                        }`}
                        onClick={() => toggleSave(item.id)}
                        aria-label={
                          saved.includes(item.id)
                            ? "Remove saved opportunity"
                            : "Save opportunity"
                        }
                      >
                        <Bookmark
                          size={19}
                          fill={saved.includes(item.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="organization-line">
                      <span className={`organization-mark mark-${item.color}`}>
                        {item.organization.charAt(0)}
                      </span>
                      <span>{item.organization}</span>
                    </div>

                    <h3>{item.title}</h3>
                    <p className="opportunity-description">
                      {item.description}
                    </p>

                    <div className="opportunity-meta">
                      <span><MapPin size={15} /> {item.location}</span>
                      <span><CalendarDays size={15} /> {item.deadline}</span>
                    </div>

                    <div className="opportunity-card-footer">
                      <span className="status-note">
                        <Clock3 size={14} />
                        Check official details
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="card-arrow"
                        aria-label={`View ${item.title}`}
                      >
                        <ArrowUpRight size={19} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
             <div className="empty-state">
                <Search size={30} />
                <h3>No matching opportunities yet</h3>
                <p>Try another search term or choose a different category.</p>
                <button
                  onClick={() => {
                    setSearchText("");
                    setActiveCategory("All");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}

            {filteredOpportunities.length > 3 && (
              <div className="center-action">
                <button
                  className="outline-button"
                  onClick={() => setShowAll((value) => !value)}
                >
                  {showAll ? "Show fewer opportunities" : "Explore more opportunities"}
                  {showAll ? <ChevronDown className="rotate-up" size={17} /> : <ArrowRight size={17} />}
                </button>
              </div>
            )}

            <div className="verification-note">
              <ShieldCheck size={20} />
              <div>
                <strong>A smart reminder before you apply</strong>
                <p>
                  Listings are discovery starting points, not guarantees.
                  Always confirm eligibility, deadlines and application
                  requirements on the official website. Never pay an
                  unofficial agent for a promised opportunity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="academy-section section-pad" id="academy">
          <div className="section-container">
            <div className="academy-panel">
              <div className="academy-content">
                <span className="section-kicker light-kicker">
                  MEET YOUR POTENTIAL
                </span>
                <h2>
                  Find opportunities.
                  <br />
                  <span>Build your skills.</span>
                  <br />
                  Become more.
                </h2>
                <p>
                  Nextora is more than a place to find opportunities. Nextora
                  Academy is designed to help you develop the practical skills
                  and confidence to pursue them.
                </p>
                <button
                  className="academy-button"
                  onClick={() => notify("Nextora Academy courses are coming soon.")}
                >
                  Explore the Academy <ArrowRight size={17} />
                </button>

                <div className="academy-benefits">
                  <span><CheckCircle2 size={16} /> Beginner-friendly learning</span>
                  <span><CheckCircle2 size={16} /> Practical digital skills</span>
                  <span><CheckCircle2 size={16} /> Learn at your own pace</span>
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

            <div className="courses-heading">
              <div>
                <span className="section-kicker">NEXTORA ACADEMY</span>
                <h2>Skills for the world ahead.</h2>
              </div>
              <button
                className="text-link"
                onClick={() => notify("The Academy learning experience is coming soon.")}
              >
                View learning paths <ArrowRight size={17} />
              </button>
            </div>

            <div className="course-grid">
              {academyCourses.map((course) => {
                const Icon = course.icon;

                return (
                  <button
                    className="course-card"
                    key={course.number}
                    onClick={() => notify(`${course.title} is planned for Nextora Academy.`)}
                  >
                    <div className="course-card-top">
                      <span className="course-number">{course.number}</span>
                      <span className="course-icon"><Icon size={23} /></span>
                    </div>
                    <span className="course-level">{course.level}</span>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <span className="course-link">
                      Explore course <ArrowRight size={16} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="section-container about-grid">
            <div className="about-copy">
              <span className="section-kicker">WHY NEXTORA EXISTS</span>
              <h2>
                Your background
                <br />
                shouldn't limit
                <br />
                <span>your possibilities.</span>
              </h2>
              <p>
                Great opportunities can be difficult to find. Information is
                scattered across websites, social media pages and communities.
                Nextora aims to bring discovery and learning together in one
                accessible place.
              </p>
              <p>
                Whether you're a student, graduate, job seeker or aspiring
                entrepreneur, your next chapter deserves a starting point.
              </p>
              <button className="dark-outline-button" onClick={() => scrollTo("categories")}>
                Discover your next step <ArrowRight size={17} />
              </button>
            </div>

            <div className="about-features">
              <div className="about-feature">
                <span className="feature-number">01</span>
                <div>
                  <h3>Opportunity discovery</h3>
                  <p>Find pathways for education, employment, funding and growth.</p>
                </div>
                <Search size={22} />
              </div>
              <div className="about-feature">
                <span className="feature-number">02</span>
                <div>
                  <h3>Learning in one place</h3>
                  <p>Build practical skills to help prepare for your next step.</p>
                </div>
                <BookOpen size={22} />
              </div>
              <div className="about-feature">
                <span className="feature-number">03</span>
                <div>
                  <h3>Clearer next steps</h3>
                  <p>Get directed to official sources to check details and apply.</p>
                </div>
                <ArrowUpRight size={22} />
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta-section">
          <div className="final-cta-container">
            <div className="final-cta-icon">
              <Heart size={25} />
            </div>
            <span className="section-kicker light-kicker">YOUR JOURNEY STARTS HERE</span>
            <h2>
              The next opportunity
              <br />
              could be <span>yours.</span>
            </h2>
            <p>
              Take a moment to explore what’s possible. Your future is worth
              investing in, one step at a time.
            </p>
            <button
              className="final-cta-button"
              onClick={() => scrollTo("opportunities")}
            >
              Find your opportunity <ArrowUpRight size={18} />
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
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="brand-symbol">
                  <ArrowUpRight size={24} strokeWidth={2.6} />
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
                <Globe2 size={15} /> Built with ambition in Nigeria.
              </span>
            </div>

            <div className="footer-links-column">
              <h4>Explore</h4>
              <button onClick={() => scrollTo("opportunities")}>Opportunities</button>
              <button onClick={() => scrollTo("categories")}>Categories</button>
              <button onClick={() => scrollTo("academy")}>Nextora Academy</button>
            </div>
            
               
