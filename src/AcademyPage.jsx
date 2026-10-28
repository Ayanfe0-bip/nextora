import React, { useMemo, useState } from "react";
import AcademyPdfLibrary from "./AcademyPdfLibrary";
import AcademyContentExport from "./AcademyContentExport";
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
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  LockKeyhole,
  Menu,
  X,
  RotateCcw,
  Target,
  Award,
  ShieldCheck,
} from "lucide-react";

/* =========================================================
   NEXTORA ACADEMY
   PART 1: DESIGN, DEPARTMENTS AND COURSE CONTENT
   ========================================================= */

const departments = [
  {
    id: "ai-fundamentals",
    code: "NAC-AIF",
    title: "AI Fundamentals",
    description:
      "Understand artificial intelligence, AI assistants, prompting, research and responsible AI use.",
    icon: Bot,
    color: "#9B8AFB",
    level: "Beginner to Advanced",
  },
  {
    id: "ai-image",
    code: "NAC-AIC",
    title: "AI Image Creation",
    description:
      "Learn image prompting, visual styles, posters, branding, product images and creative workflows.",
    icon: Sparkles,
    color: "#E7A4D5",
    level: "Beginner to Advanced",
  },
  {
    id: "ai-video",
    code: "NAC-AVC",
    title: "AI Video & Cartoons",
    description:
      "Explore video concepts, storytelling, animation planning, character design and responsible production.",
    icon: Video,
    color: "#F2A76B",
    level: "Beginner to Advanced",
  },
  {
    id: "web-development",
    code: "NAC-WAD",
    title: "Website & App Development",
    description:
      "Learn web foundations, HTML, CSS, JavaScript, React, databases and deployment.",
    icon: Code2,
    color: "#73BCEB",
    level: "Beginner to Advanced",
  },
  {
    id: "business-careers",
    code: "NAC-ABC",
    title: "AI for Business & Careers",
    description:
      "Use AI to improve productivity, business planning, job applications and customer service.",
    icon: BriefcaseBusiness,
    color: "#E6BC70",
    level: "Practical Learning",
  },
  {
    id: "mental-wellness",
    code: "NAC-MHW",
    title: "Mental Wellness",
    description:
      "Build emotional awareness, healthy routines, stress-management skills and supportive habits.",
    icon: Brain,
    color: "#82CDB5",
    level: "Personal Development",
  },
  {
    id: "health-education",
    code: "NAC-HEA",
    title: "Health Education",
    description:
      "Study general health literacy, prevention, nutrition, first-aid awareness and medical safety.",
    icon: HeartPulse,
    color: "#F18E9A",
    level: "Health Literacy",
  },
  {
    id: "yoruba-herbal",
    code: "NAC-YHK",
    title: "Yoruba Herbal Knowledge",
    description:
      "Explore Yoruba plant traditions, cultural knowledge, plant identification and herbal safety.",
    icon: Leaf,
    color: "#9DBF80",
    level: "Culture & Safety",
  },
  {
    id: "digital-skills",
    code: "NAC-DGS",
    title: "Digital Skills",
    description:
      "Develop digital literacy, online research, cybersecurity awareness and practical computer skills.",
    icon: Globe,
    color: "#83B4F5",
    level: "Beginner to Advanced",
  },
  {
    id: "cybersecurity-ethical-hacking",
    code: "NAC-CSE",
    title: "Cybersecurity & Ethical Hacking",
    description:
      "Learn online safety, network security, ethical hacking, threat detection, and defensive cybersecurity through practical lessons.",
    icon: ShieldCheck,
    color: "#7C83FD",
    level: "Beginner to Expert",
  },
  {
    id: "projects-certificates",
    code: "NAC-PAC",
    title: "Projects & Certificates",
    description:
      "Apply your knowledge through practical projects, portfolio building and course assessments.",
    icon: Trophy,
    color: "#D5A1FA",
    level: "Project-Based",
  },
];

/*
 * Every course has:
 * code, departmentId, title, description, level, duration,
 * sections, lessons, examples, exercises and revision questions.
 *
 * PART 2 will add the remaining departments and courses.
 */

