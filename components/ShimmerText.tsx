export function ShimmerText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      className={`animate-shimmer inline-block bg-[length:200%_100%] bg-clip-text text-transparent [background-image:linear-gradient(110deg,var(--fg)_35%,var(--accent)_50%,var(--fg)_65%)] ${className}`}
    >
      {text}
    </span>
  );
}
