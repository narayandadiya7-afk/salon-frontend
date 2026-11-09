import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "text";
  className?: string;
  arrow?: boolean;
};

export function CtaLink({
  href,
  children,
  variant = "text",
  className,
  arrow = true,
}: CtaLinkProps) {
  const base =
    "group inline-flex items-center gap-1.5 transition-all duration-300";

  const variants = {
    primary:
      "btn-shine rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-card",
    ghost:
      "rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground ring-1 ring-primary-foreground/35 hover:bg-primary-foreground/10",
    text: "font-mono text-xs uppercase tracking-[0.2em] text-brass-soft hover:text-brass",
  };

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {arrow && (
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
