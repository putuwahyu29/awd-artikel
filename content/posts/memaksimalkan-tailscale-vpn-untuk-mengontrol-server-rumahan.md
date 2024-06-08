---
title: Memaksimalkan Tailscale VPN untuk mengontrol server rumahan
date: 2023-11-06T17:00:00.000Z
image: 'https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/banner/12.png'
categories:
  - Tailscale
  - Proxmox
featured: true
---

Haloo semuanya, kali ini saya akan membagikan cara untuk mengontrol "home server" dari mana saja dan tanpa domain, tanpa IP publik maupun cloudflare. Tapi disini kita akan menggunakan VPN yaitu Tailscale VPN. Tenang saja, Tailscale VPN ini untuk konfigurasinya sangat mudah.Tailscale dapat diinstal di berbagai macam sistem operasi baik Windows, Mac OS, Linux, Android, IOS dan Synology NAS.Jika belum punya akun Tailscale, kita dapat membuatnya dengan akun Google, Github atau lainnya.

Silahkan instal Tailscale VPN pada perangkat yang ingin anda gunakan untuk mengontrol. Contohnya saya menginstal pada Hp Android saya dan Laptop Windows saya.Setelah diinstal, kemudian login dan aktifkan VPN tersebut.

![](https://res.cloudinary.com/dkb5yr4fe/image/upload/v1706657655/post/13/a40f99b618a364ad3cd747b5ff1dca874c78e647-1920x1033.webp)

Selanjutnya, terdapat 3 skenario yang saya gunakan kali ini pada perangkat home server yang akan dikontrol.

A. Skenario 1 : Tailscale VPN sebagai Subnets

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/dfa5a136b7c17fcbee721e2f249c111e8e149f87-1920x1033.webp)

Tujuannya yaitu agar semua IP yang berada di segmen yang sama diakses dengan Tailscale.Contohnya IP Lokal saya 192.168.0.xxxUntuk memanfaatkan Tailscale sebagai Subnets, kali ini saya akan menggunakan 1 kontainer yang saya buat di Proxmox VE saya.Kemudian, kita akan menginstal Tailscale pada kontainer tersebut dengan cara

1\. Jalankan perintah pada terminal

```bat
curl -fsSL https://tailscale.com/install.sh | sh
```

2\. Kemudian, mulai ulang kontainer yang digunakan.

3\. Jalankan perintah berikut

```bat
sudo tailscale up
```

Kemudian akan muncul tautan untuk login ke akun anda. Pada langkah selanjutnya akan dijelaskan cara melakukan Subnets router. (Panduan lengkap :[https://tailscale.com/kb/1019/subnets/](https://tailscale.com/kb/1019/subnets/))

4\. Selanjutnya jalankan 3 perintah pada terminal

```bat
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
```

```bat
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
```

```bat
sudo sysctl - p / etc / sysctl.d / 99 - tailscale.conf
```

5\. Kemudian jalankan perintah berikut untuk mengkonfigurasi IP yang digunakan

```bat
sudo tailscale up --advertise-routes=192.168.0.0
```

Karena IP saya 192.168.0.xxx maka advertise-routes=192.168.0.06. Selanjutnya aktifkat Subnet routes pada admin console anda.Selamat, anda sudah dapat mengakses seluruh IP lokal anda secara jarak jauh dengan menggunakan Tailscale

B. Skenario 2 : Konfigurasi DNS Lokal Pihole

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/bfacf6ce5e5f29b64f67922c082ec0294ebc82df-1920x1033.webp)Pada Skenario 1, kita sudah dapat mengakses home server kita namun hanya menggunakan IP saja.

Jika kita sudah mengatur DNS Lokal pada pihole, maka langkahnya yaitu

1\. Lakukan instalasi Tailscale pada pihole anda, jalankan perintah pada terminal

```bat
curl -fsSL https://tailscale.com/install.sh | sh
```

2\. Kemudian, mulai ulang kontainer yang digunakan.

3\. Jalankan perintah berikut

```bat
sudo tailscale up
```

Kemudian akan muncul tautan untuk login ke akun anda. Langkah selanjutkan akan mengkonfigurasi pihole

4\. Jalankan perintah pada terminal

```bat
tailscale up --accept-dns=false
```

5\. Kemudian buka admin console dan klik DNS. Pada bagian nameservers silahkan klik Add nameserver lalu custom, kemudian masukkan IP Pihole Tailscale (IP nya 100.x.x.x silahkan sesuaikan)![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/352ab5b40b79600bef098040587d4628433d2c05-1920x1033.webp)![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/da73edacb3287b3dade406dc206a43aa2c8649db-1920x1033.webp)![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/4db0ab96ddf81ccde840461293485ac73f44a381-1920x1033.webp)

6\. Jangan lupa juga untuk disable key expiry

7\. Selanjutnya buka pihole, kemudian settings, kemudian DNS, kemudian klik pada permit all Origins.Selamat, anda sudah dapat menggunakan DNS Lokal anda.

C. Skenario 3 : Tailscale VPN sebagai Exit Node

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/5ee8f0d60b26efbd92f07c76c0e085923876d35b-1920x1033.webp)

