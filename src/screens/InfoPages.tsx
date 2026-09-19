import { useRouter } from "../lib/router";
import { useStore } from "../lib/store";
import { Card, Button } from "../components/ui";
import { sfx, burst } from "../lib/fx";
import { useMemo } from "react";
import Pizza from "../components/Pizza";

function Header({ title }: { title: string }) {
  const { back } = useRouter();
  return (
    <div className="flex items-center gap-3 mb-4">
      <Button variant="ghost" size="sm" onClick={() => { sfx.click(); back(); }}>← Kembali</Button>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">{title}</h1>
    </div>
  );
}

export function Tips() {
  const tips = [
    ["🍕 Bayangkan pizza", "Setiap kali bertemu pecahan, bayangkan potongan pizza. Penyebut = berapa potong, pembilang = berapa yang diambil."],
    ["✂️ Bagi sama besar", "Ingat, semua bagian HARUS sama besar agar pecahannya benar."],
    ["🟰 Samakan penyebut", "Untuk menjumlah/mengurangi, samakan penyebut dulu dengan KPK."],
    ["🔁 Bagi = kali kebalikan", "Saat membagi pecahan, balik pecahan pembagi lalu kalikan."],
    ["🧹 Sederhanakan", "Selalu periksa apakah hasil bisa disederhanakan dengan FPB."],
    ["🎮 Berlatih tiap hari", "Sedikit tapi rutin lebih baik daripada banyak tapi jarang!"],
  ];
  return (
    <div className="animate-slide-up"><Header title="💡 Tips Belajar Pecahan" />
      <div className="grid gap-3 sm:grid-cols-2">
        {tips.map(([t, d], i) => (
          <Card key={i} className="p-4"><div className="text-lg font-extrabold text-orange-500">{t}</div><p className="text-sm font-semibold text-slate-600 mt-1">{d}</p></Card>
        ))}
      </div>
    </div>
  );
}

export function Mistakes() {
  const items = [
    ["Menjumlah penyebut", "1/2 + 1/4 ≠ 2/6! Penyebut TIDAK dijumlahkan. Samakan dulu → 2/4 + 1/4 = 3/4."],
    ["Potongan tak sama besar", "Kalau potongan pizza berbeda besar, itu bukan pecahan yang benar."],
    ["Lupa menyederhanakan", "2/4 sebaiknya ditulis 1/2. Jangan lupa sederhanakan hasil akhir."],
    ["Salah baca pembilang/penyebut", "Pembilang di ATAS, penyebut di BAWAH. Jangan terbalik!"],
    ["Penyebut besar dikira lebih besar", "1/8 lebih KECIL dari 1/4, walaupun 8 > 4. Potongannya lebih kecil!"],
  ];
  return (
    <div className="animate-slide-up"><Header title="⚠️ Kesalahan yang Sering Terjadi" />
      <div className="space-y-3">
        {items.map(([t, d], i) => (
          <Card key={i} className="p-4 border-l-4 border-red-300"><div className="font-extrabold text-red-500">❌ {t}</div><p className="text-sm font-semibold text-slate-600 mt-1">✅ {d}</p></Card>
        ))}
      </div>
    </div>
  );
}

export function Glossary() {
  const terms = [
    ["Pecahan", "Bilangan yang menyatakan bagian dari keseluruhan, ditulis a/b."],
    ["Pembilang", "Angka di atas garis pecahan; bagian yang diambil."],
    ["Penyebut", "Angka di bawah garis pecahan; jumlah seluruh bagian sama besar."],
    ["Pecahan Senilai", "Pecahan berbeda yang nilainya sama, misal 1/2 = 2/4."],
    ["Pecahan Murni", "Pembilang lebih kecil dari penyebut, misal 3/4."],
    ["Pecahan Tidak Murni", "Pembilang ≥ penyebut, misal 5/4."],
    ["Pecahan Campuran", "Gabungan bilangan bulat dan pecahan, misal 1 1/4."],
    ["Desimal", "Bentuk lain pecahan menggunakan koma, misal 0,5."],
    ["Persen", "Pecahan per seratus, misal 50% = 50/100."],
    ["KPK", "Kelipatan Persekutuan terKecil, untuk menyamakan penyebut."],
    ["FPB", "Faktor Persekutuan terBesar, untuk menyederhanakan pecahan."],
  ];
  return (
    <div className="animate-slide-up"><Header title="📖 Kamus Pecahan" />
      <div className="grid gap-2 sm:grid-cols-2">
        {terms.map(([t, d], i) => (
          <Card key={i} className="p-3"><div className="font-extrabold text-sky-600">{t}</div><p className="text-sm font-semibold text-slate-600">{d}</p></Card>
        ))}
      </div>
    </div>
  );
}

