export interface LevelInfo {
  id: number;
  title: string;
  short: string;
  emoji: string;
  color: string; // tailwind gradient classes
  ring: string;
}

export const LEVELS: LevelInfo[] = [
  { id: 1, title: "Pizza Utuh dan Pecahan", short: "Pizza Utuh & Pecahan", emoji: "🍕", color: "from-amber-400 to-orange-500", ring: "ring-amber-300" },
  { id: 2, title: "Pembilang dan Penyebut", short: "Pembilang & Penyebut", emoji: "🔢", color: "from-sky-400 to-blue-500", ring: "ring-sky-300" },
  { id: 3, title: "Pecahan Senilai", short: "Pecahan Senilai", emoji: "⚖️", color: "from-emerald-400 to-green-500", ring: "ring-emerald-300" },
  { id: 4, title: "Membandingkan Pecahan", short: "Membandingkan Pecahan", emoji: "🤔", color: "from-rose-400 to-red-500", ring: "ring-rose-300" },
  { id: 5, title: "Mengurutkan Pecahan", short: "Mengurutkan Pecahan", emoji: "📊", color: "from-violet-400 to-purple-500", ring: "ring-violet-300" },
  { id: 6, title: "Jenis-Jenis Pecahan", short: "Jenis-Jenis Pecahan", emoji: "🍰", color: "from-pink-400 to-fuchsia-500", ring: "ring-pink-300" },
  { id: 7, title: "Penjumlahan Pecahan", short: "Penjumlahan Pecahan", emoji: "➕", color: "from-teal-400 to-cyan-500", ring: "ring-teal-300" },
  { id: 8, title: "Pengurangan Pecahan", short: "Pengurangan Pecahan", emoji: "➖", color: "from-orange-400 to-amber-500", ring: "ring-orange-300" },
  { id: 9, title: "Perkalian Pecahan", short: "Perkalian Pecahan", emoji: "✖️", color: "from-lime-400 to-green-500", ring: "ring-lime-300" },
  { id: 10, title: "Pembagian Pecahan", short: "Pembagian Pecahan", emoji: "➗", color: "from-indigo-400 to-blue-600", ring: "ring-indigo-300" },
  { id: 11, title: "Soal Cerita Pecahan", short: "Soal Cerita Pecahan", emoji: "📖", color: "from-yellow-400 to-orange-500", ring: "ring-yellow-300" },
  { id: 12, title: "Tantangan Pecahan Mahir", short: "Tantangan Mahir", emoji: "👑", color: "from-red-500 to-rose-600", ring: "ring-red-300" },
];

export function getLevel(id: number): LevelInfo {
  return LEVELS.find((l) => l.id === id)!;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  desc: string;
  color: string;
}

export const BADGES: Badge[] = [
  { id: "penjelajah", name: "Penjelajah Pizza", emoji: "🍕", desc: "Selesaikan Level 1", color: "from-amber-400 to-orange-500" },
  { id: "pembilang", name: "Ahli Pembilang", emoji: "🔢", desc: "Selesaikan Level 2", color: "from-sky-400 to-blue-500" },
  { id: "senilai", name: "Detektif Senilai", emoji: "⚖️", desc: "Selesaikan Level 3", color: "from-emerald-400 to-green-500" },
  { id: "operasi", name: "Jagoan Operasi", emoji: "🧮", desc: "Selesaikan Level 7-10", color: "from-teal-400 to-cyan-500" },
  { id: "master", name: "Master Pecahan", emoji: "🏆", desc: "Selesaikan 6 level", color: "from-yellow-400 to-amber-500" },
  { id: "juara", name: "Juara Pecahan", emoji: "⭐", desc: "Kumpulkan 20 bintang", color: "from-pink-400 to-fuchsia-500" },
  { id: "raja", name: "Raja/Ratu Pecahan", emoji: "👑", desc: "Selesaikan semua level", color: "from-red-500 to-rose-600" },
];
