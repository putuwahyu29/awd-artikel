# 🚀 Awd Artikel - Blog & Keystatic CMS

Awd Artikel adalah aplikasi web blog modern berbasis **Next.js**, **Tailwind CSS**, dan **Keystatic CMS** untuk pengelolaan konten tanpa database terpisah (*Git-based CMS*). Semua perubahan konten, gambar, dan konfigurasi situs langsung tersimpan sebagai commit di repositori Git.

---

## 📋 Daftar Isi
1. [Fitur Utama](#-fitur-utama)
2. [Prasyarat](#-prasyarat)
3. [Panduan Pengembangan Lokal (Local Development)](#-panduan-pengembangan-lokal-local-development)
4. [Konfigurasi GitHub App / OAuth App (Production Mode)](#-konfigurasi-github-app--oauth-app-production-mode)
5. [Daftar Environment Variables](#-daftar-environment-variables)
6. [Struktur Direktori & Konten](#-struktur-direktori--konten)
7. [Perintah Utama (Scripts)](#-perintah-utama-scripts)
8. [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 🛠️ Fitur Utama
- **Keystatic CMS**: Pengelolaan konten visual intuitif dari browser melalui `/admin` atau `/keystatic`.
- **Git-Based Storage**: Mode `local` di lingkungan pengembangan (tanpa perlu koneksi internet/GitHub) dan mode `github` di produksi (otomatis *commit & push* ke GitHub).
- **Aplikasi GitHub App & OAuth**: Mendukung autentikasi aman dengan izin granular (*fine-grained permissions*).
- **Desain Modern & Responsif**: Menggunakan Tailwind CSS, dukung *Light/Dark Mode*, animasi halus, dan *glassmorphism UI*.
- **SEO & Performance**: Otomatisasi sitemap, RSS Feed, Open Graph metadata, dan statistik analitik.

---

## 📌 Prasyarat
- **Node.js**: Versi `18.x` atau yang lebih baru.
- **Package Manager**: `npm`, `pnpm`, atau `yarn`.
- **Akun GitHub**: Untuk menyimpan repositori dan melakukan autentikasi CMS.

---

## 💻 Panduan Pengembangan Lokal (Local Development)

### 1. Clone & Install
```bash
# Clone repositori
git clone https://github.com/putuwahyu29/awd-artikel.git
cd awd-artikel

# Install dependensi
npm install
```

### 2. Konfigurasi Environment Variable (`.env.local`)
Buat file `.env.local` di root proyek:

```env
BASE_URL=http://localhost:3000
KEYSTATIC_STORAGE_KIND=local
```

### 3. Jalankan Server Development
```bash
npm run dev
```
- Akses website di: [http://localhost:3000](http://localhost:3000)
- Akses dashboard Keystatic CMS di: [http://localhost:3000/admin](http://localhost:3000/admin) (atau `/keystatic`)

---

## 🔐 Konfigurasi GitHub App / OAuth App (Production Mode)

Ketika aplikasi di-deploy ke Vercel atau server publik (seperti `https://blog.awd.my.id`), Keystatic membutuhkan GitHub App / OAuth App untuk mengedit dan mempublikasikan artikel secara langsung ke repositori GitHub.

### Langkah-langkah Pembuatan di GitHub:

1. **Buka Halaman Pembuatan GitHub App / OAuth App**:
   - Untuk **GitHub App** (Rekomendasi): [GitHub Apps -> New GitHub App](https://github.com/settings/apps/new)
   - Untuk **OAuth App**: [OAuth Apps -> New OAuth App](https://github.com/settings/applications/new)

2. **Isi Data Dasar Aplikasi**:
   - **Application Name**: `Awd Artikel CMS` *(Bebas)*
   - **Homepage URL**: `https://blog.awd.my.id` *(Ganti dengan URL domain produksi Anda)*
   - **Authorization Callback URL** (Wajib Persis):
     ```text
     https://blog.awd.my.id/api/keystatic/github/oauth/callback
     ```
   - **Webhook**: Hilangkan centang pada **Active** *(Disable Webhooks)*.

3. **Atur Hak Akses (Permissions)** (Jika Menggunakan GitHub App):
   - **Contents**: Ubah menjadi `Read & write` *(Wajib: untuk membaca dan menulis file markdown/gambar)*
   - **Pull requests**: Ubah menjadi `Read & write` *(Wajib: untuk membuat pull request jika opsi branch diaktifkan)*
   - **Metadata**: Otomatis `Read-only`

4. **Simpan & Dapatkan Client Credentials**:
   - Klik **Create GitHub App** / **Register Application**.
   - Salin **Client ID**.
   - Klik **Generate a new client secret** dan salin nilai **Client Secret** yang muncul.

5. **Install App ke Repositori**:
   - Pilih menu **Install App** di sidebar kiri pengaturan GitHub App Anda.
   - Pilih akun/organisasi Anda, klik **Only select repositories**, pilih repositori `awd-artikel`, lalu klik **Save / Install**.

---

## 🔑 Daftar Environment Variables

Tambahkan variabel-variabel berikut pada platform hosting Anda (seperti **Vercel -> Project Settings -> Environment Variables**) atau pada file `.env.local`:

| Nama Variabel | Contoh Nilai | Deskripsi |
| :--- | :--- | :--- |
| `BASE_URL` | `https://blog.awd.my.id` | Domain utama aplikasi produksi Anda |
| `KEYSTATIC_STORAGE_KIND` | `github` | Gunakan `local` untuk dev lokal, atau `github` untuk production |
| `KEYSTATIC_GITHUB_CLIENT_ID` | `Iv23liC5Me1sVNGN3nD3` | Client ID dari GitHub App / OAuth App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | `9a5ad84f29...` | Client Secret dari GitHub App / OAuth App |
| `KEYSTATIC_SECRET` | `awd_dev_secret_key_8f93...` | String acak rahasia untuk enkripsi sesi login Keystatic |
| `NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER` | `putuwahyu29` | Username pemilik repositori GitHub |
| `NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG` | `awd-artikel` | Nama repositori GitHub |

---

## 📁 Struktur Direktori & Konten

```text
awd-artikel/
├── content/                # Data konten yang dikelola oleh Keystatic
│   ├── _index.yaml         # Pengaturan Banner & Section Beranda
│   ├── posts/              # Artikel blog (.md / .mdx)
│   ├── config/             # Konfigurasi situs, menu, media sosial, dan tema
│   └── users/              # Data profil penulis
├── pages/                  # Halaman Next.js (Page Router)
│   ├── api/keystatic/      # API Route penyedia autentikasi Keystatic
│   ├── admin.js            # Redirect otomatis dari /admin ke /keystatic
│   └── keystatic/          # Halaman UI Keystatic CMS
├── public/                 # Asset statis & file gambar publik
│   └── images/             # Gambar banner, post, dan favicon
├── keystatic.config.js     # Konfigurasi skema & koleksi Keystatic CMS
└── .env.local              # Konfigurasi Environment Variables lokal
```

---

## 📜 Perintah Utama (Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan lokal di `http://localhost:3000` |
| `npm run build` | Membuat build produksi Next.js yang teroptimasi |
| `npm run start` | Menjalankan server hasil *build* produksi |
| `npm run lint` | Menjalankan linter untuk memeriksa kualitas kode |

---

## ❓ Troubleshooting & FAQ

### 1. Kenapa Muncul Error `The redirect_uri is not associated with this application` saat Login CMS?
- **Penyebab**: **Authorization Callback URL** di pengaturan GitHub App / OAuth App tidak cocok persis dengan URL callback yang dikirim oleh Keystatic.
- **Solusi**: Pastikan **Authorization Callback URL** di pengaturan GitHub App Anda diatur persis menjadi:
  ```text
  https://blog.awd.my.id/api/keystatic/github/oauth/callback
  ```
  *(Pastikan menggunakan `https`, domain `blog.awd.my.id`, dan akhiran `/api/keystatic/github/oauth/callback`)*.

### 2. Kenapa Perubahan Konten di CMS Lokal Tidak Otomatis Push ke GitHub?
- **Penyebab**: Di lokal, `KEYSTATIC_STORAGE_KIND` diatur ke `local` agar bisa bekerja secara *offline* tanpa commit terus-menerus.
- **Solusi**: Jika ingin menguji mode GitHub di lokal, ganti `KEYSTATIC_STORAGE_KIND=github` pada `.env.local` dan pastikan Client ID/Secret sudah diisi.

### 3. Error `404 Not Found` pada API Route Keystatic?
- **Penyebab**: File API route `pages/api/keystatic/[...params].js` belum terkonfigurasi dengan benar.
- **Solusi**: Pastikan handler `@keystatic/next/api` diekspor dengan benar pada file `pages/api/keystatic/[...params].js`.