export function Formulas() {
  const f = [
    ["Penjumlahan (penyebut sama)", "a/c + b/c = (a+b)/c"],
    ["Pengurangan (penyebut sama)", "a/c − b/c = (a−b)/c"],
    ["Penyebut berbeda", "Samakan dengan KPK, lalu jumlah/kurang pembilang"],
    ["Perkalian", "a/b × c/d = (a×c)/(b×d)"],
    ["Pembagian", "a/b ÷ c/d = a/b × d/c"],
    ["Pecahan senilai", "a/b = (a×n)/(b×n)"],
    ["Menyederhanakan", "a/b = (a÷FPB)/(b÷FPB)"],
    ["Pecahan → Persen", "a/b × 100%"],
  ];
  return (
    <div className="animate-slide-up"><Header title="🧮 Rumus Penting" />
      <div className="grid gap-3 sm:grid-cols-2">
        {f.map(([t, d], i) => (
          <Card key={i} className="p-4"><div className="text-sm font-bold text-slate-500">{t}</div><div className="mt-1 rounded-xl bg-amber-50 p-2 text-center font-extrabold text-orange-600 text-lg">{d}</div></Card>
        ))}
      </div>
    </div>
  );
}

export function Daily() {
  const { state, addXp, addStars, markDaily } = useStore();
  const today = new Date().toDateString();
  const doneToday = state.lastDaily === today;
  // deterministic daily challenge
  const day = new Date().getDate();
  const challenge = useMemo(() => {
    const d = [4, 6, 8][day % 3];
    const n = 1 + (day % (d - 1));
    return { d, n };
  }, [day]);
  const claim = () => {
    if (doneToday) return;
    markDaily(); addXp(50); addStars(1);
    sfx.win(); burst(window.innerWidth / 2, window.innerHeight / 2, 50);
  };
  return (
    <div className="animate-slide-up"><Header title="📅 Tantangan Harian" />
      <Card className="p-6 text-center">
        <div className="text-sm font-bold text-slate-400">Streak: {state.dailyStreak} hari 🔥</div>
        <h2 className="mt-2 text-xl font-extrabold text-slate-700">Tantangan Hari Ini</h2>
        <div className="mx-auto my-4 w-40"><Pizza slices={challenge.d} selected={challenge.n} size={160} /></div>
        <p className="font-bold text-slate-600">Pizza dibagi {challenge.d} potong, {challenge.n} dimakan. Berapa pecahannya?</p>
        <p className="text-3xl font-extrabold text-orange-500 mt-2">{challenge.n}/{challenge.d}</p>
        <p className="text-sm font-semibold text-slate-500 mt-1">Selesaikan untuk +50 XP dan +1 ⭐</p>
        <Button variant={doneToday ? "outline" : "cheese"} size="lg" className="mt-4" disabled={doneToday} onClick={claim}>
          {doneToday ? "✅ Sudah selesai hari ini!" : "🎁 Klaim Hadiah!"}
        </Button>
      </Card>
    </div>
  );
}

export function About() {
  return (
    <div className="animate-slide-up"><Header title="ℹ️ Tentang Aplikasi" />
      <Card className="p-6 text-center">
        <img src="/images/logo-pizza.png" alt="Logo" className="mx-auto w-32 animate-float" />
        <h2 className="mt-2 text-2xl font-extrabold text-red-500">PETUALANGAN PECAHAN</h2>
        <p className="font-bold text-amber-500">Jelajahi Dunia Pecahan Bersama Pizza! 🍕</p>
        <p className="mt-4 max-w-md mx-auto font-semibold text-slate-600">
          Aplikasi pembelajaran matematika untuk siswa SD kelas 4–6. Belajar pecahan secara bertahap dari dasar hingga mahir dengan ilustrasi pizza yang interaktif dan menyenangkan.
        </p>
        <div className="mt-4 inline-block rounded-full bg-red-500 px-5 py-2 text-white font-extrabold shadow-lg">
          "Belajar Pecahan, Menaklukkan Tantangan!"
        </div>
        <div className="mt-6 border-t pt-4">
          <p className="text-sm font-bold text-slate-400">Dibuat oleh</p>
          <p className="text-xl font-extrabold text-slate-700">Wiyanto Abu Hanif</p>
        </div>
        <p className="mt-4 text-xs font-semibold text-slate-400">Dibuat dengan React, Tailwind CSS & SVG interaktif · Berjalan offline dengan LocalStorage</p>
      </Card>
    </div>
  );
}
