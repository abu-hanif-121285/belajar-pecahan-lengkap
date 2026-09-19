// Fraction math utilities

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export interface Frac {
  n: number; // numerator
  d: number; // denominator
}

export function makeFrac(n: number, d: number): Frac {
  return { n, d };
}

export function simplify(f: Frac): Frac {
  const g = gcd(f.n, f.d);
  return { n: f.n / g, d: f.d / g };
}

export function isSimplified(f: Frac): boolean {
  return gcd(f.n, f.d) === 1;
}

export function addFrac(a: Frac, b: Frac): Frac {
  const d = lcm(a.d, b.d);
  return simplify({ n: a.n * (d / a.d) + b.n * (d / b.d), d });
}

export function subFrac(a: Frac, b: Frac): Frac {
  const d = lcm(a.d, b.d);
  return simplify({ n: a.n * (d / a.d) - b.n * (d / b.d), d });
}

export function mulFrac(a: Frac, b: Frac): Frac {
  return simplify({ n: a.n * b.n, d: a.d * b.d });
}

export function divFrac(a: Frac, b: Frac): Frac {
  return simplify({ n: a.n * b.d, d: a.d * b.n });
}

export function toDecimal(f: Frac): number {
  return f.n / f.d;
}

// Format decimal with Indonesian comma
export function idNum(n: number, maxDigits = 4): string {
  const rounded = Math.round(n * 10 ** maxDigits) / 10 ** maxDigits;
  return String(rounded).replace(".", ",");
}

export function toPercentStr(f: Frac): string {
  return idNum((f.n / f.d) * 100, 2) + "%";
}

export function toDecimalStr(f: Frac): string {
  return idNum(f.n / f.d, 4);
}

// Convert improper fraction to mixed number parts
export interface Mixed {
  whole: number;
  n: number;
  d: number;
}

export function toMixed(f: Frac): Mixed {
  const s = simplify(f);
  const whole = Math.floor(s.n / s.d);
  const n = s.n % s.d;
  return { whole, n, d: s.d };
}

export function mixedToStr(f: Frac): string {
  const m = toMixed(f);
  if (m.n === 0) return String(m.whole);
  if (m.whole === 0) return `${m.n}/${m.d}`;
  return `${m.whole} ${m.n}/${m.d}`;
}

// Indonesian reading of a fraction
const angka = [
  "nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh",
  "delapan", "sembilan", "sepuluh", "sebelas", "dua belas",
];
function bacaAngka(x: number): string {
  return angka[x] ?? String(x);
}
export function bacaPecahan(f: Frac): string {
  if (f.n === 1 && f.d === 2) return "satu per dua (setengah)";
  if (f.d === 2) return `${bacaAngka(f.n)} per dua`;
  return `${bacaAngka(f.n)} per ${bacaAngka(f.d)}`;
}

export function fracEqual(a: Frac, b: Frac): boolean {
  return a.n * b.d === b.n * a.d;
}

export function compareFrac(a: Frac, b: Frac): number {
  const l = a.n * b.d - b.n * a.d;
  return l === 0 ? 0 : l > 0 ? 1 : -1;
}
