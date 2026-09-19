import { useRouter } from "../lib/router";
import { useStore } from "../lib/store";
import { LEVELS } from "../lib/levels";
import { Card, Button } from "../components/ui";
import { sfx } from "../lib/fx";
import { cn } from "../utils/cn";

export default function Map() {
  const { go, back } = useRouter();
  const { state, isLevelUnlocked } = useStore();

  return (
    <div className="animate-slide-up space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => { sfx.click(); back(); }} aria-label="Kembali">← Kembali</Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">🗺️ Peta Petualangan</h1>
          <p className="text-sm font-semibold text-slate-500">Selesaikan setiap level untuk membuka level berikutnya!</p>
        </div>
        <div className="ml-auto flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1.5 font-extrabold text-amber-700 border border-amber-200">
          ⭐ {state.stars}
        </div>
      </div>

      <Card className="p-4 sm:p-6" >
        <div className="rounded-3xl p-4 sm:p-6" style={{ background: "linear-gradient(160deg,#bfe9a0,#8fd66f)" }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {LEVELS.map((lvl) => {
              const unlocked = isLevelUnlocked(lvl.id);
              const prog = state.levels[lvl.id];
              return (
                <button
                  key={lvl.id}
                  disabled={!unlocked}
                  onClick={() => { sfx.click(); go({ name: "level", level: lvl.id }); }}
                  className={cn(
                    "group relative flex flex-col items-center rounded-3xl p-3 text-center transition btn-juicy",
                    unlocked ? "bg-white/95 shadow-lg hover:-translate-y-1" : "bg-white/50 cursor-not-allowed"
                  )}
                >
                  <div className={cn(
                    "grid h-16 w-16 place-items-center rounded-full text-2xl font-extrabold text-white shadow-lg ring-4 ring-white",
                    unlocked ? `bg-gradient-to-br ${lvl.color}` : "bg-slate-300"
                  )}>
                    {unlocked ? lvl.id : "🔒"}
                  </div>
                  <div className={cn("mt-2 text-sm font-extrabold leading-tight", unlocked ? "text-slate-700" : "text-slate-400")}>
                    {lvl.short}
                  </div>
                  {prog.completed && (
                    <div className="mt-1 text-amber-400 text-sm">
                      {"★".repeat(prog.stars)}{"☆".repeat(3 - prog.stars)}
                    </div>
                  )}
                  {!prog.completed && unlocked && (
                    <div className="mt-1 text-[10px] font-bold text-emerald-500">Ayo main! {lvl.emoji}</div>
                  )}
                  {!unlocked && <div className="mt-1 text-[10px] font-bold text-slate-400">Terkunci</div>}
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
