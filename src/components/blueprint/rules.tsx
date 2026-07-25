/**
 * Drawing furniture: dimension lines and figure labels.
 * These carry the blueprint language and appear on every section.
 */

/**
 * A measured rule with tick ends, as on a dimension callout.
 * Optionally carries a label centred on the line.
 */
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
  return <span className="h-2 w-px shrink-0 bg-rule-strong" />;
}

/** `FIG. 01` marker used in the section margin. */
export function FigLabel({ index, className = "" }: { index: string; className?: string }) {
  return (
    <span className={`annot shrink-0 ${className}`}>
      Fig.&nbsp;{index}
    </span>
  );
}

type SectionProps = {
  index: string;
  title: string;
  id?: string;
  lede?: string;
  children: React.ReactNode;
  /** Renders on the alternate surface colour, to break up long scrolls. */
  raised?: boolean;
};

/**
 * Standard section frame: figure number in the margin, title, optional lede.
 * The margin collapses under `lg` — on narrow screens the label sits above.
 */
export function Section({ index, title, id, lede, children, raised }: SectionProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-rule py-16 sm:py-24 ${raised ? "bg-surface/60" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 sm:mb-14 lg:flex lg:gap-12">
          <div className="lg:w-32 lg:shrink-0 lg:pt-2">
            <FigLabel index={index} />
          </div>
          <div className="mt-3 max-w-2xl lg:mt-0">
            <h2 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-4xl">
              {title}
            </h2>
            {lede && (
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{lede}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
