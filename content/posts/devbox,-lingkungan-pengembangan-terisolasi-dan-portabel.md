---
title: 'Devbox, lingkungan pengembangan terisolasi dan portabel'
date: 2024-03-27T17:00:00.000Z
image: >-
  https://res.cloudinary.com/dkb5yr4fe/image/upload/v1718280715/banner/20_menxko.png
categories:
  - Laravel
  - Devbox
featured: true
---

Devbox. Portable, Isolated Dev Environments on any Machine. 

Devbox creates isolated, reproducible development environments that run anywhere. No Docker containers or Nix lang required

Itulah slogan ketika pertama kali saya mengenal Devbox (https\://www\.jetpack.io/devbox).

Saya disini ingin berbagi pengalaman saya menggunakan Devbox pada salah satu proyek Laravel saya. 

# Kendala Pengembangan

Untuk proses pengembangan web, saya biasanya menggunakan Laragon di Windows sebagai lingkungan pengembangan saya. Namun secara bawaan hanya tersedia service mysql, Apache http dan redis untuk mendukung proyek saya. Akan tetapi saya membutuhkan service lainnya seperti Mailpit, MinIO, Meilisearch dan Soketi. Solusinya saya mengunduh binary file dan memanfaatkan Procfile milik Laragon.

Selain cara tersebut, saya juga menggunakan Docker dengan bantuan Laravel Sail. Tentu saja itu semua mudah untuk dilakukan. Namun menurut saya menggunakan Docker suatu hal yang berlebih untuk proyek ini.

Alternatif lain yang saya gunakan saat ini yaitu Devbox. Apasih itu Devbox sebenarnya, apakah itu sebagai pengganti Docker atau sejenisnya ?

Menurut saya itu bukanlah pengganti karena secara konsep maupun cara kerjanya pun berbeda.

# Apa itu Devbox

Jadi, Devbox ini melakukan isolasi pada proyek yang digunakan. Ini mungkin mirip dengan venv di Python karena pada dasarnya kegunaannya sama.

Kelebihan dari Devbox ini yaitu kita bisa menyeragamkan versi perangkat lunak yang digunakan dalam pengembangan proyek, tentu saja ini membantu dalam hal kolaborasi maupun hal lainnya.

Sebagai contoh pada proyek saya menggunakan PHP 8.2, saya tidak perlu menginstal atau menggangu versi PHP bawaan atau yang sudah ada. Selain itu juga bisa menjalankan beberapa service sekaligus dengan satu perintah "devbox services up".

Untuk menambahkan Devbox pada proyek kita, dapat dilakukan dengan perintah "devbox init"

Maka akan terdapat 2 file yaitu devbox.json dan devbox.lock. pada file tersebutlah memuat service yang dibutukan pada proyek.

Selanjutnya untuk menambah service dapat dilakukan dengan perintah "devbox add php82". Perintah tersebut akan menambahkan service PHP dan dituliskan pada file devbox.json.

Kemudian, ketikan perintah "devbox shell" untuk mengaktifkan environment devboxnya. Ini lingkungan pengembangan yang terisolasi.

Devbox dapat digunakan tanpa Docker atau pemahaman Nix Lang karena nanti akan ditulis dalam format json. Yang dibutuhkan yaitu Nix Package Manager karena untuk penginstalan paketnya menggunakan itu. Tentu saja Nix Package Manager mendukung Linux dan Darwin.

Untuk mencari paket yang tersedia, dapat dilihat pada https\://www\.nixhub.io 

Sekian dari saya, jika ada koreksi, saran maupun pertanyaan bisa disampaikan pada kolom komentar. Terima kasih.
