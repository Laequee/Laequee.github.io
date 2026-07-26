"use client";

import { useCallback, useEffect, useState } from "react";

import { Reveal } from "@/components/blueprint/reveal";
import { Section } from "@/components/blueprint/rules";

type Status = "pass" | "warn" | "fail" | "unknown";

type Check = {
  id: string;
  setting: string;
  value: string;
  status: Status;
  /** Shown only for warn/fail, the way a real compliance blade does. */
  remediation?: string;
  /** Excluded from the score — things no browser can honestly report. */
  informational?: boolean;
};

/**
 * Runs the same shape of check applied to a managed endpoint, against the
 * visitor's own browser.
 *
 * Everything here reads properties the browser already exposes to any page.
 * Nothing is transmitted, stored, or fingerprinted — the results never leave
 * the component, which is the point worth demonstrating.
 */
function evaluate(): Check[] {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { effectiveType?: string };
  };

  const checks: Check[] = [];

  checks.push({
    id: "tls",
    setting: "Transport encryption",
    value: location.protocol === "https:" ? "TLS · HTTPS" : "None · HTTP",
    status: location.protocol === "https:" ? "pass" : "fail",
    remediation: location.protocol === "https:" ? undefined : "Connection is not encrypted.",
  });

  checks.push({
    id: "secure-context",
    setting: "Secure context",
    value: window.isSecureContext ? "Enabled" : "Not available",
    status: window.isSecureContext ? "pass" : "fail",
    remediation: window.isSecureContext
      ? undefined
      : "Privileged browser APIs are unavailable on this origin.",
  });

  const dnt = nav.doNotTrack === "1" || (window as { doNotTrack?: string }).doNotTrack === "1";
  checks.push({
    id: "dnt",
    setting: "Tracking preference",
    value: dnt ? "Do Not Track signalled" : "Not signalled",
    status: dnt ? "pass" : "warn",
    remediation: dnt ? undefined : "Enable Do Not Track to signal intent to sites you visit.",
  });

  checks.push({
    id: "cookies",
    setting: "Cookie policy",
    value: nav.cookieEnabled ? "Cookies permitted" : "Cookies blocked",
    status: nav.cookieEnabled ? "warn" : "pass",
    remediation: nav.cookieEnabled
      ? "Third-party cookies are the usual vector. Worth restricting in browser settings."
      : undefined,
  });

  let storage = "Unavailable";
  let storageOk = false;
  try {
    localStorage.setItem("__c", "1");
    localStorage.removeItem("__c");
    storage = "Read/write";
    storageOk = true;
  } catch {
    storage = "Blocked";
  }
  checks.push({
    id: "storage",
    setting: "Local storage",
    value: storage,
    status: storageOk ? "pass" : "warn",
    remediation: storageOk ? undefined : "Site storage is blocked; some features degrade.",
    informational: true,
  });

  const ua = nav.userAgent;
  const engine = /Firefox\//.test(ua)
    ? "Gecko"
    : /Edg\//.test(ua)
      ? "Chromium · Edge"
      : /Chrome\//.test(ua)
        ? "Chromium"
        : /Safari\//.test(ua)
          ? "WebKit"
          : "Unknown";
  checks.push({
    id: "engine",
    setting: "Browser engine",
    value: engine,
    status: engine === "Unknown" ? "warn" : "pass",
    informational: true,
  });

  checks.push({
    id: "platform",
    setting: "Operating system",
    value: /Windows/.test(ua)
      ? "Windows"
      : /Mac OS X|Macintosh/.test(ua)
        ? "macOS"
        : /Android/.test(ua)
          ? "Android"
          : /iPhone|iPad/.test(ua)
            ? "iOS"
            : /Linux/.test(ua)
              ? "Linux"
              : "Unknown",
    status: "pass",
    informational: true,
  });

  checks.push({
    id: "timezone",
    setting: "Reported time zone",
    value: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
    status: "pass",
    informational: true,
  });

  checks.push({
    id: "display",
    setting: "Display",
    value: `${window.screen.width}×${window.screen.height} · ${window.devicePixelRatio}x`,
    status: "pass",
    informational: true,
  });

  checks.push({
    id: "cores",
    setting: "Logical processors",
    value: nav.hardwareConcurrency ? String(nav.hardwareConcurrency) : "Not reported",
    status: "pass",
    informational: true,
  });

  if (nav.connection?.effectiveType) {
    checks.push({
      id: "network",
      setting: "Network profile",
      value: nav.connection.effectiveType.toUpperCase(),
      status: "pass",
      informational: true,
    });
  }

  /*
   * The honest ones. A web page genuinely cannot see these — and saying so is
   * more convincing than inventing a result, which is exactly why managed
   * endpoints need an agent in the first place.
   */
  checks.push({
    id: "bitlocker",
    setting: "Disk encryption",
    value: "Not assessable",
    status: "unknown",
    remediation: "Requires a management agent. Intune reports this via BitLocker compliance.",
  });

  checks.push({
    id: "lock",
    setting: "Screen lock policy",
    value: "Not assessable",
    status: "unknown",
    remediation: "Requires a management agent. Enforced through a device configuration profile.",
  });

  return checks;
}

