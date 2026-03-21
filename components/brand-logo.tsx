import Image from "next/image";

type Props = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  width = 48,
  height = 48,
  className,
  priority,
}: Props) {
  return (
    <Image
      src="/logo.png"
      alt="SecureBiz AI logo"
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={`${width}px`}
      style={{ width: "auto", height: "auto" }}
    />
  );
}