const initialCourses = [
  {
    code: "NAC-AIF-001",
    departmentId: "ai-fundamentals",
    title: "AI & Prompting: Your First Steps",
    description:
      "Understand what AI is and learn how to communicate clearly with AI assistants.",
    level: "Beginner",
    duration: "45 minutes",
    sections: [
      {
        title: "Section 1: Understanding Artificial Intelligence",
        lessons: [
          {
            title: "What is artificial intelligence?",
            content: `
Artificial intelligence (AI) is a field of technology that develops computer systems capable of performing tasks that usually require human intelligence.

These tasks can include understanding language, recognising patterns, generating images, analysing information and assisting with decisions.

AI does not mean that a computer understands the world exactly as a human does. Many AI systems identify patterns in data and use those patterns to generate predictions or responses.

Examples of AI include:
• Chat assistants that respond to questions.
• Recommendation systems that suggest videos or music.
• Navigation systems that estimate travel routes.
• Image tools that create pictures from text.
• Systems that help identify unusual activity in financial transactions.

AI is a tool. Its usefulness depends on how it is designed, the information available to it and how people use its output.
            `,
            example:
              "You ask an AI assistant to explain photosynthesis in simple English. The assistant generates an explanation based on patterns learned during training.",
            exercise:
              "Write down three examples of AI you have encountered in everyday life. Explain what each one helps people do.",
            questions: [
              {
                question: "What does AI stand for?",
                options: [
                  "Automatic Internet",
                  "Artificial Intelligence",
                  "Advanced Input",
                  "Applied Information",
                ],
                answer: 1,
                explanation:
                  "AI stands for Artificial Intelligence.",
              },
              {
                question:
                  "Which statement about AI is most accurate?",
                options: [
                  "AI is always correct.",
                  "AI can never make mistakes.",
                  "AI can assist with tasks but may produce errors.",
                  "AI always thinks exactly like a human.",
                ],
                answer: 2,
                explanation:
                  "AI can be useful, but its output must be checked.",
              },
            ],
          },
          {
            title: "Types of AI tools",
            content: `
Different AI tools are designed for different purposes.

1. Conversational AI: answers questions and helps users work with text.
2. Image-generation AI: creates or edits images based on instructions.
3. Audio AI: may transcribe speech, generate speech or assist with sound.
4. Video AI: helps create or edit video content.
5. Analytical AI: identifies patterns, summarises information or supports predictions.
6. Coding assistants: help explain, write and debug software code.

Some platforms combine several capabilities. However, a tool that can generate impressive content may still make mistakes when handling facts, calculations or complicated instructions.

Before choosing a tool, identify the task you need to complete, the quality you require and any privacy concerns.
            `,
            example:
              "For a business poster, an image-generation tool may help create a visual, while a writing assistant may help prepare the promotional wording.",
            exercise:
              "Match these tasks to suitable AI capabilities: summarising an article, generating a picture and explaining a programming error.",
            questions: [
              {
                question:
                  "Which tool category is primarily designed to create pictures from text instructions?",
                options: [
                  "Image-generation AI",
                  "Spreadsheet formatting",
                  "A calculator only",
                  "A file manager",
                ],
                answer: 0,
                explanation:
                  "Image-generation tools produce or modify images using prompts.",
              },
            ],
          },
        ],
      },
      {
        title: "Section 2: Communicating With AI",
        lessons: [
          {
            title: "What is a prompt?",
            content: `
A prompt is the instruction, question or information you provide to an AI system.

A prompt can be short, such as "Explain gravity." It can also be detailed, with a role, a task, background information, constraints and an expected format.

Clear prompts make it easier for an AI assistant to understand what you need. However, even an excellent prompt cannot guarantee a perfect answer.

A useful prompt often contains five elements:

1. Task: what you want the AI to do.
2. Context: the background information it needs.
3. Audience: who the result is for.
4. Constraints: rules such as length, tone or difficulty.
5. Format: how the answer should be presented.

You do not need all five elements for every request. Use the ones that help explain your goal.
            `,
            example:
              "Weak prompt: Explain business. Better prompt: Explain five basic steps for starting a small retail business in Nigeria. Use simple English and give one practical example for each step.",
            exercise:
              "Improve this prompt: Teach me science. Specify the topic, learner level and preferred format.",
            questions: [
              {
                question: "What is a prompt?",
                options: [
                  "An instruction given to an AI system",
                  "A computer battery",
                  "A type of internet cable",
                  "A password recovery code",
                ],
                answer: 0,
                explanation:
                  "A prompt tells an AI system what task or response you want.",
              },
            ],
          },
          {
            title: "Writing clearer prompts",
            content: `
Good prompts reduce ambiguity.

Instead of asking "Write something about health", try specifying the intended topic and audience.

For example:
"Explain the importance of drinking safe water to secondary-school students. Use simple English, five bullet points and one everyday example."

You can also ask an AI assistant to:
• Explain an unfamiliar concept step by step.
• Compare two ideas in a table.
• Summarise a passage you provide.
• Generate practice questions.
• Review a draft and identify possible weaknesses.

For important tasks, work in stages. Start with a clear request, inspect the result, identify what is missing and ask for a revision.
            `,
            example:
              "First ask for a lesson outline. Then request an explanation of each section. Finally, ask for practice questions and review the answers.",
            exercise:
              "Write a prompt asking for a JSS1 mathematics lesson with an explanation, two worked examples and five practice questions.",
            questions: [
              {
                question:
                  "What is one benefit of specifying the intended audience?",
                options: [
                  "It guarantees the answer is always true.",
                  "It helps the AI adapt its explanation to the reader.",
                  "It removes the need to review the answer.",
                  "It makes every answer shorter automatically.",
                ],
                answer: 1,
                explanation:
                  "Audience information helps the AI choose an appropriate level and style.",
              },
            ],
          },
        ],
      },
      {
        title: "Section 3: Checking AI Answers",
        lessons: [
          {
            title: "AI errors and fact-checking",
            content: `
AI-generated answers can contain incorrect facts, invented references, outdated information or faulty reasoning. A fluent answer is not automatically a reliable answer.

When accuracy matters:

1. Identify claims that need verification.
2. Check reliable sources, preferably original or official sources.
3. Compare important claims across independent sources.
4. Confirm dates, names, figures and quotations.
5. Correct or remove claims you cannot verify.

Be especially careful with medical, legal, financial and safety-related information. AI can help explain general concepts, but it should not replace qualified professional advice when that advice is needed.

If the AI gives you a source, check that the source exists and actually supports the claim.
            `,
            example:
              "If an assistant provides a statistic about Nigeria's population, check a reputable statistical source and confirm the date and definition used.",
            exercise:
              "Ask an AI assistant a factual question. Identify one claim in its answer and describe how you would verify it independently.",
            questions: [
              {
                question:
                  "What should you do when an AI gives an important factual claim?",
                options: [
                  "Accept it immediately.",
                  "Share it without checking.",
                  "Verify it using reliable sources.",
                  "Assume that detailed answers are always accurate.",
                ],
                answer: 2,
                explanation:
                  "Important claims should be checked against trustworthy evidence.",
              },
            ],
          },
          {
            title: "Privacy and responsible AI use",
            content: `
Protect personal and confidential information when using AI services.

Avoid entering passwords, bank PINs, authentication codes, private identification numbers, confidential business records or another person's sensitive information unless you have a legitimate reason and an appropriately protected system.

Before uploading a document or photograph, consider:
• Does it contain private information?
• Do I have permission to share it?
• Does the service explain how submitted information may be used?
• Can I remove or hide unnecessary identifying details?

Use AI honestly. Do not use it to impersonate people, deceive others, spread harmful misinformation or expose private information.

Follow applicable laws, professional rules and the policies of your school or workplace.
            `,
            example:
              "Before asking an AI tool to summarise a customer document, remove unnecessary personal details and make sure you are authorised to use the document.",
            exercise:
              "List three kinds of sensitive information you should protect when using online AI tools.",
            questions: [
              {
                question:
                  "Which action demonstrates safer AI use?",
                options: [
                  "Sharing your bank PIN in a prompt.",
                  "Uploading private records without permission.",
                  "Checking privacy risks before sharing a document.",
                  "Publishing another person's private information.",
                ],
                answer: 2,
                explanation:
                  "Consider privacy, permission and the service's data practices before sharing information.",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    code: "NAC-AIF-002",
    departmentId: "ai-fundamentals",
    title: "Understanding AI Assistants",
    description:
      "Learn how assistants respond, where they are useful and how to work with them effectively.",
    level: "Beginner",
    duration: "40 minutes",
    sections: [
      {
        title: "Section 1: How AI Assistants Work",
        lessons: [
          {
            title: "Understanding the assistant",
            content: `
An AI assistant is a software system designed to help people complete tasks through conversation or other forms of interaction.

Depending on the platform, an assistant may explain topics, draft text, summarise documents, analyse supplied information or help with coding.

Many modern language assistants use models trained on large collections of data to generate responses. They process your input and produce output based on learned patterns and the context available to them.

This does not mean they automatically know every current fact or understand every situation correctly. Their capabilities and limitations depend on the model, tools, information and instructions available.

Think of an assistant as a capable helper whose work still needs human judgement.
            `,
            example:
              "A student may ask an assistant to explain a difficult biology topic, then compare the explanation with a textbook and ask follow-up questions.",
            exercise:
              "Name two tasks an AI assistant could help with and one task where you would still need human expertise.",
            questions: [
              {
                question: "What is an AI assistant designed to do?",
                options: [
                  "Help users with tasks",
                  "Guarantee every decision is correct",
                  "Replace every professional",
                  "Eliminate the need for learning",
                ],
                answer: 0,
                explanation:
                  "AI assistants can help with tasks, but they do not guarantee correctness.",
              },
            ],
          },
          {
            title: "Context and follow-up questions",
            content: `
Context is the information that helps an assistant understand your request.

For example, if you first explain that you are preparing a lesson for SS2 students, a follow-up request such as "Now create five revision questions" can use that context.

When a conversation becomes long or the task changes significantly, restate the important requirements. Do not assume that an assistant will remember every detail perfectly.

Useful follow-up instructions include:
• Explain that more simply.
• Give another worked example.
• Identify possible mistakes.
• Compare the two approaches.
• Rewrite the answer for a different audience.
            `,
            example:
              "After receiving a lesson outline, ask: 'Expand Section 2 with a definition, three examples and five revision questions for SS2 students.'",
            exercise:
              "Write a follow-up question that would improve an explanation you previously received from an AI assistant.",
            questions: [
              {
                question: "Why is context useful?",
                options: [
                  "It always prevents mistakes.",
                  "It helps the assistant interpret your request.",
                  "It guarantees live internet access.",
                  "It removes all privacy risks.",
                ],
                answer: 1,
                explanation:
                  "Context clarifies the task, audience and relevant background.",
              },
            ],
          },
        ],
      },
      {
        title: "Section 2: Practical Assistant Skills",
        lessons: [
          {
            title: "Using an assistant as a learning partner",
            content: `
AI assistants can support learning when you use them actively rather than simply copying their answers.

Try asking for:
1. A beginner-friendly explanation.
2. A worked example.
3. A similar problem for you to solve.
4. Feedback on your attempt.
5. A short revision quiz.

Attempt the exercise yourself before checking the solution. This helps you identify what you understand and what you need to practise.

For school assignments, follow your institution's rules about permitted AI assistance and acknowledge it when required.
            `,
                example:
              "Ask an AI assistant to explain a biology topic, provide a worked example, and then give you a practice question to solve independently.",
            exercise:
              "Choose a topic you are learning. Ask an AI assistant to explain it, give one example, and create three practice questions.",
            questions: [
              {
                question:
                  "Which approach supports effective learning with AI?",
                options: [
                  "Copy every answer without understanding it.",
                  "Use explanations, attempt exercises and review feedback.",
                  "Avoid checking the accuracy of answers.",
                  "Allow AI to make every decision for you.",
                ],
                answer: 1,
                explanation:
                  "Active practice and feedback help you understand a topic instead of merely copying an answer.",
              },
            ],
          },
          {
            title: "Evaluating an AI assistant's response",
            content: `
An AI assistant can produce a response that sounds convincing but contains mistakes. You should therefore evaluate important answers before relying on them.

Use these checks:

1. Accuracy: Can you confirm the facts using reliable sources?
2. Relevance: Does the answer address your actual question?
3. Completeness: Are important details missing?
4. Clarity: Can the intended reader understand the explanation?
5. Safety: Could following the advice cause harm?

For schoolwork, compare explanations with appropriate textbooks, class notes and instructions from your teacher.

For medical, legal, financial or other high-stakes decisions, consult an appropriately qualified professional instead of relying solely on an AI assistant.

Remember that confidence in the wording does not guarantee that a response is correct.
            `,
            example:
              "If an assistant gives you a scientific definition, compare it with your textbook and correct any differences before using it in your assignment.",
            exercise:
              "Write down three checks you would perform before using an AI-generated answer in an important assignment.",
            questions: [
              {
                question:
                  "What should you do when an AI answer contains an important factual claim?",
                options: [
                  "Believe it because it sounds professional.",
                  "Share it immediately.",
                  "Verify it using reliable sources.",
                  "Assume it is correct if it is long.",
                ],
                answer: 2,
                explanation:
                  "Important factual claims should be checked against trustworthy sources.",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    code: "NAC-AIF-003",
    departmentId: "ai-fundamentals",
    title: "Advanced Prompt Engineering",
    description:
      "Develop structured prompts, refine AI outputs and build repeatable workflows for practical tasks.",
    level: "Intermediate",
    duration: "60 minutes",
    sections: [
      {
        title: "Section 1: Designing Structured Prompts",
        lessons: [
          {
            title: "Breaking complex tasks into steps",
            content: `
A complex task often becomes easier when you divide it into smaller steps.

Instead of asking an AI assistant to create an entire business plan, website specification or training programme in one request, define the stages of work.

A structured workflow may include:

1. Clarify the objective.
2. Identify the intended audience.
3. Gather the information needed.
4. Create an outline.
5. Develop each section.
6. Review the result.
7. Correct errors and prepare the final output.

This approach gives you more opportunities to inspect the work and identify missing information.

You can also ask the assistant to state its assumptions and identify information it still needs. For factual work, request sources you can independently verify.

Remember that dividing a task into steps improves control, but it does not automatically guarantee accuracy.
            `,
            example:
              "For a small-business plan, first request an outline, then develop the marketing section, review the estimated costs, and finally assemble the sections into one document.",
            exercise:
              "Choose a complex task and divide it into at least five smaller steps that an AI assistant could help you complete.",
            questions: [
              {
                question:
                  "Why divide a complex task into smaller steps?",
                options: [
                  "To eliminate every possible error.",
                  "To make the task easier to review and manage.",
                  "To avoid giving the assistant any context.",
                  "To guarantee that all information is current.",
                ],
                answer: 1,
                explanation:
                  "Smaller steps make it easier to manage requirements and review the output.",
              },
            ],
          },
          {
            title: "Adding constraints and output formats",
            content: `
Constraints describe the boundaries your result should follow. They may specify length, tone, audience, required sections or information that must not be invented.

Output formats describe how the result should be organised.

Common formats include:

• Numbered instructions.
• Bullet-point summaries.
• Tables comparing alternatives.
• Lesson plans with objectives and exercises.
• JSON data for compatible software workflows.
• Reports with headings and recommendations.

Be specific about essential requirements. If a fact is unknown, instruct the assistant to mark it as unknown rather than inventing a value.

For coding tasks, specify the programming language, the relevant framework, the expected behaviour and any restrictions on changing existing files.
            `,
            example:
              "Prepare a 300-word project summary using simple English, four headings and a final checklist. Do not invent statistics; mark missing information clearly.",
            exercise:
              "Write a prompt with a clear task, audience, word limit, required headings and a rule against inventing facts.",
            questions: [
              {
                question:
                  "What is the purpose of a constraint in a prompt?",
                options: [
                  "To specify a requirement or boundary.",
                  "To guarantee every response is correct.",
                  "To remove the need for context.",
                  "To prevent all follow-up questions.",
                ],
                answer: 0,
                explanation:
                  "Constraints define requirements such as length, tone, scope and permitted changes.",
              },
            ],
          },
        ],
      },
      {
        title: "Section 2: Refinement and Reusable Workflows",
        lessons: [
          {
            title: "Improving an output through feedback",
            content: `
The first response from an AI assistant is often a starting point rather than the finished result.

Useful feedback identifies a specific weakness and explains what needs to change.

For example, instead of saying "Make it better", you could say:

• Shorten the introduction to two sentences.
• Explain the technical terms for a beginner.
• Add one practical example from a small business.
• Remove repeated ideas.
• Check whether every requested section is included.

Review the revised result rather than assuming that the changes are correct.

When working with code, test the result after changes. Confirm that important existing features still work and that the update did not introduce new errors.
            `,
            example:
              "After receiving a long explanation, ask the assistant to keep the key ideas, remove repetition and rewrite it for secondary-school students.",
            exercise:
              "Write three specific feedback instructions that would improve a long, unclear AI-generated lesson.",
            questions: [
              {
                question:
                  "Which feedback instruction is most useful?",
                options: [
                  "Do something better.",
                  "Change everything without explanation.",
                  "Remove repetition and add two relevant examples.",
                  "Make it perfect.",
                ],
                answer: 2,
                explanation:
                  "Specific feedback identifies clear, testable improvements.",
              },
            ],
          },
          {
            title: "Creating a reusable prompt template",
            content: `
A reusable prompt template is a structured instruction that can be adapted for similar tasks.

Templates save time and help you remember important requirements. They are particularly useful for lesson preparation, customer communication, reports and software planning.

A basic template can contain:

TASK: What should be completed?
CONTEXT: What background information matters?
AUDIENCE: Who will use the result?
REQUIREMENTS: What must be included?
LIMITATIONS: What must be avoided?
FORMAT: How should the answer be organised?
REVIEW: What should be checked before delivery?

Replace the placeholders with details for each new task. Do not include passwords, secret keys or unnecessary personal information.

A reusable template should still be reviewed and adjusted when the task or circumstances change.
            `,
            example:
              "TASK: Prepare a beginner lesson. AUDIENCE: JSS2 students. REQUIREMENTS: Definition, explanation, two worked examples and five revision questions. FORMAT: Clear headings and numbered questions.",
            exercise:
              "Create a reusable prompt template for preparing a lesson, business report or simple website specification.",
            questions: [
              {
                question:
                  "What is a major benefit of a reusable prompt template?",
                options: [
                  "It makes checking the output unnecessary.",
                  "It helps organise repeated tasks consistently.",
                  "It guarantees access to current information.",
                  "It removes all privacy concerns.",
                ],
                answer: 1,
                explanation:
                  "Templates provide a repeatable structure while still allowing task-specific changes.",
              },
            ],
          },
        ],
      },
    ],
  },
];
const additionalCourses = [
  // =========================================================
  // DEPARTMENT 2: AI IMAGE CREATION
  // =========================================================
  {
    code: "NAC-AIC-001",
    departmentId: "NAC-AIC",
    title: "Introduction to AI Image Creation",
    description: "Learn to describe, plan, generate, and evaluate images with AI tools.",
    level: "Beginner",
    duration: "3 hours",
    sections: ["Image Generation Basics", "Writing Image Prompts"],
    lessons: [
      {
        title: "How AI image generation works",
        content: `AI image generators create pictures from instructions called prompts. Depending on the tool, a prompt may describe the subject, environment, composition, lighting, mood, and artistic style.

The result depends on how clearly the request communicates the intended image. Different tools have different capabilities, and results may not always match the prompt exactly.

AI-generated images can be useful for illustrations, concept art, posters, product mock-ups, and educational visuals.`,
        example: "Create an illustration of a young African student reading in a bright library, with warm daylight and a clean editorial illustration style.",
        exercise: "Write a prompt for an educational illustration about the water cycle.",
        questions: [
          {
            question: "What is a prompt?",
            options: ["A description given to an AI tool", "A computer battery", "A printed photograph", "A keyboard shortcut"],
            answer: 0,
            explanation: "A prompt describes what you want the AI system to produce."
          },
          {
            question: "Which detail can help guide an image generator?",
            options: ["Subject and lighting", "Your phone password", "Battery percentage", "SIM serial number"],
            answer: 0,
            explanation: "Subject, composition, lighting, and style can help guide the generated image."
          }
        ]
      },
      {
        title: "Writing clearer image prompts",
        content: `A useful image prompt often contains five elements:

1. Subject: what should appear.
2. Setting: where the scene takes place.
3. Composition: how objects are arranged.
4. Lighting and mood: how the scene should feel.
5. Visual style: for example, photography, watercolor, or flat illustration.

You do not need to include every element in every prompt. Start with the most important details and refine the result when necessary.

Avoid contradictory instructions, such as requesting both a bright sunny afternoon and a completely dark nighttime scene unless that contrast is intentional.`,
        example: "Subject: a baker decorating a cake. Setting: a small modern bakery. Composition: medium shot with the cake in the foreground. Lighting: soft morning daylight. Style: realistic commercial photography.",
        exercise: "Write two versions of a prompt for the same subject: one realistic and one cartoon-style.",
        questions: [
          {
            question: "Why should a prompt identify its subject?",
            options: ["To clarify what the image should show", "To increase phone storage", "To change the internet provider", "To install a new operating system"],
            answer: 0,
            explanation: "The subject tells the generator what the main image content should be."
          },
          {
            question: "What is a sensible way to improve a weak result?",
            options: ["Refine the prompt with clearer details", "Add unrelated instructions", "Ignore the result", "Delete every project"],
            answer: 0,
            explanation: "Specific, relevant details can help the tool produce a result closer to your intention."
          }
        ]
      }
    ]
  },

  // =========================================================
  // DEPARTMENT 3: AI VIDEO AND CARTOONS
  // =========================================================
  {
    code: "NAC-AVC-001",
    departmentId: "NAC-AVC",
    title: "AI Video Production Fundamentals",
    description: "Plan short videos, structure scenes, and understand AI-assisted video production.",
    level: "Beginner",
    duration: "4 hours",
    sections: ["Video Planning", "Creating and Reviewing Scenes"],
    lessons: [
      {
        title: "Planning a short video",
        content: `A good video begins with a clear purpose. Decide who the video is for, what viewers should learn or feel, and what action they should take afterward.

A simple video plan contains a title, a short script, a scene list, narration, and any visual or sound requirements.

A storyboard describes the scenes in order. It helps you identify missing transitions and unnecessary shots before spending time generating or editing video.`,
        example: "For a 30-second school advert, plan a welcome scene, a classroom scene, a student activity scene, and a final scene showing the school's approved contact details.",
        exercise: "Create a four-scene storyboard for a short video introducing your business or school.",
        questions: [
          {
            question: "What is a storyboard used for?",
            options: ["Planning scenes in sequence", "Charging a phone", "Registering a SIM card", "Measuring internet speed"],
            answer: 0,
            explanation: "A storyboard organizes the visual sequence before production."
          },
          {
            question: "What should you decide before making a video?",
            options: ["The video's purpose and audience", "The viewer's private password", "An unrelated app name", "Nothing at all"],
            answer: 0,
            explanation: "A clear purpose and audience guide the script and visual decisions."
          }
        ]
      },
      {
        title: "Maintaining consistency across scenes",
        content: `AI-generated scenes may change a character's face, clothes, age, or surroundings between shots. Consistency requires careful planning and review.

Describe recurring characters consistently, keep reference images when the tool supports them, and use a scene plan with clear actions and settings.

Check the finished video for abrupt changes, incorrect text, strange movement, poor synchronization, and misleading visual details. AI tools can make mistakes, so review every scene before publishing.`,
        example: "For a cartoon about a schoolboy, reuse the same character description and reference image where supported, and keep his clothing and appearance consistent throughout the scenes.",
        exercise: "Write a short character description and a three-scene sequence that keeps the character recognizable.",
        questions: [
          {
            question: "Why should recurring characters be reviewed?",
            options: ["Their appearance may change between generated scenes", "Videos cannot contain characters", "It automatically increases internet speed", "It removes the need for editing"],
            answer: 0,
            explanation: "AI tools may not maintain identical character details in every scene."
          },
          {
            question: "What should happen before publishing an AI video?",
            options: ["Review its scenes, sound, and accuracy", "Publish it without watching", "Remove the script automatically", "Assume every detail is correct"],
            answer: 0,
            explanation: "Review helps identify visual errors, misleading content, and technical problems."
          }
        ]
      }
    ]
  },

  // =========================================================
  // DEPARTMENT 4: WEBSITE AND APP DEVELOPMENT
  // =========================================================
  {
    code: "NAC-WAD-001",
    departmentId: "NAC-WAD",
    title: "Web Development Foundations",
    description: "Understand HTML, CSS, JavaScript, responsive design, and website structure.",
    level: "Beginner",
    duration: "6 hours",
    sections: ["Core Web Technologies", "Building a Simple Website"],
    lessons: [
      {
        title: "Understanding HTML, CSS, and JavaScript",
        content: `Websites commonly use three core technologies.

HTML defines the structure and meaning of content, such as headings, paragraphs, forms, links, and images.

CSS controls presentation, including colors, spacing, typography, layout, and responsive behavior.

JavaScript adds behavior, such as responding to button clicks, validating forms, updating page content, and managing interactive components.

Modern applications may also use frameworks, databases, authentication services, and deployment platforms. Learn the fundamentals before relying entirely on frameworks or AI-generated code.`,
        example: `HTML creates a heading. CSS changes how the heading looks. JavaScript can respond when a user clicks a button.`,
        exercise: "Describe one feature of a website and identify which parts could use HTML, CSS, and JavaScript.",
        questions: [
          {
            question: "Which technology primarily defines page structure?",
            options: ["HTML", "CSS", "JavaScript only", "A spreadsheet"],
            answer: 0,
            explanation: "HTML provides the structure and semantic content of a web page."
          },
          {
            question: "Which technology primarily controls visual styling?",
            options: ["CSS", "HTML alone", "A SIM card", "A database password"],
            answer: 0,
            explanation: "CSS controls layout, colors, typography, spacing, and other visual presentation."
          }
        ]
      },
      {
        title: "Responsive design and accessibility",
        content: `Responsive design helps a website adapt to different screen sizes. This is especially important when visitors use phones rather than computers.

Use flexible layouts, readable text, appropriately sized controls, and images that fit their containers.

Accessibility means making digital content usable by people with different abilities. Helpful practices include meaningful headings, labels for form fields, descriptive alternative text for informative images, keyboard navigation, and sufficient color contrast.

Test your work on a narrow screen and check that important buttons and text remain usable.`,
        example: "A registration form should fit a phone screen, have a visible label for each field, and provide a readable message when information is missing.",
        exercise: "Review a website on your phone and list three improvements that could make it easier to use.",
        questions: [
          {
            question: "What is the goal of responsive design?",
            options: ["Make layouts adapt to different screens", "Force every visitor to use a computer", "Remove all page content", "Disable navigation"],
            answer: 0,
            explanation: "Responsive layouts adjust to different screen sizes and viewing conditions."
          },
          {
            question: "Which is an accessibility improvement?",
            options: ["Adding labels to form fields", "Using unreadably small text", "Removing keyboard navigation", "Hiding every heading"],
            answer: 0,
            explanation: "Labels help users understand form fields, including people using assistive technology."
          }
        ]
      }
    ]
  },

  // =========================================================
  // DEPARTMENT 5: AI FOR BUSINESS AND CAREERS
  // =========================================================
  {
    code: "NAC-ABC-001",
    departmentId: "NAC-ABC",
    title: "AI for Business Productivity",
    description: "Use AI to support planning, communication, marketing, and everyday business tasks.",
    level: "Beginner",
    duration: "4 hours",
    sections: ["Business Applications", "Responsible Business Use"],
    lessons: [
      {
        title: "Using AI to support daily business work",
        content: `AI assistants can help draft customer messages, organize ideas, create first drafts of product descriptions, summarize non-sensitive documents, and develop content calendars.

Treat generated content as a draft rather than an unquestionable final answer. Check prices, dates, product details, spelling, and claims before using it with customers.

Never enter passwords, payment card information, confidential customer records, or other sensitive information into a tool unless you have verified that the tool is appropriate and authorized for that data.`,
        example: "Ask an assistant to draft three polite responses to a customer asking about delivery. Review the responses and add your actual delivery fees and policies.",
        exercise: "Choose a small business and list three repetitive tasks an AI assistant could help with safely.",
        questions: [
          {
            question: "How should AI-generated business content be treated?",
            options: ["As a draft that needs checking", "As guaranteed truth", "As a replacement for every business decision", "As proof of a customer's identity"],
            answer: 0,
            explanation: "Human review is needed to verify facts, context, and suitability."
          },
          {
            question: "Which information should you protect?",
            options: ["Customer records and passwords", "Publicly available product names only", "A general business slogan", "A public holiday date"],
            answer: 0,
            explanation: "Sensitive personal and account information must be handled carefully."
          }
        ]
      },
      {
        title: "Creating a simple marketing plan",
        content: `A marketing plan identifies a target audience, a product or service, a main benefit, a communication channel, and a way to measure results.

AI can help brainstorm headlines, promotional messages, and post ideas. You must ensure the claims are accurate and that customers are not misled.

For a small business, begin with a manageable plan. Track enquiries, completed sales, customer feedback, and the costs of the campaign instead of relying only on likes or views.`,
        example: "A local bakery could plan three weekly posts: one showing products, one explaining ordering and delivery, and one sharing customer-approved feedback.",
        exercise: "Draft a one-week marketing plan for a product you know, including the audience, message, channel, and one measure of success.",
        questions: [
          {
            question: "What should a marketing plan identify?",
            options: ["Audience and main message", "Only the owner's favorite color", "A customer's password", "An unrelated website"],
            answer: 0,
            explanation: "The audience and message help determine what to communicate and where."
          },
          {
            question: "Which measure is useful for evaluating a sales campaign?",
            options: ["Relevant enquiries and completed sales", "The number of letters in the business name", "The owner's phone wallpaper", "An unrelated weather report"],
            answer: 0,
            explanation: "Enquiries and sales help show whether a campaign is producing useful business outcomes."
          }
        ]
      }
    ]
  },

  // =========================================================
  // DEPARTMENT 6: MENTAL WELLNESS
  // =========================================================
  {
    code: "NAC-MHW-001",
    departmentId: "NAC-MHW",
    title: "Everyday Mental Wellness",
    description: "Learn general wellbeing practices, stress awareness, and healthy support-seeking habits.",
    level: "Beginner",
    duration: "3 hours",
    sections: ["Understanding Wellbeing", "Healthy Coping Skills"],
    lessons: [
      {
        title: "Understanding mental wellness",
        content: `Mental wellness includes how people manage emotions, handle everyday challenges, relate to others, and carry out daily activities.

Feeling stressed, worried, sad, or overwhelmed sometimes is part of human experience. These feelings can have many causes, and one lesson cannot determine what a particular person is experiencing.

Helpful foundations may include regular sleep, balanced meals, physical activity appropriate to your abilities, meaningful relationships, rest, and asking for support when needed.

Seeking help is a reasonable step, not a personal failure. This course provides general education and does not diagnose conditions or replace professional care.`,
        example: "A student feeling overwhelmed before examinations might break study into smaller sessions, take reasonable breaks, and speak with a trusted person about the pressure.",
        exercise: "Create a simple weekly wellbeing plan with time for rest, learning, movement, and social connection.",
        questions: [
          {
            question: "Which is a healthy approach to everyday stress?",
            options: ["Break tasks into manageable steps", "Ignore every difficulty indefinitely", "Stop speaking to everyone", "Assume stress is always a personal failure"],
            answer: 0,
            explanation: "Breaking tasks down can make challenges feel more manageable."
          },
          {
            question: "What is the purpose of this course?",
            options: ["Provide general wellbeing education", "Diagnose every mental health condition", "Replace all professional care", "Prescribe medication"],
            answer: 0,
            explanation: "Educational material can support understanding but cannot replace individual professional assessment."
          }
        ]
      },
      {
        title: "Recognizing when to seek support",
        content: `Consider speaking with a qualified health professional if emotional distress persists, becomes difficult to manage, or interferes with sleep, work, study, relationships, or daily responsibilities.

A trusted friend, family member, teacher, or community leader may offer support, but they are not a substitute for professional help when it is needed.

If you or someone else is in immediate danger, or there is a risk of self-harm, contact local emergency services or go to the nearest emergency department. Stay with a person at immediate risk if you can do so safely.`,
        example: "Someone whose anxiety is repeatedly preventing them from attending school could speak with a qualified professional and a trusted support person.",
        exercise: "Write down three trusted sources of support someone could approach when struggling, including a qualified health professional.",
        questions: [
          {
            question: "When is professional support worth considering?",
            options: ["When distress persists or disrupts daily life", "Only when every friend agrees", "Never under any circumstances", "Only after abandoning every routine"],
            answer: 0,
            explanation: "Persistent distress or disruption to everyday functioning can be a reason to seek professional advice."
          },
          {
            question: "What should someone do if there is immediate danger?",
            options: ["Seek urgent local emergency assistance", "Wait indefinitely without help", "Rely only on an online quiz", "Ignore the danger"],
            answer: 0,
            explanation: "Immediate danger requires urgent assistance rather than an educational course."
          }
        ]
      }
    ]
  },

  // =========================================================
  // DEPARTMENT 7: HEALTH EDUCATION
  // =========================================================
  {
    code: "NAC-HEA-001",
    departmentId: "NAC-HEA",
    title: "Foundations of Personal Health",
    description: "Explore general health literacy, prevention, hygiene, and informed health decisions.",
    level: "Beginner",
    duration: "4 hours",
    sections: ["Health Literacy", "Everyday Prevention"],
    lessons: [
      {
        title: "Understanding health information",
        content: `Health literacy is the ability to find, understand, and use health information when making decisions.

Health claims should be evaluated carefully. Look for the source, publication date, supporting evidence, and whether qualified professionals or recognized public health institutions support the claim.

A social media post, testimonial, or AI-generated answer is not sufficient proof that a remedy or treatment is effective.

Health needs vary between people. For symptoms, medication questions, or treatment decisions, consult a qualified health professional who can assess your circumstances.`,
        example: "Before sharing a viral post claiming that a household ingredient cures a disease, check trustworthy health sources and ask a qualified professional when necessary.",
        exercise: "Choose a health claim you have encountered and list the source, evidence, date, and questions that need verification.",
        questions: [
          {
            question: "What should you do before sharing a health claim?",
            options: ["Check reliable evidence and sources", "Trust every forwarded message", "Assume popularity proves effectiveness", "Remove all context"],
            answer: 0,
            explanation: "Reliable sources and evidence help distinguish useful information from misinformation."
          },
          {
            question: "Who can assess a person's individual medical needs?",
            options: ["A qualified health professional", "An anonymous comment alone", "An unverified advertisement", "A random online quiz"],
            answer: 0,
            explanation: "Individual medical decisions require appropriate professional assessment."
          }
        ]
      },
      {
        title: "Hygiene and disease prevention",
        content: `Everyday prevention includes washing hands with soap and water when appropriate, handling food safely, keeping living spaces clean, and following relevant public health guidance.

Vaccination, screening, and other preventive services depend on the person's age, circumstances, and local recommendations. A qualified health professional can explain which services are appropriate.

No single habit prevents every illness. Prevention combines practical habits, access to appropriate healthcare, and accurate information.`,
        example: "Before preparing food, wash your hands, use clean utensils, and keep raw ingredients separate from ready-to-eat food.",
        exercise: "Create a daily hygiene checklist with five practical habits that fit your household.",
        questions: [
          {
            question: "Which practice supports safer food handling?",
            options: ["Keeping raw food separate from ready-to-eat food", "Using dirty utensils for every ingredient", "Leaving all food uncovered indefinitely", "Ignoring hand hygiene"],
            answer: 0,
            explanation: "Separating raw ingredients from ready-to-eat food helps reduce cross-contamination."
          },
          {
            question: "Where should you check individualized prevention advice?",
            options: ["With a qualified health professional", "Only in anonymous online comments", "In unrelated entertainment posts", "From an unverified sales claim"],
            answer: 0,
            explanation: "Qualified professionals can explain relevant preventive services and recommendations."
          }
        ]
      }
    ]
  },

  // =========================================================
  // DEPARTMENT 8: YORUBA HERBAL KNOWLEDGE
  // =========================================================
  {
    code: "NAC-YHK-001",
    departmentId: "NAC-YHK",
    title: "Introduction to Yoruba Herbal Heritage",
    description: "Explore traditional plant knowledge, cultural context, and responsible documentation.",
    level: "Beginner",
    duration: "3 hours",
    sections: ["Cultural Heritage", "Safety and Documentation"],
    lessons: [
      {
        title: "Traditional plant knowledge and culture",
        content: `Yoruba communities have diverse traditions of plant knowledge, names, uses, and cultural practices. Knowledge can differ between families, locations, and practitioners.

Learning about this heritage involves respecting elders and knowledgeable community members, documenting local names carefully, and distinguishing cultural accounts from scientifically established medical evidence.

A traditional use recorded in a story or interview does not by itself prove that a plant treats a disease. Plant identification, preparation, dose, and safety can be complex.

This course focuses on cultural learning and responsible documentation, not prescribing herbal treatments or claiming unverified cures.`,
        example: "When documenting a plant, record the local name, the community where the name is used, the person sharing the information with their consent, and the date of the interview.",
        exercise: "Design a plant-knowledge record with fields for local name, location, source of information, date, and verification status.",
        questions: [
          {
            question: "Why should the source of traditional knowledge be recorded?",
            options: ["To preserve context and provenance", "To prove every claim is medically effective", "To avoid asking permission", "To replace scientific research"],
            answer: 0,
            explanation: "Recording the source and context helps preserve the origin of information without overstating its evidence."
          },
          {
            question: "Does a traditional use automatically prove a plant cures a disease?",
            options: ["No, the claim requires appropriate evidence", "Yes, every traditional claim is proven", "Yes, regardless of the plant", "Only if it appears in a social post"],
            answer: 0,
            explanation: "Traditional knowledge deserves careful documentation, while medical claims require appropriate evidence."
          }
        ]
      },
      {
        title: "Plant identification and safety",
        content: `Never identify a plant for consumption or treatment from a vague description or photograph alone. Similar-looking plants can have very different properties, and some are poisonous.

Do not taste unknown plants or prepare remedies from uncertain identifications. Some plants may cause poisoning, allergic reactions, or interactions with prescribed medicines.

Pregnant people, children, older adults, and people with existing medical conditions may face additional risks. Do not stop prescribed treatment or delay urgent care in favor of an unverified remedy.

For poisoning or a serious reaction, seek urgent medical assistance.`,
        example: "If two plants have similar leaves but their identity is uncertain, record the uncertainty and consult a qualified local botanist or other appropriate expert rather than consuming either plant.",
        exercise: "Write a safety checklist for documenting a plant without tasting, ingesting, or making medical claims about it.",
        questions: [
          {
            question: "What should you do when a plant's identity is uncertain?",
            options: ["Avoid consuming it and seek expert identification", "Taste it to find out", "Mix it with other unknown plants", "Assume it is safe"],
            answer: 0,
            explanation: "Uncertain identification can lead to serious harm, so consumption should be avoided."
          },
          {
            question: "What is a responsible approach to prescribed medicine?",
            options: ["Do not stop it for an unverified remedy without medical advice", "Replace it immediately with an unknown plant", "Ignore all instructions", "Assume plant products never interact with medicines"],
            answer: 0,
            explanation: "Treatment changes and possible interactions should be discussed with a qualified health professional."
          }
        ]
      }
    ]
  },

  // =========================================================
  // DEPARTMENT 9: DIGITAL SKILLS
  // =========================================================
  {
    code: "NAC-DGS-001",
    departmentId: "NAC-DGS",
    title: "Essential Digital Skills",
    description: "Build practical skills in online research, digital communication, files, and internet safety.",
    level: "Beginner",
    duration: "4 hours",
    sections: ["Digital Foundations", "Online Safety"],
    lessons: [
      {
        title: "Managing digital information",
        content: `Digital skills include searching for information, evaluating sources, managing files, communicating online, and using applications effectively.

Use descriptive file names and organized folders so that documents are easy to find. When working on a phone, learn how to locate downloads, manage storage, and back up important files securely.

When researching, compare multiple reliable sources and distinguish evidence from opinion. Check publication dates when information may have changed.`,
        example: "Use folders named Learning, Work, and Personal Documents, then give each file a descriptive name such as Biology_Revision_Notes.",
        exercise: "Plan a simple folder structure for your schoolwork or business documents.",
        questions: [
          {
            question: "Why are descriptive file names useful?",
            options: ["They make documents easier to find", "They guarantee every file is safe", "They remove the need for backups", "They increase battery capacity"],
            answer: 0,
            explanation: "Descriptive names make it easier to recognize and locate the right document."
          },
          {
            question: "How can you evaluate an online information source?",
            options: ["Check its author, evidence, and date", "Trust it because it has many emojis", "Ignore the source entirely", "Assume the first result is always correct"],
            answer: 0,
            explanation: "Checking authorship, evidence, and dates helps assess reliability."
          }
        ]
      },
      {
        title: "Passwords, scams, and account security",
        content: `Use unique, strong passwords for important accounts. A reputable password manager can help you store them. Enable two-factor authentication when available.

Never share verification codes or passwords with someone who contacts you unexpectedly. Be cautious of urgent messages promising guaranteed income, prizes, or investment returns.

Check website addresses carefully before signing in or making payments. Avoid installing apps from unknown sources, and review permissions before granting access.

If an account may have been compromised, use the official service to secure it and change affected passwords.`,
        example: "A message claiming that you must send a one-time verification code to receive a prize is a warning sign. Do not share the code; verify the offer through the service's official channel.",
        exercise: "Create a personal account-security checklist containing five actions you can take today.",
        questions: [
          {
            question: "Should you share a one-time verification code with a stranger?",
            options: ["No, keep it private", "Yes, if the message sounds urgent", "Yes, if a prize is promised", "Only when asked in a public group"],
            answer: 0,
            explanation: "Verification codes can allow someone else to access your account."
          },
          {
            question: "What is a warning sign of a possible online scam?",
            options: ["Pressure to act urgently for a guaranteed reward", "A clearly stated privacy policy", "A normal account settings page", "A document you created yourself"],
            answer: 0,
            explanation: "Urgency and unrealistic promises are common warning signs, though context should always be checked."
          }
        ]
      }
    ]
  },
  // =========================================================
  // CYBERSECURITY & ETHICAL HACKING — PDF COURSE
  // =========================================================
  {
    code: "NAC-CSE-001",
    departmentId: "cybersecurity-ethical-hacking",
    title: "Introduction to Cybersecurity & Ethical Hacking",
    description:
      "A three-level learning path covering cybersecurity fundamentals, advanced security testing, and expert defensive security.",
    level: "Beginner to Expert",
    duration: "Self-paced",
    sections: [
      "Lesson 1: Cybersecurity Fundamentals",
      "Lesson 2: Advanced Cybersecurity & Security Testing",
      "Lesson 3: Expert Ethical Hacking & Incident Response",
    ],
    lessons: [
      {
        title: "Lesson 1: Cybersecurity Fundamentals",
        content:
          "Learn the foundations of cybersecurity, the CIA triad, common digital threats, phishing, social engineering, password protection, Android and computer safety, networking basics, and ethical hacking principles. Open the full Lesson 1 PDF in the Department PDF Materials section below.",
        example:
          "Learn to recognise common threats and protect your own accounts and devices.",
        exercise:
          "Identify three ways to improve the security of an account or device you own.",
        questions: [],
      },
      {
        title: "Lesson 2: Advanced Cybersecurity & Security Testing",
        content:
          "Study advanced networking, Python for defensive security, web and API vulnerabilities, security testing tools, authorised penetration-testing methodology, vulnerability assessment, and professional reporting. Open the full Lesson 2 PDF in the Department PDF Materials section below.",
        example:
          "Learn to analyse fictional security logs and recommend appropriate defensive fixes.",
        exercise:
          "Describe a fictional security vulnerability, its potential impact, and how to fix it.",
        questions: [],
      },
      {
        title: "Lesson 3: Expert Ethical Hacking & Incident Response",
        content:
          "Explore professional security assessments, Android and IoT security, CCTV defence, connected vehicles, financial technology security, digital forensics, threat hunting, incident response, cloud security, and enterprise defence. Open the full Lesson 3 PDF in the Department PDF Materials section below.",
        example:
          "Learn to investigate a simulated security incident, preserve evidence, and prepare a professional report.",
        exercise:
          "Create an incident-response checklist using a fictional security incident.",
        questions: [],
      },
    ],
  },
  // =========================================================
  // DEPARTMENT 10: PROJECTS AND CERTIFICATES
  // =========================================================
  {
    code: "NAC-PAC-001",
    departmentId: "NAC-PAC",
    title: "Building Your First Digital Portfolio",
    description: "Plan a small project, document your work, and prepare a portfolio presentation.",
    level: "Beginner",
    duration: "5 hours",
    sections: ["Project Planning", "Portfolio Presentation"],
    lessons: [
      {
        title: "Choosing and planning a project",
        content: `A portfolio demonstrates what you can do. A small, completed project with a clear purpose is often more useful than a large unfinished idea.

Start by describing the problem, intended users, key features, and what a successful result looks like. Break the work into tasks that can be completed and tested individually.

Record important decisions and test the result with realistic examples. If you use AI-generated material or code, review it, understand it, and disclose its use when required.`,
        example: "A beginner might create a simple personal portfolio page with an introduction, a skills section, two project descriptions, and contact information.",
        exercise: "Write a one-page project brief with the problem, audience, three core features, and a simple success measure.",
        questions: [
          {
            question: "What is a useful first portfolio project?",
            options: ["A small project that works and solves a clear problem", "A very large unfinished idea", "A copied project you cannot explain", "A page filled with unrelated claims"],
            answer: 0,
            explanation: "A focused, completed project makes your skills easier to demonstrate and evaluate."
          },
          {
            question: "What should you do with AI-generated code?",
            options: ["Review and understand it before relying on it", "Assume it can never contain errors", "Hide every problem", "Publish it without testing"],
            answer: 0,
            explanation: "AI-generated code can contain bugs or security issues, so review and testing remain important."
          }
        ]
      },
      {
        title: "Presenting projects professionally",
        content: `A project presentation should explain the problem, your approach, the tools used, the result, and what you learned.

Include screenshots or a working demonstration when appropriate. Be honest about your contribution and identify features that are incomplete or still being tested.

Never publish passwords, API keys, private customer data, or confidential documents in a public portfolio or repository.

A certificate may document course completion or assessment, but it does not automatically prove professional competence. A project demonstration provides additional evidence of practical skills.`,
        example: "A portfolio entry might include the project name, its purpose, the technologies used, a live demo link, a repository link, and two lessons learned.",
        exercise: "Write a portfolio entry for a project you have completed or are currently building. Clearly label unfinished features.",
        questions: [
          {
            question: "What should a professional project presentation include?",
            options: ["Purpose, approach, result, and your contribution", "Only an exaggerated claim", "Private access credentials", "Unrelated personal information"],
            answer: 0,
            explanation: "These details help others understand the work and evaluate your contribution."
          },
          {
            question: "What does a course certificate establish?",
            options: ["It documents the completion or assessment it represents", "It guarantees every employer will hire you", "It proves every skill without evidence", "It replaces all practical experience"],
            answer: 0,
            explanation: "A certificate should accurately represent the course or assessment completed, not guarantee employment."
          }
        ]
      }
    ]
  }
];
 // =========================================================
// PART 3: NEXTORA ACADEMY INTERFACE
// Course browsing, lessons, quizzes and saved progress
// =========================================================

export const allCourses = [...initialCourses, ...additionalCourses];

const getDepartment = (course) => {
  return departments.find(
    (department) =>
      department.id === course.departmentId ||
      department.code === course.departmentId
  );
};

const getCourseLessons = (course) => {
  return course?.lessons || [];
};

const getStorageKey = () => "nextora-academy-progress-v1";

const readProgress = () => {
  try {
    const saved = localStorage.getItem(getStorageKey());
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

export default function AcademyPage({ onBack }) {
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [progress, setProgress] = useState(readProgress);
  const [answers, setAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase();

    return allCourses.filter((course) => {
      const department = getDepartment(course);

      const matchesDepartment =
        selectedDepartment === "all" ||
        department?.id === selectedDepartment;

      const matchesSearch =
        !term ||
        course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term) ||
        course.code.toLowerCase().includes(term) ||
        department?.title.toLowerCase().includes(term);

      return matchesDepartment && matchesSearch;
    });
  }, [search, selectedDepartment]);

  const totalLessons = allCourses.reduce(
    (total, course) => total + getCourseLessons(course).length,
    0
  );

  const completedLessons = Object.values(progress).reduce(
    (total, courseProgress) =>
      total +
      (Array.isArray(courseProgress?.completed)
        ? courseProgress.completed.length
        : 0),
    0
  );

  const overallProgress = totalLessons
    ? Math.min(100, Math.round((completedLessons / totalLessons) * 100))
    : 0;

  const currentLessons = getCourseLessons(selectedCourse);
  const lesson = currentLessons[selectedLesson];

  const currentProgress = selectedCourse
    ? progress[selectedCourse.code] || { completed: [] }
    : { completed: [] };

  const completedInCourse = currentProgress.completed || [];

  const courseProgressPercent = selectedCourse
    ? Math.round(
        (completedInCourse.length /
          Math.max(1, currentLessons.length)) *
          100
      )
    : 0;

  const saveProgress = (courseCode, lessonIndex, completed) => {
    setProgress((previous) => {
      const current = previous[courseCode] || { completed: [] };
      const existing = current.completed || [];

      const nextCompleted = completed
        ? [...new Set([...existing, lessonIndex])]
        : existing.filter((index) => index !== lessonIndex);

      const next = {
        ...previous,
        [courseCode]: {
          ...current,
          completed: nextCompleted,
        },
      };

      try {
        localStorage.setItem(getStorageKey(), JSON.stringify(next));
      } catch {
        // The current session still works if storage is unavailable.
      }

      return next;
    });
  };

  const openCourse = (course) => {
    setSelectedCourse(course);
    setSelectedLesson(0);
    setAnswers({});
    setShowAnswers(false);
    setMobileMenuOpen(false);
  };

  const closeCourse = () => {
    setSelectedCourse(null);
    setSelectedLesson(0);
    setAnswers({});
    setShowAnswers(false);
  };

  const moveLesson = (direction) => {
    const nextIndex = selectedLesson + direction;

    if (nextIndex >= 0 && nextIndex < currentLessons.length) {
      setSelectedLesson(nextIndex);
      setAnswers({});
      setShowAnswers(false);
    }
  };

  const resetCourseProgress = () => {
    if (!selectedCourse) return;

    const confirmed = window.confirm(
      "Reset completed lessons for this course?"
    );

    if (!confirmed) return;

    setProgress((previous) => {
      const next = { ...previous };
      delete next[selectedCourse.code];

      try {
        localStorage.setItem(getStorageKey(), JSON.stringify(next));
      } catch {
        // Continue without persistent storage.
      }

      return next;
    });

    setAnswers({});
    setShowAnswers(false);
  };

  const pageStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(145deg, #f7f7ff 0%, #f3f5ff 50%, #fff8fc 100%)",
    color: "#202344",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    paddingBottom: 40,
  };

  const buttonStyle = {
    border: "none",
    borderRadius: 12,
    padding: "11px 16px",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 14,
  };

  const primaryButton = {
    ...buttonStyle,
    background: "#6657d9",
    color: "#fff",
  };

  const secondaryButton = {
    ...buttonStyle,
    background: "#eeecff",
    color: "#5143bd",
  };

  const cardStyle = {
    background: "#fff",
    border: "1px solid #e7e7f5",
    borderRadius: 20,
    padding: 20,
    boxShadow: "0 8px 28px rgba(53, 48, 110, 0.055)",
  };

  const mutedStyle = {
    color: "#70738f",
    fontSize: 13,
    lineHeight: 1.7,
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "5px 9px",
    background: "#f0efff",
    color: "#6253ca",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 800,
  };

  return (
    <div style={pageStyle}>
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #e7e7f5",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "auto",
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                display: "grid",
                placeItems: "center",
                color: "#fff",
                background: "linear-gradient(135deg, #7567ec, #a88bf5)",
              }}
            >
              <GraduationCap size={23} />
            </div>

            <div>
              <div style={{ fontSize: 19, fontWeight: 900 }}>
                NEXTORA <span style={{ color: "#7567ec" }}>Academy</span>
              </div>
              <div style={{ ...mutedStyle, fontSize: 11 }}>
                Learn. Practice. Build your future.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            {onBack && (
              <button
                style={secondaryButton}
                onClick={onBack}
                aria-label="Return to dashboard"
              >
                <ArrowLeft size={15} style={{ verticalAlign: "middle" }} />{" "}
                <span className="nextora-back-label">Dashboard</span>
              </button>
            )}

            <button
              style={{ ...secondaryButton, padding: 11 }}
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-label="Toggle department menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1180, margin: "auto", padding: "26px 20px" }}>
        {/* COURSE LESSON VIEW */}
        {selectedCourse ? (
          <div>
            <button
              style={{ ...secondaryButton, marginBottom: 18 }}
              onClick={closeCourse}
            >
              <ArrowLeft size={15} style={{ verticalAlign: "middle" }} />{" "}
              All courses
            </button>

            <section
              style={{
                ...cardStyle,
                background:
                  "linear-gradient(120deg, #fff 0%, #f1efff 100%)",
                marginBottom: 20,
              }}
            >
              <div style={badgeStyle}>{selectedCourse.code}</div>

              <h1
                style={{
                  fontSize: "clamp(25px, 4vw, 36px)",
                  lineHeight: 1.2,
                  margin: "14px 0 8px",
                }}
              >
                {selectedCourse.title}
              </h1>

              <p style={{ color: "#626582", lineHeight: 1.8 }}>
                {selectedCourse.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginTop: 16,
                }}
              >
                <span style={badgeStyle}>
                  <Clock3 size={13} /> {selectedCourse.duration}
                </span>
                <span style={badgeStyle}>{selectedCourse.level}</span>
                <span style={badgeStyle}>
                  {completedInCourse.length}/{currentLessons.length} lessons
                  completed
                </span>
              </div>
  {/* COURSE PROGRESS */}
<div
style={{
height: 8,
background: "#eeedf7",
borderRadius: 20,
overflow: "hidden",
marginTop: 18,
}}
>
<div
style={{
width: "${courseProgressPercent}%",
height: "100%",
background: "#7567ec",
borderRadius: 20,
transition: "width 0.25s",
}}
/>
</div>
</section>

        <AcademyPdfLibrary
          departmentCode={
            departments.find(
              (department) => department.id === selectedCourse.departmentId
            )?.code || selectedCourse.code.split("-").slice(0, 2).join("-")
          }
        />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: 20,
                alignItems: "start",
              }}
            >
              {/* LESSON NAVIGATION */}
              <aside style={cardStyle}>
                <h2 style={{ fontSize: 17, marginTop: 0 }}>
                  <BookOpen
                    size={18}
                    style={{ verticalAlign: "middle", marginRight: 7 }}
                  />
                  Course lessons
                </h2>

                {currentLessons.map((item, index) => {
                  const isComplete = completedInCourse.includes(index);
                  const active = selectedLesson === index;

                  return (
                    <button
                      key={`${selectedCourse.code}-${index}`}
                      onClick={() => {
                        setSelectedLesson(index);
                        setAnswers({});
                        setShowAnswers(false);
                      }}
                      style={{
                        display: "flex",
                        width: "100%",
                        textAlign: "left",
                        gap: 10,
                        alignItems: "flex-start",
                        padding: 12,
                        marginBottom: 7,
                        borderRadius: 12,
                        border: active
                          ? "1px solid #8e82ed"
                          : "1px solid #ececf6",
                        background: active ? "#f1efff" : "#fff",
                        color: "#292a4a",
                        cursor: "pointer",
                      }}
                    >
                      {isComplete ? (
                        <CheckCircle2 size={17} color="#299b77" />
                      ) : (
                        <PlayCircle size={17} color="#8274df" />
                      )}

                      <span style={{ fontSize: 13, lineHeight: 1.5 }}>
                        {index + 1}. {item.title}
                      </span>
                    </button>
                  );
                })}

                <button
                  style={{
                    ...secondaryButton,
                    width: "100%",
                    marginTop: 12,
                  }}
                  onClick={resetCourseProgress}
                >
                  <RotateCcw
                    size={14}
                    style={{ verticalAlign: "middle", marginRight: 5 }}
                  />
                  Reset course progress
                </button>
              </aside>

              {/* LESSON CONTENT */}
              <section style={cardStyle}>
                {lesson ? (
                  <>
                    <div style={badgeStyle}>
                      Lesson {selectedLesson + 1} of {currentLessons.length}
                    </div>

                    <h2
                      style={{
                        fontSize: "clamp(22px, 3vw, 29px)",
                        lineHeight: 1.3,
                      }}
                    >
                      {lesson.title}
                    </h2>

                    <div
                      style={{
                        whiteSpace: "pre-line",
                        lineHeight: 1.95,
                        color: "#454765",
                        fontSize: 15,
                      }}
                    >
                      {lesson.content}
                    </div>

                    {lesson.example && (
                      <div
                        style={{
                          background: "#f5f3ff",
                          borderLeft: "4px solid #8172e7",
                          borderRadius: "0 12px 12px 0",
                          padding: 16,
                          marginTop: 22,
                        }}
                      >
                        <h3 style={{ margin: "0 0 8px", fontSize: 15 }}>
                          <Lightbulb
                            size={17}
                            style={{
                              verticalAlign: "middle",
                              marginRight: 7,
                            }}
                          />
                          Practical example
                        </h3>
                        <div style={{ lineHeight: 1.8, fontSize: 14 }}>
                          {lesson.example}
                        </div>
                      </div>
                    )}

                    {lesson.exercise && (
                      <div
                        style={{
                          background: "#eefaf6",
                          border: "1px solid #d8f1e8",
                          borderRadius: 14,
                          padding: 16,
                          marginTop: 16,
                        }}
                      >
                        <h3 style={{ margin: "0 0 8px", fontSize: 15 }}>
                          <Target
                            size={17}
                            style={{
                              verticalAlign: "middle",
                              marginRight: 7,
                            }}
                          />
                          Your practice task
                        </h3>
                        <p style={{ lineHeight: 1.8, margin: 0 }}>
                          {lesson.exercise}
                        </p>
                      </div>
                    )}

                    {/* REVISION QUESTIONS */}
                    {lesson.questions?.length > 0 && (
                      <div style={{ marginTop: 26 }}>
                        <h3 style={{ fontSize: 19 }}>
                          <ClipboardCheck
                            size={19}
                            style={{
                              verticalAlign: "middle",
                              marginRight: 7,
                            }}
                          />
                          Check your understanding
                        </h3>

                        {lesson.questions.map((question, questionIndex) => {
                          const selectedAnswer =
                            answers[questionIndex] ?? null;
                          const answered = selectedAnswer !== null;
                          const correct =
                            selectedAnswer === question.answer;

                          return (
                            <div
                              key={`${selectedCourse.code}-${selectedLesson}-${questionIndex}`}
                              style={{
                                border: "1px solid #e8e8f4",
                                borderRadius: 14,
                                padding: 15,
                                marginTop: 13,
                              }}
                            >
                              <p
                                style={{
                                  fontWeight: 800,
                                  lineHeight: 1.7,
                                  marginTop: 0,
                                }}
                              >
                                {questionIndex + 1}. {question.question}
                              </p>

                              <div
                                style={{
                                  display: "grid",
                                  gap: 8,
                                }}
                              >
                                {question.options.map((option, optionIndex) => {
                                  const isSelected =
                                    selectedAnswer === optionIndex;
                                  const isCorrect =
                                    optionIndex === question.answer;

                                  return (
                                    <button
                                      key={optionIndex}
                                      onClick={() => {
                                        setAnswers((previous) => ({
                                          ...previous,
                                          [questionIndex]: optionIndex,
                                        }));
                                        setShowAnswers(false);
                                      }}
                                      style={{
                                        textAlign: "left",
                                        padding: 12,
                                        borderRadius: 10,
                                        cursor: "pointer",
                                        border:
                                          showAnswers && isCorrect
                                            ? "1px solid #46ae87"
                                            : isSelected
                                              ? "1px solid #8172e7"
                                              : "1px solid #e7e7f2",
                                        background:
                                          showAnswers && isCorrect
                                            ? "#eaf9f2"
                                            : isSelected
                                              ? "#f1efff"
                                              : "#fff",
                                        color: "#30314f",
                                      }}
                                    >
                                 {String.fromCharCode(65 + optionIndex)}.{" "}
                                      {option}
                                    </button>
                                  );
                                })}
                              </div>

                              {showAnswers && answered && (
                                <div
                                  style={{
                                    marginTop: 12,
                                    color: correct ? "#16815f" : "#b44a59",
                                    lineHeight: 1.7,
                                    fontSize: 13,
                                  }}
                                >
                                  <strong>
                                    {correct ? "Correct!" : "Not quite."}
                                  </strong>{" "}
                                  {question.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        <button
                          style={{ ...primaryButton, marginTop: 15 }}
                          onClick={() => setShowAnswers(true)}
                        >
                          Check answers
                        </button>

                        {showAnswers && (
                          <div style={{ ...mutedStyle, marginTop: 12 }}>
                            Score:{" "}
                            {
                              lesson.questions.filter(
                                (question, index) =>
                                  answers[index] === question.answer
                              ).length
                            }{" "}
                            / {lesson.questions.length}. You can change an
                            answer and check again.
                          </div>
                        )}
                      </div>
                    )}

                    {/* LESSON ACTIONS */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        marginTop: 28,
                        paddingTop: 20,
                        borderTop: "1px solid #ededf6",
                      }}
                    >
                      <button
                        style={secondaryButton}
                        disabled={selectedLesson === 0}
                        onClick={() => moveLesson(-1)}
                      >
                        <ArrowLeft
                          size={15}
                          style={{ verticalAlign: "middle" }}
                        />{" "}
                        Previous
                      </button>

                      <button
                        style={{
                          ...primaryButton,
                          background: completedInCourse.includes(selectedLesson)
                            ? "#248568"
                            : "#6657d9",
                        }}
                        onClick={() =>
                          saveProgress(
                            selectedCourse.code,
                            selectedLesson,
                            !completedInCourse.includes(selectedLesson)
                          )
                        }
                      >
                        <CheckCircle2
                          size={15}
                          style={{ verticalAlign: "middle" }}
                        />{" "}
                        {completedInCourse.includes(selectedLesson)
                          ? "Mark incomplete"
                          : "Mark lesson complete"}
                      </button>

                      <button
                        style={secondaryButton}
                        disabled={
                          selectedLesson === currentLessons.length - 1
                        }
                        onClick={() => moveLesson(1)}
                      >
                        Next{" "}
                        <ArrowRight
                          size={15}
                          style={{ verticalAlign: "middle" }}
                        />
                      </button>
                    </div>
                  </>
                ) : (
                  <p>No lessons are available in this course yet.</p>
                )}
              </section>
            </div>
          </div>
        ) : (
          <>
{/* ACADEMY HERO — PREMIUM PURPLE & WHITE */}
<section
style={{
...cardStyle,
padding: "clamp(24px, 5vw, 44px)",
background:
"linear-gradient(135deg, #ffffff 0%, #f2efff 58%, #faf7ff 100%)",
border: "1px solid #e5defe",
borderRadius: 26,
position: "relative",
overflow: "hidden",
}}
>
<div
style={{
position: "absolute",
top: -65,
right: -45,
width: 190,
height: 190,
borderRadius: "50%",
background: "rgba(139, 119, 255, 0.09)",
pointerEvents: "none",
}}
/>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                ...badgeStyle,
                padding: "8px 12px",
                letterSpacing: "0.5px",
                background: "#ebe6ff",
              }}
            >
              <Sparkles size={14} />
              WELCOME TO NEXTORA ACADEMY
            </div>

            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 50px)",
                lineHeight: 1.12,
                letterSpacing: "-1.5px",
                margin: "22px 0 14px",
                maxWidth: 680,
                fontWeight: 900,
                color: "#222044",
              }}
            >
              Your next skill.
              <br />
              Your next <span style={{ color: "#7056d9" }}>opportunity.</span>
            </h1>

            <p
              style={{
                color: "#686580",
                lineHeight: 1.9,
                maxWidth: 650,
                fontSize: 15,
                margin: "0 0 22px",
              }}
            >
              Learn practical skills in artificial intelligence,
              technology, business, health education, cybersecurity,
              and more. Study at your own pace and build your future
              one lesson at a time.
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                padding: "11px 15px",
                borderRadius: 12,
                background: "#7056d9",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: 13,
              }}
            >
              <GraduationCap size={18} />
              Learn. Practice. Grow.
            </div>
          </div>

          {/* STUDENT LEARNING OVERVIEW */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 135px), 1fr))",
              gap: 12,
              marginTop: 30,
              position: "relative",
              zIndex: 1,
            }}
          >
            {[
              {
                label: "Departments",
                value: departments.length,
                icon: GraduationCap,
                detail: "Explore learning areas",
              },
              {
                label: "Courses",
                value: allCourses.length,
                icon: BookOpen,
                detail: "Available courses",
              },
              {
                label: "Total lessons",
                value: totalLessons,
                icon: PlayCircle,
                detail: "Lessons to explore",
              },
              {
                label: "Lessons completed",
                value: completedLessons,
                icon: CheckCircle2,
                detail: `${overallProgress}% overall progress`,
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  style={{
                    background: "rgba(255, 255, 255, 0.92)",
                    border: "1px solid #e8e2fc",
                    borderRadius: 17,
                    padding: "17px 15px",
                    minWidth: 0,
                    boxShadow: "0 5px 18px rgba(74, 56, 145, 0.045)",
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 12,
                      background: "#eee9ff",
                      color: "#7056d9",
                    }}
                  >
                    <Icon size={20} />
                  </div>

                  <div
                    style={{
                      fontSize: 28,
                      lineHeight: 1.2,
                      fontWeight: 900,
                      color: "#28234f",
                      marginTop: 14,
                    }}
                  >
                    {stat.value}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: "#514a77",
                      marginTop: 5,
                    }}
                  >
                    {stat.label}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color: "#85809f",
                      lineHeight: 1.6,
                      marginTop: 5,
                    }}
                  >
                    {stat.detail}
                  </div>
                </div>
              );
            })}
          </div>

          {/* OVERALL LEARNING PROGRESS */}
          <div style={{ marginTop: 25, position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 9,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#494268",
                }}
              >
                Your learning journey
              </span>

              <span
                style={{
                  fontSize: 13,
                  fontWeight: 900,
                  color: "#7056d9",
                }}
              >
                {overallProgress}%
              </span>
            </div>

            <div
              role="progressbar"
              aria-label="Overall lesson completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={overallProgress}
              style={{
                height: 9,
                borderRadius: 20,
                background: "#e7e1f8",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${overallProgress}%`,
                  height: "100%",
                  borderRadius: 20,
                  background:
                    "linear-gradient(90deg, #7056d9, #a18bff)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            <p
              style={{
                fontSize: 11,
                color: "#85809f",
                margin: "9px 0 0",
                lineHeight: 1.6,
              }}
            >
              Keep learning and completing lessons to build your progress.
            </p>
          </div>
        </section>
            
            {/* SEARCH AND FILTERS */}
            <section style={{ marginTop: 30 }}>
              <h2 style={{ fontSize: 25, marginBottom: 5 }}>
                Explore the Academy
              </h2>
              <p style={{ ...mutedStyle, marginTop: 0 }}>
                Find a course that matches your goals.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(100%, 250px), 1fr))",
                  gap: 12,
                  margin: "20px 0",
                }}
              >
                <label
                  style={{
                    ...cardStyle,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "0 14px",
                  }}
                >
                  <Search size={19} color="#8075ce" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search courses or departments..."
                    aria-label="Search courses"
                    style={{
                      width: "100%",
                      minWidth: 0,
                      border: "none",
                      outline: "none",
                      padding: "17px 0",
                      fontSize: 14,
                      background: "transparent",
                      color: "#292a4a",
                    }}
                  />
                </label>

                <label
                  style={{
                    ...cardStyle,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "0 14px",
                  }}
                >
                  <BookOpen size={19} color="#8075ce" />
                  <select
                    value={selectedDepartment}
                    onChange={(event) =>
                      setSelectedDepartment(event.target.value)
                    }
                    aria-label="Filter by department"
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      padding: "17px 0",
                      fontSize: 14,
                      background: "transparent",
                      color: "#292a4a",
                    }}
                  >
                    <option value="all">All departments</option>
                    {departments.map((department) => (
                      <option key={department.id} value={department.id}>
                        {department.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            {/* DEPARTMENT QUICK FILTERS */}
            {mobileMenuOpen && (
              <section style={{ ...cardStyle, marginBottom: 20 }}>
                <h3 style={{ marginTop: 0 }}>Browse departments</h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
                    gap: 9,
                  }}
                >
                  {departments.map((department) => {
                    const Icon = department.icon;

                    return (
                      <button
                        key={department.id}
                        onClick={() => {
                          setSelectedDepartment(department.id);
                          setMobileMenuOpen(false);
                        }}
                        style={{
                          ...secondaryButton,
                          textAlign: "left",
                          background: "#faf9ff",
                          border: "1px solid #e8e5fb",
                        }}
                      >
                        <Icon
                          size={16}
                          style={{
                            verticalAlign: "middle",
                            marginRight: 7,
                          }}
                        />
                        {department.title}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* COURSE CARDS */}
            <section
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
                gap: 16,
              }}
            >
              {filteredCourses.map((course) => {
                const department = getDepartment(course);
                const Icon = department?.icon || BookOpen;
                const courseDone = progress[course.code]?.completed || [];
                const percent = Math.round(
                  (courseDone.length /
                    Math.max(1, getCourseLessons(course).length)) *
                    100
                );

                return (
                  <article
                    key={course.code}
                    style={{
                      ...cardStyle,
                      display: "flex",
                      flexDirection: "column",
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 15,
                          background: department?.color || "#eeecff",
                          color: "#fff",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <Icon size={22} />
                      </div>
                      <span style={badgeStyle}>{course.level}</span>
                    </div>

                    <div
                      style={{
                        ...mutedStyle,
                        marginTop: 16,
                        fontWeight: 800,
                      }}
                    >
                      {course.code}
                    </div>

                    <h3
                      style={{
                        fontSize: 19,
                        lineHeight: 1.4,
                        margin: "7px 0",
                      }}
                    >
                      {course.title}
                    </h3>

                    <p
                      style={{
                        ...mutedStyle,
                        flexGrow: 1,
                        margin: "0 0 15px",
                      }}
                    >
                      {course.description}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 14,
                      }}
                    >
                      <span style={badgeStyle}>
                        <Clock3 size={12} /> {course.duration}
                      </span>
                      <span style={badgeStyle}>
                        {getCourseLessons(course).length} lessons
                      </span>
                    </div>

                    <div
                      style={{
                        height: 6,
                        borderRadius: 10,
                        background: "#eeedf7",
                        overflow: "hidden",
                        marginBottom: 15,
                      }}
                    >
                      <div
                        style={{
                          width: `${percent}%`,
                          height: "100%",
                          background: "#7b6be7",
                        }}
                      />
                    </div>

                    <button
                      style={{ ...primaryButton, width: "100%" }}
                      onClick={() => openCourse(course)}
                    >
                      {percent === 100 ? "Review course" : "Start learning"}{" "}
                      <ArrowRight
                        size={15}
                        style={{ verticalAlign: "middle" }}
                      />
                    </button>
                  </article>
                );
              })}
            </section>

            {filteredCourses.length === 0 && (
              <div
                style={{
                  ...cardStyle,
                  marginTop: 20,
                  textAlign: "center",
                }}
              >
                <Search
                  size={30}
                  color="#8172e7"
                  style={{ margin: "0 auto" }}
                />
                <h3>No matching courses</h3>
                <p style={mutedStyle}>
                  Try another search or select a different department.
                </p>
                <button
                  style={secondaryButton}
                  onClick={() => {
                    setSearch("");
                    setSelectedDepartment("all");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer
        style={{
          maxWidth: 1180,
          margin: "20px auto 0",
          padding: "24px 20px",
          borderTop: "1px solid #e5e5f2",
          textAlign: "center",
          color: "#777993",
          fontSize: 12,
          lineHeight: 1.9,
        }}
      >
        <div style={{ fontWeight: 900, color: "#5d51c3", fontSize: 14 }}>
          NEXTORA Academy
        </div>
        Learn at your own pace. Build skills through practice.
        <br />
        Educational content is for learning purposes and does not replace
        qualified professional advice.
        <br />
        © {new Date().getFullYear()} Ayanfe Innovation Labs Limited.
      </footer>
    </div>
  );
                      }
