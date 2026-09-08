export type EducationHighlight = {
  degree: string;
  school: string;
  years: string;
};

export const TECH_CATEGORIES = ["Frontend", "Backend", "Database", "Tools", "Mobile"] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

export type TechStackEntry = {
  title: string;
  category: TechCategory;
};

export type ProfileConfig = {
  displayName: string;
  taglines: readonly [string, string, ...string[]];
  bio: string;
  about: string;
  jobTitle: string;
  employer: string;
  location: string;
  education: EducationHighlight;
  techStack: readonly TechStackEntry[];
};

export const profile = {
  displayName: "Sethy Rung",
  taglines: ["Full Stack Developer", "Cross-Platform Enthusiast"],
  bio: "Building software across web, mobile, and desktop platforms with modern technologies",
  about: `
- **Software Developer** working across **web, mobile, and desktop platforms**.
- Experienced in **Vue.js, Nuxt.js, TypeScript, React, Java, Spring Boot, C#, and Kotlin**.
- Passionate about exploring new technologies and turning ideas into reality through polished, thoughtfully crafted projects.
`,
  jobTitle: "Full Stack Developer",
  employer: "InnoBlock Technology",
  location: "Phnom Penh, Cambodia",
  education: {
    degree: "BSc Computer Science",
    school: "Royal University of Phnom Penh",
    years: "2019 – 2023",
  },
  techStack: [
    { title: "Vue.js", category: "Frontend" },
    { title: "Nuxt.js", category: "Frontend" },
    { title: "React", category: "Frontend" },
    { title: "TypeScript", category: "Frontend" },
    { title: "Tailwind CSS", category: "Frontend" },
    { title: "GSAP", category: "Frontend" },
    { title: "Node.js", category: "Backend" },
    { title: "Bun", category: "Backend" },
    { title: "Spring Boot", category: "Backend" },
    { title: "NestJS", category: "Backend" },
    { title: "FastAPI", category: "Backend" },
    { title: "Directus", category: "Backend" },
    { title: "PostgreSQL", category: "Database" },
    { title: "Microsoft SQL Server", category: "Database" },
    { title: "MongoDB", category: "Database" },
    { title: "Vite", category: "Tools" },
    { title: "Docker", category: "Tools" },
    { title: "Git", category: "Tools" },
    { title: "Kotlin", category: "Mobile" },
    { title: "Flutter", category: "Mobile" },
  ],
} as const satisfies ProfileConfig;
