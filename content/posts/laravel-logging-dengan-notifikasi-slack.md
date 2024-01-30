---
title: Laravel Logging dengan Notifikasi Slack
date: 2024-01-28T16:00:00.000Z
image: https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/banner/19.png
categories:
  - Slack
  - Laravel
---

Laravel Logging adalah fitur yang disediakan oleh framework Laravel untuk mencatat aktivitas atau peristiwa yang terjadi dalam aplikasi. Logging ini berguna untuk memantau dan menganalisis apa yang terjadi di dalam aplikasi, termasuk pesan error, informasi debugging, atau kejadian penting lainnya. Dengan menggunakan Laravel Logging, pengembang dapat dengan mudah melacak dan memahami apa yang terjadi di dalam aplikasi mereka.
Salah satu cara untuk memanfaatkan Laravel Logging adalah dengan mengintegrasikannya dengan Slack. Slack adalah platform komunikasi yang populer di kalangan tim pengembang dan bisnis. Dengan menghubungkan Laravel Logging ke Slack, pengembang dapat menerima notifikasi langsung di Slack ketika terjadi peristiwa penting dalam aplikasi.

### Konfigurasi Slack Webhook URL

1. Buatlah channel pada akun Slack Anda. Sebagai contoh, nama channelnya adalah laravel-log-notification ![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/19/Cuplikan layar 2024-01-29 184104.png>)
2. Kemudian buku website [Slack API](https://api.slack.com/apps) lalu klik tombol Create New App dan pilih From Scratch ![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/19/Cuplikan layar 2024-01-29 184449.png>)![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/19/Cuplikan layar 2024-01-29 184508.png>)
3. Selanjutnya isikan App Name lalu pilih workspace Slack Anda dan klik Create App![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/19/Cuplikan layar 2024-01-29 184535.png>)
4. Kemudian pada sidebar Slack API pilih Incoming Webhooks dan aktifkan![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/19/Cuplikan layar 2024-01-29 184932.png>)
5. Setelah diaktifkan, klik Add New Webhook to Workspace dan pilih channel yang sudah dibuat sebelumnya![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/19/Cuplikan layar 2024-01-29 184955.png>)![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/19/Cuplikan layar 2024-01-29 185021.png>)
6. Pembuatan Webhook sudah selesai, kemudian simpan Webhook URL tersebut dan nanti akan digunakan pada aplikasi Laravel![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/19/Cuplikan layar 2024-01-29 185047.png>)

### Konfigurasi Laravel Logging Slack

Buka file .env pada aplikasi Laravel Anda dan sesuaikan pengaturan log dengan berikut

```
LOG_CHANNEL = slack
LOG_DEPRECATIONS_CHANNEL = null
LOG_LEVEL = debug
LOG_SLACK_WEBHOOK_URL = https://hooks.slack.com/services/WEBHOOKURLANDA
```

Untuk memastikan Laravel Logging Slack sudah berhasil, sliahkan buat method get baru pada file routes/web.phpseperti berikut

```php
Route::get('/send-slack-notification', function () {
    Log::error('Something went wrong!');
});
```

Selanjutnya buka tautan tersebut pada peramban dan lakukan pengecekan pada aplikasi Slack channel laravel-log-notification. Selamat Anda sudah berhasil menggunakan Slack sebagai Laravel Logging
