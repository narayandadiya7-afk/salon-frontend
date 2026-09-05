import type { CSSProperties } from "react";

export function PieChartTooltip({
  active,
  payload,
  style,
}: {
  active?: boolean;
  payload?: Array<{
    name?: string | number;
    value?: number | string;
    color?: string;
    fill?: string;
    payload?: { color?: string; fill?: string };
  }>;
  style?: CSSProperties;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ margin: 0, padding: 10, whiteSpace: "nowrap", ...style }}>
      <ul style={{ padding: 0, margin: 0 }}>
        {payload.map((entry, i) => {
          const color = entry.payload?.color || entry.payload?.fill || entry.color || entry.fill;
          return (
            <li
              key={i}
              className="recharts-tooltip-item"
              style={{ display: "block", paddingTop: 4, paddingBottom: 4, color }}
            >
              <span className="recharts-tooltip-item-name">{entry.name}</span>
              <span className="recharts-tooltip-item-separator"> : </span>
              <span className="recharts-tooltip-item-value">{entry.value}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}