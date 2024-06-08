---
title: Home Server Proxmox VE Terbaru
date: 2023-10-31T17:00:00.000Z
image: 'https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/banner/11.png'
categories:
  - Hypervisor
  - Proxmox
featured: true
---

Halooo semuanya, kali ini saya ingin membagikan lagi mengenai "Home Server" yang saya miliki.

Untuk perangkatnya, saya menggunakan Dell Optiplex 3060 dengan spesifikasi

* Intel Core i7 8700
* Ram 16 GB Dual Channel
* Penyimpanan 256 GB NVME dan 500 GB HDD

Kemudian saya menggunakan Tenda N301 sebagai router yang disambungkan ke mini PC tersebut.

Saat pertama kali digunakan, saya menggunakan Proxmox VE 7.4 sebagai Hypervisornya. Saya sempat membandingkan dengan VMware ESXi namun saya rasa Proxmox lah lebih unggul. Kemudian saya tidak menggunakan Proxmox 8 karena terdapat bug pada perangkat saya.

Selanjutnya, disini terdapat 7 container dan 3 VM yang saya akan jelaskan kan sebagai berikut :

A. Kontainer

1\. Pihole saya gunakan untuk Lokal DNS agar bisa diakses menggunakan domain.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657788/post/12/397231686_2400324750154027_1258061231073910181_n.jpg)

2\. Cloudflare saya gunakan untuk tunneling agar beberapa web bisa diakses sebagai publik.

3\. Tailscale saya gunakan untuk VPN dibeberapa perangkat saya. Konfigurasi tailscale juga lumayan mudah dan terdapat Magic DNS juga.

4\. Homarr saya gunakan untuk dasbor semua aplikasi yang tersedia pada server.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657726/post/12/397143079_2400324950154007_548556195420260124_n.jpg)

5\. Uptime Kuma saya gunakan untuk monitoring web yang saja jadikan publik.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657743/post/12/397186578_2400324886820680_6027108955856399335_n.jpg)

6\. Apache Guacamole saya gunakan sebagai remote access ke rdp maupun ssh yang dimiliki. 

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657743/post/12/397194906_2400324933487342_3902296092300133529_n.jpg)

7\. Pialert saya gunakan untuk melihat perangkat yang terkoneksi.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657739/post/12/397172139_2400324900154012_7688363395989397797_n.jpg)

B. Mesin Virtual

1\. Synology NAS saya gunakan untuk mencadangkan beberapa fail pada komputer.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657738/post/12/397165744_2400324690154033_3256370809224219205_n.jpg)

2\. Cloud Panel yang terinstal di Ubuntu Server 22.04 saya gunakan untuk mempermudah hosting beberapa website yang saya memiliki.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657791/post/12/398731700_2400324923487343_3456076794900333097_n.jpg)

3\. Windows 11 saya gunakan untuk mencoba coba beberapa fitur terbaru, selain itu agar bisa diremote.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657743/post/12/397194906_2400324933487342_3902296092300133529_n.jpg)
