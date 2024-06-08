---
title: Mengontrol Home Server dengan Bardi Smart Plug
date: 2023-12-29T16:00:00.000Z
image: 'https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/banner/14.png'
categories:
  - Tailscale
  - Bardi
---

Haloo semuanya, saya sekarang mau berbagi lagi nih mengenai "home server" yang saya gunakan. Untuk saat ini, letak "home server" saya berada di kos Jakarta dan posisi saya sekarang pulang kampung ke lombok karena libur semester awkwk.

Jadi sebelum saya pulang, saya melakukan konfigurasi pada "home server" saya agar bisa tetap diakses. Ada beberapa bahan yang saya beli kemarin yaitu Bardi Smart Plug dan Pendingin Mini PC dari Suncell.

Tujuan saya membeli Bardi Smart Plug untuk menyalakan "Home Server" tersebut karena saya atur ketika terdapat aliran listrik yang masuk, maka "Home server" tersebut akan menyala. Pengaturan tersebut saya mengaturnya lewat BIOS (seharusnya semua perangkat ada). Mekanisme Smart Plug ini yaitu terhubung dengan jaringan di kos secara wireless dan mengakses aplikasi untuk mengontrolnya.

Sebelum saya menggunakan Bardi Smart Plug tersebut, saya sempet mencoba metode Wake On Lan (WOL) namun metode tersebut tidak terlalu efektif bagi perangkat saya dan menemui beberapa kendala. Jadinya saya memutuskan metode yang tadi dan tentu saja lebih sederhana tapi harus membeli perangkat tambahan.

Kemudian saya juga membeli pendingin PC dari Suncell yang 3500 rpm. Saya sebenarnya sudah mengetahui bahwa membeli alat ini tidak begitu efektif untuk menurunkan suhu panas pada "home server " saya terlebih lagi suhu ruangan di Jakarta yang amat panas. Namun saya tetap membelinya karena daripada tidak ada sama sekali. Sumber listrik dari alat ini bersumber dari "home server" nya.

Selanjutnya, saya akan coba membagikan beberapa sistem yang saya gunakan untuk mengontrol "home server" saya yaitu:

1\. Bardi Smart Home. Aplikasi ini saya gunakan untuk menyalakan "Home Server" saya dan memutuskan arus listrik.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657648/post/14/Gambar_WhatsApp_2023-12-30_pukul_09.49.12_74535363.jpg)

2\. Tailscale. Aplikasi ini untuk mengaktifkan VPN pada perangkat saya agar terhubung dengan "Home Server" ketika berada diluar jaringan yang sama.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657645/post/14/Gambar_WhatsApp_2023-12-30_pukul_09.49.11_4acb5a78.jpg)

3\. Termius. Aplikasi SSH yang biasa saya gunakan untuk menjalan perintah "shutdown now" awkwk.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657643/post/14/Gambar_WhatsApp_2023-12-30_pukul_09.49.10_246dc723.jpg)

4\. Proxmox VE Mobile. Aplikasi ini memiliki fitur yang mirip seperti Proxmox VE versi browser.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657642/post/14/Gambar_WhatsApp_2023-12-30_pukul_09.49.10_6f5e3096.jpg)

5\. Grafana. Saya menginstal sistem ini pada "home server" saya untuk memonitor sistem saya melalu web browser saya.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657644/post/14/Gambar_WhatsApp_2023-12-30_pukul_09.49.10_f3871e58.jpg)

Mungkin itu saja yang saya dapat bagikan. Sekian dan terima kasih
