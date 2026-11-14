import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type InfoCardProps = {
  children: ReactNode;
  className?: string;
  animatedBorder?: boolean;
};

export function InfoCard({
  children,
  className,
  animatedBorder = true,
}: InfoCardProps) {
  return (
    <div
      className={cn(
        "group relative min-h-72 rounded-xl border border-line bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift sm:p-8",
        className
      )}
    >
      {children}
      {animatedBorder && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 origin-left scale-x-0 rounded-xl border-b-4 border-brass transition-transform duration-500 group-hover:scale-x-100"
        />
      )}
    </div>
  );
}
