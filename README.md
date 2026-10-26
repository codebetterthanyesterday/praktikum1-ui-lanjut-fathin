# Gatherly

Project praktikum mata kuliah Pengembangan UI Lanjut. Gatherly itu web buat cari dan daftar event komunitas, dibuat pakai Vue 3 + Vite.

Tiap modul dikerjakan di branch sendiri (`Modul-0-dan-1`, `Modul-2`, `Modul-3`) lalu di-PR ke `main`.

## Cara jalanin

Butuh Node.js versi 22 ke atas.

```sh
npm install
npm run dev

```

Buka `http://localhost:5173`. Kalau mau build: `npm run build`.

## Halaman

- `/` home
- `/about`
- `/browse/events` daftar event, bisa dicari dan difilter per kategori
- `/browse/events/:id` detail event
- `/browse/events/:id/register` form pendaftaran event
- `/browse/category`
- `/browse/your-events` tiket yang sudah didaftar
- `/browse/your-events/:id` bukti tiket
- `/contact`
- `/dashboard` dashboard organizer (pemantauan)
- `/dashboard/events` kelola acara (tambah, selesaikan, hapus)

Bahasa bisa diganti EN/ID lewat tombol di navbar.

## Progress per modul

**Modul 0 & 1** - setup project, routing (termasuk nested route), navbar, breadcrumb.

**Modul 2** - layout system dan visual hierarchy:

- variabel spacing dan warna di `main.css`
- home pakai hero 65vh supaya tombol utamanya langsung kelihatan
- daftar event pakai grid yang kolomnya nyesuain lebar layar
- detail event 2 kolom (2:1), kartu tiket di kanan sticky
- dashboard pakai rail & pane, yang scroll cuma bagian kanan

**Modul 3** - UI dipecah jadi komponen:

- `AppCard` (slot) dan `AppButton` (props variant) dipakai di home, daftar event, sama detail event
- `EventCard` terima data lewat props, klik tombolnya emit `view-detail` ke `EventList`
- `SearchBar` dan `CategoryFilter` pakai `v-model`
- kalau hasil pencarian kosong muncul empty state

**Tambahan** - CSS dirombak jadi mobile-first (style dasar buat hp, `min-width` buat layar lebih besar):

- dashboard di hp pakai tab bar di bawah, tabelnya ditumpuk jadi list
- di detail event tombol daftar nempel di bawah layar
- tombol dan link dibesarin area sentuhnya (minimal 44px)

**Modul 4** - manajemen state dan interaksi:

- data acara dipusatkan di `useEvents.js` (single source of truth), mulai dari kosong dan disimpan ke localStorage pakai `watch` deep
- total/aktif/selesai dihitung pakai `computed`
- halaman Kelola Acara punya 3 tab: acara aktif, form buat acara (ada validasi), dan arsip acara selesai
- selesaikan & hapus acara harus konfirmasi dulu lewat `AppModal` (backdrop blur)
- katalog publik cuma nampilin acara aktif, detail acara diambil dari id di URL, kalau ga ketemu muncul 404

**Modul 5** - user flow pendaftaran peserta:

- tombol di detail event ikut status: Registration Closed, Already Registered (ada link ke tiket), Sold Out, atau Register Now (pindah ke form pakai `router.push`)
- form pendaftaran 2 kolom (`RegistrationSummary` + `RegistrationForm`), validasi per kolom, isian yang benar ga hilang waktu ada error
- kalau form udah diisi terus mau keluar/batal, muncul konfirmasi dulu
- setelah daftar muncul modal sukses + kode booking (`AppModal` sekarang punya slot `footer`)
- halaman Your Events buat lihat/batalin tiket, dan halaman bukti tiket (bisa dicetak)
- event yang dihapus panitia ikut ngehapus tiketnya, kartu di katalog dikasih label Registered
- `EventManagement` dipecah jadi `OrganizerEventCard` dan `EventCreateForm`

## Struktur folder

```text
src/
├── assets/         main.css
├── components/
│   ├── app/        Navbar, Breadcrumb
│   ├── ui/         AppCard, AppButton, AppModal
│   └── event/      EventCard, SearchBar, CategoryFilter, Registration*, OrganizerEventCard, EventCreateForm
├── composables/    useLanguage.js (ganti bahasa), useEvents.js (data acara)
├── layouts/        App.vue, DashboardLayout.vue
├── router/         index.js
└── views/          halaman-halamannya
```
