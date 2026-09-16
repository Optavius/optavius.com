/** Optavius wordmark: the open-ended O mark, then "ptavius" set in the site's text face. The O sits on the text baseline
 *  and its stroke matches the letter stems. */
export function Logo({ className = "h-9 xl:h-10" }: { className?: string }) {
  const big = /h-11/.test(className);
  return (
    <span className={"inline-flex items-baseline leading-none " + (big ? "text-[30px] xl:text-[34px]" : "text-[28px] xl:text-[31px]")} style={{ height: "1.25em" }}>
      <svg viewBox="1.9 1.9 36.2 36.2" aria-hidden="true" className="h-[0.74em] w-[0.74em] shrink-0 self-baseline overflow-visible" style={{ transform: "translateY(0.04em)" }}>
        <path d="M34.7 12.6A16.5 16.5 0 1 0 34.7 27.4" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="butt" />
      </svg>
      <span className="font-logo tracking-[-0.01em]" style={{ marginLeft: "0.03em" }}>ptavius</span>
      <span className="sr-only">Optavius</span>
    </span>
  );
}

/** The mark alone (agent avatar, favicon). */
export function Symbol({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="1.9 1.9 36.2 36.2" aria-hidden="true" className={className}>
      <path d="M34.7 12.6A16.5 16.5 0 1 0 34.7 27.4" fill="none" stroke="currentColor" strokeWidth="4.4" strokeLinecap="butt" />
    </svg>
  );
}
