import { useState } from "react";
import { Card, Button, Fraction } from "./ui";
import Pizza from "./Pizza";
import { CONTENT } from "../lib/content";
import {
  simplify, addFrac, subFrac, mulFrac, toDecimalStr, toPercentStr,
  compareFrac, fracEqual, type Frac,
} from "../lib/fractions";
import { sfx, burst } from "../lib/fx";
import { cn } from "../utils/cn";

export default function LevelSim({ level, onDone }: { level: number; onDone: () => void }) {
  const info = CONTENT[level].simInfo;

  return (
    <Card className="p-5 sm:p-6 space-y-4">
      <div className="rounded-2xl bg-sky-50 border border-sky-100 p-3 text-sm font-semibold text-sky-700">🍕 {info}</div>
      <SimSwitch level={level} />
      <div className="flex justify-end">
        <Button variant="primary" onClick={onDone}>Selesai Simulasi ➜</Button>
      </div>
    </Card>
  );
}

function SimSwitch({ level }: { level: number }) {
  if (level === 3) return <SenilaiSim />;
  if (level === 4) return <CompareSim />;
  if (level === 6) return <JenisSim />;
  if (level === 7) return <OpSim op="+" />;
  if (level === 8) return <OpSim op="-" />;
  if (level === 9) return <OpSim op="×" />;
  if (level === 10) return <DivSim />;
  return <BasicSim />;
}

