import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  GraduationCap,
  HeartPulse,
  Leaf,
  Lightbulb,
  Search,
  Sparkles,
  Video,
  Brain,
  Globe,
  Trophy,
  Clock3,
  PlayCircle,
} from "lucide-react";

const departments = [
  {
    title: "AI Fundamentals",
    description: "Understand AI, use AI assistants, and master better prompts.",
    icon: Bot,
    color: "#e9edff",
    ink: "#4057c7",
    level: "Beginner friendly",
  },
  {
    title: "AI Image Creation",
    description: "Create realistic images, portraits, posters, and product visuals.",
    icon: Sparkles,
    color: "#fff0e7",
    ink: "#bd602c",
    level: "Creative studio",
  },
  {
    title: "AI Video & Cartoons",
    description: "Create AI videos, animated characters, and cartoon stories.",
    icon: Video,
    color: "#f1eaff",
    ink: "#7950bd",
    level: "Step-by-step guides",
  },
  {
    title: "Website & App Development",
    description: "Use AI to plan, build, test, and launch digital products.",
    icon: Code2,
    color: "#e3f7f0",
    ink: "#187d61",
    level: "Hands-on projects",
  },
  {
    title: "AI for Business & Careers",
    description: "Improve marketing, CVs, research, productivity, and business.",
    icon: BriefcaseBusiness,
    color: "#fff5d9",
    ink: "#8b6814",
    level: "Practical skills",
  },
  {
    title: "Mental Wellness",
    description: "Understand stress, anxiety, coping skills, and when to seek help.",
    icon: Brain,
    color: "#ffe9ef",
    ink: "#b44367",
    level: "Supportive education",
  },
  {
    title: "Health Education",
    description: "Learn about chronic conditions, prevention, and safer management.",
    icon: HeartPulse,
    color: "#ffe9e5",
    ink: "#b4473d",
    level: "Health knowledge",
  },
  {
    title: "Yoruba Herbal Knowledge",
    description: "Explore traditional plant knowledge, scientific evidence, and safety.",
    icon: Leaf,
    color: "#eaf4e2",
    ink: "#477b35",
    level: "Culture and science",
  },
  {
    title: "Digital Skills",
    description: "Build confidence with online tools, privacy, and digital work.",
    icon: Globe,
    color: "#e4f3fb",
    ink: "#2b7398",
    level: "Everyday technology",
  },
  {
    title: "Projects & Certificates",
    description: "Practise your skills, complete projects, and track achievements.",
    icon: Trophy,
    color: "#f7eafa",
    ink: "#8b4a9b",
    level: "Learn by doing",
  },
];

const lessons = [
  {
    title: "What Is Generative AI?",
    duration: "6 minutes",
    content:
      "Generative AI is technology that can create new content, including text, images, audio, and video, based on patterns learned from examples. It can help with learning, creativity, and work, but it can also make mistakes. Always verify important information.",
    exercise:
      "Ask an AI assistant to explain a topic you already understand. Compare its answer with what you know. Can you identify anything missing or incorrect?",
  },
  {
    title: "How to Write a Better Prompt",
    duration: "8 minutes",
    content:
      "A prompt is the instruction you give an AI tool. Good prompts explain your goal, provide useful context, describe the desired format, and include important constraints.",
    example:
      "Explain photosynthesis to a JSS1 student in Nigeria. Use simple English, five numbered steps, and one everyday example. Finish with three revision questions.",
    exercise:
      "Choose a topic and write a prompt that specifies the audience, task, format, and level of detail. Review the result and improve your prompt.",
  },
  {
    title: "Improve Your Results Step by Step",
    duration: "10 minutes",
    content:
      "You do not need a perfect prompt on your first attempt. Begin with a clear instruction, inspect the result, identify what needs improvement, and ask for a specific revision.",
    example:
      "First request: Write a short business advertisement. Follow-up: Make it friendlier, keep it under 60 words, and include a clear call to action.",
    exercise:
      "Ask an AI tool to produce something useful. Identify one weakness in its response and write a follow-up instruction to improve it.",
  },
];

const buttonBase = {
  border: 0,
  borderRadius: 12,
  padding: "12px 16px",
  fontWeight: 800,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  cursor: "pointer",
};

