import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col justify-center px-5 py-32 sm:px-8">
      <span className="annot">Error 404</span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Sheet not found
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
        That drawing isn&apos;t in the set. It may have been renumbered.
      </p>
      <Link
        href="/"
        className="mt-8 w-fit border border-ink bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bg transition-colors hover:border-blue hover:bg-blue"
      >
        Back to index
      </Link>
    </div>
  );
}
