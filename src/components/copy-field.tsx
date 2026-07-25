"use client";

import { useEffect, useState } from "react";

type CopyFieldProps = {
  label: string;
  value: string;
  href: string;
};

/**
 * A contact line that is both a link and copyable. The link is the primary
 * action; copying is a secondary button so the clipboard permission never
 * gets in the way of just clicking through.
 */
export function CopyField({ label, value, href }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      /* clipboard blocked — the link beside this still works */
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-rule py-4">
      <div className="min-w-0">
        <span className="annot">{label}</span>
        <a
          href={href}
          className="sweep mt-1.5 block w-fit max-w-full break-all text-lg font-medium tracking-tight transition-colors hover:text-accent sm:text-xl"
        >
          {value}
        </a>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label.toLowerCase()}`}
        className="shrink-0 border border-rule px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint transition-colors hover:border-accent hover:text-accent"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
