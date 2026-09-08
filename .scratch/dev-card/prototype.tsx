import { useState } from "react";
import { useKeyboard, useRenderer } from "@opentui/react";
import { theme } from "../../src/theme.ts";
import { profile } from "../../src/config/profile.ts";

const TABS = [
  { name: "About", description: "who I am", value: 0 },
  { name: "Skills", description: "stack", value: 1 },
  { name: "Projects", description: "work", value: 2 },
  { name: "Contact", description: "links", value: 3 },
] as const;

const SKILLS = [
  {
    title: "Frontend",
    accent: theme.mauve,
    items: ["Vue.js", "Nuxt.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    title: "Backend",
    accent: theme.green,
    items: ["Node.js", "Bun", "Spring Boot", "NestJS", "FastAPI", "Directus"],
  },
  {
    title: "Database",
    accent: theme.blue,
    items: ["PostgreSQL", "SQL Server", "MongoDB"],
  },
  {
    title: "Tools",
    accent: theme.peach,
    items: ["Vite", "Docker", "Git"],
  },
  {
    title: "Mobile",
    accent: theme.teal,
    items: ["Kotlin", "Flutter"],
  },
] as const;

const PROJECTS = [
  {
    name: "Movies",
    description: "Movie and TV series discovery",
    tags: "Nuxt · Tailwind",
    repo: "github.com/SethyRung/movies",
    live: "movies.sethyrung.com",
  },
  {
    name: "Helpdesk",
    description: "Role-based tickets + Keycloak",
    tags: "Vue · Spring Boot · PG",
    repo: "github.com/SethyRung/helpdesk",
  },
  {
    name: "The Angkor Times",
    description: "News site, Directus CMS",
    tags: "Nuxt · Directus · PG",
    repo: "github.com/SethyRung/The-Angkor-Times",
    live: "the-angkor-times.vercel.app",
  },
  {
    name: "Nuxt Boilerplate",
    description: "Starter template for Nuxt apps",
    tags: "Nuxt · TypeScript",
    repo: "github.com/SethyRung/Nuxt-Boilerplate",
  },
  {
    name: "Flutter Docs",
    description: "Flutter documentation site",
    tags: "Nuxt · Content · UI",
    repo: "github.com/SethyRung/Flutter-Docs",
    live: "flutter-docs.vercel.app",
  },
  {
    name: "Asset Management",
    description: "Assets, categories, roles",
    tags: "Nuxt · Spring · PG",
    repo: "github.com/SethyRung/Asset-Management-Frontend",
    live: "asset-management-sethyrung.vercel.app",
  },
  {
    name: "Chongkran",
    description: "Recipes, favorites, meal plans",
    tags: "Nuxt · NestJS",
    repo: "github.com/SethyRung/Chongkran-Frontend",
    live: "chongkran-sethyrung.vercel.app",
  },
  {
    name: "Movie Website",
    description: "React movie discovery",
    tags: "React · Tailwind",
    repo: "github.com/SethyRung/Movie-Website-React",
    live: "sethyrung-movie-react.vercel.app",
  },
  {
    name: "Mart Management",
    description: "Desktop mart ops + inventory",
    tags: "C# · SQL Server",
    repo: "github.com/SethyRung/Mart-Management-System",
  },
  {
    name: "EasyPay",
    description: "Kotlin mobile payments",
    tags: "Kotlin",
    repo: "github.com/SethyRung/EasyPay",
  },
  {
    name: "Glitch",
    description: "E-commerce catalog + cart",
    tags: "Nuxt · Tailwind",
    repo: "github.com/SethyRung/glitch",
  },
] as const;

const CONTACTS = [
  { name: "GitHub", description: "sethyrung", url: "github.com/sethyrung" },
  { name: "LinkedIn", description: "sethyrung", url: "linkedin.com/in/sethy-rung-146709299" },
  { name: "X", description: "@sethyrung", url: "x.com/sethyrung" },
  { name: "Discord", description: "sethyrung", url: "discord.com/users/sethyrung" },
  { name: "Telegram", description: "sethyrung", url: "t.me/sethyrung" },
  { name: "Website", description: "sethyrung.com", url: "sethyrung.com" },
  { name: "Email", description: "rungsethyhk@gmail.com", url: "mailto:rungsethyhk@gmail.com" },
] as const;

export function Prototype({ initialTab = 0 }: { initialTab?: number }) {
  const renderer = useRenderer();
  const [tab, setTab] = useState(initialTab);
  const [project, setProject] = useState(0);
  const [contact, setContact] = useState(0);

  useKeyboard((key) => {
    if (renderer.isDestroyed) return;
    if (key.name === "q" || key.name === "escape") {
      renderer.destroy();
      return;
    }
    if (key.name === "left") {
      setTab((t) => (t + 3) % 4);
      return;
    }
    if (key.name === "right") {
      setTab((t) => (t + 1) % 4);
      return;
    }
    if (key.name >= "1" && key.name <= "4") {
      setTab(Number(key.name) - 1);
    }
  });

  const selectedProject = PROJECTS[project] ?? PROJECTS[0];
  const selectedContact = CONTACTS[contact] ?? CONTACTS[0];

  return (
    <box
      flexDirection="column"
      flexGrow={1}
      backgroundColor={theme.base}
      border
      borderStyle="rounded"
      borderColor={theme.mauve}
      title=" @sethyrung/portfolio "
      titleColor={theme.mauve}
      bottomTitle=" 1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit "
      bottomTitleAlignment="left"
      padding={1}
    >
      <box flexDirection="row" alignItems="flex-end" gap={2}>
        <ascii-font font="tiny" text={profile.displayName} color={theme.mauve} />
        <box flexDirection="column" flexGrow={1} justifyContent="flex-end">
          <text fg={theme.teal}>{profile.taglines.join(" / ")}</text>
          <text fg={theme.subtext}>{profile.location}</text>
        </box>
      </box>

      <tab-select
        options={[...TABS]}
        selectedIndex={tab}
        tabWidth={18}
        backgroundColor={theme.base}
        textColor={theme.subtext}
        selectedBackgroundColor={theme.mauve}
        selectedTextColor={theme.crust}
        selectedDescriptionColor={theme.blue}
        showDescription
        showUnderline
        wrapSelection
        height={3}
      />

      <box flexGrow={1} marginTop={1}>
        {tab === 0 ? (
          <box flexDirection="row" gap={1} flexGrow={1}>
            <box
              flexGrow={1}
              border
              borderStyle="rounded"
              borderColor={theme.blue}
              title=" Identity "
              titleColor={theme.blue}
              padding={1}
              backgroundColor={theme.mantle}
            >
              <text fg={theme.text}>{profile.bio}</text>
              <text />
              <text fg={theme.peach}>{profile.jobTitle}</text>
              <text fg={theme.subtext}>InnoBlock Technology</text>
              <text fg={theme.subtext}>{profile.location}</text>
              <text />
              <text fg={theme.green}>BSc Computer Science</text>
              <text fg={theme.subtext}>Royal University of Phnom Penh</text>
              <text fg={theme.subtext}>2019 – 2023</text>
            </box>
            <box
              flexGrow={2}
              border
              borderStyle="rounded"
              borderColor={theme.teal}
              title=" About "
              titleColor={theme.teal}
              padding={1}
              backgroundColor={theme.mantle}
            >
              <text fg={theme.text}>
                • Software Developer working across web, mobile, and desktop platforms.
              </text>
              <text fg={theme.text}>
                • Experienced in Vue.js, Nuxt.js, TypeScript, React, Java, Spring Boot, C#, and
                Kotlin.
              </text>
              <text fg={theme.text}>
                • Passionate about exploring new technologies and turning ideas into polished
                projects.
              </text>
            </box>
          </box>
        ) : tab === 1 ? (
          <box flexDirection="row" flexWrap="wrap" gap={1} flexGrow={1}>
            {SKILLS.map((group) => (
              <box
                key={group.title}
                border
                borderStyle="rounded"
                borderColor={group.accent}
                title={` ${group.title} `}
                titleColor={group.accent}
                padding={1}
                width="32%"
                backgroundColor={theme.mantle}
              >
                {group.items.map((item) => (
                  <text key={item} fg={group.accent}>
                    {item}
                  </text>
                ))}
              </box>
            ))}
          </box>
        ) : tab === 2 ? (
          <box flexDirection="row" gap={1} flexGrow={1}>
            <box
              flexGrow={2}
              flexDirection="column"
              border
              borderStyle="rounded"
              borderColor={theme.blue}
              title=" Projects "
              titleColor={theme.blue}
              backgroundColor={theme.mantle}
            >
              <select
                focused
                flexGrow={1}
                options={[...PROJECTS]}
                selectedIndex={project}
                showDescription
                showSelectionIndicator
                showScrollIndicator
                selectedBackgroundColor={theme.blue}
                selectedTextColor={theme.crust}
                selectedDescriptionColor={theme.crust}
                descriptionColor={theme.subtext}
                textColor={theme.text}
                backgroundColor={theme.mantle}
                onChange={(index) => setProject(index)}
              />
            </box>
            <box
              width="38%"
              border
              borderStyle="rounded"
              borderColor={theme.peach}
              title=" Selected "
              titleColor={theme.peach}
              padding={1}
              backgroundColor={theme.mantle}
            >
              <text fg={theme.peach}>{selectedProject.name}</text>
              <text fg={theme.subtext}>{selectedProject.tags}</text>
              <text />
              <text fg={theme.subtext}>{selectedProject.description}</text>
              <text />
              <text fg={theme.blue}>repo {selectedProject.repo}</text>
              {"live" in selectedProject && selectedProject.live ? (
                <text fg={theme.teal}>live {selectedProject.live}</text>
              ) : (
                <text fg={theme.subtext}>live —</text>
              )}
              <text />
              <text fg={theme.subtext}>enter opens repo</text>
            </box>
          </box>
        ) : (
          <box flexDirection="row" gap={1} flexGrow={1}>
            <box
              flexGrow={1}
              flexDirection="column"
              border
              borderStyle="rounded"
              borderColor={theme.green}
              title=" Channels "
              titleColor={theme.green}
              backgroundColor={theme.mantle}
            >
              <select
                focused
                flexGrow={1}
                options={[...CONTACTS]}
                selectedIndex={contact}
                showDescription
                showSelectionIndicator
                selectedBackgroundColor={theme.green}
                selectedTextColor={theme.crust}
                selectedDescriptionColor={theme.crust}
                descriptionColor={theme.subtext}
                textColor={theme.text}
                backgroundColor={theme.mantle}
                onChange={(index) => setContact(index)}
              />
            </box>
            <box
              width="42%"
              border
              borderStyle="rounded"
              borderColor={theme.teal}
              title=" Open "
              titleColor={theme.teal}
              padding={1}
              backgroundColor={theme.mantle}
            >
              <text fg={theme.green}>{selectedContact.name}</text>
              <text fg={theme.text}>{selectedContact.description}</text>
              <text />
              <text fg={theme.teal}>{selectedContact.url}</text>
              <text />
              <text fg={theme.subtext}>enter opens in browser</text>
            </box>
          </box>
        )}
      </box>
    </box>
  );
}
