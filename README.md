# 🚀 Awd Artikel - Blog & Keystatic CMS

Awd Artikel adalah aplikasi web blog modern berbasis **Next.js**, **Tailwind CSS**, dan **Keystatic CMS** untuk pengelolaan konten tanpa database (*Git-based CMS*).

---

## 🛠️ Fitur Utama
- **Keystatic CMS**: Pengelolaan konten visual dari browser melalui halaman admin (`/admin` atau `/keystatic`).
- **Mode Lokal & GitHub OAuth**: Pengeditan lokal di lingkungan *development* dan otomatis *commit & push* langsung ke GitHub saat di *production*.
- **UI/UX Premium**: Desain responsif, kartu artikel presisi, drawer menu seluler *glassmorphism*, serta dukungan *Light & Dark Mode*.
- **SEO & RSS**: Dilengkapi generator sitemap otomatis dan feed RSS.

---

## 💻 Panduan Pengembangan Lokal (Local Development)

### 1. Prasyarat
- Node.js versi 18 atau lebih baru.
- npm / yarn / pnpm.

### 2. Instalasi
```bash
# Clone repositori
git clone https://github.com/putuwahyu29/awd-artikel.git
cd awd-artikel

# Install dependensi
npm install
```

### 3. Konfigurasi `.env.local` untuk Lokal
Buat atau salin file `.env.local` di folder utama proyek:

```env
BASE_URL=http://localhost:3000
KEYSTATIC_STORAGE_KIND=local
```

### 4. Jalankan Server Dev
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda. Halaman Keystatic CMS lokal dapat diakses di [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 🌐 Panduan Konfigurasi Production (GitHub OAuth CMS)

Ketika website di-deploy ke **Vercel** atau platform hosting lainnya, Keystatic CMS menggunakan **GitHub OAuth App** untuk mengamankan login dan melakukan commit perubahan artikel secara langsung ke repositori GitHub.

### Langkah 1: Membuat GitHub OAuth App
1. Buka [GitHub Developer Settings -> OAuth Apps](https://github.com/settings/applications/new).
2. Isi formulir pendaftaran:
   - **Application name**: `Awd Artikel CMS`
   - **Homepage URL**: `https://awd.my.id` *(Ganti dengan domain website production Anda)*
   - **Authorization callback URL**: `https://awd.my.id/api/keystatic/github/created-app`
3. Klik **Register application**.
4. Salin **Client ID**.
5. Klik **Generate a new client secret** dan salin **Client Secret**.

---

### Langkah 2: Menambahkan Environment Variables di Vercel / Server

Tambahkan variabel lingkungan (*Environment Variables*) berikut pada dasbor platform hosting Anda (misalnya **Vercel -> Project Settings -> Environment Variables**):

| Nama Variabel (*Key*) | Contoh Nilai (*Value*) | Deskripsi |
| :--- | :--- | :--- |
| `BASE_URL` | `https://awd.my.id` | Domain utama publik website Anda |
| `KEYSTATIC_STORAGE_KIND` | `github` | Mengaktifkan mode integrasi GitHub di Production |
| `KEYSTATIC_GITHUB_CLIENT_ID` | `Iv1.1234567890abcdef` | Client ID dari GitHub OAuth App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | `1234567890abcdef1234567890abcdef` | Client Secret dari GitHub OAuth App |
| `KEYSTATIC_SECRET` | `string_acak_rahasia_panjang_123` | String acak untuk enkripsi sesi login CMS |
| `NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER` | `putuwahyu29` | Username pemilik repositori GitHub |
| `NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG` | `awd-artikel` | Nama repositori GitHub |

---

## 📁 Struktur Direktori Penting
- `content/posts/` : Berisi file artikel markdown & metadata YAML.
- `content/config/` : Berisi konfigurasi situs, menu navigasi, dan profil penulis.
- `public/images/` : Penyimpanan media & gambar thumbnail artikel.
- `pages/admin.js` : Server-side redirect otomatis dari `/admin` ke `/keystatic`.
- `keystatic.config.js` : Konfigurasi skema koleksi, bidang gambar, dan menu navigasi Keystatic CMS.

---

## 📜 Perintah Utama (Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan lokal di `http://localhost:3000` |
| `npm run build` | Membuat *build* produksi teroptimasi dan menghasilkan static pages |
| `npm run start` | Menjalankan server produksi dari hasil *build* |