export default function AcademyPage({ onBack }) {
  const [query, setQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [courseOpen, setCourseOpen] = useState(false);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) =>
      `${department.title} ${department.description}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [query]);

  const pageStyle = {
    minHeight: "100vh",
    background: "#f7f9fd",
    color: "#182746",
    fontFamily: "inherit",
  };

  const openCourse = () => {
    setCourseOpen(true);
    setLessonIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (courseOpen) {
    const lesson = lessons[lessonIndex];
    const isCompleted = completedLessons.includes(lessonIndex);

    return (
      <div style={pageStyle}>
        <header className="na-header">
          <button
            style={{
              ...buttonBase,
              background: "#edf1ff",
              color: "#304bc4",
            }}
            onClick={() => setCourseOpen(false)}
          >
            <ArrowLeft size={17} /> All Academy courses
          </button>

          <strong>
            NEXTORA <span style={{ color: "#5268d8" }}>ACADEMY</span>
          </strong>
        </header>

        <main className="na-course">
          <span className="na-kicker">
            FREE BEGINNER COURSE · LESSON {lessonIndex + 1} OF{" "}
            {lessons.length}
          </span>

          <h1>AI & Prompting: Your First Steps</h1>

          <p className="na-muted">
            Learn the basics of using AI thoughtfully, one step at a time.
          </p>

          <div className="na-progress">
            <div
              style={{
                width: `${
                  (completedLessons.length / lessons.length) * 100
                }%`,
              }}
            />
          </div>

          <div className="na-learning-grid">
            <article className="na-lesson-card">
              <div className="na-muted na-duration">
                <Clock3 size={16} /> {lesson.duration}
              </div>

              <h2>{lesson.title}</h2>

              <p className="na-lesson-text">{lesson.content}</p>

              {lesson.example && (
                <div className="na-example">
                  <strong>Example to practise</strong>
                  <p>{lesson.example}</p>
                </div>
              )}

              <div className="na-exercise">
                <strong>
                  <Lightbulb size={18} /> Your practical exercise
                </strong>
                <p>{lesson.exercise}</p>
              </div>

              <div className="na-course-actions">
                <button
                  style={{
                    ...buttonBase,
                    background: "#f0f2f8",
                    color: "#42516d",
                  }}
                  disabled={lessonIndex === 0}
                  onClick={() =>
                    setLessonIndex((index) => Math.max(0, index - 1))
                  }
                >
                  Previous
                </button>

                <button
                  style={{
                    ...buttonBase,
                    background: isCompleted ? "#e1f5e9" : "#304bc4",
                    color: isCompleted ? "#216b45" : "#fff",
                  }}
                  onClick={() =>
                    setCompletedLessons((previous) =>
                      isCompleted
                        ? previous.filter((index) => index !== lessonIndex)
                        : [...previous, lessonIndex]
                    )
                  }
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 size={17} /> Completed
                    </>
                  ) : (
                    "Mark complete"
                  )}
                </button>

                <button
                  style={{
                    ...buttonBase,
                    background: "#304bc4",
                    color: "#fff",
                  }}
                  disabled={lessonIndex === lessons.length - 1}
                  onClick={() =>
                    setLessonIndex((index) =>
                      Math.min(lessons.length - 1, index + 1)
                    )
                  }
                >
                  Next lesson <ArrowRight size={16} />
                </button>
              </div>
            </article>

            <aside className="na-outline">
              <h3>Course lessons</h3>

              {lessons.map((item, index) => (
                <button
                  key={item.title}
                  className={`na-outline-item ${
                    index === lessonIndex ? "active" : ""
                  }`}
                  onClick={() => setLessonIndex(index)}
                >
                  {completedLessons.includes(index) ? (
                    <CheckCircle2 size={18} color="#218653" />
                  ) : (
                    <PlayCircle size={18} />
                  )}

                  <span>
                    <strong>
                      {index + 1}. {item.title}
                    </strong>
                    <small>{item.duration}</small>
                  </span>
                </button>
              ))}

              <p className="na-small-note">
                Progress currently lasts for this page session only. We will
                connect it to your NEXTORA account in a later step.
              </p>
            </aside>
          </div>
        </main>

        <AcademyStyles />
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <header className="na-header na-sticky">
        <button
          onClick={onBack}
          style={{
            ...buttonBase,
            background: "transparent",
            color: "#304bc4",
            padding: 0,
          }}
        >
          <ArrowLeft size={18} /> Back to NEXTORA
        </button>

        <div className="na-brand">
          <span className="na-brand-icon">
            <GraduationCap size={23} />
          </span>

          <span>
            NEXTORA <span style={{ color: "#5268d8" }}>ACADEMY</span>
            <small>LEARN. CREATE. GROW.</small>
          </span>
        </div>

        <button
          onClick={() =>
            document
              .getElementById("academy-departments")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          style={{
            ...buttonBase,
            background: "#304bc4",
            color: "#fff",
          }}
        >
          Explore courses <ArrowRight size={16} />
        </button>
      </header>

      <main>
        <section className="na-hero">
          <div className="na-hero-inner">
            <div>
              <span className="na-hero-label">
                <Sparkles size={15} /> PRACTICAL LEARNING FOR EVERYONE
              </span>

              <h1>
                Learn something powerful.
                <br />
                <span>Build what comes next.</span>
              </h1>

              <p className="na-hero-description">
                Explore AI, create images and videos, build websites and apps,
                develop digital skills, and learn practical ways to solve
                real-world problems — one clear step at a time.
              </p>

              <div className="na-hero-actions">
                <button
                  style={{
                    ...buttonBase,
                    background: "#fff",
                    color: "#263f88",
                  }}
                  onClick={openCourse}
                >
                  <BookOpen size={18} /> Start free beginner course
                </button>

                <button
                  style={{
                    ...buttonBase,
                    background: "#ffffff18",
                    color: "#fff",
                    border: "1px solid #ffffff55",
                  }}
                  onClick={() =>
                    document
                      .getElementById("academy-departments")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Browse departments <ArrowRight size={16} />
                </button>
              </div>

              <div className="na-trust-row">
                <span>
                  <CheckCircle2 size={16} /> Beginner friendly
                </span>
                <span>
                  <CheckCircle2 size={16} /> Free-first resources
                </span>
                <span>
                  <CheckCircle2 size={16} /> Learn at your own pace
                </span>
              </div>
            </div>

            <div className="na-hero-panel">
              <div className="na-mini-grid">
                <div>
                  <Bot size={25} />
                  <strong>AI skills</strong>
                  <span>From prompts to projects</span>
                </div>

                <div>
                  <Video size={25} />
                  <strong>Creative studio</strong>
                  <span>Images, video & cartoons</span>
                </div>

                <div>
                  <Code2 size={25} />
                  <strong>Build digitally</strong>
                  <span>Websites and applications</span>
                </div>

                <div>
                  <HeartPulse size={25} />
                  <strong>Real-life learning</strong>
                  <span>Wellness and health education</span>
                </div>
              </div>

              <p>
                <Lightbulb size={17} /> Start with curiosity. Finish with a
                practical skill.
              </p>
            </div>
          </div>
        </section>

        <section id="academy-departments" className="na-departments">
          <div className="na-section-heading">
            <div>
              <span className="na-kicker">EXPLORE YOUR PATH</span>
              <h2>One academy. Many ways to grow.</h2>
              <p>
                Choose a department to explore. New courses will be added
                gradually, with clear instructions and hands-on practice.
              </p>
            </div>

            <label className="na-search">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search departments..."
                aria-label="Search Academy departments"
              />
            </label>
          </div>

          <div className="na-department-grid">
            {filteredDepartments.map((department) => {
              const Icon = department.icon;
              const isSelected = selectedDepartment === department.title;

              return (
                <button
                  key={department.title}
                  className={`na-department-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDepartment(department.title)}
                >
                  <span
                    className="na-department-icon"
                    style={{
                      background: department.color,
                      color: department.ink,
                    }}
                  >
                    <Icon size={25} />
                  </span>

                  <span
                    className="na-department-level"
                    style={{ color: department.ink }}
                  >
                    {department.level.toUpperCase()}
                  </span>

                  <strong>{department.title}</strong>

                  <span className="na-department-description">
                    {department.description}
                  </span>

                  <span className="na-card-link">
                    Explore department <ArrowRight size={16} />
                  </span>
                </button>
              );
            })}
          </div>

          {filteredDepartments.length === 0 && (
            <div className="na-empty">
              <Search size={25} />
              <h3>No matching departments</h3>
              <p>Try another search term.</p>
            </div>
          )}

          {selectedDepartment && (
            <div className="na-selected-panel">
              <div>
                <strong>{selectedDepartment}</strong>
                <p>
                  This department is part of the NEXTORA Academy learning
                  roadmap. Courses will be added gradually. You can explore our
                  first AI basics course now.
                </p>
              </div>

              <button
                style={{
                  ...buttonBase,
                  background: "#304bc4",
                  color: "#fff",
                }}
                onClick={openCourse}
              >
                Try the first course <ArrowRight size={16} />
              </button>
            </div>
          )}
        </section>

        <section className="na-featured">
          <div className="na-featured-inner">
            <div className="na-featured-course">
              <span className="na-kicker">COURSE 001 · BEGINNER</span>

              <h2>AI & Prompting: Your First Steps</h2>

              <p>
                Learn what generative AI is, practise writing clear prompts,
                and improve results step by step. No coding experience or paid
                AI API is required.
              </p>

              <div className="na-course-facts">
                <span>
                  <BookOpen size={16} /> 3 lessons
                </span>
                <span>
                  <Clock3 size={16} /> About 24 minutes
                </span>
              </div>

              <button
                style={{
                  ...buttonBase,
                  background: "#304bc4",
                  color: "#fff",
                }}
                onClick={openCourse}
              >
                Open free course <ArrowRight size={16} />
              </button>
            </div>

            <div className="na-learning-promise">
              <h3>Our learning promise</h3>

              {[
                "Plain-language explanations",
                "Practical examples and prompts",
                "Small exercises to try yourself",
                "Free-first tools where possible",
              ].map((item) => (
                <p key={item}>
                  <CheckCircle2 size={17} /> {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="na-safety">
          <div>
            <strong>Learning responsibly</strong>
            <p>
              Health, mental wellness, and traditional plant knowledge courses
              will be educational and safety-first. They will not replace
              qualified medical care or claim that unverified remedies cure
              diseases.
            </p>
          </div>
        </section>
      </main>

      <footer className="na-footer">
        <span>
          © {new Date().getFullYear()} NEXTORA ACADEMY · Ayanfe Innovation Labs
          Limited
        </span>

        <button onClick={onBack}>
          Return to NEXTORA <ArrowLeft size={15} />
        </button>
      </footer>

      <AcademyStyles />
    </div>
  );
}

function AcademyStyles() {
  return (
    <style>{`
      .na-header {
        min-height: 76px;
        padding: 16px max(20px, calc((100% - 1160px) / 2));
        background: #fff;
        border-bottom: 1px solid #e7ebf3;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
      }

      .na-sticky {
        position: sticky;
        top: 0;
        z-index: 20;
      }

      .na-brand {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 900;
        letter-spacing: -.4px;
      }

      .na-brand-icon {
        width: 42px;
        height: 42px;
        border-radius: 13px;
        background: #e9edff;
        color: #4057c7;
        display: grid;
        place-items: center;
      }

      .na-brand small {
        display: block;
        font-size: 9px;
        letter-spacing: 1.3px;
        color: #78839a;
        margin-top: 4px;
      }

      .na-hero {
        background: linear-gradient(120deg, #172c52, #304b91 58%, #667be0);
        color: #fff;
        padding: clamp(52px, 8vw, 96px) 22px;
      }

      .na-hero-inner {
        width: min(1160px, 100%);
        margin: auto;
        display: grid;
        grid-template-columns: minmax(0, 1.15fr) minmax(280px, .85fr);
        align-items: center;
        gap: 36px;
      }

      .na-hero-label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid #ffffff40;
        background: #ffffff12;
        border-radius: 30px;
        padding: 9px 13px;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 1.1px;
      }

      .na-hero h1 {
        font-size: clamp(37px, 5.5vw, 66px);
        line-height: 1.08;
        letter-spacing: -2.5px;
        margin: 24px 0 18px;
      }

      .na-hero h1 span {
        color: #cdd7ff;
      }

      .na-hero-description {
        max-width: 640px;
        color: #e0e7ff;
        line-height: 1.85;
        font-size: 16px;
      }

      .na-hero-actions,
      .na-trust-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      .na-hero-actions {
        margin-top: 26px;
      }

      .na-trust-row {
        margin-top: 25px;
        gap: 18px;
        color: #e0e7ff;
        font-size: 12px;
      }

      .na-trust-row span,
      .na-course-facts span {
        display: inline-flex;
        align-items: center;
        gap: 7px;
      }

      .na-hero-panel {
        border: 1px solid #ffffff30;
        background: #ffffff12;
        border-radius: 26px;
        padding: 20px;
      }

      .na-mini-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .na-mini-grid > div {
        background: #ffffff12;
        border-radius: 17px;
        padding: 16px;
        min-height: 132px;
      }

      .na-mini-grid strong,
      .na-mini-grid span {
        display: block;
      }

      .na-mini-grid strong {
        margin-top: 17px;
        font-size: 14px;
      }

      .na-mini-grid span {
        margin-top: 6px;
        color: #e0e7ff;
        font-size: 12px;
        line-height: 1.5;
      }

      .na-hero-panel > p {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #e0e7ff;
        font-size: 13px;
        margin: 18px 4px 3px;
      }

      .na-departments {
        width: min(1160px, calc(100% - 40px));
        margin: auto;
        padding: 72px 0;
        scroll-margin-top: 100px;
      }

      .na-section-heading {
        display: flex;
        justify-content: space-between;
        align-items: end;
        gap: 24px;
        flex-wrap: wrap;
        margin-bottom: 28px;
      }

      .na-kicker {
        color: #5268d8;
        font-weight: 900;
        letter-spacing: 1.5px;
        font-size: 11px;
      }

      .na-section-heading h2 {
        font-size: clamp(29px, 4vw, 44px);
        letter-spacing: -1.4px;
        margin: 10px 0;
      }

      .na-section-heading p {
        max-width: 650px;
        color: #718099;
        line-height: 1.8;
        margin-bottom: 0;
      }

      .na-search {
        min-width: min(100%, 260px);
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        background: #fff;
        border: 1px solid #dfe5f0;
        border-radius: 12px;
        color: #8792a7;
      }

      .na-search input {
        width: 100%;
        min-width: 0;
        border: 0;
        outline: 0;
        background: transparent;
        color: #182746;
      }

      .na-department-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 235px), 1fr));
        gap: 16px;
      }

      .na-department-card {
        text-align: left;
        border: 1px solid #e5eaf3;
        background: #fff;
        border-radius: 20px;
        padding: 22px;
        box-shadow: 0 8px 24px #18274608;
        cursor: pointer;
        transition: transform .18s, box-shadow .18s, border-color .18s;
      }

      .na-department-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 30px #18274612;
      }

      .na-department-card.selected {
        border-color: #5268d8;
        background: #f3f5ff;
      }

      .na-department-icon {
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        border-radius: 15px;
      }

      .na-department-level {
        display: block;
        margin-top: 18px;
        font-size: 10px;
        font-weight: 900;
        letter-spacing: .8px;
      }

      .na-department-card > strong {
        display: block;
        font-size: 17px;
        margin-top: 8px;
      }

      .na-department-description {
        display: block;
        color: #718099;
        font-size: 13px;
        line-height: 1.75;
        margin-top: 9px;
      }

      .na-card-link {
        display: flex;
        align-items: center;
        gap: 7px;
        margin-top: 18px;
        color: #5268d8;
        font-size: 12px;
        font-weight: 800;
      }

      .na-selected-panel {
        margin-top: 22px;
        background: #fff;
        border: 1px solid #e5eaf3;
        border-radius: 20px;
        padding: 22px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 18px;
      }

      .na-selected-panel strong {
        font-size: 19px;
      }

      .na-selected-panel p {
        max-width: 700px;
        color: #718099;
        line-height: 1.7;
        margin-bottom: 0;
      }

      .na-empty {
        text-align: center;
        padding: 45px 15px;
        color: #718099;
      }

      .na-featured {
        background: #fff;
        border-block: 1px solid #e7ebf3;
        padding: 58px 20px;
      }

      .na-featured-inner {
        width: min(1160px, 100%);
        margin: auto;
        display: grid;
        grid-template-columns: minmax(0, 1.3fr) minmax(260px, .7fr);
        gap: 22px;
      }

      .na-featured-course,
      .na-learning-promise {
        border-radius: 22px;
        padding: 28px;
      }

      .na-featured-course {
        background: #f2f5ff;
      }

      .na-featured-course h2 {
        font-size: clamp(23px, 3vw, 32px);
        margin: 13px 0;
      }

      .na-featured-course > p {
        color: #65728b;
        line-height: 1.85;
      }

      .na-course-facts {
        display: flex;
        flex-wrap: wrap;
        gap: 17px;
        margin: 18px 0;
        color: #65728b;
        font-size: 13px;
      }

      .na-learning-promise {
        border: 1px solid #e5eaf3;
      }

      .na-learning-promise h3 {
        margin-top: 0;
      }

      .na-learning-promise p {
        display: flex;
        align-items: flex-start;
        gap: 9px;
        color: #56647d;
        line-height: 1.6;
      }

      .na-learning-promise p svg {
        color: #29966a;
        flex-shrink: 0;
        margin-top: 3px;
      }

      .na-safety {
        width: min(1160px, calc(100% - 40px));
        margin: auto;
        padding: 38px 0;
      }

      .na-safety > div {
        background: #fff7e8;
        border: 1px solid #f3e4c7;
        border-radius: 18px;
        padding: 20px;
        color: #785c25;
        line-height: 1.8;
        font-size: 13px;
      }

      .na-safety p {
        margin-bottom: 0;
      }

      .na-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
        padding: 24px max(20px, calc((100% - 1160px) / 2));
        border-top: 1px solid #e7ebf3;
        background: #fff;
        color: #78839a;
        font-size: 12px;
      }

      .na-footer button {
        border: 0;
        background: transparent;
        color: #304bc4;
        font-weight: 800;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
      }

      .na-course {
        width: min(1000px, calc(100% - 32px));
        margin: 42px auto 70px;
      }

      .na-course > h1 {
        font-size: clamp(30px, 5vw, 48px);
        letter-spacing: -1.5px;
        margin: 14px 0;
      }

      .na-muted {
        color: #697791;
        line-height: 1.8;
      }

      .na-progress {
        height: 7px;
        border-radius: 20px;
        background: #e5e9f3;
        margin: 24px 0 30px;
        overflow: hidden;
      }

      .na-progress > div {
        height: 100%;
        background: #5268d8;
        transition: width .2s;
      }

      .na-learning-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.6fr) minmax(230px, .8fr);
        gap: 22px;
        align-items: start;
      }

      .na-lesson-card,
      .na-outline {
        background: #fff;
        border: 1px solid #e7ebf3;
        border-radius: 22px;
        padding: clamp(20px, 4vw, 34px);
        box-shadow: 0 12px 32px #18274608;
      }

      .na-duration {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
      }

      .na-lesson-card h2 {
        font-size: 27px;
        margin: 20px 0 12px;
      }

      .na-lesson-text,
      .na-example p,
      .na-exercise p {
        color: #4e5d76;
        line-height: 1.9;
      }

      .na-example,
      .na-exercise {
        padding: 18px;
        border-radius: 14px;
        margin-top: 18px;
      }

      .na-example {
        background: #f3f5ff;
      }

      .na-exercise {
        background: #eef8f2;
      }

      .na-exercise > strong {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #216b45;
      }

      .na-example p,
      .na-exercise p {
        margin-bottom: 0;
      }

      .na-course-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 10px;
        margin-top: 28px;
      }

      .na-outline {
        padding: 20px;
      }

      .na-outline h3 {
        margin-top: 0;
      }

      .na-outline-item {
        width: 100%;
        text-align: left;
        padding: 12px 9px;
        margin-bottom: 7px;
        border-radius: 12px;
        border: 1px solid transparent;
        background: #fff;
        display: flex;
        align-items: flex-start;
        gap: 9px;
        cursor: pointer;
      }

      .na-outline-item.active {
        border-color: #aebcff;
        background: #f0f3ff;
      }

      .na-outline-item > svg {
        flex-shrink: 0;
        margin-top: 2px;
      }

      .na-outline-item strong,
      .na-outline-item small {
        display: block;
      }

      .na-outline-item strong {
        font-size: 12px;
        line-height: 1.5;
      }

      .na-outline-item small {
        color: #77839a;
        margin-top: 5px;
      }

      .na-small-note {
        color: #78839a;
        font-size: 11px;
        line-height: 1.7;
        margin-bottom: 0;
      }

      button:disabled {
        opacity: .45;
        cursor: not-allowed;
      }

      @media (max-width: 760px) {
        .na-hero-inner,
        .na-featured-inner,
        .na-learning-grid {
          grid-template-columns: 1fr;
        }

        .na-header {
          gap: 12px;
          flex-wrap: wrap;
        }

        .na-header > strong {
          font-size: 13px;
        }

        .na-brand {
          font-size: 13px;
        }

        .na-hero h1 {
          letter-spacing: -1.6px;
        }

        .na-mini-grid {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 430px) {
        .na-header {
          padding: 14px;
        }

        .na-header button {
          font-size: 11px;
          padding: 10px;
        }

        .na-brand small {
          font-size: 8px;
        }

        .na-course-actions > button {
          flex: 1 1 auto;
        }
      }
    `}</style>
  );
}
