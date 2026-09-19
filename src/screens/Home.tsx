import { useRouter } from "../lib/router";
import { useStore } from "../lib/store";
import { Button, Card, ProgressBar } from "../components/ui";
import Pizza from "../components/Pizza";
import { getLevel } from "../lib/levels";
import { sfx } from "../lib/fx";

export default function Home() {
  const { go } = useRouter();
  const { state, levelXp, currentLevel } = useStore();
  const lv = levelXp();
  const curLevel = currentLevel();

  // find current level in progress (first not completed)
  let learnLevel = 1;
  for (let i = 1; i <= 12; i++) {
    if (!state.levels[i].completed) { learnLevel = i; break; }
    if (i === 12) learnLevel = 12;
  }
  const learnInfo = getLevel(learnLevel);
  const learnProg = state.levels[learnLevel];
  const stepsDone = [learnProg.materiDone, learnProg.simulasiDone, learnProg.latihanDone, learnProg.completed].filter(Boolean).length;

  return (
    <div className="space-y-4 animate-slide-up">
      {/* greeting hero */}
      <Card className="overflow-hidden">
        <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-[1fr_auto]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Halo, {state.studentName || "Andi"}! 🍕
            </h1>
            <p className="text-slate-500 font-semibold">Selamat datang di Petualangan Pecahan!</p>

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-40 shrink-0 animate-float">
                <Pizza slices={curLevel > 6 ? 8 : 4} selected={curLevel > 6 ? 5 : 3} size={160} />
              </div>
              <div className="w-full">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-slate-700">Level {learnLevel}</span>
                  <span className={`rounded-full bg-gradient-to-r ${learnInfo.color} px-2 py-0.5 text-xs font-bold text-white`}>
                    {learnInfo.emoji} {learnInfo.short}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-500 mt-1">{stepsDone}/4 tahap selesai</p>
                <ProgressBar value={stepsDone} max={4} className="mt-1.5" />
                <div className="mt-2 text-xs font-bold text-sky-600">
                  Total XP: {state.xp} · Naik ke Level {lv.level + 1} butuh {lv.needed - lv.current} XP lagi
                </div>
                <ProgressBar value={lv.current} max={lv.needed} className="mt-1 h-2.5" />

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="primary" onClick={() => { sfx.click(); go({ name: "level", level: learnLevel }); }}>
                    ▶ Lanjutkan Belajar
                  </Button>
                  <Button variant="secondary" onClick={() => { sfx.click(); go({ name: "map" }); }}>
                    🗺️ Peta Petualangan
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-end">
            <img src={`${import.meta.env.BASE_URL}images/chef-boy.png`} alt="Chef" className="w-44 object-contain animate-float" />
          </div>
        </div>
      </Card>

      {/* quick action cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <ActionCard
          title="Simulasi Pizza" desc="Jelajahi pecahan dengan pizza interaktif"
          icon="🍕" color="from-emerald-400 to-green-500"
          onClick={() => go({ name: "simulator" })} />
        <ActionCard
          title="Kuis Tantangan" desc="Uji kemampuanmu dengan kuis seru"
          icon="🏆" color="from-pink-500 to-fuchsia-500"
          onClick={() => go({ name: "quiz", level: learnLevel })} />
        <ActionCard
          title="Pencapaian" desc="Kumpulkan bintang dan badge"
          icon="⭐" color="from-amber-400 to-orange-500"
          onClick={() => go({ name: "achievements" })} />
      </div>

      {/* stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatBox icon="⭐" value={state.stars} label="Bintang" color="text-amber-500" />
        <StatBox icon="🏅" value={state.badges.length} label="Badge" color="text-pink-500" />
        <StatBox icon="📚" value={`${Object.values(state.levels).filter((l) => l.completed).length}/12`} label="Level Selesai" color="text-emerald-500" />
      </div>
    </div>
  );
}

function ActionCard({ title, desc, icon, color, onClick }: { title: string; desc: string; icon: string; color: string; onClick: () => void }) {
  return (
    <button onClick={() => { sfx.click(); onClick(); }}
      className={`btn-juicy text-left rounded-3xl bg-gradient-to-br ${color} p-4 text-white shadow-lg`}>
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/25 text-2xl">{icon}</div>
        <div>
          <div className="text-lg font-extrabold">{title}</div>
          <div className="text-xs font-semibold text-white/90">{desc}</div>
        </div>
      </div>
    </button>
  );
}

function StatBox({ icon, value, label, color }: { icon: string; value: number | string; label: string; color: string }) {
  return (
    <Card className="p-3 text-center">
      <div className="text-2xl">{icon}</div>
      <div className={`text-2xl font-extrabold ${color}`}>{value}</div>
      <div className="text-xs font-bold text-slate-400">{label}</div>
    </Card>
  );
}
