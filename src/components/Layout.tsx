import { type ReactNode, useState } from "react";
import { useRouter, type Route } from "../lib/router";
import { useStore } from "../lib/store";
import { cn } from "../utils/cn";
import { sfx } from "../lib/fx";

const NAV: { label: string; icon: string; route: Route }[] = [
  { label: "Beranda", icon: "🏠", route: { name: "home" } },
  { label: "Peta Petualangan", icon: "🗺️", route: { name: "map" } },
  { label: "Simulator Pizza", icon: "🍕", route: { name: "simulator" } },
  { label: "Kuis Tantangan", icon: "🏆", route: { name: "quiz", level: 1 } },
  { label: "Pencapaian", icon: "⭐", route: { name: "achievements" } },
];

const NAV2: { label: string; icon: string; route: Route }[] = [
  { label: "Tips Belajar", icon: "💡", route: { name: "tips" } },
  { label: "Sering Salah", icon: "⚠️", route: { name: "mistakes" } },
  { label: "Kamus Pecahan", icon: "📖", route: { name: "glossary" } },
  { label: "Rumus Penting", icon: "🧮", route: { name: "formulas" } },
  { label: "Tantangan Harian", icon: "📅", route: { name: "daily" } },
  { label: "Tentang", icon: "ℹ️", route: { name: "about" } },
  { label: "Mode Guru", icon: "🎓", route: { name: "teacher" } },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { route, go } = useRouter();
  const { state, levelXp } = useStore();
  const [open, setOpen] = useState(false);
  const lv = levelXp();

  const isActive = (r: Route) => r.name === route.name;

  const NavItem = ({ item, small }: { item: (typeof NAV)[0]; small?: boolean }) => (
    <button
      onClick={() => { sfx.click(); go(item.route); setOpen(false); }}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-bold transition btn-juicy",
        small ? "text-sm" : "text-base",
        isActive(item.route)
          ? "bg-gradient-to-r from-amber-300 to-orange-400 text-white shadow-md shadow-orange-200"
          : "text-slate-600 hover:bg-orange-50"
      )}
    >
      <span className="text-xl">{item.icon}</span>
      <span>{item.label}</span>
    </button>
  );

  const Sidebar = (
    <div className="flex h-full flex-col gap-1 p-4">
      <button onClick={() => { sfx.click(); go({ name: "home" }); setOpen(false); }}
        className="mb-3 flex items-center gap-2 rounded-2xl p-1">
        <img src="/images/logo-pizza.png" alt="Logo" className="h-11 w-11 object-contain" />
        <div className="text-left leading-tight">
          <div className="font-extrabold text-red-500 text-sm">PETUALANGAN</div>
          <div className="font-extrabold text-amber-500 text-lg -mt-1">PECAHAN</div>
        </div>
      </button>
      {NAV.map((n) => <NavItem key={n.label} item={n} />)}
      <div className="my-2 border-t border-orange-100" />
      <div className="px-2 pb-1 text-xs font-bold uppercase text-slate-400">Lainnya</div>
      {NAV2.map((n) => <NavItem key={n.label} item={n} small />)}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#eaf6ff]">
      {/* mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-white/90 backdrop-blur border-b border-orange-100 px-3 py-2 lg:pl-72">
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(true)} className="lg:hidden rounded-xl p-2 hover:bg-orange-50 btn-juicy" aria-label="Buka menu">
            <span className="text-2xl">☰</span>
          </button>
          <img src="/images/logo-pizza.png" alt="" className="h-9 w-9 object-contain lg:hidden" />
          <span className="font-extrabold text-red-500 lg:hidden">Pecahan</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-sm font-bold text-sky-600 border border-sky-100">
            Level {lv.level} · {lv.current}/{lv.needed} XP
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm font-extrabold text-amber-700 border border-amber-200">
            <span>⭐</span> {state.stars}
          </div>
          <div className="flex items-center gap-2 rounded-full bg-orange-50 px-2 py-1 border border-orange-100">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-orange-400 text-white text-sm font-bold">
              {(state.studentName || "P")[0].toUpperCase()}
            </span>
            <span className="hidden sm:inline text-sm font-bold text-slate-600 pr-1">{state.studentName || "Petualang"}</span>
          </div>
        </div>
      </div>

      {/* desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 overflow-y-auto border-r border-orange-100 bg-white lg:block">
        {Sidebar}
      </aside>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 max-w-[80%] overflow-y-auto bg-white shadow-2xl animate-slide-up">
            <div className="flex justify-end p-2">
              <button onClick={() => setOpen(false)} className="rounded-xl p-2 hover:bg-orange-50 text-xl">✕</button>
            </div>
            {Sidebar}
          </aside>
        </div>
      )}

      {/* content */}
      <main className="lg:pl-72">
        <div className="mx-auto max-w-6xl p-3 sm:p-6 pb-24">{children}</div>
      </main>

      {/* mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-around border-t border-orange-100 bg-white/95 backdrop-blur py-1.5 lg:hidden">
        {NAV.map((n) => (
          <button key={n.label} onClick={() => { sfx.click(); go(n.route); }}
            className={cn("flex flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[10px] font-bold btn-juicy",
              isActive(n.route) ? "text-orange-500" : "text-slate-400")}>
            <span className="text-xl">{n.icon}</span>
            {n.label.split(" ")[0]}
          </button>
        ))}
      </nav>
    </div>
  );
}
