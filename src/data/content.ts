export const profile = {
  name: "Prasad Nathe",
  role: "Software Engineer",
  focus: "Full-Stack / Backend · AI & GenAI",
  location: "Pune, India",
  email: "prasadnathe2018@gmail.com",
  phone: "+91 73785 52793",
  phoneHref: "tel:+917378552793",
  github: "https://github.com/moto23/",
  githubUser: "moto23",
  linkedin: "https://www.linkedin.com/in/prasad-nathe-b91a15227/",
  school: "VIIT Pune",
  educationPeriod: "2022 – 2025",
  cgpa: "8.57 / 10",
  degree: "B.Tech, Information Technology",
  leetcode: "https://leetcode.com/u/prasadnathe17/",
} as const;

export const sections = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;
export const sectionIds = sections.map((section) => section.id);
export type Project = {
  name: string;
  year?: string;
  outcome?: string;
  summary: string;
  category?: string;
  flow?: string[];
  stack: string[];
  live?: string;
  code: string;
};
export const projects: Project[] = [
  {
    name: "KnightForge Sahayak",
    category: "AI paperwork copilot",
    flow: ["Documents", "Extract & reconcile", "Validated KYC"],
    summary: "AI paperwork copilot extracting and validating 15 KYC fields through OCR, semantic matching, and confidence-based conflict resolution. Pinecone-backed RAG, private document storage, and user isolation, deployed with Docker.",
    outcome: "Retrieval latency: 1.8s → 650ms",
    stack: ["Python", "Pinecone", "MiniLM", "Tesseract OCR", "PyMuPDF", "Docker", "Gemini", "Supabase"],
    live: "https://knight-forge-sahayak.vercel.app/",
    code: "https://github.com/moto23/KnightForge-Sahayak",
  },
  {
    name: "DevDynamics Dashboard",
    category: "Developer analytics",
    flow: ["GitHub REST API", "GraphQL analytics", "Team insights"],
    summary: "Commit trends, PR cycle time, and contributor analytics across 6 repositories. A GraphQL API connects ASP.NET Core and SQL Server to an Angular dashboard.",
    outcome: "Up to 94% lower analytics query latency",
    stack: ["ASP.NET Core", "GraphQL", "Angular", "TypeScript", "SQL Server", "Chart.js"],
    live: "https://devdynamics-frontend.onrender.com/",
    code: "https://github.com/moto23/Devdynamics_Analytics",
  },
  {
    name: "StealthMode Courses Website",
    category: "Full-stack e-learning",
    flow: ["Discover courses", "Secure checkout", "Learn"],
    summary: "Course platform with 100 registered users. A modular backend supports JWT role-based access, email OTP via Resend, and Razorpay payments.",
    outcome: "100 registered users",
    stack: ["React", "Node.js", "Express", "MongoDB", "Resend", "Razorpay"],
    live: "https://stealthmode-frontend.vercel.app/",
    code: "https://github.com/moto23/StealthMode_Project",
  },
  {
    name: "AI Wallet",
    year: "2025",
    summary: "Digital wallet on Spring Boot services: registration, JWT auth, transfers, and a Python fraud score with Isolation Forest before money moves.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Python", "RabbitMQ"],
    code: "https://github.com/moto23/AI_Wallet_Managment",
  },
  {
    name: "Sustainable Travel Agent",
    year: "2025",
    summary: "Rasa agent for lower-impact trip planning. It keeps multi-turn context and calls maps, weather, and retrieval tools instead of guessing a route.",
    stack: ["Python", "Rasa", "Docker", "Pinecone"],
    code: "https://github.com/moto23/ai-sustainable-travel-agent",
  },
  {
    name: "Bajaj Finserv Chatbot",
    year: "2025",
    summary: "Conversational client for financial questions, with LangChain-backed responses and a TypeScript interface shaped for a Bajaj Finserv brief.",
    stack: ["TypeScript", "LangChain", "WebSockets"],
    code: "https://github.com/moto23/bajaj-chatbot",
  },
];
export const skillGroups = [
  { label: "Languages", items: ["C#", "Python", "JavaScript", "TypeScript", "SQL", "C++"] },
  { label: "Backend", items: ["ASP.NET Core", "EF Core", "FastAPI", "Node.js", "Express.js", "REST APIs", "GraphQL"] },
  { label: "Frontend", items: ["React", "Angular", "Redux", "HTML", "CSS"] },
  { label: "Data & cloud", items: ["SQL Server", "MySQL", "MongoDB", "Redis", "Azure", "AWS", "Docker", "Azure DevOps", "CI/CD"] },
  { label: "AI / GenAI", items: ["LLMs", "RAG", "LangChain", "Pinecone", "Sentence Transformers", "Prompt Engineering"] },
  { label: "Engineering tools", items: ["Git", "GitHub", "Postman", "Swagger", "SonarQube", "Celery", "WebSockets"] },
] as const;
export const certifications = [
  "Microsoft Certified: Azure AI Cloud Developer Associate",
  "Oracle Cloud Infrastructure 2025 Generative AI Professional",
] as const;
export const coursework = ["DBMS", "Operating Systems", "Computer Networks", "OOP", "Software Engineering"] as const;
export const experience = [
  {
    period: "Dec 2025 – Apr 2026",
    role: "Digital Specialist Engineer",
    org: "Infosys Limited · Mysore",
    points: [
      "Built real-time financial analytics using ASP.NET Core, Angular, and WebSockets.",
      "Developed 3 ASP.NET Core and EF Core microservices and optimized SQL Server queries.",
      "Worked with Azure DevOps CI/CD, SonarQube, and Swagger/OpenAPI; achieved 90% unit test coverage.",
    ],
  },
  {
    period: "Jun 2025 – Nov 2025",
    role: "Software Developer",
    org: "KGamify · Remote / Mumbai",
    points: [
      "Developed REST APIs for a platform serving 400+ users, with MySQL optimization and Redis caching.",
      "Used FastAPI and Celery for asynchronous processing.",
      "Built recommendations across 200+ listings using Sentence Transformers and vector embeddings, improving recommendation relevance by 27%.",
    ],
  },
] as const;
