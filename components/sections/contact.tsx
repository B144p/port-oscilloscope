"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";
import { contactsQuery } from "@/lib/queries";
import type { Contact } from "@/lib/types";

function isExternal(url: string): boolean {
  return /^https?:\/\//.test(url);
}

function ContactRow({ contact }: { contact: Contact }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const rowClass =
    "flex items-center justify-between gap-4 border-b border-green-dim/40 py-3 text-[13px]";
  const labelClass = "uppercase tracking-[0.05em] text-green-mid";

  if (isExternal(contact.url)) {
    return (
      <a
        href={contact.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${rowClass} group`}
      >
        <span className={`${labelClass} group-hover:text-green-bright`}>
          {contact.title}
        </span>
        <span className="text-text-muted group-hover:text-green-bright">
          {contact.url.replace(/^https?:\/\/(www\.)?/, "")} ↗
        </span>
      </a>
    );
  }

  // Email row: copy to clipboard, no toast — the row itself confirms (§5.4).
  return (
    <button
      type="button"
      className={`${rowClass} group w-full text-left`}
      onClick={() => {
        navigator.clipboard.writeText(contact.url).then(() => {
          setCopied(true);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => setCopied(false), 1500);
        });
      }}
    >
      <span className={`${labelClass} group-hover:text-green-bright`}>
        {contact.title}
      </span>
      {copied ? (
        <span className="text-green-bright">[ COPIED ]</span>
      ) : (
        <span className="text-text-muted group-hover:text-green-bright">
          {contact.url}
        </span>
      )}
    </button>
  );
}

/** §5.4 CONTACT */
export function ContactSection() {
  const { data, isPending, isError, refetch } = useQuery(contactsQuery);

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!data.length) return <EmptyState />;

  return (
    <div className="flex max-w-[70ch] flex-col">
      <h2 className="mb-4 text-2xl font-medium text-green-bright">CONTACT</h2>
      {data.map((contact) => (
        <ContactRow key={contact.id} contact={contact} />
      ))}
    </div>
  );
}
