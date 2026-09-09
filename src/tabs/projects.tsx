import { useRef, useState } from "react";
import { useKeyboard } from "@opentui/react";
import { profile } from "../config/profile.ts";
import { displayUrl } from "../lib/display-url.ts";
import { theme } from "../theme.ts";

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

export function ProjectsTab({ openUrl }: { openUrl?: (url: string) => void }) {
  const [projectIndex, setProjectIndex] = useState(0);
  const [openTarget, setOpenTarget] = useState<OpenTarget>("live");
  const openTargetRef = useRef(openTarget);
  openTargetRef.current = openTarget;
  const selectedProject = profile.projects[projectIndex] ?? profile.projects[0];
  const liveChosen = openTarget === "live" && projectHasLive(selectedProject);
  const backendChosen = openTarget === "backend";
  const repoChosen = openTarget === "repo" || (!liveChosen && !backendChosen);
  const canToggle = projectTargets(selectedProject).length > 1;
  const detailTitle = ` ${selectedProject.title} · ${selectedProject.stacks.join(" · ")} `;

  useKeyboard((key) => {
    if (key.name !== "tab") {
      return;
    }
    key.preventDefault();
    if (canToggle) {
      setOpenTarget((current) => nextTarget(selectedProject, current));
    }
  });

  return (
    <box flexDirection="column" gap={1} flexGrow={1}>
      <box
        flexGrow={1}
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
        border
        borderStyle="rounded"
        borderColor={theme.peach}
        title={detailTitle}
        titleColor={theme.peach}
        padding={1}
        backgroundColor="transparent"
      >
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
        <text fg={theme.subtext}>
          enter opens {liveChosen ? "live" : backendChosen ? "backend" : "repo"}
          {canToggle ? " · tab toggles" : ""}
        </text>
      </box>
    </box>
  );
}
