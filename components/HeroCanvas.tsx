export default function HeroCanvas({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="hero-glow" />
    </div>
  );
}
