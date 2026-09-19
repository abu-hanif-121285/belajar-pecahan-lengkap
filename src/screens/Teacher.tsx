import { useState } from "react";
import { useRouter } from "../lib/router";
import { useStore } from "../lib/store";
import { LEVELS } from "../lib/levels";
import { questionsForLevel } from "../lib/questions";
import { Card, Button } from "../components/ui";
import { sfx } from "../lib/fx";
import { cn } from "../utils/cn";

const FAKE_STUDENTS = [
  { name: "Andi", level: 3, score: 330, done: "6/12" },
  { name: "Budi", level: 2, score: 180, done: "4/12" },
  { name: "Citra", level: 4, score: 450, done: "8/12" },
  { name: "Dewi", level: 1, score: 90, done: "3/12" },
];

// kredensial disamarkan (base64) agar tidak terbaca langsung di layar/kode
const GURU_U = atob("QWJ1IEhhbmlm");
const GURU_P = atob("SW5vdmF0aWY=");

export default function Teacher() {
  const { back } = useRouter();
  const store = useStore();
  const [logged, setLogged] = useState(false);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState<"dash" | "levels" | "settings" | "bank">("dash");

  const login = () => {
    if (u.trim() === GURU_U && p === GURU_P) { setLogged(true); sfx.win(); setErr(""); }
    else { setErr("Username atau password salah. Coba lagi."); sfx.wrong(); }
  };

  if (!logged) {
    return (
      <div className="animate-slide-up mx-auto max-w-md">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="sm" onClick={() => { sfx.click(); back(); }}>← Kembali</Button>
          <h1 className="text-2xl font-extrabold text-slate-800">🎓 Mode Guru</h1>
        </div>
        <Card className="p-6">
          <p className="text-sm font-semibold text-slate-500 mb-4 text-center">Login khusus guru untuk mengakses dashboard.</p>
          <label className="text-sm font-bold text-slate-600">Username</label>
          <input value={u} onChange={(e) => setU(e.target.value)} placeholder="Masukkan username"
            className="mt-1 mb-3 w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 font-semibold focus:border-sky-400 focus:outline-none" />
          <label className="text-sm font-bold text-slate-600">Password</label>
          <input type="password" value={p} onChange={(e) => setP(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} placeholder="Masukkan password"
            className="mt-1 w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 font-semibold focus:border-sky-400 focus:outline-none" />
          {err && <p className="mt-2 text-sm font-bold text-red-500">{err}</p>}
          <Button variant="secondary" className="mt-4 w-full" onClick={login}>Login</Button>
          <p className="mt-3 text-center text-xs font-semibold text-slate-400">Akses khusus guru · Hubungi pengembang untuk mendapatkan akun</p>
        </Card>
      </div>
    );
  }

  const TABS = [
    { id: "dash", label: "📊 Dashboard" },
    { id: "levels", label: "🔓 Atur Level" },
    { id: "settings", label: "⚙️ Pengaturan" },
    { id: "bank", label: "📚 Bank Soal" },
  ] as const;

  return (
    <div className="animate-slide-up space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="ghost" size="sm" onClick={() => { sfx.click(); back(); }}>← Kembali</Button>
        <h1 className="text-2xl font-extrabold text-slate-800">🎓 Dashboard Guru</h1>
        <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-600">Guru ✓</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => { sfx.click(); setTab(t.id); }}
            className={cn("btn-juicy shrink-0 rounded-full px-4 py-2 text-sm font-extrabold",
              tab === t.id ? "bg-sky-500 text-white shadow" : "bg-white border border-slate-200 text-slate-500")}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "dash" && (
        <Card className="p-5">
          <h2 className="font-extrabold text-slate-700 mb-3">Progres Siswa (demo)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-slate-400 font-bold border-b"><th className="py-2">Nama</th><th>Level</th><th>Skor</th><th>Materi Selesai</th></tr></thead>
              <tbody>
                <tr className="border-b border-orange-100 bg-amber-50 font-bold text-slate-700">
                  <td className="py-2">{store.state.studentName || "Kamu"} (aktif)</td>
                  <td>{store.currentLevel()}</td>
                  <td>{store.state.xp}</td>
                  <td>{Object.values(store.state.levels).filter((l) => l.completed).length}/12</td>
                </tr>
                {FAKE_STUDENTS.map((s) => (
                  <tr key={s.name} className="border-b border-slate-50 font-semibold text-slate-600">
                    <td className="py-2">{s.name}</td><td>{s.level}</td><td>{s.score}</td><td>{s.done}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === "levels" && (
        <Card className="p-5">
          <h2 className="font-extrabold text-slate-700 mb-1">Atur Level Terbuka</h2>
          <p className="text-sm font-semibold text-slate-400 mb-3">Aktifkan level agar siswa bisa langsung mengaksesnya.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LEVELS.map((l) => {
              const on = store.state.teacherUnlocked.includes(l.id);
              return (
                <button key={l.id} onClick={() => {
                  const set = new Set(store.state.teacherUnlocked);
                  on ? set.delete(l.id) : set.add(l.id);
                  store.setTeacherUnlocked([...set]); sfx.pop();
                }}
                  className={cn("btn-juicy rounded-xl px-2 py-2 text-sm font-bold border-2 text-left",
                    on ? "bg-emerald-50 border-emerald-400 text-emerald-700" : "bg-white border-slate-200 text-slate-500")}>
                  {on ? "🔓" : "🔒"} L{l.id} {l.short}
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {tab === "settings" && (
        <Card className="p-5 space-y-4">
          <div>
            <label className="font-bold text-slate-600">Jumlah Soal per Kuis: {store.state.questionsPerQuiz}</label>
            <input type="range" min={3} max={6} value={store.state.questionsPerQuiz}
              onChange={(e) => store.setSetting({ questionsPerQuiz: Number(e.target.value) })}
              className="mt-2 w-full accent-sky-500" />
          </div>
          <div>
            <label className="font-bold text-slate-600">Tingkat Kesulitan</label>
            <div className="mt-2 flex gap-2">
              {(["mudah", "sedang", "sulit"] as const).map((d) => (
                <Button key={d} variant={store.state.difficulty === d ? "secondary" : "outline"} size="sm"
                  onClick={() => { store.setSetting({ difficulty: d }); sfx.pop(); }}>{d}</Button>
              ))}
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm font-semibold text-red-400 mb-2">⚠️ Zona berbahaya</p>
            <Button variant="tomato" onClick={() => { if (confirm("Yakin reset semua progres siswa?")) { store.reset(); sfx.wrong(); } }}>
              🗑️ Reset Progres Siswa
            </Button>
          </div>
        </Card>
      )}

      {tab === "bank" && (
        <Card className="p-5">
          <h2 className="font-extrabold text-slate-700 mb-3">Bank Soal ({LEVELS.reduce((a, l) => a + questionsForLevel(l.id).length, 0)} soal)</h2>
          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {LEVELS.map((l) => {
              const qs = questionsForLevel(l.id);
              return (
                <details key={l.id} className="rounded-xl bg-slate-50 p-3">
                  <summary className="cursor-pointer font-bold text-slate-700">Level {l.id} — {l.short} ({qs.length} soal)</summary>
                  <ul className="mt-2 space-y-2 text-sm">
                    {qs.map((q, i) => (
                      <li key={i} className="rounded-lg bg-white p-2">
                        <div className="font-semibold text-slate-700">{i + 1}. {q.q}</div>
                        <div className="text-emerald-600 font-bold text-xs mt-1">✓ {q.options[q.correct]}</div>
                        <div className="text-slate-400 text-xs">{q.explain}</div>
                      </li>
                    ))}
                  </ul>
                </details>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
