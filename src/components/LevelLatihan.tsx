import { useMemo, useState } from "react";
import { Card, Button, Fraction } from "./ui";
import Pizza from "./Pizza";
import { simplify, type Frac } from "../lib/fractions";
import { sfx, burst } from "../lib/fx";
import { cn } from "../utils/cn";

// A light hands-on practice before the quiz. Different interaction per level group.
export default function LevelLatihan({ level, onDone }: { level: number; onDone: () => void }) {
  return (
    <Card className="p-5 sm:p-6 space-y-4">
      <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-3 text-sm font-semibold text-emerald-700">
        ✏️ Latihan langsung! Kerjakan tugas di bawah, lalu lanjut ke kuis.
      </div>
      {level === 5 ? <OrderTask onDone={onDone} /> : <TapTask level={level} onDone={onDone} />}
    </Card>
  );
}

/* Tap the right number of slices to match a target fraction */
function TapTask({ onDone }: { level: number; onDone: () => void }) {
  const rounds = 3;
  const [round, setRound] = useState(0);
  const [done, setDone] = useState(false);
  const target = useMemo<Frac>(() => {
    const d = [2, 4, 6, 8][Math.floor(Math.random() * 4)];
    const n = 1 + Math.floor(Math.random() * (d - 1));
    return simplify({ n, d });
  }, [round]);
  // Build a pizza with target.d slices
  const [sel, setSel] = useState(0);
  const [result, setResult] = useState<null | boolean>(null);

  const check = () => {
    const ok = sel === target.n;
    setResult(ok);
    if (ok) { sfx.correct(); burst(window.innerWidth / 2, 300, 24); } else sfx.wrong();
  };
  const nextRound = () => {
    if (round + 1 >= rounds) { setDone(true); return; }
    setRound((r) => r + 1); setSel(0); setResult(null); sfx.click();
  };

  if (done) {
    return (
      <div className="text-center space-y-3">
        <div className="text-4xl">🎉</div>
        <p className="font-extrabold text-slate-700">Latihan selesai! Kamu hebat!</p>
        <Button variant="primary" onClick={onDone}>Lanjut ke Kuis ➜</Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-center font-bold text-slate-600">
        Latihan {round + 1}/{rounds}: Warnai pizza agar menunjukkan <Fraction n={target.n} d={target.d} className="text-orange-500" />
      </p>
      <div className="mx-auto w-56">
        <Pizza slices={target.d} selected={sel} size={224} onSliceClick={(i) => { setSel(i < sel ? i : i + 1); setResult(null); sfx.click(); }} />
      </div>
      <p className="text-center text-sm font-bold text-slate-500">Terpilih: {sel}/{target.d} · Klik potongan pizza untuk memilih</p>
      {result === null ? (
        <div className="flex justify-center"><Button variant="green" onClick={check}>Periksa Jawaban</Button></div>
      ) : (
        <div className={cn("rounded-2xl p-3 text-center font-bold", result ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>
          {result ? "✅ Tepat sekali!" : `💡 Belum pas. Warnai ${target.n} potongan agar menjadi ${target.n}/${target.d}.`}
          <div className="mt-2 flex justify-center">
            {result ? <Button variant="primary" onClick={nextRound}>Lanjut ➜</Button> : <Button variant="cheese" onClick={() => setResult(null)}>Coba Lagi</Button>}
          </div>
        </div>
      )}
    </div>
  );
}

/* Order fractions from small to large */
function OrderTask({ onDone }: { onDone: () => void }) {
  const target = useMemo(() => {
    const base: Frac[] = [{ n: 1, d: 4 }, { n: 1, d: 2 }, { n: 3, d: 4 }, { n: 1, d: 1 }];
    return base;
  }, []);
  const [items, setItems] = useState<Frac[]>(() => {
    const a = [...target];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  });
  const [checked, setChecked] = useState<null | boolean>(null);

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const a = [...items]; [a[i], a[j]] = [a[j], a[i]]; setItems(a); setChecked(null); sfx.pop();
  };
  const check = () => {
    const ok = items.every((f, i) => f.n / f.d === target[i].n / target[i].d);
    setChecked(ok);
    if (ok) { sfx.correct(); burst(window.innerWidth / 2, 300, 30); } else sfx.wrong();
  };

  return (
    <div className="space-y-3">
      <p className="text-center font-bold text-slate-600">Urutkan pecahan dari TERKECIL ke TERBESAR menggunakan tombol ⬅️ ➡️</p>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((f, i) => (
          <div key={i} className="rounded-2xl bg-orange-50 border-2 border-orange-200 p-2 text-center">
            <div className="w-20 mx-auto"><Pizza slices={f.d} selected={f.n} size={80} /></div>
            <Fraction n={f.n} d={f.d} className="text-orange-500" />
            <div className="flex justify-center gap-1 mt-1">
              <button onClick={() => move(i, -1)} className="btn-juicy h-7 w-7 rounded-lg bg-sky-100 text-sky-600 font-bold">⬅️</button>
              <button onClick={() => move(i, 1)} className="btn-juicy h-7 w-7 rounded-lg bg-sky-100 text-sky-600 font-bold">➡️</button>
            </div>
          </div>
        ))}
      </div>
      {checked === null ? (
        <div className="flex justify-center"><Button variant="green" onClick={check}>Periksa Urutan</Button></div>
      ) : (
        <div className={cn("rounded-2xl p-3 text-center font-bold", checked ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600")}>
          {checked ? "✅ Urutan benar!" : "💡 Belum tepat. Pizza yang lebih kecil harus di kiri."}
          <div className="mt-2 flex justify-center">
            {checked ? <Button variant="primary" onClick={onDone}>Lanjut ke Kuis ➜</Button> : <Button variant="cheese" onClick={() => setChecked(null)}>Coba Lagi</Button>}
          </div>
        </div>
      )}
    </div>
  );
}