const WEIGHT: Record<Status, number> = { pass: 1, warn: 0.5, fail: 0, unknown: 0 };

/*
 * Scored: everything except informational rows and the two settings no browser
 * can report. Counting "not assessable" as a zero would mark every visitor
 * non-compliant for something they cannot fix — which is both unfair and
 * exactly the mistake a badly configured compliance policy makes.
 */
const isScored = (c: Check) => !c.informational && c.status !== "unknown";

export function ComplianceReport() {
  const [checks, setChecks] = useState<Check[] | null>(null);
  const [scanning, setScanning] = useState(false);

  const run = useCallback(() => {
    setScanning(true);
    setChecks(null);
    // A beat, so re-evaluating reads as work rather than a flicker.
    const timer = setTimeout(() => {
      setChecks(evaluate());
      setScanning(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Runs after mount only — the server has no browser to inspect.
  useEffect(() => run(), [run]);

  const scored = checks?.filter(isScored) ?? [];
  const score = scored.length
    ? Math.round((scored.reduce((sum, c) => sum + WEIGHT[c.status], 0) / scored.length) * 100)
    : 0;

  const verdict =
    score >= 85 ? "Compliant" : score >= 55 ? "Partially compliant" : "Non-compliant";
  const verdictColor =
    score >= 85 ? "var(--accent)" : score >= 55 ? "var(--accent-warm)" : "#ff5a5a";

  return (
    <Section
      index="04"
      id="compliance"
      title="Device compliance"
      lede="The same shape of check I apply to a managed estate, pointed at your browser instead. Everything is evaluated locally — nothing is sent, stored, or logged."
      raised
    >
      <Reveal>
        <div className="border border-rule bg-bg">
          {/* Verdict bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-4">
            <div className="flex items-center gap-3">
              <span
                className="size-2 rounded-full"
                style={{ background: verdictColor }}
                aria-hidden="true"
              />
              <span
                className="text-[13px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: verdictColor }}
              >
                {scanning ? "Evaluating…" : verdict}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tabular-nums">{scanning ? "—" : score}</span>
              <span className="annot">/ 100</span>
            </div>
          </div>

          {/* Findings */}
          <ul className="divide-y divide-rule">
            {(checks ?? Array.from({ length: 8 }, () => null)).map((check, i) => (
              <li key={check?.id ?? i} className="px-5 py-3">
                {check ? (
                  <>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="flex min-w-0 items-baseline gap-3">
                        <StatusMark status={check.status} />
                        <span className="text-[13.5px]">{check.setting}</span>
                      </span>
                      <span className="shrink-0 text-[13px] text-ink-soft">{check.value}</span>
                    </div>
                    {check.remediation && (
                      <p className="mt-1.5 pl-6 text-[12px] leading-relaxed text-ink-faint">
                        {check.remediation}
                      </p>
                    )}
                  </>
                ) : (
                  <div className="h-5 w-1/3 animate-pulse bg-surface-2" />
                )}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule px-5 py-4">
            <p className="annot normal-case tracking-[0.04em]">
              Evaluated in your browser. No data transmitted.
              {checks && ` ${scored.length} of ${checks.length} settings scored.`}
            </p>
            <button
              type="button"
              onClick={run}
              disabled={scanning}
              className="neon-outline rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] disabled:opacity-50"
            >
              Re-evaluate
            </button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function StatusMark({ status }: { status: Status }) {
  const map: Record<Status, { glyph: string; color: string; label: string }> = {
    pass: { glyph: "✓", color: "var(--accent)", label: "Pass" },
    warn: { glyph: "!", color: "var(--accent-warm)", label: "Warning" },
    fail: { glyph: "✕", color: "#ff5a5a", label: "Fail" },
    unknown: { glyph: "?", color: "var(--ink-faint)", label: "Not assessable" },
  };
  const { glyph, color, label } = map[status];

  return (
    <span
      className="w-3 shrink-0 text-center text-[13px] font-bold"
      style={{ color }}
      title={label}
    >
      {glyph}
      <span className="sr-only">{label}: </span>
    </span>
  );
}
