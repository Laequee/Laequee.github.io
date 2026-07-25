import { primaryTools } from "@/content/skills";

/**
 * Seamless CSS ticker — the list renders twice and translates -50%, so the
 * loop point is invisible. No JS involved.
 */
export function Ticker() {
  return (
    <div
      className="relative flex overflow-hidden border-y border-rule bg-surface/70 py-3"
      style={{
        maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
      }}
    >
      <ul
        className="flex shrink-0 animate-ticker items-center gap-8 pr-8"
        aria-label="Core tooling"
      >
        {primaryTools.map((tool) => (
          <TickerItem key={tool} label={tool} />
        ))}
        {primaryTools.map((tool) => (
          <TickerItem key={`dup-${tool}`} label={tool} aria-hidden />
        ))}
      </ul>
    </div>
  );
}

function TickerItem({ label, ...rest }: { label: string; "aria-hidden"?: boolean }) {
  return (
    <li className="flex items-center gap-8 whitespace-nowrap" {...rest}>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
        {label}
      </span>
      <span className="text-rule-strong" aria-hidden="true">
        +
      </span>
    </li>
  );
}