Tujuannya yaitu untuk menggunakan DNS milik Tailscale pada perangkat yang akan dibagikan.

Contohnya, saya akan memberikan akses NAS kepada seluruh keluarga saya, tentu saja saya akan membagikan akses untuk NAS saja dan bukan seluruh aplikasi pada home server saya. Dan tentu saja menggunakan akun yang berbeda untuk masuk ke Tailscale.Contoh lainnya jika saya ingin membagikan Ubuntu Server saya yang telah terinstal Remote Lab kepada temen saya.Langkahnya yaitu

Jika Synology NAS, ikuti langkah 1 dan 8 saja

1\. Silahkan bukan Package Center dan instal Tailscale, kemudian masuk dengan akun anda.

Jika Linux

1\. Jalankan perintah pada terminal

```bat
curl -fsSL https://tailscale.com/install.sh | sh
```

2\. Kemudian, mulai ulang kontainer yang digunakan.

3\. Jalankan perintah berikut

```bat
sudo tailscale up
```

Kemudian akan muncul tautan untuk login ke akun anda. Pada langkah selanjutnya akan dijelaskan cara melakukan Subnets router. (Panduan lengkap :[https://tailscale.com/kb/1019/subnets/](https://tailscale.com/kb/1019/subnets/))

4\. Selanjutnya jalankan 3 perintah pada terminal

```bat
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
```

```bat
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
```

```bat
sudo sysctl - p / etc / sysctl.d / 99 - tailscale.conf
```

5\. Selanjutnya jalan perintah pada terminal

```bat
sudo tailscale up --advertise-exit-node
```

6\. Kemudian buka admin console dan pilih perangkat dan aktifkan Exit Node.

7\. Selanjutnya jalankan perintah pada terminal

```bat
sudo tailscale up --exit-node=<exit-node-ip>
```

Gunakan IP Tailscale 100.xxx.xxx.xxx

8\. Kemudian buka admin console lagi kemudian klik share dan klik invite link. Bagikan link tersebut ke orang yang anda ingin beri akses. Selain itu silahkan disable key expiry. Selamat, anda dapat mengakses DNS Lokal Tailscale ts.net. Selain itu dapat juga dengan mengakses IP Tailscale (100.xxx.xxx.xxx)

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/2153e9ad18022191dfe2b6cc5c31c60f573d2d54-1920x1033.webp)![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/97ff9d0047434c63fdeddb18b614d949291b33b5-1920x1033.webp)

Tampilan mengakses web lokal dengan tailscale

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/316214e4766ee637c723c75c05005455ba052c9d-1920x1033.webp)

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/3307c1ef19cb012c2de15cb964590bab11625889-1920x1033.webp)![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/c7b967aca9abc77051da2b552b57a499d2f117e1-1920x1033.webp)![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/12/f79181dc04be3676ebeb3358da24b2be7523364c-1920x1033.webp)
