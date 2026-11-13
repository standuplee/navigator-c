import Image from "next/image";

/** Navigators wordmark (public/brand/navigators-logo.png, transparent, 536×144 @2x).
 * `brandName` is the accessible name — the text itself lives in the image. */
export function BrandLogo({ brandName, className = "h-6 xl:h-7" }: { brandName: string; className?: string }) {
  return <Image src="/brand/navigators-logo.png" alt={brandName} width={536} height={144} priority className={`w-auto ${className}`} />;
}
