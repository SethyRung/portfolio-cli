import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { App } from "./app.tsx";
import { openUrl } from "./open-url.ts";
import { printStaticCard, shouldRenderTui } from "./static-card.ts";
import { theme } from "./theme.ts";

if (shouldRenderTui()) {
  const renderer = await createCliRenderer({
    backgroundColor: theme.base,
    exitOnCtrlC: true,
  });

  createRoot(renderer).render(<App openUrl={openUrl} />);
} else {
  printStaticCard();
}
