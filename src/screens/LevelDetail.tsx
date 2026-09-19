import { useState } from "react";
import { useRouter } from "../lib/router";
import { useStore } from "../lib/store";
import { getLevel } from "../lib/levels";
import { CONTENT } from "../lib/content";
import { Card, Button } from "../components/ui";
import Pizza from "../components/Pizza";
import { sfx, burst } from "../lib/fx";
import { cn } from "../utils/cn";
import LevelSim from "../components/LevelSim";
import LevelLatihan from "../components/LevelLatihan";

type Tab = "materi" | "contoh" | "simulasi" | "latihan" | "kuis";
const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "materi", label: "Materi", icon: "📘" },
  { id: "contoh", label: "Contoh", icon: "👀" },
  { id: "simulasi", label: "Simulasi", icon: "🍕" },
  { id: "latihan", label: "Latihan", icon: "✏️" },
  { id: "kuis", label: "Kuis", icon: "🏆" },
];

export default function LevelDetail({ level }: { level: number }) {
  const { go, back } = useRouter();
  const store = useStore();
  const info = getLevel(level);
  const content = CONTENT[level];
  const prog = store.state.levels[level];
  const [tab, setTab] = useState<Tab>("materi");

  const markMateri = () => {
    if (!prog.materiDone) { store.updateLevel(level, { materiDone: true }); store.addXp(20); }
    sfx.star();
    setTab("contoh");
  };

  return (
    <div className="animate-slide-up space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => { sfx.click(); back(); }}>← Kembali</Button>
        <div className="flex items-center gap-2">
          <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${info.color} text-white font-extrabold shadow`}>{level}</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800">{info.emoji} {info.title}</h1>
            <p className="text-xs font-semibold text-slate-500">{content.intro}</p>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => { sfx.click(); setTab(t.id); }}
            className={cn("btn-juicy shrink-0 rounded-full px-4 py-2 text-sm font-extrabold transition",
              tab === t.id ? "bg-sky-500 text-white shadow-md" : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50")}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tab === "materi" && (
        <Card className="p-5 sm:p-6 space-y-4">
          {content.materi.map((m, i) => (
            <div key={i}>
              <h3 className="text-lg font-extrabold text-orange-500">{m.heading}</h3>
              <ul className="mt-1 space-y-1">
                {m.body.map((b, j) => (
                  <li key={j} className="flex gap-2 text-slate-600 font-semibold">
                    <span className="text-emerald-400">▸</span><span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
            <span className="text-2xl">💡</span>
            <div><span className="font-extrabold text-amber-700">Ingat!</span> <span className="font-semibold text-amber-800">{content.ingat}</span></div>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" onClick={markMateri}>Lanjut ➜</Button>
          </div>
        </Card>
      )}

      {tab === "contoh" && (
        <Card className="p-5 sm:p-6">
          <h3 className="text-lg font-extrabold text-slate-700 mb-3">Contoh Visual</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {content.contoh.map((c, i) => (
              <div key={i} className="rounded-2xl bg-orange-50/60 border border-orange-100 p-3 text-center">
                {c.pizza && <div className="mx-auto w-24"><Pizza slices={c.pizza.slices} selected={c.pizza.selected} size={96} /></div>}
                <p className="mt-2 text-sm font-bold text-slate-600">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="primary" onClick={() => { sfx.click(); setTab("simulasi"); }}>Coba Simulasi ➜</Button>
          </div>
        </Card>
      )}

      {tab === "simulasi" && (
        <LevelSim level={level} onDone={() => {
          if (!prog.simulasiDone) { store.updateLevel(level, { simulasiDone: true }); store.addXp(25); }
          sfx.star(); setTab("latihan");
        }} />
      )}

      {tab === "latihan" && (
        <LevelLatihan level={level} onDone={() => {
          if (!prog.latihanDone) { store.updateLevel(level, { latihanDone: true }); store.addXp(30); }
          sfx.star();
          burst(window.innerWidth / 2, window.innerHeight / 2, 40);
          setTab("kuis");
        }} />
      )}

      {tab === "kuis" && (
        <Card className="p-6 text-center">
          <div className="text-5xl">🏆</div>
          <h3 className="mt-2 text-2xl font-extrabold text-slate-800">Kuis Level {level}</h3>
          <p className="text-slate-500 font-semibold">Uji pemahamanmu! Jawab benar minimal 60% untuk mendapat bintang dan membuka level berikutnya.</p>
          {prog.completed && <p className="mt-2 font-bold text-emerald-500">Selesai! Bintang: {"★".repeat(prog.stars)}{"☆".repeat(3 - prog.stars)}</p>}
          <Button variant="cheese" size="lg" className="mt-4" onClick={() => { sfx.click(); go({ name: "quiz", level }); }}>
            Mulai Kuis ➜
          </Button>
        </Card>
      )}
    </div>
  );
}
