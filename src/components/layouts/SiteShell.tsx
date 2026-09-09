import type { ReactNode } from "react";

export function SiteShell({ header, navigation, children, footer, className = "" }: { header: ReactNode; navigation?: ReactNode; children: ReactNode; footer?: ReactNode; className?: string }) {
  return <div className={`site-shell reference-runtime ${className}`.trim()}>{header}{navigation}{children}{footer}</div>;
}
