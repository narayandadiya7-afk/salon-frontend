import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type FaqItemProps = {
  index: number;
  question: string;
  answer: ReactNode;
  className?: string;
};

export function FaqItem({ index, question, answer, className }: FaqItemProps) {
  return (
    <details
      className={cn(
        "group overflow-hidden rounded-xl border border-line bg-background shadow-card transition-all duration-300 hover:border-brass/40 hover:shadow-lift",
        className
      )}
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/10 font-mono text-xs text-brass">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-display text-lg leading-snug sm:text-xl">
          {question}
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-brass transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>

      <div className="border-t border-line bg-surface/40 px-5 py-4 sm:px-6 sm:py-5">
        <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
          {answer}
        </p>
      </div>
    </details>
  );
}
