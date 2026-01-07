import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string;
  size: number;
}
export default function Logo({ className, href = "/", size = 100 }: LogoProps) {
  return (
    <Link href={href} className={className}>
      <Image
        src="/logo.webp"
        alt="Logo"
        sizes={`(max-width: 768px) ${size / 2}px, ${size}px`}
        width={size}
        height={size}
        className={cn(
          className,
          "rounded-3xl shadow-lg object-contain w-full h-full drop-shadow-2xl drop-shadow-white/10"
        )}
        loading="eager"
        priority
      />
    </Link>
  );
}
