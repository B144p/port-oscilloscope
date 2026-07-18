"use client";

import { useEffect, useRef, useState } from "react";
import { CHANNELS, SITE_CONFIG } from "@/lib/site-config";

/**
 * §10 — hidden terminal, toggled by `~`. The only place lore flavor is
 * permitted; it stays out of the primary UI entirely.
 */
export function EasterEggTerminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([
    "CATHODE SUBSHELL v0.1 — TYPE 'help'",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";
      if ((e.key === "~" || e.key === "`") && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const echo = `> ${raw}`;
    let out: string[];
    switch (cmd) {
      case "help":
        out = ["AVAILABLE: whoami · sudo · ls · clear · exit"];
        break;
      case "whoami":
        out = [
          `OPERATOR: ${SITE_CONFIG.handle} // CLEARANCE: ${SITE_CONFIG.clearance}`,
        ];
        break;
      case "sudo":
        out = [
          "PERMISSION DENIED.",
          "THE MACHINE SPIRIT DOES NOT ANSWER TO YOU.",
        ];
        break;
      case "ls":
        out = CHANNELS.map((c) => `drw-r--r--  CH.${c.number}  /${c.segment || "home"}`);
        break;
      case "clear":
        setLines([]);
        setInput("");
        return;
      case "exit":
        setOpen(false);
        return;
      case "":
        out = [];
        break;
      default:
        out = [`COMMAND NOT RECOGNIZED: '${cmd}' — TYPE 'help'`];
    }
    setLines((prev) => [...prev.slice(-40), echo, ...out]);
    setInput("");
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-[9995] rounded-lg border border-green-dim bg-bg-void/95 p-3 text-[13px] text-green-mid md:inset-x-auto md:right-4 md:w-[28rem]">
      <div className="mb-2 flex max-h-48 flex-col gap-1 overflow-y-auto">
        {lines.map((line, i) => (
          <p key={i} className="whitespace-pre-wrap break-words">
            {line}
          </p>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
        }}
        className="flex items-center gap-2"
      >
        <span aria-hidden className="text-green-bright">
          &gt;
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Terminal command"
          autoCapitalize="off"
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent text-green-bright outline-none placeholder:text-text-muted"
          placeholder="…"
        />
      </form>
    </div>
  );
}
