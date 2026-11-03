import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start justify-center px-5 py-32 sm:px-8">
      <span className="pill h-7 px-3 text-ink-soft">404</span>
      <h1 className="mt-5 font-display text-5xl font-bold tracking-[-0.03em] sm:text-6xl">
        Nothing wired here
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
        This page doesn&apos;t exist, or it was removed when the site was trimmed.
      </p>
      <Link href="/" className="btn mt-8 h-11 px-6 text-sm">
        Back to home
      </Link>
    </div>
  );
}