/* ---------- Basic (L1,2,5,11,12) ---------- */
function BasicSim() {
  const [slices, setSlices] = useState(8);
  const [sel, setSel] = useState(3);
  const f: Frac = { n: sel, d: slices };
  const simp = simplify(f);
  return (
    <div className="grid gap-4 md:grid-cols-2 items-center">
      <div className="mx-auto w-56"><Pizza slices={slices} selected={sel} size={224} onSliceClick={(i) => { setSel(i < sel ? i : i + 1); sfx.click(); }} /></div>
      <div className="space-y-3">
        <Labeled label="Jumlah potongan (penyebut)">
          <StepControl value={slices} min={2} max={16} onChange={(v) => { setSlices(v); setSel((s) => Math.min(s, v)); }} />
        </Labeled>
        <Labeled label="Bagian diambil (pembilang)">
          <StepControl value={sel} min={0} max={slices} onChange={setSel} />
        </Labeled>
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-orange-50 p-3">
          <Fraction n={f.n} d={f.d} size="xl" className="text-orange-500" />
          <div className="text-sm font-bold text-slate-500">
            = {toDecimalStr(f)} = {toPercentStr(f)}<br />
            Sederhana: <Fraction n={simp.n} d={simp.d} size="sm" className="text-emerald-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Senilai (L3) ---------- */
function SenilaiSim() {
  const [base] = useState<Frac>({ n: 1, d: 2 });
  const [mult, setMult] = useState(1);
  const cur: Frac = { n: base.n * mult, d: base.d * mult };
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-4">
        {[1, 2, 4].map((m) => {
          const fr = { n: base.n * m, d: base.d * m };
          return (
            <div key={m} className={cn("rounded-2xl p-2 border-2", m === mult ? "border-emerald-400 bg-emerald-50" : "border-transparent")}>
              <div className="w-28"><Pizza slices={fr.d} selected={fr.n} size={112} /></div>
              <div className="text-center mt-1"><Fraction n={fr.n} d={fr.d} className="text-emerald-600" /></div>
            </div>
          );
        })}
      </div>
      <p className="text-center font-bold text-slate-600">Luas bagian berwarna tetap SAMA walau potongannya berbeda! Itulah pecahan senilai.</p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="green" onClick={() => { setMult(2); sfx.pop(); }}>Kalikan 2</Button>
        <Button variant="secondary" onClick={() => { setMult(4); sfx.pop(); }}>Kalikan 4</Button>
        <Button variant="cheese" onClick={() => { setMult(1); sfx.pop(); }}>Sederhanakan</Button>
      </div>
      <div className="text-center rounded-2xl bg-sky-50 p-3 font-bold text-sky-700">
        1/2 = <Fraction n={cur.n} d={cur.d} size="sm" className="text-sky-700" /> (senilai)
      </div>
    </div>
  );
}

/* ---------- Compare (L4) ---------- */
function CompareSim() {
  const [a, setA] = useState<Frac>({ n: 3, d: 4 });
  const [b, setB] = useState<Frac>({ n: 1, d: 4 });
  const [guess, setGuess] = useState<null | ">" | "<" | "=">(null);
  const cmp = compareFrac(a, b);
  const correct = cmp > 0 ? ">" : cmp < 0 ? "<" : "=";
  const check = (g: ">" | "<" | "=") => {
    setGuess(g);
    if (g === correct) { sfx.correct(); burst(window.innerWidth / 2, 300, 24); } else sfx.wrong();
  };
  const rand = () => {
    const rnd = () => { const d = [2, 3, 4, 6, 8][Math.floor(Math.random() * 5)]; return { n: 1 + Math.floor(Math.random() * (d - 1)), d }; };
    setA(rnd()); setB(rnd()); setGuess(null); sfx.pop();
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-4">
        <div className="text-center"><div className="w-28"><Pizza slices={a.d} selected={a.n} size={112} /></div><Fraction n={a.n} d={a.d} className="text-red-500" /></div>
        <div className="text-4xl font-extrabold text-slate-300">?</div>
        <div className="text-center"><div className="w-28"><Pizza slices={b.d} selected={b.n} size={112} color="#4aa3ff" /></div><Fraction n={b.n} d={b.d} className="text-sky-500" /></div>
      </div>
      <div className="flex justify-center gap-2">
        {(["<", "=", ">"] as const).map((s) => (
          <button key={s} onClick={() => check(s)}
            className={cn("btn-juicy grid h-14 w-14 place-items-center rounded-2xl text-2xl font-extrabold border-2",
              guess === s ? (s === correct ? "bg-emerald-400 text-white border-emerald-400" : "bg-red-400 text-white border-red-400") : "bg-white border-slate-200 text-slate-600 hover:border-orange-300")}>
            {s}
          </button>
        ))}
      </div>
      {guess && (
        <div className={cn("rounded-2xl p-3 text-center font-bold", guess === correct ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>
          {guess === correct ? "✅ Benar! " : "💡 "}Jawaban yang tepat: {a.n}/{a.d} {correct} {b.n}/{b.d}
        </div>
      )}
      <div className="flex justify-center"><Button variant="cheese" onClick={rand}>🎲 Soal Baru</Button></div>
    </div>
  );
}

/* ---------- Jenis / Desimal-Persen (L6) ---------- */
function JenisSim() {
  const [f, setF] = useState<Frac>({ n: 3, d: 4 });
  const [view, setView] = useState<"pecahan" | "desimal" | "persen">("pecahan");
  const whole = Math.floor(f.n / f.d);
  const restN = f.n % f.d;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap justify-center gap-3">
        {Array.from({ length: Math.max(1, whole + (restN > 0 ? 1 : 0)) }).map((_, i) => {
          const isLast = i === whole;
          return <div key={i} className="w-24"><Pizza slices={f.d} selected={isLast ? restN : f.d} size={96} /></div>;
        })}
      </div>
      <div className="text-center rounded-2xl bg-pink-50 p-4">
        {view === "pecahan" && <Fraction n={f.n} d={f.d} size="xl" className="text-pink-500" />}
        {view === "desimal" && <span className="text-4xl font-extrabold text-pink-500">{toDecimalStr(f)}</span>}
        {view === "persen" && <span className="text-4xl font-extrabold text-pink-500">{toPercentStr(f)}</span>}
        {f.n > f.d && <p className="mt-1 text-sm font-bold text-slate-500">Pecahan tidak murni = {whole} {restN}/{f.d}</p>}
      </div>
      <div className="flex justify-center gap-2">
        {(["pecahan", "desimal", "persen"] as const).map((v) => (
          <Button key={v} variant={view === v ? "primary" : "outline"} size="sm" onClick={() => { setView(v); sfx.pop(); }}>{v}</Button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {([{ n: 1, d: 2 }, { n: 3, d: 4 }, { n: 5, d: 4 }, { n: 1, d: 4 }] as Frac[]).map((opt, i) => (
          <Button key={i} variant="cheese" size="sm" onClick={() => { setF(opt); sfx.pop(); }}>{opt.n}/{opt.d}</Button>
        ))}
      </div>
    </div>
  );
}

/* ---------- Operations +/-/× (L7,8,9) ---------- */
function OpSim({ op }: { op: "+" | "-" | "×" }) {
  const [a, setA] = useState<Frac>({ n: 1, d: 4 });
  const [b, setB] = useState<Frac>({ n: 2, d: 4 });
  let res: Frac;
  if (op === "+") res = addFrac(a, b);
  else if (op === "-") res = subFrac(a, b);
  else res = mulFrac(a, b);
  const valid = op !== "-" || compareFrac(a, b) >= 0;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <div className="text-center"><div className="w-24"><Pizza slices={a.d} selected={a.n} size={96} /></div><Fraction n={a.n} d={a.d} className="text-red-500" /></div>
        <span className="text-3xl font-extrabold text-slate-400">{op}</span>
        <div className="text-center"><div className="w-24"><Pizza slices={b.d} selected={b.n} size={96} color="#4aa3ff" /></div><Fraction n={b.n} d={b.d} className="text-sky-500" /></div>
        <span className="text-3xl font-extrabold text-slate-400">=</span>
        <div className="text-center"><div className="w-24"><Pizza slices={res.d} selected={Math.min(res.n, res.d)} size={96} color="#57b846" /></div>
          {valid ? <Fraction n={res.n} d={res.d} className="text-emerald-600" /> : <span className="text-red-400 text-sm font-bold">tidak valid</span>}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <FracPicker label="Pecahan 1" f={a} onChange={setA} />
        <FracPicker label="Pecahan 2" f={b} onChange={setB} />
      </div>
      {valid && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-sm font-semibold text-emerald-700">
          <b>Langkah:</b> {op === "×"
            ? `${a.n}×${b.n} = ${a.n * b.n} (atas), ${a.d}×${b.d} = ${a.d * b.d} (bawah), sederhanakan → ${res.n}/${res.d}`
            : `Samakan penyebut, lalu ${op === "+" ? "jumlahkan" : "kurangkan"} pembilang → ${res.n}/${res.d}`}
        </div>
      )}
    </div>
  );
}

/* ---------- Division (L10) ---------- */
function DivSim() {
  const [total, setTotal] = useState(1);
  const [d, setD] = useState(4);
  const result = total * d;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: total }).map((_, i) => <div key={i} className="w-24"><Pizza slices={d} selected={d} size={96} /></div>)}
      </div>
      <p className="text-center font-bold text-slate-600">{total} pizza, tiap pizza dipotong {d} → ada <span className="text-orange-500 text-xl">{result}</span> potongan!</p>
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-center text-sm font-semibold text-emerald-700">
        {total} ÷ (1/{d}) = {total} × {d} = {result}. <b>Bagi = kali kebalikan!</b>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Labeled label="Jumlah pizza utuh"><StepControl value={total} min={1} max={3} onChange={setTotal} /></Labeled>
        <Labeled label="Potongan per pizza (1/n)"><StepControl value={d} min={2} max={12} onChange={setD} /></Labeled>
      </div>
    </div>
  );
}

