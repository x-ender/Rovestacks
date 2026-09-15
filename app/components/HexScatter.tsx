const HEXES = [
  { x: 40, y: 60, s: 26 },
  { x: 90, y: 40, s: 16 },
  { x: 340, y: 90, s: 22 },
  { x: 380, y: 200, s: 14 },
  { x: 60, y: 260, s: 18 },
  { x: 300, y: 30, s: 12 },
  { x: 200, y: 250, s: 20 },
  { x: 250, y: 150, s: 10 },
];

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

export default function HexScatter({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <svg
      className="hex-scatter"
      viewBox="0 0 420 300"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
      aria-hidden="true"
    >
      {HEXES.map((h, i) => (
        <polygon key={i} points={hexPoints(h.x, h.y, h.s)} fill="none" stroke="currentColor" strokeWidth="1.2" />
      ))}
    </svg>
  );
}
