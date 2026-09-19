export interface MateriBlock {
  heading: string;
  body: string[];
}

export interface LevelContent {
  intro: string;
  materi: MateriBlock[];
  contoh: { text: string; pizza?: { slices: number; selected: number } }[];
  simInfo: string; // description for the simulation mode on this level
  ingat: string; // "Remember" tip
}

export const CONTENT: Record<number, LevelContent> = {
  1: {
    intro: "Pecahan menunjukkan bagian dari keseluruhan. Ayo mulai dengan pizza!",
    materi: [
      { heading: "Pengertian Pecahan", body: ["Pecahan adalah cara menyatakan bagian dari sesuatu yang utuh.", "Satu pizza utuh sama dengan 1."] },
      { heading: "Membagi Pizza", body: ["Pizza dibagi 2 bagian sama besar → tiap bagian 1/2.", "Pizza dibagi 4 bagian sama besar → tiap bagian 1/4.", "Pizza dibagi 8 bagian → tiap bagian 1/8.", "Pizza dibagi 12 bagian → tiap bagian 1/12."] },
    ],
    contoh: [
      { text: "1 pizza utuh = 1", pizza: { slices: 1, selected: 1 } },
      { text: "1 dari 2 bagian = 1/2", pizza: { slices: 2, selected: 1 } },
      { text: "1 dari 4 bagian = 1/4", pizza: { slices: 4, selected: 1 } },
      { text: "3 dari 4 bagian = 3/4", pizza: { slices: 4, selected: 3 } },
    ],
    simInfo: "Pilih jumlah potongan dan jumlah yang dimakan. Lihat pecahannya muncul otomatis!",
    ingat: "Penyebut menunjukkan jumlah bagian sama besar. Pembilang menunjukkan jumlah bagian yang diambil.",
  },
  2: {
    intro: "Kenali dua bagian penting pecahan: pembilang dan penyebut.",
    materi: [
      { heading: "Pembilang", body: ["Pembilang adalah angka di ATAS.", "Menunjukkan jumlah bagian yang diperhatikan atau diambil."] },
      { heading: "Penyebut", body: ["Penyebut adalah angka di BAWAH.", "Menunjukkan jumlah seluruh bagian sama besar."] },
    ],
    contoh: [
      { text: "3/8: dibagi 8, diambil 3", pizza: { slices: 8, selected: 3 } },
      { text: "1/2 = satu per dua (setengah)", pizza: { slices: 2, selected: 1 } },
      { text: "5/8 = lima per delapan", pizza: { slices: 8, selected: 5 } },
    ],
    simInfo: "Ubah pembilang dan penyebut. Pizza akan diperbarui secara langsung beserta cara membacanya!",
    ingat: "Pembilang di atas, penyebut di bawah. Ingat: 'penyebut' menyebut banyaknya bagian.",
  },
  3: {
    intro: "Pecahan senilai punya NILAI sama walau angkanya berbeda.",
    materi: [
      { heading: "Apa itu Pecahan Senilai?", body: ["Pecahan berbeda tetapi menunjukkan bagian pizza yang sama besar.", "Contoh: 1/2 = 2/4 = 4/8."] },
      { heading: "Cara Membuatnya", body: ["Kalikan pembilang dan penyebut dengan bilangan yang SAMA.", "Atau bagi keduanya dengan bilangan yang sama untuk menyederhanakan."] },
    ],
    contoh: [
      { text: "1/2 = 2/4", pizza: { slices: 2, selected: 1 } },
      { text: "= 4/8 (sama besar!)", pizza: { slices: 8, selected: 4 } },
      { text: "2/3 = 4/6 = 6/9", pizza: { slices: 3, selected: 2 } },
    ],
    simInfo: "Gunakan tombol Kalikan 2, Kalikan 3, dan Sederhanakan untuk melihat pecahan senilai.",
    ingat: "Kalikan/bagi ATAS dan BAWAH dengan angka yang sama agar nilainya tetap.",
  },
  4: {
    intro: "Belajar menentukan pecahan mana yang lebih besar, kecil, atau sama.",
    materi: [
      { heading: "Penyebut Sama", body: ["Lihat pembilang. Pembilang lebih besar = pecahan lebih besar.", "Contoh: 3/4 > 1/4."] },
      { heading: "Pembilang Sama", body: ["Lihat penyebut. Penyebut lebih besar = potongan lebih kecil.", "Contoh: 1/4 > 1/8."] },
    ],
    contoh: [
      { text: "3/4 > 1/4", pizza: { slices: 4, selected: 3 } },
      { text: "2/5 < 4/5", pizza: { slices: 5, selected: 2 } },
      { text: "1/2 = 2/4", pizza: { slices: 2, selected: 1 } },
    ],
    simInfo: "Dua pizza berdampingan. Pilih tanda >, <, atau = dan dapatkan penjelasan langsung.",
    ingat: "Kalau bingung, bayangkan potongan pizzanya. Yang lebih banyak/besar itu lebih besar.",
  },
  5: {
    intro: "Susun pecahan dari kecil ke besar atau sebaliknya.",
    materi: [
      { heading: "Mengurutkan", body: ["Dari terkecil ke terbesar (naik).", "Dari terbesar ke terkecil (turun).", "Gunakan gambar pizza untuk membandingkan."] },
    ],
    contoh: [
      { text: "Urutan naik: 1/4, 1/2, 3/4, 1", pizza: { slices: 4, selected: 1 } },
    ],
    simInfo: "Seret atau gunakan tombol untuk menyusun kartu pecahan ke urutan yang benar.",
    ingat: "Samakan penyebut atau bandingkan gambar untuk mengurutkan dengan tepat.",
  },
  6: {
    intro: "Ada banyak jenis pecahan dan bentuk lainnya!",
    materi: [
      { heading: "Jenis Pecahan", body: ["Pecahan biasa: 3/4.", "Pecahan murni: pembilang < penyebut (contoh 2/5).", "Pecahan tidak murni: pembilang ≥ penyebut (contoh 5/4).", "Pecahan campuran: 1 1/4."] },
      { heading: "Desimal & Persen", body: ["1/2 = 0,5 = 50%.", "3/4 = 0,75 = 75%.", "5/4 = 1 1/4 = 1,25 = 125%."] },
    ],
    contoh: [
      { text: "1/2 = 0,5 = 50%", pizza: { slices: 2, selected: 1 } },
      { text: "3/4 = 0,75 = 75%", pizza: { slices: 4, selected: 3 } },
    ],
    simInfo: "Ubah tampilan antara Pecahan → Desimal → Persen. Jika lebih dari 1, muncul beberapa pizza!",
    ingat: "Desimal pakai KOMA (0,5). Persen = per seratus.",
  },
  7: {
    intro: "Menjumlahkan pecahan itu seperti menggabungkan potongan pizza.",
    materi: [
      { heading: "Penyebut Sama", body: ["Jumlahkan pembilang, penyebut tetap.", "Contoh: 1/4 + 2/4 = 3/4."] },
      { heading: "Penyebut Berbeda", body: ["Samakan penyebut dulu dengan KPK.", "Contoh: 1/2 + 1/4 = 2/4 + 1/4 = 3/4."] },
    ],
    contoh: [
      { text: "1/4 + 2/4 = 3/4", pizza: { slices: 4, selected: 3 } },
      { text: "1/2 + 1/4 = 3/4", pizza: { slices: 4, selected: 3 } },
    ],
    simInfo: "Pilih potongan dari dua pizza, aplikasi menggabungkannya dan menampilkan langkah-langkahnya.",
    ingat: "Hanya bisa dijumlah jika penyebutnya SAMA. Samakan dulu bila berbeda.",
  },
  8: {
    intro: "Mengurangi pecahan = mengambil sebagian potongan pizza.",
    materi: [
      { heading: "Penyebut Sama", body: ["Kurangi pembilang, penyebut tetap.", "Contoh: 3/4 − 1/4 = 2/4 = 1/2."] },
      { heading: "Dari Pizza Utuh", body: ["1 = penyebut/penyebut.", "Contoh: 1 − 1/4 = 4/4 − 1/4 = 3/4."] },
    ],
    contoh: [
      { text: "3/4 − 1/4 = 1/2", pizza: { slices: 4, selected: 2 } },
      { text: "1 − 1/4 = 3/4", pizza: { slices: 4, selected: 3 } },
    ],
    simInfo: "Pilih potongan yang dimakan dari pizza, lihat bagian awal, yang diambil, dan sisa.",
    ingat: "Samakan penyebut dulu jika berbeda, baru kurangi pembilangnya.",
  },
  9: {
    intro: "Perkalian pecahan = mengambil bagian dari bagian.",
    materi: [
      { heading: "Cara Mengalikan", body: ["Pembilang × pembilang, penyebut × penyebut.", "Contoh: 1/2 × 1/2 = 1/4."] },
      { heading: "Hasil Lebih Kecil", body: ["Jika kali pecahan antara 0 dan 1, hasilnya lebih kecil.", "Contoh: 2/3 × 3/4 = 6/12 = 1/2."] },
    ],
    contoh: [
      { text: "2 × 1/4 = 1/2", pizza: { slices: 4, selected: 2 } },
      { text: "1/2 × 1/2 = 1/4", pizza: { slices: 4, selected: 1 } },
    ],
    simInfo: "Model luas pizza: pecahan kedua diambil dari area pecahan pertama, ditandai arsiran.",
    ingat: "Tidak perlu menyamakan penyebut saat mengalikan. Langsung kali atas dan bawah.",
  },
  10: {
    intro: "Pembagian pecahan = membalik lalu mengalikan.",
    materi: [
      { heading: "Aturan Kebalikan", body: ["a ÷ b = a × 1/b (dengan b ≠ 0).", "Balik pecahan pembagi lalu kalikan."] },
      { heading: "Contoh", body: ["1 ÷ 1/4 = 1 × 4 = 4.", "1/2 ÷ 1/4 = 1/2 × 4 = 2."] },
    ],
    contoh: [
      { text: "1 ÷ 1/4 = 4 potong", pizza: { slices: 4, selected: 4 } },
      { text: "1/2 ÷ 2 = 1/4", pizza: { slices: 4, selected: 1 } },
    ],
    simInfo: "Tentukan berapa kelompok/potongan yang bisa dibuat dari pizza. Lihat langkah kebalikannya.",
    ingat: "Bagi = kali kebalikan. Penyebut pembagi tidak boleh 0.",
  },
  11: {
    intro: "Terapkan pecahan dalam cerita sehari-hari!",
    materi: [
      { heading: "Langkah Soal Cerita", body: ["1. Baca dan pahami cerita.", "2. Tulis yang diketahui.", "3. Tentukan yang ditanya.", "4. Pilih operasi yang tepat.", "5. Kerjakan dan periksa."] },
    ],
    contoh: [
      { text: "Andi makan 1/4, sisa 3/4 pizza", pizza: { slices: 4, selected: 3 } },
    ],
    simInfo: "Setiap soal punya ilustrasi, informasi yang diketahui, dan pembahasan langkah demi langkah.",
    ingat: "Kata 'sisa' → pengurangan. Kata 'bersama/total' → penjumlahan. 'dibagi rata' → pembagian.",
  },
  12: {
    intro: "Saatnya jadi Master Pecahan! Selesaikan tantangan multi-langkah.",
    materi: [
      { heading: "Tantangan Mahir", body: ["Operasi campuran pecahan.", "Soal multi-langkah dan HOTS.", "Gabungan pecahan, desimal, dan persen."] },
    ],
    contoh: [
      { text: "8 potong, dimakan 3/8 + 1/4, sisa 3/8", pizza: { slices: 8, selected: 3 } },
    ],
    simInfo: "Pilih tingkat kesulitan dan taklukkan soal-soal pecahan tersulit!",
    ingat: "Kerjakan langkah demi langkah. Sederhanakan hasil akhir bila memungkinkan.",
  },
};
