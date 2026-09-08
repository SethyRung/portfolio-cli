export type ProfileConfig = {
  displayName: string;
  taglines: readonly [string, string, ...string[]];
  bio: string;
  jobTitle: string;
  location: string;
};

export const profile = {
  displayName: "Sethy Rung",
  taglines: ["Full Stack Developer", "Cross-Platform Enthusiast"],
  bio: "Building software across web, mobile, and desktop platforms with modern technologies",
  jobTitle: "Full Stack Developer",
  location: "Phnom Penh, Cambodia",
} as const satisfies ProfileConfig;
