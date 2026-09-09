import { useState } from "react";
import { profile } from "../config/profile.ts";
import { displayUrl } from "../lib/display-url.ts";
import { theme } from "../theme.ts";

function decodeEmail(encoded: string): string {
  return Buffer.from(encoded, "base64").toString("utf8");
}

function contactRows() {
  const email = decodeEmail(profile.email);
  return [...profile.contacts, { title: "Email", handle: email, url: `mailto:${email}` }];
}

export function ContactTab({ openUrl }: { openUrl?: (url: string) => void }) {
  const [contactIndex, setContactIndex] = useState(0);
  const contacts = contactRows();
  const selectedContact = contacts[contactIndex] ?? {
    title: "",
    handle: "",
    url: "",
  };

  return (
    <box flexDirection="column" gap={1} flexGrow={1}>
      <box
        flexGrow={1}
        flexDirection="column"
        border
        borderStyle="rounded"
        borderColor={theme.green}
        title=" Channels "
        titleColor={theme.green}
        backgroundColor="transparent"
      >
        <select
          focused
          flexGrow={1}
          options={contacts.map((contact) => ({
            name: contact.title,
            description: contact.handle,
          }))}
          selectedIndex={contactIndex}
          showDescription
          showSelectionIndicator
          wrapSelection={false}
          selectedBackgroundColor={theme.surface}
          selectedTextColor={theme.text}
          selectedDescriptionColor={theme.subtext}
          descriptionColor={theme.subtext}
          textColor={theme.text}
          backgroundColor="transparent"
          onChange={(index) => setContactIndex(index)}
          onSelect={(index) => {
            const contact = contacts[index];
            if (contact) {
              openUrl?.(contact.url);
            }
          }}
        />
      </box>
      <box
        border
        borderStyle="rounded"
        borderColor={theme.teal}
        title={` ${selectedContact.title} `}
        titleColor={theme.teal}
        padding={1}
        backgroundColor="transparent"
      >
        <text fg={theme.text}>{selectedContact.handle}</text>
        <text fg={theme.teal}>{displayUrl(selectedContact.url)}</text>
        <text fg={theme.subtext}>enter opens in browser</text>
      </box>
    </box>
  );
}
