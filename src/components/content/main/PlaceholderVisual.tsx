/** Stand-in for a real photo/screenshot (docs/HANDOFF.md rule 3: no brand assets). */
export function PlaceholderVisual({ label, tone = "light", className = "" }: { label: string; tone?: "light" | "dark"; className?: string }) {
  const palette = tone === "dark"
    ? "from-zinc-800 via-zinc-700 to-zinc-900 text-zinc-300"
    : "from-zinc-100 via-zinc-200 to-zinc-300 text-zinc-500";
  return (
    <div className={`flex items-center justify-center bg-gradient-to-br ${palette} ${className}`} aria-hidden="true">
      <span className="text-sm font-medium tracking-wide">{label}</span>
    </div>
  );
}
