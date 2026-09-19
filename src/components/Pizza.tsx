import { useMemo } from "react";

interface PizzaProps {
  slices: number; // total equal slices
  selected: number; // how many are highlighted
  size?: number;
  color?: string; // highlight color
  emptyColor?: string;
  onSliceClick?: (index: number) => void;
  selectedSet?: Set<number>; // for individually-toggled slices
  toppings?: boolean;
  label?: string;
}

// deterministic pseudo-random for topping placement
function rng(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export default function Pizza({
  slices,
  selected,
  size = 220,
  color = "#e8492b",
  emptyColor = "#f3e7c9",
  onSliceClick,
  selectedSet,
  toppings = true,
  label,
}: PizzaProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;

  const wedges = useMemo(() => {
    const arr = [];
    const step = (2 * Math.PI) / slices;
    for (let i = 0; i < slices; i++) {
      const a0 = -Math.PI / 2 + i * step;
      const a1 = a0 + step;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const large = step > Math.PI ? 1 : 0;
      const d =
        slices === 1
          ? `M ${cx} ${cy} m ${-r} 0 a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${-r * 2} 0`
          : `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
      // mid angle for topping
      const mid = a0 + step / 2;
      arr.push({ d, i, mid });
    }
    return arr;
  }, [slices, cx, cy, r]);

  const toppingDots = useMemo(() => {
    if (!toppings) return [];
    const rand = rng(slices * 97 + 13);
    const dots: { x: number; y: number; kind: number; rr: number }[] = [];
    const count = Math.min(26, slices * 3 + 6);
    for (let i = 0; i < count; i++) {
      const ang = rand() * Math.PI * 2;
      const dist = Math.sqrt(rand()) * (r - 14);
      dots.push({
        x: cx + dist * Math.cos(ang),
        y: cy + dist * Math.sin(ang),
        kind: Math.floor(rand() * 3),
        rr: 3 + rand() * 3,
      });
    }
    return dots;
  }, [slices, cx, cy, r, toppings]);

  const isSel = (i: number) => {
    if (selectedSet) return selectedSet.has(i);
    return i < selected;
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      style={{ maxWidth: size, maxHeight: size }}
      role="img"
      aria-label={label ?? `Pizza dibagi ${slices} bagian, ${selected} bagian dipilih`}
      className="no-select drop-shadow-lg"
    >
      {/* crust */}
      <circle cx={cx} cy={cy} r={r + 5} fill="#e0a441" />
      <circle cx={cx} cy={cy} r={r + 2} fill="#d68f2e" />
      {/* wedges */}
      {wedges.map((w) => {
        const sel = isSel(w.i);
        return (
          <g key={w.i}>
            <path
              d={w.d}
              fill={sel ? color : emptyColor}
              stroke="#c98b2c"
              strokeWidth={1.5}
              onClick={onSliceClick ? () => onSliceClick(w.i) : undefined}
              style={{
                cursor: onSliceClick ? "pointer" : "default",
                transition: "fill 0.25s ease",
              }}
            />
          </g>
        );
      })}
      {/* toppings only on top of everything, tinted by selection */}
      {toppingDots.map((dot, idx) => {
        // find which wedge this dot belongs to
        const ang = Math.atan2(dot.y - cy, dot.x - cx) + Math.PI / 2;
        const norm = ((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        const wedgeIdx = Math.floor(norm / ((Math.PI * 2) / slices));
        const onSel = isSel(wedgeIdx);
        const colors = onSel
          ? ["#a52915", "#c73520", "#e0b400"]
          : ["#c96b4a", "#d98b32", "#b9a24a"];
        return (
          <circle
            key={idx}
            cx={dot.x}
            cy={dot.y}
            r={dot.rr}
            fill={colors[dot.kind]}
            opacity={0.9}
            pointerEvents="none"
          />
        );
      })}
    </svg>
  );
}
