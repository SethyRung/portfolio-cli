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

export type ProjectEntry = {
  title: string;
  description: string;
  stacks: readonly string[];
  repo: string;
  backend?: string;
  live?: string;
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
  projects: readonly ProjectEntry[];
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
  projects: [
    {
      title: "Movies",
      description: "Movie and TV series discovery",
      stacks: ["Nuxt", "Tailwind CSS"],
      repo: "https://github.com/SethyRung/movies",
      live: "https://movies.sethyrung.com",
    },
    {
      title: "Helpdesk",
      description: "Role-based tickets + Keycloak",
      stacks: ["Vue", "Spring Boot", "Keycloak", "PostgreSQL"],
      repo: "https://github.com/SethyRung/helpdesk",
    },
    {
      title: "The Angkor Times",
      description: "News site, Directus CMS",
      stacks: ["Nuxt 4", "Tailwind CSS", "Directus", "PostgreSQL"],
      repo: "https://github.com/SethyRung/The-Angkor-Times",
      live: "https://the-angkor-times.vercel.app",
    },
    {
      title: "Nuxt Boilerplate",
      description: "Starter template for Nuxt apps",
      stacks: ["Nuxt 4", "TypeScript", "Tailwind", "ESLint", "Prettier"],
      repo: "https://github.com/SethyRung/Nuxt-Boilerplate",
    },
    {
      title: "Flutter Docs",
      description: "Flutter documentation site",
      stacks: ["Nuxt 4", "Nuxt Content", "Nuxt UI", "Tailwind CSS", "Vue 3"],
      repo: "https://github.com/SethyRung/Flutter-Docs",
      live: "https://flutter-docs.vercel.app",
    },
    {
      title: "Asset Management",
      description: "Assets, categories, roles",
      stacks: ["Nuxt 4", "Tailwind CSS", "Spring Boot", "Java", "PostgreSQL"],
      repo: "https://github.com/SethyRung/Asset-Management-Frontend",
      backend: "https://github.com/SethyRung/Asset-Management-Backend",
      live: "https://asset-management-sethyrung.vercel.app",
    },
    {
      title: "Chongkran",
      description: "Recipes, favorites, meal plans",
      stacks: ["Nuxt 4", "Tailwind CSS", "Nuxt UI", "NestJS", "MongoDB"],
      repo: "https://github.com/SethyRung/Chongkran-Frontend",
      backend: "https://github.com/SethyRung/Chongkran-Backend",
      live: "https://chongkran-sethyrung.vercel.app",
    },
    {
      title: "Movie Website",
      description: "React movie discovery",
      stacks: ["React", "Tailwind CSS"],
      repo: "https://github.com/SethyRung/Movie-Website-React",
      live: "https://sethyrung-movie-react.vercel.app",
    },
    {
      title: "Mart Management System",
      description: "Desktop mart ops + inventory",
      stacks: ["C#", ".NET Framework / WinForms", "Microsoft SQL Server"],
      repo: "https://github.com/SethyRung/Mart-Management-System",
    },
    {
      title: "EasyPay",
      description: "Kotlin mobile payments",
      stacks: ["Kotlin", "TypeScript"],
      repo: "https://github.com/SethyRung/EasyPay",
      backend: "https://github.com/SethyRung/easypay-backend",
    },
    {
      title: "Glitch",
      description: "E-commerce catalog + cart",
      stacks: ["Nuxt", "Tailwind CSS"],
      repo: "https://github.com/SethyRung/glitch",
    },
  ],
} as const satisfies ProfileConfig;
