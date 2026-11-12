"use client";

import { useEffect, useRef } from "react";
import type { ResourceConsent } from "@/types/pageTemplates";

/** Brand-guideline consent before any download (reference `#brand-guide-popup`).
 * Native <dialog>.showModal(): focus is trapped, Esc closes, focus returns to the opener.
 * Confirming starts the download of `href` and closes. */
export function ConsentDialog({ consent, href, onClose }: { consent: ResourceConsent; href: string | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (href && !dialog.open) dialog.showModal();
    if (!href && dialog.open) dialog.close();
  }, [href]);

  const confirm = () => {
    if (href && href !== "#") {
      const link = document.createElement("a");
      link.href = href;
      link.download = "";
      link.click();
    }
    onClose();
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}
      aria-labelledby="consent-title"
      className="m-auto w-[calc(100%-40px)] max-w-[480px] rounded-2xl bg-white p-0 text-ink backdrop:bg-black/50 open:motion-safe:animate-[fade-in_.3s_var(--ease-smooth)]"
    >
      <div className="relative p-6 md:p-8">
        <h2 id="consent-title" className="pr-8 text-xl font-bold md:text-2xl">{consent.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-600">{consent.text}</p>
        <div className="mt-8 flex gap-2">
          <button type="button" onClick={onClose} className="h-12 flex-1 rounded-full border border-zinc-300 text-base font-semibold transition-colors hover:bg-zinc-100">
            {consent.cancelLabel}
          </button>
          <button type="button" onClick={confirm} className="h-12 flex-1 rounded-full bg-ink text-base font-semibold text-white transition-opacity hover:opacity-85">
            {consent.confirmLabel}
          </button>
        </div>
        <button type="button" onClick={onClose} aria-label="닫기" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-xl hover:bg-zinc-100">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </dialog>
  );
}
