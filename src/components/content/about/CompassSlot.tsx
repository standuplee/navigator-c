/** Stand-in for the reference's lottie (PRD §4.6 first pass): a dial and a needle that turn
 * with the section's scroll progress (`--progress` set by the parent). The rotation is on two
 * HTML wrappers, not on SVG groups, to keep it a plain compositor transform. Swap for a lottie
 * player once a real animation file exists. */
export function CompassSlot({ className = "" }: { className?: string }) {
  const size = "size-[min(90vw,90svh)]";
  return (
    <div aria-hidden="true" className={`pointer-events-none flex items-center justify-center opacity-40 ${className}`}>
      <div className={`relative ${size}`}>
        <div className="absolute inset-0 text-white/30 motion-safe:[transform:rotate(calc(var(--progress,0)_*_120deg))]">
          <svg viewBox="0 0 400 400" className="size-full" fill="none" stroke="currentColor">
            <circle cx="200" cy="200" r="190" strokeWidth="1" />
            <circle cx="200" cy="200" r="150" strokeWidth="1" strokeDasharray="2 10" />
            {Array.from({ length: 36 }, (_, i) => (
              <line key={i} x1="200" y1="14" x2="200" y2={i % 9 === 0 ? 40 : 26} strokeWidth="1" transform={`rotate(${i * 10} 200 200)`} />
            ))}
          </svg>
        </div>
        <div className="absolute inset-0 text-accent/60 [transform:rotate(20deg)] motion-safe:[transform:rotate(calc(20deg_-_var(--progress,0)_*_200deg))]">
          <svg viewBox="0 0 400 400" className="size-full" fill="none" stroke="currentColor">
            <path d="M200 70 L214 200 L200 330 L186 200 Z" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="6" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
