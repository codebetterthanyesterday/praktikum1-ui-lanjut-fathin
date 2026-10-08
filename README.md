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
- `/browse/category`
- `/contact`
- `/dashboard` dashboard organizer

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

## Struktur folder

```text
src/
├── assets/         main.css
├── components/
│   ├── app/        Navbar, Breadcrumb
│   ├── ui/         AppCard, AppButton
│   └── event/      EventCard, SearchBar, CategoryFilter
├── composables/    useLanguage.js (ganti bahasa)
├── data/           events.js (data dummy event)
├── layouts/        App.vue, DashboardLayout.vue
├── router/         index.js
└── views/          halaman-halamannya
```

## Catatan

- Datanya masih dummy, belum ada backend.
- Ganti bahasa dibuat sendiri pakai composable, ga pakai vue-i18n.
- Icon dari `lucide-vue-next`.
