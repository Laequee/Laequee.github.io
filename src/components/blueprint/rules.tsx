/**
 * Section furniture: the numbered heading frame and a divider rule.
 * The index number is set in the accent and doubles as the section marker,
 * so long scrolls stay orientable.
 */

/** Thin divider with an accent tick at each end. */
export function DimensionLine({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <Tick />
      <span className="h-px flex-1 bg-rule" />
      {label && (
        <>
          <span className="annot whitespace-nowrap">{label}</span>
          <span className="h-px flex-1 bg-rule" />
        </>
      )}
      <Tick />
    </div>
  );
}

function Tick() {
  return <span className="h-1.5 w-px shrink-0 bg-accent/60" />;
}

type SectionProps = {
  index: string;
  title: string;
  id?: string;
  lede?: string;
  children: React.ReactNode;
  /** Renders on the raised surface, to break up long scrolls. */
  raised?: boolean;
};

export function Section({ index, title, id, lede, children, raised }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-rule py-16 sm:py-24 ${raised ? "bg-surface/40" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 sm:mb-14">
          <p className="mb-4 flex items-center gap-3">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-accent">{index}</span>
            <span className="h-px w-10 bg-accent/40" aria-hidden="true" />
          </p>
          <h2 className="text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h2>
          {/*
            Mono, not prose-face. A sans lede sitting among monospace headings
            reads as a mistake — Inter is reserved for the multi-paragraph
            case-study body, where full monospace genuinely tires the eye.
          */}
          {lede && (
            <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-ink-soft">{lede}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
