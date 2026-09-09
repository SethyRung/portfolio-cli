import { profile } from "../config/profile.ts";
import { theme } from "../theme.ts";

function aboutBullets(markdown: string): string[] {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).replaceAll("**", ""));
}

export function AboutTab() {
  return (
    <box flexDirection="column" gap={1} flexGrow={1}>
      <box
        border
        borderStyle="rounded"
        borderColor={theme.blue}
        title=" Identity "
        titleColor={theme.blue}
        padding={1}
        backgroundColor="transparent"
      >
        <text fg={theme.text}>{profile.bio}</text>
        <text fg={theme.peach}>
          {profile.jobTitle} · {profile.employer} · {profile.location}
        </text>
        <text fg={theme.green}>
          {profile.education.degree} · {profile.education.school} · {profile.education.years}
        </text>
      </box>
      <box
        flexGrow={1}
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
  );
}
