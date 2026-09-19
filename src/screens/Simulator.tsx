import { useState } from "react";
import { useRouter } from "../lib/router";
import { Card, Button, Fraction } from "../components/ui";
import Pizza from "../components/Pizza";
import { simplify, isSimplified, toDecimalStr, toPercentStr, bacaPecahan } from "../lib/fractions";
import { sfx, burst } from "../lib/fx";
import { cn } from "../utils/cn";

const SLICE_OPTIONS = [2, 3, 4, 6, 8, 10, 12, 16];

export default function Simulator() {
  const { back } = useRouter();
  const [slices, setSlices] = useState(8);
  const [eaten, setEaten] = useState(3);

  const clampEaten = (v: number) => Math.max(0, Math.min(slices, v));

  const setSlicesSafe = (s: number) => {
    setSlices(s);
    setEaten((e) => Math.min(e, s));
    sfx.pop();
  };

  const f = { n: eaten, d: slices };
  const rem = { n: slices - eaten, d: slices };
  const simp = simplify(f);
  const already = isSimplified(f) || f.n === 0;

  const changeEaten = (delta: number) => {
    const nv = clampEaten(eaten + delta);
    if (nv !== eaten) { sfx.pop(); setEaten(nv); }
  };

  const toggleSlice = (i: number) => {
    // clicking a slice sets eaten to that index+1 (visual first N)
    const nv = i < eaten ? i : i + 1;
    setEaten(clampEaten(nv));
    sfx.click();
    const el = document.getElementById("sim-pizza");
    if (el) {
      const r = el.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 14);
    }
  };

  return (
    <div className="animate-slide-up space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => { sfx.click(); back(); }}>← Kembali</Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">🍕 Laboratorium Pizza Pecahan</h1>
          <p className="text-sm font-semibold text-slate-500">Potong pizza, pilih bagian yang dimakan, dan lihat nilainya!</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr_300px]">
        {/* controls */}
        <Card className="p-4 space-y-4">
          <div>
            <div className="text-sm font-extrabold text-slate-600 mb-2">Jumlah Potongan</div>
            <div className="grid grid-cols-4 gap-2">
              {SLICE_OPTIONS.map((s) => (
                <button key={s} onClick={() => setSlicesSafe(s)}
                  className={cn("btn-juicy rounded-xl py-2 font-extrabold border-2 transition",
                    slices === s ? "bg-sky-500 text-white border-sky-500 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-sky-300")}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-extrabold text-slate-600 mb-2">Bagian yang Dimakan</div>
            <div className="flex items-center gap-2">
              <button onClick={() => changeEaten(-1)} aria-label="Kurangi"
                className="btn-juicy grid h-12 w-12 place-items-center rounded-2xl bg-red-100 text-red-500 text-2xl font-extrabold hover:bg-red-200">−</button>
              <div className="flex-1 rounded-2xl bg-orange-50 border-2 border-orange-200 py-2.5 text-center text-2xl font-extrabold text-orange-600">{eaten}</div>
              <button onClick={() => changeEaten(1)} aria-label="Tambah"
                className="btn-juicy grid h-12 w-12 place-items-center rounded-2xl bg-green-100 text-green-600 text-2xl font-extrabold hover:bg-green-200">+</button>
            </div>
            <input type="range" min={0} max={slices} value={eaten}
              onChange={(e) => { setEaten(Number(e.target.value)); sfx.pop(); }}
              className="mt-3 w-full accent-orange-500" aria-label="Slider bagian dimakan" />
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3 text-sm font-semibold text-amber-800">
            💡 Klik langsung pada potongan pizza untuk memilihnya!
          </div>
        </Card>

        {/* pizza */}
        <Card className="p-4 flex flex-col items-center justify-center">
          <div id="sim-pizza" className="w-full max-w-[320px] aspect-square">
            <Pizza slices={slices} selected={eaten} size={320} onSliceClick={toggleSlice}
              label={`Pizza dibagi ${slices} bagian, ${eaten} dimakan`} />
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm font-bold">
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-red-500 inline-block" /> Dimakan</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-amber-100 border border-amber-300 inline-block" /> Tersisa</span>
          </div>
          <div className="mt-2 rounded-2xl bg-sky-50 border border-sky-100 px-4 py-2 text-center text-sm font-semibold text-sky-700">
            Pizza dibagi menjadi {slices} bagian sama besar. Kamu mengambil {eaten} bagian.
            <div className="text-xs mt-0.5 text-sky-500">Dibaca: {bacaPecahan(f)}</div>
          </div>
        </Card>

        {/* result */}
        <Card className="p-4">
          <div className="text-lg font-extrabold text-slate-700 mb-3">📊 Hasil</div>
          <div className="space-y-2.5">
            <ResultRow icon="🔴" label="Dimakan"><Fraction n={f.n} d={f.d} size="lg" className="text-red-500" /></ResultRow>
            <ResultRow icon="⚪" label="Tersisa"><Fraction n={rem.n} d={rem.d} size="lg" className="text-slate-500" /></ResultRow>
            <ResultRow icon="🔢" label="Desimal"><span className="text-lg font-extrabold text-slate-700">{toDecimalStr(f)}</span></ResultRow>
            <ResultRow icon="💯" label="Persen"><span className="text-lg font-extrabold text-slate-700">{toPercentStr(f)}</span></ResultRow>
            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3">
              <div className="text-xs font-bold text-emerald-600 mb-1">Bentuk Sederhana</div>
              {already ? (
                <div className="flex items-center gap-2">
                  <Fraction n={f.n} d={f.d} size="md" className="text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-500">(sudah sederhana)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Fraction n={f.n} d={f.d} size="md" className="text-slate-400" />
                  <span className="text-emerald-500 font-bold">=</span>
                  <Fraction n={simp.n} d={simp.d} size="md" className="text-emerald-600" />
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ResultRow({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
      <span className="flex items-center gap-2 text-sm font-bold text-slate-500"><span>{icon}</span>{label}</span>
      {children}
    </div>
  );
}
