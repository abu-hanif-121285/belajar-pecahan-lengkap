import { useMemo, useRef, useState } from "react";
import { useRouter } from "../lib/router";
import { useStore } from "../lib/store";
import { Card, Button, ProgressBar } from "../components/ui";
import Pizza from "../components/Pizza";
import { questionsForLevel, type Question, type PizzaViz } from "../lib/questions";
import { getLevel } from "../lib/levels";
import { sfx, burst, shake } from "../lib/fx";
import { cn } from "../utils/cn";
import { BADGES } from "../lib/levels";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderFrac(text: string) {
  // render "3/4" and standalone fractions nicely inline (keep simple)
  return text;
}

export default function Quiz({ level }: { level: number }) {
  const { go, back } = useRouter();
  const store = useStore();
  const info = getLevel(level);

  const questions = useMemo(() => {
    const all = questionsForLevel(level);
    const count = Math.min(store.state.questionsPerQuiz, all.length);
    return shuffle(all).slice(0, count);
  }, [level, store.state.questionsPerQuiz]);

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const q: Question | undefined = questions[idx];

  const choose = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === q!.correct) {
      setScore((s) => s + 1);
      sfx.correct();
      const r = cardRef.current?.getBoundingClientRect();
      if (r) burst(r.left + r.width / 2, r.top + 120, 34);
    } else {
      sfx.wrong();
      shake(cardRef.current);
    }
  };

  const next = () => {
    if (idx + 1 >= questions.length) {
      finish();
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      sfx.click();
    }
  };

  const finish = () => {
    const total = questions.length;
    const pct = score / total;
    const stars = pct >= 0.9 ? 3 : pct >= 0.6 ? 2 : pct > 0 ? 1 : 0;
    const xpGain = score * 40 + (stars === 3 ? 60 : 0);
    store.addXp(xpGain);
    store.updateLevel(level, { quizBest: Math.max(store.state.levels[level].quizBest, score), quizTotal: total });
    store.recordQuiz({ level, score, total, date: new Date().toLocaleDateString("id-ID") });
    if (stars > 0) {
      store.completeLevel(level, stars);
      awardBadges(level);
    }
    sfx.win();
    burst(window.innerWidth / 2, window.innerHeight / 3, 70);
    setDone(true);
  };

  const awardBadges = (lv: number) => {
    const map: Record<number, string> = { 1: "penjelajah", 2: "pembilang", 3: "senilai" };
    if (map[lv]) store.awardBadge(map[lv]);
    const completed = Object.entries(store.state.levels).filter(([, v]) => v.completed).length + 1;
    if (completed >= 6) store.awardBadge("master");
    if ([7, 8, 9, 10].every((n) => n === lv || store.state.levels[n]?.completed)) store.awardBadge("operasi");
    if (store.state.stars + 3 >= 20) store.awardBadge("juara");
    if (lv === 12) store.awardBadge("raja");
  };

  if (!q && !done) {
    return (
      <div className="p-8 text-center">
        <p className="font-bold text-slate-500">Belum ada soal untuk level ini.</p>
        <Button className="mt-4" onClick={back}>Kembali</Button>
      </div>
    );
  }

  if (done) {
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : score > 0 ? 1 : 0;
    return (
      <div className="animate-slide-up mx-auto max-w-lg">
        <Card className="p-8 text-center">
          <div className="text-6xl animate-bounce-in">{pct >= 60 ? "🎉" : "💪"}</div>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-800">
            {pct >= 90 ? "Luar Biasa!" : pct >= 60 ? "Kerja Bagus!" : "Terus Berlatih!"}
          </h2>
          <p className="text-slate-500 font-semibold">Kuis {info.short} selesai</p>
          <div className="my-4 text-5xl text-amber-400">
            {"★".repeat(stars)}<span className="text-slate-200">{"☆".repeat(3 - stars)}</span>
          </div>
          <div className="text-4xl font-extrabold text-orange-500">{score} / {total}</div>
          <p className="text-sm font-bold text-sky-600 mt-1">+{score * 40 + (stars === 3 ? 60 : 0)} XP</p>
          {pct < 60 && <p className="mt-2 text-sm font-semibold text-slate-500">Dapatkan minimal 60% untuk membuka level berikutnya. Ayo coba lagi! 🍕</p>}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button variant="cheese" onClick={() => window.location.reload()}>🔄 Ulangi</Button>
            <Button variant="secondary" onClick={() => go({ name: "map" })}>🗺️ Peta</Button>
            {stars > 0 && level < 12 && (
              <Button variant="green" onClick={() => go({ name: "level", level: level + 1 })}>Level {level + 1} ➜</Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  const letters = ["A", "B", "C", "D"];

  return (
    <div className="animate-slide-up mx-auto max-w-2xl space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => { sfx.click(); back(); }}>← Keluar</Button>
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm font-bold text-slate-500">
            <span>Kuis Level {level} · Soal {idx + 1} dari {questions.length}</span>
            <span className="flex items-center gap-1 text-amber-500">Skor: {score} ⭐</span>
          </div>
          <ProgressBar value={idx + (answered ? 1 : 0)} max={questions.length} className="mt-1 h-3" />
        </div>
      </div>

      <Card className="p-5 sm:p-6" >
        <div ref={cardRef}>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 leading-snug">{renderFrac(q!.q)}</h2>

          {q!.pizza && (
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {(Array.isArray(q!.pizza) ? q!.pizza : [q!.pizza]).map((p: PizzaViz, i: number) => (
                <div key={i} className="w-32 sm:w-40"><Pizza slices={p.slices} selected={p.selected} size={160} /></div>
              ))}
            </div>
          )}

          <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {q!.options.map((opt, i) => {
              const isCorrect = i === q!.correct;
              const isChosen = i === selected;
              let style = "bg-white border-slate-200 text-slate-700 hover:border-orange-300";
              if (answered) {
                if (isCorrect) style = "bg-emerald-50 border-emerald-400 text-emerald-700";
                else if (isChosen) style = "bg-red-50 border-red-400 text-red-600";
                else style = "bg-white border-slate-200 text-slate-400 opacity-70";
              }
              return (
                <button key={i} onClick={() => choose(i)} disabled={answered}
                  className={cn("btn-juicy flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-bold transition", style)}>
                  <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm",
                    answered && isCorrect ? "bg-emerald-400 text-white" : answered && isChosen ? "bg-red-400 text-white" : "bg-slate-100 text-slate-500")}>
                    {answered && isCorrect ? "✓" : answered && isChosen ? "✗" : letters[i]}
                  </span>
                  <span className="text-base">{opt}</span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={cn("mt-4 rounded-2xl border-2 p-4 animate-pop",
              selected === q!.correct ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200")}>
              <div className="flex items-center gap-2 font-extrabold">
                {selected === q!.correct
                  ? <span className="text-emerald-600">✅ Jawaban kamu benar!</span>
                  : <span className="text-amber-600">💡 Ayo pahami jawabannya:</span>}
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-600 leading-relaxed">{q!.explain}</p>
              {selected !== q!.correct && (
                <p className="mt-2 text-sm font-bold text-emerald-600">Jawaban benar: {letters[q!.correct]}. {q!.options[q!.correct]}</p>
              )}
              <div className="mt-3 flex justify-end">
                <Button variant="primary" onClick={next}>{idx + 1 >= questions.length ? "Selesai ➜" : "Lanjut ➜"}</Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

// silence unused import if any
void BADGES;
