export interface PizzaViz {
  slices: number;
  selected: number;
}

export interface Question {
  level: number;
  q: string; // question text; use {frac:n/d} tokens for fractions
  options: string[]; // 4 options
  correct: number; // index
  explain: string; // why correct
  wrongExplain?: string[]; // optional per-option
  pizza?: PizzaViz | PizzaViz[]; // visual
}

// Helper to keep it readable
const P = (slices: number, selected: number): PizzaViz => ({ slices, selected });

export const QUESTIONS: Question[] = [
  // ============ LEVEL 1 ============
  {
    level: 1,
    q: "Pizza dibagi menjadi 4 bagian sama besar. Jika 3 bagian dimakan, pecahan pizza yang dimakan adalah ....",
    options: ["1/2", "2/4", "3/4", "4/4"],
    correct: 2,
    explain: "Penyebut 4 menunjukkan pizza dibagi 4 bagian sama besar. Pembilang 3 menunjukkan ada 3 bagian yang dimakan, jadi 3/4.",
    pizza: P(4, 3),
  },
  {
    level: 1,
    q: "Satu pizza utuh yang belum dipotong bernilai ....",
    options: ["0", "1/2", "1", "2"],
    correct: 2,
    explain: "Satu pizza utuh (seluruh bagian ada) bernilai 1 atau bulat penuh.",
    pizza: P(1, 1),
  },
  {
    level: 1,
    q: "Pizza dibagi menjadi 2 bagian sama besar. Satu bagian disebut ....",
    options: ["seperempat", "setengah", "sepertiga", "satu"],
    correct: 1,
    explain: "1 dari 2 bagian sama besar ditulis 1/2 dan dibaca setengah.",
    pizza: P(2, 1),
  },
  {
    level: 1,
    q: "Perhatikan pizza berikut. Berapa pecahan bagian yang berwarna?",
    options: ["2/8", "5/8", "3/8", "6/8"],
    correct: 1,
    explain: "Pizza dibagi 8 bagian sama besar, 5 bagian berwarna, jadi 5/8.",
    pizza: P(8, 5),
  },
  {
    level: 1,
    q: "Agar sebuah pecahan benar, potongan pizza harus ....",
    options: ["berbeda besar", "sama besar", "berwarna", "berjumlah 4"],
    correct: 1,
    explain: "Pecahan hanya benar jika semua bagian dibagi SAMA BESAR. Kalau tidak sama besar, itu bukan pecahan yang tepat.",
  },
  {
    level: 1,
    q: "Pizza dibagi 6 bagian sama besar, 6 bagian tersedia semua. Nilainya ....",
    options: ["6/6 = 1", "1/6", "5/6", "6/12"],
    correct: 0,
    explain: "6 dari 6 bagian berarti seluruh pizza, 6/6 = 1 (utuh).",
    pizza: P(6, 6),
  },

  // ============ LEVEL 2 ============
  {
    level: 2,
    q: "Pada pecahan 3/8, angka 3 disebut ....",
    options: ["penyebut", "pembilang", "desimal", "persen"],
    correct: 1,
    explain: "Angka di ATAS garis pecahan disebut pembilang. Pembilang 3 = jumlah bagian yang diambil.",
    pizza: P(8, 3),
  },
  {
    level: 2,
    q: "Pada pecahan 3/8, angka 8 disebut ....",
    options: ["pembilang", "penyebut", "hasil", "sisa"],
    correct: 1,
    explain: "Angka di BAWAH garis pecahan disebut penyebut. Penyebut 8 = jumlah seluruh bagian sama besar.",
    pizza: P(8, 3),
  },
  {
    level: 2,
    q: "Pecahan 5/8 dibaca ....",
    options: ["lima delapan", "lima per delapan", "delapan per lima", "lima puluh delapan"],
    correct: 1,
    explain: "Pecahan dibaca pembilang 'per' penyebut, jadi 5/8 = lima per delapan.",
    pizza: P(8, 5),
  },
  {
    level: 2,
    q: "Pizza dibagi menjadi 6 bagian sama besar dan 4 bagian dipilih. Pecahannya ....",
    options: ["6/4", "4/6", "2/6", "4/4"],
    correct: 1,
    explain: "Penyebut 6 (jumlah bagian), pembilang 4 (bagian dipilih), jadi 4/6.",
    pizza: P(6, 4),
  },
  {
    level: 2,
    q: "Jika pembilang bertambah besar (penyebut tetap), maka bagian yang diambil ....",
    options: ["makin sedikit", "makin banyak", "tetap", "hilang"],
    correct: 1,
    explain: "Pembilang menunjukkan banyak bagian yang diambil. Makin besar pembilang, makin banyak bagian pizza yang diambil.",
  },
  {
    level: 2,
    q: "Pecahan 'tujuh per dua belas' ditulis ....",
    options: ["12/7", "7/12", "7/2", "2/7"],
    correct: 1,
    explain: "'Tujuh' adalah pembilang (atas) dan 'dua belas' penyebut (bawah), jadi 7/12.",
    pizza: P(12, 7),
  },

  // ============ LEVEL 3 ============
  {
    level: 3,
    q: "Pecahan yang senilai dengan 1/2 adalah ....",
    options: ["1/3", "2/4", "3/5", "2/3"],
    correct: 1,
    explain: "1/2 dikali 2 di atas dan bawah menjadi 2/4. Nilainya sama, bagian pizzanya sama besar.",
    pizza: [P(2, 1), P(4, 2)],
  },
  {
    level: 3,
    q: "2/3 = .../6",
    options: ["3", "4", "5", "6"],
    correct: 1,
    explain: "2/3 dikali 2 di atas dan bawah = 4/6. Jadi pembilangnya 4.",
    pizza: [P(3, 2), P(6, 4)],
  },
  {
    level: 3,
    q: "4/8 disederhanakan menjadi ....",
    options: ["1/2", "2/3", "1/4", "3/4"],
    correct: 0,
    explain: "4/8 dibagi 4 (FPB) di atas dan bawah = 1/2. Bentuk paling sederhana.",
    pizza: P(8, 4),
  },
  {
    level: 3,
    q: "Manakah yang BUKAN senilai dengan 1/3?",
    options: ["2/6", "3/9", "4/12", "2/5"],
    correct: 3,
    explain: "1/3 = 2/6 = 3/9 = 4/12. Sedangkan 2/5 nilainya berbeda, bukan senilai.",
  },
  {
    level: 3,
    q: "Untuk membuat pecahan senilai, pembilang dan penyebut harus ....",
    options: ["dikali angka berbeda", "dikali/dibagi angka yang sama", "ditambah angka sama", "dikurangi"],
    correct: 1,
    explain: "Pecahan senilai dibuat dengan mengalikan atau membagi pembilang DAN penyebut dengan bilangan yang SAMA.",
  },
  {
    level: 3,
    q: "6/9 disederhanakan menjadi ....",
    options: ["2/3", "3/4", "1/2", "2/5"],
    correct: 0,
    explain: "FPB dari 6 dan 9 adalah 3. 6:3=2, 9:3=3, jadi 2/3.",
    pizza: P(9, 6),
  },

  // ============ LEVEL 4 ============
  {
    level: 4,
    q: "Manakah yang benar? Bandingkan 3/4 dan 1/4.",
    options: ["3/4 < 1/4", "3/4 = 1/4", "3/4 > 1/4", "tidak bisa"],
    correct: 2,
    explain: "Penyebut sama (4), tinggal lihat pembilang. 3 lebih besar dari 1, jadi 3/4 > 1/4.",
    pizza: [P(4, 3), P(4, 1)],
  },
  {
    level: 4,
    q: "Bandingkan 2/5 dan 4/5.",
    options: ["2/5 > 4/5", "2/5 < 4/5", "2/5 = 4/5", "sama"],
    correct: 1,
    explain: "Penyebut sama, pembilang 2 lebih kecil dari 4, jadi 2/5 < 4/5.",
    pizza: [P(5, 2), P(5, 4)],
  },
  {
    level: 4,
    q: "Jika pembilang sama, pecahan dengan penyebut LEBIH BESAR nilainya ....",
    options: ["lebih besar", "lebih kecil", "sama", "nol"],
    correct: 1,
    explain: "Penyebut besar berarti potongan makin kecil. Contoh 1/8 < 1/4 karena potongan pizza 1/8 lebih kecil.",
    pizza: [P(4, 1), P(8, 1)],
  },
  {
    level: 4,
    q: "Bandingkan 1/2 dan 2/4.",
    options: ["1/2 > 2/4", "1/2 < 2/4", "1/2 = 2/4", "tidak tentu"],
    correct: 2,
    explain: "2/4 disederhanakan = 1/2. Keduanya senilai, jadi 1/2 = 2/4.",
    pizza: [P(2, 1), P(4, 2)],
  },
  {
    level: 4,
    q: "Manakah pecahan yang paling besar?",
    options: ["1/4", "1/2", "1/3", "1/6"],
    correct: 1,
    explain: "Pembilang sama (1). Penyebut paling KECIL = potongan paling besar. 1/2 paling besar.",
  },
  {
    level: 4,
    q: "Bandingkan 3/6 dan 1/2.",
    options: ["3/6 > 1/2", "3/6 < 1/2", "3/6 = 1/2", "tidak bisa"],
    correct: 2,
    explain: "3/6 disederhanakan = 1/2. Jadi 3/6 = 1/2.",
    pizza: [P(6, 3), P(2, 1)],
  },

  // ============ LEVEL 5 ============
  {
    level: 5,
    q: "Urutan dari TERKECIL ke terbesar: 3/4, 1/4, 2/4 adalah ....",
    options: ["1/4, 2/4, 3/4", "3/4, 2/4, 1/4", "2/4, 1/4, 3/4", "1/4, 3/4, 2/4"],
    correct: 0,
    explain: "Penyebut sama, urutkan pembilang dari kecil: 1, 2, 3 → 1/4, 2/4, 3/4.",
  },
  {
    level: 5,
    q: "Urutan dari TERBESAR ke terkecil: 1/2, 1/8, 1/4 adalah ....",
    options: ["1/8, 1/4, 1/2", "1/2, 1/4, 1/8", "1/4, 1/2, 1/8", "1/2, 1/8, 1/4"],
    correct: 1,
    explain: "Pembilang sama (1). Penyebut kecil = pecahan besar. Urut besar→kecil: 1/2, 1/4, 1/8.",
  },
  {
    level: 5,
    q: "Manakah yang terletak PALING KIRI pada garis bilangan (paling kecil)?",
    options: ["1/2", "3/4", "1/4", "1"],
    correct: 2,
    explain: "1/4 paling kecil, jadi paling kiri. Urutan: 1/4, 1/2, 3/4, 1.",
  },
  {
    level: 5,
    q: "Urutkan naik: 2/6, 5/6, 1/6.",
    options: ["1/6, 2/6, 5/6", "5/6, 2/6, 1/6", "2/6, 1/6, 5/6", "1/6, 5/6, 2/6"],
    correct: 0,
    explain: "Penyebut sama (6), urutkan pembilang naik: 1, 2, 5 → 1/6, 2/6, 5/6.",
  },
  {
    level: 5,
    q: "Di antara 1/2, 1, 0, dan 3/4, yang PALING BESAR adalah ....",
    options: ["1/2", "3/4", "1", "0"],
    correct: 2,
    explain: "1 adalah pizza utuh (paling besar). Urutan: 0, 1/2, 3/4, 1.",
  },

  // ============ LEVEL 6 ============
  {
    level: 6,
    q: "Pecahan 1/2 sama dengan desimal ....",
    options: ["0,2", "0,5", "0,25", "1,5"],
    correct: 1,
    explain: "1 dibagi 2 = 0,5. Jadi 1/2 = 0,5 = 50%.",
    pizza: P(2, 1),
  },
  {
    level: 6,
    q: "3/4 dinyatakan dalam persen adalah ....",
    options: ["34%", "43%", "75%", "50%"],
    correct: 2,
    explain: "3 : 4 = 0,75 = 75%. Jadi 3/4 = 0,75 = 75%.",
    pizza: P(4, 3),
  },
  {
    level: 6,
    q: "Pecahan 5/4 termasuk pecahan ....",
    options: ["biasa/murni", "tidak murni (campuran)", "desimal", "senilai"],
    correct: 1,
    explain: "5/4 pembilangnya (5) lebih besar dari penyebut (4), jadi pecahan tidak murni. Bisa ditulis campuran 1 1/4.",
    pizza: [P(4, 4), P(4, 1)],
  },
  {
    level: 6,
    q: "Bentuk campuran dari 7/4 adalah ....",
    options: ["1 3/4", "3 1/4", "1 1/4", "2 1/4"],
    correct: 0,
    explain: "7 : 4 = 1 sisa 3. Jadi 7/4 = 1 3/4 (1 pizza utuh + 3/4 pizza).",
  },
  {
    level: 6,
    q: "50% jika diubah menjadi pecahan paling sederhana adalah ....",
    options: ["1/2", "5/10", "50/100", "1/5"],
    correct: 0,
    explain: "50% = 50/100 = 1/2 (disederhanakan). Semua benar nilainya, tapi paling sederhana adalah 1/2.",
  },
  {
    level: 6,
    q: "1,25 sama dengan pecahan campuran ....",
    options: ["1 1/2", "1 1/4", "2 1/4", "1 2/5"],
    correct: 1,
    explain: "0,25 = 1/4, jadi 1,25 = 1 1/4 = 5/4 = 125%.",
  },

  // ============ LEVEL 7 ============
  {
    level: 7,
    q: "1/4 + 2/4 = ....",
    options: ["3/8", "3/4", "2/4", "1/2"],
    correct: 1,
    explain: "Penyebut sama (4), jumlahkan pembilang: 1+2=3. Hasilnya 3/4.",
    pizza: [P(4, 1), P(4, 2)],
  },
  {
    level: 7,
    q: "1/2 + 1/4 = ....",
    options: ["2/6", "2/4", "3/4", "1/6"],
    correct: 2,
    explain: "Samakan penyebut: 1/2 = 2/4. Lalu 2/4 + 1/4 = 3/4.",
    pizza: [P(2, 1), P(4, 1)],
  },
  {
    level: 7,
    q: "2/6 + 1/6 = ... (sederhanakan)",
    options: ["3/6 = 1/2", "3/12", "2/6", "1/3"],
    correct: 0,
    explain: "Penyebut sama: 2+1=3, jadi 3/6. Disederhanakan menjadi 1/2.",
    pizza: [P(6, 2), P(6, 1)],
  },
  {
    level: 7,
    q: "1/3 + 1/6 = ....",
    options: ["2/9", "1/2", "2/6", "1/6"],
    correct: 1,
    explain: "KPK 3 dan 6 = 6. 1/3 = 2/6, lalu 2/6 + 1/6 = 3/6 = 1/2.",
  },
  {
    level: 7,
    q: "Untuk menjumlahkan pecahan berpenyebut BEDA, langkah pertama adalah ....",
    options: ["kali pembilang", "samakan penyebut (KPK)", "jumlah penyebut", "bagi"],
    correct: 1,
    explain: "Pecahan hanya bisa dijumlah jika penyebutnya SAMA. Samakan dulu penyebut menggunakan KPK.",
  },
  {
    level: 7,
    q: "1 1/2 + 1/4 = ....",
    options: ["1 3/4", "2 1/4", "1 1/4", "2 3/4"],
    correct: 0,
    explain: "1/2 = 2/4. Bagian pecahan: 2/4 + 1/4 = 3/4. Bulatnya tetap 1, jadi 1 3/4.",
  },

  // ============ LEVEL 8 ============
  {
    level: 8,
    q: "3/4 − 1/4 = ... (sederhanakan)",
    options: ["2/4 = 1/2", "2/8", "4/4", "1/4"],
    correct: 0,
    explain: "Penyebut sama (4), kurangi pembilang: 3−1=2, jadi 2/4 = 1/2.",
    pizza: [P(4, 3), P(4, 1)],
  },
  {
    level: 8,
    q: "1 − 1/4 = ....",
    options: ["1/4", "2/4", "3/4", "4/4"],
    correct: 2,
    explain: "1 pizza utuh = 4/4. 4/4 − 1/4 = 3/4.",
    pizza: [P(4, 4), P(4, 1)],
  },
  {
    level: 8,
    q: "5/6 − 2/6 = ... (sederhanakan)",
    options: ["3/6 = 1/2", "3/12", "7/6", "3/6"],
    correct: 0,
    explain: "Penyebut sama: 5−2=3, jadi 3/6 = 1/2.",
    pizza: [P(6, 5), P(6, 2)],
  },
  {
    level: 8,
    q: "1/2 − 1/4 = ....",
    options: ["1/4", "0", "2/4", "1/2"],
    correct: 0,
    explain: "1/2 = 2/4. Lalu 2/4 − 1/4 = 1/4.",
    pizza: [P(4, 2), P(4, 1)],
  },
  {
    level: 8,
    q: "1 1/2 − 1/4 = ....",
    options: ["1 1/4", "1 3/4", "1/4", "3/4"],
    correct: 0,
    explain: "1 1/2 = 1 2/4. Kurangi bagian pecahan 2/4 − 1/4 = 1/4. Jadi 1 1/4.",
  },
  {
    level: 8,
    q: "Untuk mengurangkan pecahan berpenyebut beda, kita harus ....",
    options: ["kurangi penyebut", "samakan penyebut dulu", "kali silang", "buang penyebut"],
    correct: 1,
    explain: "Sama seperti penjumlahan, samakan penyebut lebih dulu (pakai KPK) sebelum mengurangi pembilang.",
  },

  // ============ LEVEL 9 ============
  {
    level: 9,
    q: "2 × 1/4 = ....",
    options: ["2/8", "1/2", "2/4", "1/4"],
    correct: 1,
    explain: "2 × 1/4 = 2/4 = 1/2. Sama dengan mengambil 1/4 sebanyak 2 kali.",
    pizza: P(4, 2),
  },
  {
    level: 9,
    q: "1/2 × 1/2 = ....",
    options: ["1/4", "2/4", "1/2", "2/2"],
    correct: 0,
    explain: "Kalikan pembilang (1×1=1) dan penyebut (2×2=4), jadi 1/4. Setengah dari setengah pizza.",
    pizza: P(4, 1),
  },
  {
    level: 9,
    q: "2/3 × 3/4 = ... (sederhanakan)",
    options: ["6/7", "1/2", "5/7", "6/12"],
    correct: 1,
    explain: "2×3=6 (atas), 3×4=12 (bawah) = 6/12 = 1/2.",
  },
  {
    level: 9,
    q: "Saat pecahan (antara 0 dan 1) dikali pecahan lain, hasilnya biasanya ....",
    options: ["lebih besar", "lebih kecil dari faktornya", "sama", "menjadi bulat"],
    correct: 1,
    explain: "Mengalikan dengan pecahan kurang dari 1 berarti mengambil sebagian, jadi hasilnya lebih KECIL.",
  },
  {
    level: 9,
    q: "3 × 2/5 = ....",
    options: ["6/5", "5/6", "6/15", "2/15"],
    correct: 0,
    explain: "3 × 2/5 = 6/5 (pecahan tidak murni) = 1 1/5.",
  },
  {
    level: 9,
    q: "Cara mengalikan dua pecahan adalah ....",
    options: ["samakan penyebut", "kali pembilang dgn pembilang, penyebut dgn penyebut", "kali silang", "balik salah satu"],
    correct: 1,
    explain: "Perkalian pecahan: pembilang × pembilang, penyebut × penyebut. Tidak perlu menyamakan penyebut.",
  },

  // ============ LEVEL 10 ============
  {
    level: 10,
    q: "1/2 ÷ 2 = ....",
    options: ["1", "1/4", "2/2", "1/2"],
    correct: 1,
    explain: "Membagi = kali kebalikan. 1/2 ÷ 2 = 1/2 × 1/2 = 1/4.",
    pizza: P(4, 1),
  },
  {
    level: 10,
    q: "1 ÷ 1/4 = ....",
    options: ["1/4", "4", "1", "2"],
    correct: 1,
    explain: "Berapa potongan 1/4 dalam 1 pizza utuh? Ada 4. 1 ÷ 1/4 = 1 × 4/1 = 4.",
    pizza: P(4, 4),
  },
  {
    level: 10,
    q: "1/2 ÷ 1/4 = ....",
    options: ["1/8", "2", "1/2", "4"],
    correct: 1,
    explain: "1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2. Ada 2 potongan 1/4 dalam 1/2 pizza.",
  },
  {
    level: 10,
    q: "Pembagian a ÷ b dapat diubah menjadi ....",
    options: ["a × b", "a × 1/b (b≠0)", "a + b", "b ÷ a"],
    correct: 1,
    explain: "Membagi dengan b sama dengan mengalikan dengan kebalikannya: a ÷ b = a × 1/b, dengan b ≠ 0.",
  },
  {
    level: 10,
    q: "3/4 ÷ 3 = ....",
    options: ["1/4", "3/12", "9/4", "1/3"],
    correct: 0,
    explain: "3/4 ÷ 3 = 3/4 × 1/3 = 3/12 = 1/4.",
  },
  {
    level: 10,
    q: "2 ÷ 1/2 = ....",
    options: ["1", "4", "2", "1/4"],
    correct: 1,
    explain: "2 ÷ 1/2 = 2 × 2/1 = 4. Ada 4 setengah pizza dalam 2 pizza utuh.",
  },

  // ============ LEVEL 11 ============
  {
    level: 11,
    q: "Andi punya 1 pizza. Ia makan 1/4 dan adiknya makan 1/4. Berapa sisa pizza?",
    options: ["1/4", "1/2", "3/4", "2/4"],
    correct: 1,
    explain: "Dimakan 1/4 + 1/4 = 2/4. Sisa = 1 − 2/4 = 2/4 = 1/2 pizza.",
    pizza: P(4, 2),
  },
  {
    level: 11,
    q: "Ibu membuat 3/4 loyang pizza, lalu menambah 1/4 loyang lagi. Total pizza ibu?",
    options: ["1 loyang utuh", "1/2 loyang", "3/4 loyang", "4/8 loyang"],
    correct: 0,
    explain: "3/4 + 1/4 = 4/4 = 1 loyang utuh.",
    pizza: P(4, 4),
  },
  {
    level: 11,
    q: "Sebuah pizza dibagi rata untuk 8 anak. Tiap anak mendapat bagian ....",
    options: ["1/4", "1/8", "8/8", "1/2"],
    correct: 1,
    explain: "1 pizza dibagi 8 anak = 1 ÷ 8 = 1/8 tiap anak.",
    pizza: P(8, 1),
  },
  {
    level: 11,
    q: "Kakak makan 2/6 pizza, adik makan 1/6 pizza. Berapa total yang dimakan?",
    options: ["3/6 = 1/2", "3/12", "1/6", "2/6"],
    correct: 0,
    explain: "2/6 + 1/6 = 3/6 = 1/2 pizza dimakan bersama.",
    pizza: [P(6, 2), P(6, 1)],
  },
  {
    level: 11,
    q: "Resep butuh 1/2 cangkir keju. Untuk 2 resep, keju yang dibutuhkan ....",
    options: ["1/4 cangkir", "1 cangkir", "1/2 cangkir", "2 cangkir"],
    correct: 1,
    explain: "2 × 1/2 = 2/2 = 1 cangkir keju.",
  },
  {
    level: 11,
    q: "Rina berlari 3/4 km, lalu berhenti setelah 1/4 km. Berapa sisa jarak?",
    options: ["1/2 km", "1/4 km", "1 km", "2/4 km"],
    correct: 0,
    explain: "3/4 − 1/4 = 2/4 = 1/2 km sisa yang belum ditempuh.",
  },

  // ============ LEVEL 12 ============
  {
    level: 12,
    q: "Pizza dibagi 8 bagian. Pagi dimakan 3/8, siang dimakan 1/4. Sisa pizza?",
    options: ["3/8", "5/8", "4/8", "1/2"],
    correct: 0,
    explain: "1/4 = 2/8. Dimakan 3/8 + 2/8 = 5/8. Sisa = 8/8 − 5/8 = 3/8.",
    pizza: P(8, 3),
  },
  {
    level: 12,
    q: "Hitung: 1/2 + 1/4 − 1/8 = ....",
    options: ["3/8", "5/8", "7/8", "1/8"],
    correct: 1,
    explain: "Samakan ke 8: 4/8 + 2/8 − 1/8 = 5/8.",
  },
  {
    level: 12,
    q: "2/3 dari 9 pizza adalah ....",
    options: ["3 pizza", "6 pizza", "9 pizza", "2 pizza"],
    correct: 1,
    explain: "2/3 × 9 = 18/3 = 6 pizza.",
  },
  {
    level: 12,
    q: "Sebuah pizza 12 potong. Diberikan 1/3 ke tetangga dan 1/4 ke teman. Sisa potong?",
    options: ["5 potong", "7 potong", "3 potong", "6 potong"],
    correct: 0,
    explain: "1/3 dari 12 = 4 potong, 1/4 dari 12 = 3 potong. Diberikan 7 potong. Sisa = 12 − 7 = 5 potong.",
    pizza: P(12, 5),
  },
  {
    level: 12,
    q: "Ubah ke bentuk paling sederhana: (1/2 × 4/6) = ....",
    options: ["1/3", "4/12", "2/6", "1/2"],
    correct: 0,
    explain: "1/2 × 4/6 = 4/12 = 1/3 (disederhanakan). Semua senilai, paling sederhana 1/3.",
  },
  {
    level: 12,
    q: "3/4 pizza dibagi rata ke 3 orang. Tiap orang dapat ....",
    options: ["1/4 pizza", "3/12 pizza", "1/3 pizza", "1/2 pizza"],
    correct: 0,
    explain: "3/4 ÷ 3 = 3/4 × 1/3 = 3/12 = 1/4 pizza tiap orang.",
  },
];

export function questionsForLevel(level: number): Question[] {
  return QUESTIONS.filter((q) => q.level === level);
}
