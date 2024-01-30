---
title: Atasi error lvmid not found pada Proxmox VE
date: 2023-07-12T17:00:00.000Z
image: https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/banner/13.png
categories:
  - Error
  - Proxmox
draft: false
---

Halo semuanya, kali ini saya mau berbagi mengenai error yang saya alami pada Proxmox VE. Error ini muncul ketika saya ingin menghapus virtual mesin yang sudah tidak terpakai. Errornya seperti diatas. Menurut beberapa sumber, eror tersebut terjadi karena adanya bug pada sistem.

1. Buat bootable yang mendukung LVM seperti [grml](https://grml.org/)
2. Setelah booting, masuk ke terminal dan ketikkan \`vgscan\`. Maka akan muncul output \`pve\`
3. Kemudian, buat 4MB logical volume dengan nama \`grubtemp\` pada \`pve\` dengan cara \`lvecreate -L 4M -n grubtemp\`
4. Selanjutnya silahkan restart dengan menekan tombol \`Ctrl + Alt + Del\` dan masuk kembali ke Proxmox VE anda.
5. Jika sudah masuk, silahkan hapus \`grubtemp\` dengan cara \`lvremove pve/grubtemp\`
