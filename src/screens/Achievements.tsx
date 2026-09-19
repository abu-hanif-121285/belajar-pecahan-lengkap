import { useRouter } from "../lib/router";
import { useStore } from "../lib/store";
import { BADGES } from "../lib/levels";
import { Card, Button, ProgressBar } from "../components/ui";
import { sfx, burst } from "../lib/fx";
import { cn } from "../utils/cn";

export default function Achievements() {
  const { back } = useRouter();
  const { state, levelXp } = useStore();
  const lv = levelXp();
  const completed = Object.values(state.levels).filter((l) => l.completed).length;
  const allDone = completed === 12;

  return (
    <div className="animate-slide-up space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => { sfx.click(); back(); }}>← Kembali</Button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">⭐ Pencapaian</h1>
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-orange-400 text-2xl font-extrabold text-white">
            {(state.studentName || "P")[0].toUpperCase()}
          </span>
          <div className="flex-1">
            <div className="text-xl font-extrabold text-slate-800">{state.studentName || "Petualang"}</div>
            <div className="text-sm font-bold text-sky-600">Level {lv.level} · {lv.current}/{lv.needed} XP</div>
            <ProgressBar value={lv.current} max={lv.needed} className="mt-1" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-amber-50 p-3"><div className="text-2xl font-extrabold text-amber-500">⭐ {state.stars}</div><div className="text-xs font-bold text-slate-400">Bintang</div></div>
          <div className="rounded-2xl bg-pink-50 p-3"><div className="text-2xl font-extrabold text-pink-500">🏅 {state.badges.length}</div><div className="text-xs font-bold text-slate-400">Badge</div></div>
          <div className="rounded-2xl bg-emerald-50 p-3"><div className="text-2xl font-extrabold text-emerald-500">{completed}/12</div><div className="text-xs font-bold text-slate-400">Level Selesai</div></div>
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-lg font-extrabold text-slate-700 mb-3">🏅 Badge Saya</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BADGES.map((b) => {
            const earned = state.badges.includes(b.id);
            return (
              <div key={b.id} className={cn("rounded-2xl border-2 p-3 text-center transition", earned ? "border-transparent bg-white shadow-md" : "border-dashed border-slate-200 bg-slate-50")}>
                <div className={cn("mx-auto grid h-14 w-14 place-items-center rounded-full text-3xl", earned ? `bg-gradient-to-br ${b.color} shadow-lg` : "bg-slate-200 grayscale opacity-60")}>
                  {b.emoji}
                </div>
                <div className={cn("mt-2 text-sm font-extrabold", earned ? "text-slate-700" : "text-slate-400")}>{b.name}</div>
                <div className="text-[10px] font-semibold text-slate-400">{earned ? "Diperoleh! ✓" : b.desc}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-5">
        <h2 className="text-lg font-extrabold text-slate-700 mb-2">📜 Rekap Nilai Kuis</h2>
        {state.quizHistory.length === 0 ? (
          <p className="text-sm font-semibold text-slate-400">Belum ada kuis dikerjakan. Ayo mulai belajar! 🍕</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-slate-400 font-bold border-b"><th className="py-1">Level</th><th>Skor</th><th>Tanggal</th></tr></thead>
              <tbody>
                {state.quizHistory.slice(0, 10).map((r, i) => (
                  <tr key={i} className="border-b border-slate-50 font-semibold text-slate-600">
                    <td className="py-1.5">Level {r.level}</td><td>{r.score}/{r.total}</td><td>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Certificate */}
      <Card className={cn("p-6 text-center", allDone ? "bg-gradient-to-br from-amber-50 to-orange-50" : "")}>
        <h2 className="text-lg font-extrabold text-slate-700">🎓 Sertifikat Kelulusan</h2>
        {allDone ? (
          <div className="mt-3 rounded-3xl border-4 border-amber-300 bg-white p-6" onClick={() => { sfx.win(); burst(window.innerWidth / 2, window.innerHeight / 2, 60); }}>
            <div className="text-5xl">👑🍕</div>
            <div className="mt-2 text-2xl font-extrabold text-orange-500">SERTIFIKAT MASTER PECAHAN</div>
            <p className="mt-1 font-semibold text-slate-500">Diberikan kepada</p>
            <p className="text-3xl font-extrabold text-slate-800">{state.studentName || "Petualang Matematika"}</p>
            <p className="mt-1 font-semibold text-slate-500">telah menyelesaikan seluruh Petualangan Pecahan!</p>
            <p className="mt-3 text-sm font-bold text-slate-400">Petualangan Pecahan · Wiyanto Abu Hanif</p>
          </div>
        ) : (
          <p className="mt-2 text-sm font-semibold text-slate-500">Selesaikan semua 12 level untuk mendapatkan sertifikat! Sudah {completed}/12. 💪</p>
        )}
      </Card>
    </div>
  );
}
