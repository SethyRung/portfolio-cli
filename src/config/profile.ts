export type EducationHighlight = {
  degree: string;
  school: string;
  years: string;
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
} as const satisfies ProfileConfig;
