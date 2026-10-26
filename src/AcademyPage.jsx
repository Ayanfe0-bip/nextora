import React, { useMemo, useState } from "react";
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
    
