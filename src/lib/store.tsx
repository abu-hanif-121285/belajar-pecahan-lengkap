import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface LevelProgress {
  materiDone: boolean;
  simulasiDone: boolean;
  latihanDone: boolean;
  quizBest: number; // best score 0..total
  quizTotal: number;
  completed: boolean;
  stars: number; // 0..3
}

export interface QuizRecord {
  level: number;
  score: number;
  total: number;
  date: string;
}

export interface GameState {
  studentName: string;
  xp: number;
  stars: number;
  badges: string[];
  levels: Record<number, LevelProgress>;
  quizHistory: QuizRecord[];
  dailyStreak: number;
  lastDaily: string;
  // teacher settings
  teacherUnlocked: number[]; // manually unlocked levels
  questionsPerQuiz: number;
  difficulty: "mudah" | "sedang" | "sulit";
}

const LEVEL_COUNT = 12;

function emptyLevel(): LevelProgress {
  return {
    materiDone: false,
    simulasiDone: false,
    latihanDone: false,
    quizBest: 0,
    quizTotal: 0,
    completed: false,
    stars: 0,
  };
}

function defaultState(): GameState {
  const levels: Record<number, LevelProgress> = {};
  for (let i = 1; i <= LEVEL_COUNT; i++) levels[i] = emptyLevel();
  return {
    studentName: "",
    xp: 0,
    stars: 0,
    badges: [],
    levels,
    quizHistory: [],
    dailyStreak: 0,
    lastDaily: "",
    teacherUnlocked: [],
    questionsPerQuiz: 5,
    difficulty: "sedang",
  };
}

const KEY = "petualangan-pecahan-v1";

function load(): GameState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    // merge to avoid missing keys
    const base = defaultState();
    return { ...base, ...parsed, levels: { ...base.levels, ...parsed.levels } };
  } catch {
    return defaultState();
  }
}

interface StoreCtx {
  state: GameState;
  setName: (name: string) => void;
  addXp: (amount: number) => void;
  addStars: (amount: number) => void;
  awardBadge: (badge: string) => void;
  updateLevel: (level: number, patch: Partial<LevelProgress>) => void;
  recordQuiz: (rec: QuizRecord) => void;
  isLevelUnlocked: (level: number) => boolean;
  completeLevel: (level: number, stars: number) => void;
  markDaily: () => void;
  setTeacherUnlocked: (levels: number[]) => void;
  setSetting: (patch: Partial<Pick<GameState, "questionsPerQuiz" | "difficulty">>) => void;
  reset: () => void;
  currentLevel: () => number;
  levelXp: () => { current: number; needed: number; level: number };
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const setName = (name: string) => setState((s) => ({ ...s, studentName: name }));

  const addXp = (amount: number) => setState((s) => ({ ...s, xp: s.xp + amount }));

  const addStars = (amount: number) => setState((s) => ({ ...s, stars: s.stars + amount }));

  const awardBadge = (badge: string) =>
    setState((s) => (s.badges.includes(badge) ? s : { ...s, badges: [...s.badges, badge] }));

  const updateLevel = (level: number, patch: Partial<LevelProgress>) =>
    setState((s) => ({
      ...s,
      levels: { ...s.levels, [level]: { ...s.levels[level], ...patch } },
    }));

  const recordQuiz = (rec: QuizRecord) =>
    setState((s) => ({ ...s, quizHistory: [rec, ...s.quizHistory].slice(0, 50) }));

  const isLevelUnlocked = (level: number) => {
    if (level === 1) return true;
    if (state.teacherUnlocked.includes(level)) return true;
    return state.levels[level - 1]?.completed ?? false;
  };

  const completeLevel = (level: number, stars: number) =>
    setState((s) => {
      const prev = s.levels[level];
      const newStars = Math.max(prev.stars, stars);
      const gainedStars = newStars - prev.stars;
      return {
        ...s,
        stars: s.stars + gainedStars,
        levels: {
          ...s.levels,
          [level]: { ...prev, completed: true, stars: newStars },
        },
      };
    });

  const markDaily = () =>
    setState((s) => {
      const today = new Date().toDateString();
      if (s.lastDaily === today) return s;
      return { ...s, lastDaily: today, dailyStreak: s.dailyStreak + 1 };
    });

  const setTeacherUnlocked = (levels: number[]) =>
    setState((s) => ({ ...s, teacherUnlocked: levels }));

  const setSetting = (patch: Partial<Pick<GameState, "questionsPerQuiz" | "difficulty">>) =>
    setState((s) => ({ ...s, ...patch }));

  const reset = () => setState(defaultState());

  const levelXp = () => {
    // 600 XP per level
    const per = 600;
    const level = Math.floor(state.xp / per) + 1;
    const current = state.xp % per;
    return { current, needed: per, level };
  };

  const currentLevel = () => levelXp().level;

  return (
    <Ctx.Provider
      value={{
        state,
        setName,
        addXp,
        addStars,
        awardBadge,
        updateLevel,
        recordQuiz,
        isLevelUnlocked,
        completeLevel,
        markDaily,
        setTeacherUnlocked,
        setSetting,
        reset,
        currentLevel,
        levelXp,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used within StoreProvider");
  return c;
}

export { LEVEL_COUNT };