/* ---------- shared small controls ---------- */
function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><div className="text-xs font-extrabold text-slate-500 mb-1">{label}</div>{children}</div>;
}
function StepControl({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => { if (value > min) { onChange(value - 1); sfx.pop(); } }} className="btn-juicy grid h-10 w-10 place-items-center rounded-xl bg-red-100 text-red-500 text-xl font-extrabold">−</button>
      <div className="flex-1 rounded-xl bg-slate-50 border-2 border-slate-200 py-1.5 text-center text-xl font-extrabold text-slate-700">{value}</div>
      <button onClick={() => { if (value < max) { onChange(value + 1); sfx.pop(); } }} className="btn-juicy grid h-10 w-10 place-items-center rounded-xl bg-green-100 text-green-600 text-xl font-extrabold">+</button>
    </div>
  );
}
function FracPicker({ label, f, onChange }: { label: string; f: Frac; onChange: (f: Frac) => void }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-2">
      <div className="text-xs font-extrabold text-slate-500 mb-1 text-center">{label}</div>
      <div className="flex items-center justify-center gap-1">
        <StepControl value={f.n} min={0} max={f.d} onChange={(n) => onChange({ ...f, n })} />
      </div>
      <div className="text-center text-xs font-bold text-slate-400 my-1">per</div>
      <StepControl value={f.d} min={2} max={12} onChange={(d) => onChange({ n: Math.min(f.n, d), d })} />
    </div>
  );
}

// keep import used
void fracEqual;
