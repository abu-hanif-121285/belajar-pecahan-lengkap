import { useRouter } from "../lib/router";
import { useStore } from "../lib/store";
import { Button } from "../components/ui";
import { sfx, burst } from "../lib/fx";
import { useState } from "react";

export default function Splash() {
  const { go } = useRouter();
  const { state, setName } = useStore();
  const [name, setNameLocal] = useState(state.studentName);

  const start = () => {
    if (name.trim()) setName(name.trim());
    sfx.win();
    burst(window.innerWidth / 2, window.innerHeight / 2, 60);
    setTimeout(() => go({ name: "home" }), 300);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4"
      style={{ background: "linear-gradient(160deg,#7ec8ff 0%,#aee5ff 40%,#9be07a 100%)" }}>
      {/* clouds */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-8 h-16 w-32 rounded-full bg-white/70 blur-sm animate-float" />
        <div className="absolute top-24 right-12 h-12 w-24 rounded-full bg-white/60 blur-sm animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-24 left-1/4 h-10 w-20 rounded-full bg-white/50 blur-sm animate-float" style={{ animationDelay: "0.5s" }} />
      </div>

      <div className="relative z-10 w-full max-w-md text-center animate-pop">
        <img
          src="/images/logo-pizza.png"
          alt="Maskot Pizza Petualangan Pecahan"
          className="mx-auto w-52 h-52 object-contain drop-shadow-2xl animate-float"
        />
        <h1 className="mt-2 text-5xl font-extrabold tracking-tight"
          style={{ color: "#e8492b", textShadow: "3px 3px 0 #fff, 5px 5px 0 rgba(0,0,0,0.1)" }}>
          PETUALANGAN
        </h1>
        <h1 className="text-6xl font-extrabold tracking-tight -mt-2"
          style={{ color: "#ffb703", WebkitTextStroke: "2px #e8492b", textShadow: "3px 4px 0 rgba(0,0,0,0.12)" }}>
          PECAHAN
        </h1>
        <div className="mt-3 inline-block rounded-full bg-red-500 px-5 py-1.5 text-white font-bold shadow-lg text-sm">
          🍕 Belajar Pecahan Jadi Menyenangkan!
        </div>

        <div className="mt-8 rounded-3xl bg-white/85 backdrop-blur p-5 shadow-xl">
          <label className="block text-left text-sm font-bold text-slate-600 mb-1">Siapa namamu, Petualang? (opsional)</label>
          <input
            value={name}
            onChange={(e) => setNameLocal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && start()}
            placeholder="Tulis namamu di sini..."
            maxLength={16}
            className="w-full rounded-2xl border-2 border-orange-200 px-4 py-3 text-lg font-semibold text-slate-700 focus:outline-none focus:border-orange-400"
          />
          <Button variant="cheese" size="lg" className="mt-4 w-full text-xl" onClick={start}>
            Mulai Petualangan ➜
          </Button>
        </div>
        <p className="mt-4 text-xs text-white/90 font-semibold drop-shadow">oleh Wiyanto Abu Hanif</p>
      </div>
    </div>
  );
}
