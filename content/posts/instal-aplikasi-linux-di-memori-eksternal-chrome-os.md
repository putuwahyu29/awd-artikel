---
title: Instal Aplikasi Linux di memori eksternal Chrome OS
date: 2022-05-30T17:00:00.000Z
image: https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/banner/4.png
categories:
  - Linux
  - Chrome OS
featured: true
---

Halooo semuanya, saya kali ini akan membagikan tips menginstall aplikasi linux di memori eksternal chrome os (bisa sd card, flashdisk maupun hdd eksternal). Dalam tutorial ini saya menggunakan laptop Samsung Chromebook 4.

Baik, tanpa berlama lama langsung kita praktikan.

Yang harus dipersiapkan :
1\. File Manager Linux
Kegunaan file manager disini yaitu untuk memudahkan membuka semua file system linux yang ada di Chrome OS. Untuk file managernya saya sarankan menggunakan pcmanfm karena software ini berukuran kecil dan tentu saja ringan. [PCMan File Manager](http://ftp.de.debian.org/debian/pool/main/p/pcmanfm/pcmanfm_1.3.1-1_amd64.deb)

Untuk cara installnya ini seperti biasa ya tinggal klik dua kali lalu install. Alternatif install bisa menggunakan terminal dengan perintah sudo dpkg -i packagename.deb

2\. App Image Launcher
Kegunaan App Image Launcher ini yaitu memunculkan opsi langsung membuka aplikasinya melalui file manager chrome os ataupun laucher pada chrome os itu sendiri. [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher/releases/download/v2.2.0/appimagelauncher_2.2.0-travis995.0f91801.bionic_amd64.deb)

Untuk cara installnya ini seperti biasa ya tinggal klik dua kali lalu install. Namun Ketika saya menginstalnya akan terdapat error. Error tersebut dapat diabaikan saja. Alternatif install bisa menggunakan terminal dengan perintah sudo dpkg -i packagename.deb

3\. Aplikasi yang ingin diinstal berformat App Image.

Tentu saja kita harus mencari aplikasi yang ingin kita install dengan format App Image. Untuk mengunduh beberapa file App Image dapat mencarinya di website [App Image Hub](https://www.appimagehub.com/) atau bisa langsung mengunduh di website resmi aplikasi yang bersangkutan. Sebagai contoh saya akan menginstall [Kdenlive](https://kdenlive.org/en/download) lalu unduh AppImage. Selain itu juga saya menginstall [Krita](https://krita.org/en/download/krita-desktop) dan [Inkscape](https://inkscape.org/release/inkscape-1.2). Terdapat juga aplikasi popular seperti [LibreOffice](https://www.libreoffice.org/download/appimage). Sesuaikan dengan kebutuhan ya aplikasi yang ingin diinstal.

Langkah-langkah :

1\. Pastikan memori eksternal anda sudah terhubung ke perangkat chromebook anda. Saya kali ini menggunakan micro sd sandisk berukuran 32GB. Saya merekomendasikan menggunakan micro sd demi kepraktisan karna bisa didiamkan saja di perangkat chromebook kita. Micro sd yang digunakan juga tanpa ketentuan tapi disarakan keceptan baca tulis lebih tinggi.

2\. Selanjutnya silahkan periksa sisa kapasitas yang tersedia di linuxnya. Hal ini dilakukan untuk memastikan bahwa aplikasi linux berformat App Image sudah benar benar terinstal di memori eksternal dan bukan memori internal.![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/4/8cff4b5a2d9efee31f74aad897bf6196922a94e5-4608x3456.webp)

3\. Kemudian letakkan App Image yang telah diunduh tadi di memori eksternal. Disini saya membuat folder baru yang Linux App untuk menyimpan semua file App Image. Nama folder ini juga bebas ya yang penting memudahkan mengingatnya.![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/4/2263760d3d6277ce95693ecf3431792223f523a5-1366x768.webp)![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/4/e59d5e863f71d6c6e4c0b33ff3284bc6731c00c0-1366x768.webp)

4\. Berikutnya silahkan buka file manager pcmanfm dari launcher chrome os. Nama aplikasinya yaitu Manajer Berkas PCManFM.![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/4/9fa319b107a3f92bdd0ac7f4bed53f9d17b8a9b7-1366x768.webp)

5\. Setelah membuka file managernya, maka selanjutnya kita akan mencari direktori memori eksternal kita. Biasanya terletak di

```bat
/mnt/chromeos/removable/NAMASDCARD/NAMAFOLDER.
```

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/4/a152a5644ec38f59d811c3e13bd26935cf8633b5-1366x768.webp)![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/4/8f5b689b0b26d9cc75bce6af9ea797a1974abbdc-1366x768.webp)![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/4/3dec696d4bc1260e3d127bbb5988e57f089a01e9-1366x768.webp)![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/4/9c03d90a9881f66225e7e607d9ad9a1af4542830-1366x768.webp)![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/4/7c1008dfb154be9ab697fb72787d7c9e4573ffad-1366x768.webp)![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/4/f593a10a10be5ea9f220e8c69d9a6e9195a13a5f-1366x768.webp)

6\. Jika sudah melihat file App Image tadi, silahkan klik dua kali filenya kemudian klik Excetue. Sampai disini sebenarnya kita sudah berhasil menginstal file App Image di perangkat chromebook kita.

![](/images/post/cd63f110639bebff78739ece3cf3e03f8baf5ef1-1366x768.webp)

7\. Untuk memudahkan menjalankan aplikasi, silahkan ganti ke pilihan Places lalu buka folder Applications kemudian folder Accessories. Jika sudah berhasil menemukan file Bernama AppImageLauncher Settings silahkan klik dua kali lalu dibagian Location silahkan diubah sesuai letak file App Image tadi yaitu di \`

```bat
mnt/chromeos/removable/NAMASDCARD/NAMAFOLDER
```

![](/images/post/d11d2763edf7edbce203517366c58760f4d82f37-1366x768.webp)![](/images/post/9b3c49de0e00bf60e7e3036394e23f8a53fe3667-1366x768.webp)![](/images/post/344a50693c0174bf6b7814bbdd76ba6ef20f239f-1366x768.webp)![](/images/post/47f964e453bfea0b3ce736455133b3f6a650967d-1366x768.webp)8. Jika sudah, silahkan tutup Aplikasi File Manager PCManFM nya dan kemudian buka file manager chrome os dan menuju ke file App Image tadi. Kemudian klik dua kali dan pilih integrate dan run jika muncul pilihan lagi.

![](/images/post/24a62ade160c7e2d5e4182984397baa6a7607b64-4608x3456.webp)

9\. Silahkan tunggu aplikasi terbuka dan cek di launcher ikon aplikasinya. Jika sudah ada maka kita sudah berhasil menginstal aplikasi linux berupa file App Image di memori eksternal kita.

![](/images/post/02dada9475f5219f0da40a2355f3746d3fd311f6-4608x3456.webp)
