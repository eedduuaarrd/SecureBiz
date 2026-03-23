import Image from "next/image";

type Props = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  /**
   * When the logo sits next to visible “SecureBiz AI” text or inside a link that already names the destination,
   * set decorative so screen readers don’t announce the image twice (Lighthouse: link name).
   */
  decorative?: boolean;
};

export function BrandLogo({
  width = 48,
  height = 48,
  className,
  priority,
  decorative = false,
}: Props) {
  return (
    <Image
      src="/logo.png"
      alt={decorative ? "" : "SecureBiz AI logo"}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={`${width}px`}
      style={{ width: "auto", height: "auto" }}
    />
  );
}
