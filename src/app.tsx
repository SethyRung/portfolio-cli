import { useRef, useState } from "react";
import { useKeyboard, useRenderer } from "@opentui/react";
import {
  TECH_CATEGORIES,
  profile,
  type TechCategory,
  type TechStackEntry,
} from "./config/profile.ts";
import { theme } from "./theme.ts";

const HINT = "1-4 tabs · ←/→ cycle · ↑/↓ select · enter open · q/esc quit";

function aboutBullets(markdown: string): string[] {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).replaceAll("**", ""));
}

const CATEGORY_ACCENT: Record<TechCategory, string> = {
  Frontend: theme.mauve,
  Backend: theme.green,
  Database: theme.blue,
  Tools: theme.peach,
  Mobile: theme.teal,
};

function displayUrl(url: string): string {
  return url.replace(/^https:\/\//, "").replace(/\/$/, "");
}

type OpenTarget = "live" | "repo" | "backend";
type ProfileProject = (typeof profile.projects)[number];

function projectHasLive(project: ProfileProject): project is ProfileProject & { live: string } {
  return "live" in project && typeof project.live === "string";
}

function projectHasBackend(
  project: ProfileProject,
): project is ProfileProject & { backend: string } {
  return "backend" in project && typeof project.backend === "string";
}

function projectTargets(project: ProfileProject): OpenTarget[] {
  const targets: OpenTarget[] = [];
  if (projectHasLive(project)) {
    targets.push("live");
  }
  targets.push("repo");
  if (projectHasBackend(project)) {
    targets.push("backend");
  }
  return targets;
}

function defaultTarget(project: ProfileProject): OpenTarget {
  return projectHasLive(project) ? "live" : "repo";
}

function nextTarget(project: ProfileProject, current: OpenTarget): OpenTarget {
  const targets = projectTargets(project);
  const index = targets.indexOf(current);
  return targets[(index + 1) % targets.length] ?? "repo";
}

function urlFor(project: ProfileProject, target: OpenTarget): string {
  if (target === "live" && projectHasLive(project)) {
    return project.live;
  }
  if (target === "backend" && projectHasBackend(project)) {
    return project.backend;
  }
  return project.repo;
}

function skillsByCategory(entries: readonly TechStackEntry[]) {
  return TECH_CATEGORIES.map((category) => ({
    category,
    accent: CATEGORY_ACCENT[category],
    items: entries.filter((entry) => entry.category === category).map((entry) => entry.title),
  }));
}

const TABS = [
  { name: "About", description: "who I am", value: 0 },
  { name: "Skills", description: "stack", value: 1 },
  { name: "Projects", description: "work", value: 2 },
  { name: "Contact", description: "links", value: 3 },
] as const;

export function App({ openUrl }: { openUrl?: (url: string) => void } = {}) {
  const renderer = useRenderer();
  const [tab, setTab] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [openTarget, setOpenTarget] = useState<OpenTarget>("live");
  const openTargetRef = useRef(openTarget);
  openTargetRef.current = openTarget;
  const activeTab = TABS[tab] ?? TABS[0];
  const selectedProject = profile.projects[projectIndex] ?? profile.projects[0];
  const liveChosen = openTarget === "live" && projectHasLive(selectedProject);
  const backendChosen = openTarget === "backend";
  const repoChosen = openTarget === "repo" || (!liveChosen && !backendChosen);
  const canToggle = projectTargets(selectedProject).length > 1;

  useKeyboard((key) => {
    if (renderer.isDestroyed) {
      return;
    }
    if (key.name === "q" || key.name === "escape") {
      renderer.destroy();
      return;
    }
    if (key.name === "left") {
      setTab((current) => (current + TABS.length - 1) % TABS.length);
      return;
    }
    if (key.name === "right") {
      setTab((current) => (current + 1) % TABS.length);
      return;
    }
    if (key.name === "tab") {
      key.preventDefault();
      if (tab === 2 && canToggle) {
        setOpenTarget((current) => nextTarget(selectedProject, current));
      }
      return;
    }
    if (key.name >= "1" && key.name <= "4") {
      setTab(Number(key.name) - 1);
    }
  });

  return (
    <box
      flexDirection="column"
      flexGrow={1}
      backgroundColor="transparent"
      border
      borderStyle="rounded"
      borderColor={theme.mauve}
      title=" @sethyrung/portfolio "
      titleColor={theme.mauve}
      bottomTitle={` ${HINT} `}
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
      <box marginTop={1} flexDirection="column">
        <box flexDirection="row">
          {TABS.map((item, index) => {
            const active = index === tab;
            return (
              <box key={item.name} width={18}>
                <text fg={active ? theme.mauve : theme.subtext}> {item.name}</text>
                <text fg={theme.mauve}>{active ? ` ${"━".repeat(item.name.length)}` : " "}</text>
              </box>
            );
          })}
        </box>
        <text fg={theme.blue}> {activeTab.description}</text>
      </box>
      <box key={tab} flexGrow={1} marginTop={1}>
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
              backgroundColor="transparent"
            >
              <text fg={theme.text}>{profile.bio}</text>
              <text />
              <text fg={theme.peach}>{profile.jobTitle}</text>
              <text fg={theme.subtext}>{profile.employer}</text>
              <text fg={theme.subtext}>{profile.location}</text>
              <text />
              <text fg={theme.green}>{profile.education.degree}</text>
              <text fg={theme.subtext}>{profile.education.school}</text>
              <text fg={theme.subtext}>{profile.education.years}</text>
            </box>
            <box
              flexGrow={2}
              border
              borderStyle="rounded"
              borderColor={theme.teal}
              title=" About "
              titleColor={theme.teal}
              padding={1}
              backgroundColor="transparent"
            >
              {aboutBullets(profile.about).map((bullet) => (
                <text key={bullet} fg={theme.text}>
                  • {bullet}
                </text>
              ))}
            </box>
          </box>
        ) : tab === 1 ? (
          <box flexDirection="row" flexWrap="wrap" gap={1} flexGrow={1}>
            {skillsByCategory(profile.techStack).map((group) => (
              <box
                key={group.category}
                border
                borderStyle="rounded"
                borderColor={group.accent}
                title={` ${group.category} `}
                titleColor={group.accent}
                padding={1}
                width="32%"
                backgroundColor="transparent"
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
              backgroundColor="transparent"
            >
              <select
                focused
                flexGrow={1}
                options={profile.projects.map((project) => ({
                  name: project.title,
                  description: project.description,
                }))}
                selectedIndex={projectIndex}
                showDescription
                showSelectionIndicator
                showScrollIndicator
                wrapSelection={false}
                selectedBackgroundColor={theme.surface}
                selectedTextColor={theme.text}
                selectedDescriptionColor={theme.subtext}
                descriptionColor={theme.subtext}
                textColor={theme.text}
                backgroundColor="transparent"
                onChange={(index) => {
                  setProjectIndex(index);
                  const project = profile.projects[index];
                  setOpenTarget(project ? defaultTarget(project) : "repo");
                }}
                onSelect={(index) => {
                  const project = profile.projects[index];
                  if (project) {
                    openUrl?.(urlFor(project, openTargetRef.current));
                  }
                }}
              />
            </box>
            <box
              width={58}
              border
              borderStyle="rounded"
              borderColor={theme.peach}
              title=" Selected "
              titleColor={theme.peach}
              padding={1}
              backgroundColor="transparent"
            >
              <text fg={theme.peach}>{selectedProject.title}</text>
              <text fg={theme.subtext}>{selectedProject.stacks.join(" · ")}</text>
              <text />
              <text fg={theme.subtext}>{selectedProject.description}</text>
              <text />
              <text fg={liveChosen ? theme.teal : theme.subtext}>
                {liveChosen ? "▸" : " "} live{" "}
                {projectHasLive(selectedProject) ? displayUrl(selectedProject.live) : "—"}
              </text>
              <text fg={repoChosen ? theme.blue : theme.subtext}>
                {repoChosen ? "▸" : " "} repo {displayUrl(selectedProject.repo)}
              </text>
              {projectHasBackend(selectedProject) ? (
                <text fg={backendChosen ? theme.green : theme.subtext}>
                  {backendChosen ? "▸" : " "} backend {displayUrl(selectedProject.backend)}
                </text>
              ) : null}
              <text />
              <text fg={theme.subtext}>
                enter opens {liveChosen ? "live" : backendChosen ? "backend" : "repo"}
                {canToggle ? " · tab toggles" : ""}
              </text>
            </box>
          </box>
        ) : null}
      </box>
    </box>
  );
}
