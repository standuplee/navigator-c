import { revalidatePath } from "next/cache";

/** `revalidatePath` only works inside a Next.js request/server-action scope.
 * Collection hooks also run from standalone scripts (seeding, migrations) where
 * that scope doesn't exist — swallow the "static generation store missing" case
 * there instead of crashing the whole operation. */
export function safeRevalidatePath(path: string) {
  try {
    revalidatePath(path);
  } catch {
    // no request scope (e.g. a seed script) — nothing to revalidate.
  }
}
