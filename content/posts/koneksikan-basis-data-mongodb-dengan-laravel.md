---
title: Koneksikan Basis Data MongoDB dengan Laravel
date: 2024-01-27T16:00:00.000Z
image: https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/banner/18.png
categories:
  - MongoDB
  - Laravel
draft: false
---

Salah satu keunggulan Laravel adalah kemampuannya untuk berintegrasi dengan berbagai jenis basis data, termasuk MongoDB. Dukungan resmi untuk MongoDB di Laravel disediakan melalui paket mongodb/laravel-mongodb, yang merupakan perluasan dari Eloquent, ORM bawaan Laravel.

Paket mongodb/laravel-mongodb memungkinkan pengembang Laravel untuk menggunakan MongoDB sebagai basis data untuk aplikasi mereka dengan mudah. Dengan menggunakan paket ini, pengembang dapat memanfaatkan kekuatan dan fleksibilitas MongoDB dalam membangun aplikasi yang skalabel dan performa tinggi.

### Instalasi MongoDB di Windows

Untuk menggunakan MongoDB di sistem operasi Windows, saya menyarankan Anda untuk menggunakan [Laragon](https://laragon.org/ "Laragon") sebagai lingkungan pengembangan pada perangkat Anda.

![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/18/Cuplikan layar 2024-01-28 172523.png>)

### Aktivasi MongoDB PHP Driver di Windows

1. Silahkan unduh driver dan sesuaikan pada versi PHP yang digunakan pada tautan berikut [https://github.com/mongodb/mongo-php-driver/releases/ ](https://github.com/mongodb/mongo-php-driver/releases/)
2. Kemudian ekstrak file yang sudah diunduh dan silahkan salin file php_mongodb.dll ke direktori ekstensi php. Contohnya terletak pada C:\laragon\bin\php\php-8.2.3-nts-Win32-vs16-x64\ext. Jika menggunakan Laragon, untuk masuk ke direktori ekstensi dapat dilakukan dengan cara seperti berikut :![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/18/Cuplikan layar 2024-01-28 172130.png>)
3. Kemudian tambahkan baris berikut extension=php_mongodb.dll ke file php.ini untuk setiap lingkungan yang perlu menggunakan driver. Jika menggunakan Laragon, untuk mengaktifkan ekstensi mongodb dapat dilakukan dengan cara seperti berikut :![Sedang Memuat](<https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/18/Cuplikan layar 2024-01-28 172204.png>)

### Konfigurasi MongoDB di Proyek Laravel

Instalasi paket MongoDB dengan menggunakan Composer

```bat
composer require mongodb/laravel-mongodb
```

Tambahkan Service Provider pada file config/app.php

```php
'providers' => [
  // ...
  MongoDB\Laravel\MongoDBServiceProvider:: class,
],
```

Tambahkan koneksi MongoDB ke config/database.php:

```php
'connections' => [
    'mongodb' => [
        'driver' => 'mongodb',
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => env('DB_PORT', '27017'),
        'database' => env('DB_DATABASE', 'forge'),
        'username' => env('DB_USERNAME', 'forge'),
        'password' => env('DB_PASSWORD', ''),
        'options' => [
            'appname' => 'forge',
        ],
    ],
],
```

Terakhir, silahkan atur file .env atau environment variable :

```
DB_CONNECTION=mongodb
DB_HOST=127.0.0.1
DB_PORT=27017
DB_DATABASE=forge
DB_USERNAME=root
DB_PASSWORD=
```
