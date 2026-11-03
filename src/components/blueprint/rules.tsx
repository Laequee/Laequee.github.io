import { ScrambleText } from "@/components/motion/scramble-text";
import { ScribbleUnderline } from "@/components/motion/scribble-underline";
import { wordmark } from "@/components/wordmark";

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
};

export function Section({ index, title, id, lede, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 sm:mb-14">
          <span className="pill h-7 px-3 text-ink-soft">{index}</span>
          <h2 className="mt-5 font-display text-[2.4rem] font-bold leading-[1] tracking-[-0.03em] sm:text-6xl">
            {/* Each section underlined in the next wordmark tone, in order. */}
            <ScribbleUnderline tone={wordmark[(Number(index) - 1) % wordmark.length].tone} variant={Number(index) - 1}>
              <ScrambleText text={title} />
            </ScribbleUnderline>
          </h2>
          {lede && (
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-base">{lede}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
