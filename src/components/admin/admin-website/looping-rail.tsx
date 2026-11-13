"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

/** Delay after the last scroll event before the rail wraps around. */
const SWIPE_SETTLE_MS = 150;

/**
 * Mobile-only swipe rail that loops in both directions.
 *
 * The cards are rendered three times and the rail opens on the middle copy,
 * so swiping left from the first card reaches the last one (and vice versa).
 * Once scrolling settles on an outer copy the rail shifts by exactly one copy
 * width, which looks identical and keeps the loop endless. Cards take most of
 * the rail width so both neighbours stay visible as a hint of what is next,
 * and the rail clips overflow so they read as adjacent cards rather than
 * chopped photos. `snap-always` keeps one swipe to one card.
 *
 * The rail is hidden from `sm` up, so callers render their grid layout next
 * to it. Cards are passed in as children, which keeps the page free of
 * client-side markup.
 */
export function LoopRail({
  children,
  ariaLabel,
  className = "",
  itemClassName = "w-[80%] shrink-0 snap-center snap-always",
}: {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  itemClassName?: string;
}) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const cards = Children.toArray(children);
  const count = cards.length;

  /** Distance from one copy of the list to the next. */
  const measureSetWidth = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return 0;

    const first = rail.children[0] as HTMLElement | undefined;
    const lead = rail.children[count] as HTMLElement | undefined;
    if (!first || !lead) return 0;

    return lead.offsetLeft - first.offsetLeft;
  }, [count]);

  // Runs before paint on mount, opening on the middle copy.
  const attachRail = useCallback(
    (rail: HTMLDivElement | null) => {
      railRef.current = rail;
      if (!rail) return;

      const lead = rail.children[count] as HTMLElement | undefined;
      const setWidth = measureSetWidth();
      if (!lead || !setWidth) return;

      rail.scrollLeft = setWidth - (rail.clientWidth - lead.offsetWidth) / 2;
    },
    [count, measureSetWidth],
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const wrap = () => {
      const items = Array.from(rail.children) as HTMLElement[];
      const setWidth = measureSetWidth();
      if (!items.length || !setWidth) return;

      const center = rail.scrollLeft + rail.clientWidth / 2;
      let nearest = 0;
      let best = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const distance = Math.abs(
          item.offsetLeft + item.offsetWidth / 2 - center,
        );
        if (distance < best) {
          best = distance;
          nearest = index;
        }
      });

      if (nearest < count) rail.scrollLeft += setWidth;
      else if (nearest >= count * 2) rail.scrollLeft -= setWidth;
    };

    const onScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(wrap, SWIPE_SETTLE_MS);
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureSetWidth);

    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureSetWidth);
      if (timer) clearTimeout(timer);
    };
  }, [count, measureSetWidth]);

  return (
    <div
      ref={attachRail}
      tabIndex={0}
      role="group"
      aria-label={ariaLabel}
      className={
        "scroll-reveal relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:hidden " +
        className
      }
    >
      {[0, 1, 2].map((copy) =>
        cards.map((card, index) => (
          <div
            key={`${copy}-${index}`}
            inert={copy !== 1 || undefined}
            aria-hidden={copy !== 1 || undefined}
            className={itemClassName}
          >
            {card}
          </div>
        )),
      )}
    </div>
  );
}
