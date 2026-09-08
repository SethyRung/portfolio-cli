import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { App } from "./app.tsx";
import { theme } from "./theme.ts";

const renderer = await createCliRenderer({
  backgroundColor: theme.base,
  exitOnCtrlC: true,
});

createRoot(renderer).render(<App />);
