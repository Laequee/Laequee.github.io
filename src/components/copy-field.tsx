"use client";

import { useEffect, useState } from "react";

type CopyFieldProps = {
  label: string;
  value: string;
  href: string;
  /* What the Copy button copies, when the shown text is a label rather than the value. */
  copyValue?: string;
};

/**
 * A contact line that is both a link and copyable. The link is the primary
 * action; copying is a secondary button so the clipboard permission never
 * gets in the way of just clicking through.
 */
export function CopyField({ label, value, href, copyValue }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyValue ?? value);
      setCopied(true);
    } catch {
      /* clipboard blocked — the link beside this still works */
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-rule py-4 last:border-b-0">
      <div className="min-w-0">
        <span className="annot">{label}</span>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="sweep mt-1.5 block w-fit max-w-full break-all font-display text-lg font-semibold tracking-tight transition-colors hover:text-accent sm:text-xl"
        >
          {value}
        </a>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label.toLowerCase()}`}
        className="pill h-8 shrink-0 px-3 uppercase tracking-[0.12em] text-ink-faint transition-colors hover:border-ink-faint hover:text-ink"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
