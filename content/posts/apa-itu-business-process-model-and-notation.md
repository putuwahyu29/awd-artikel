---
title: Apa itu Business Process Model and Notation
date: 2024-01-08T17:00:00.000Z
image: https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/banner/16.png
categories:
  - BPMN
  - Analisis
---

Business Process Modeling Notation (BPMN) merupakan notasi grafis yang menggambarkan langkah-langkah dalam suatu proses bisnis. BPMN menggambarkan aliran proses bisnis secara end to end. Notasi telah dirancang khusus untuk mengkoordinasikan urutan proses dan pesan yang mengalir antara partisipan proses yang berbeda dalam serangkaian aktivitas terkait.

### Contoh

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar11.png)

### Notasi

#### Event/Peristiwa

Event adalah sesuatu yang “terjadi” selama proses bisnis. Peristiwa tersebut mempengaruhi jalannya proses dan biasanya mempunyai sebab (trigger) atau dampak (akibat).

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar1.png)![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar2.png)

#### Gateway

Gateway digunakan untuk mengontrol divergensi dan konvergensi Sequence Flow. Dengan demikian, ini akan menentukan percabangan dan penggabungan jalur.

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar3.png)

#### Data Object

Data Object dianggap Artefak karena mereka tidak mempunyai dampak langsung terhadap Alur Urutan atau Alur Pesan dari Proses, tetapi mereka memberikan informasi tentang apa kegiatan yang perlu dilakukan dan/atau apa mereka memproduksi.

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar4.png)

#### Activity

Activity adalah istilah umum untuk pekerjaan yang dilakukan perusahaan. Suatu aktivitas dapat bersifat atomik atau non atomik.

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar5.png)

#### Pool

Pool mewakili Peserta dalam suatu Proses. Ia juga bertindak sebagai "swimlane" dan wadah grafis untuk mempartisi serangkaian aktivitas dari Kumpulan lain, biasanya dalam konteks situasi B2B

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar6.png)

#### Lane

Lane adalah sub-partisi di dalam kolam dan akan memanjang sepanjang kolam baik secara vertikal maupun horizontal. Jalur digunakan untuk mengatur dan mengkategorikan kegiatan.

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar7.png)

#### Sequence Flow

Sequence Flow digunakan untuk menunjukkan urutan aktivitas yang akan dilakukan dalam suatu Proses.

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar8.png)

#### Association

Asosiasi digunakan untuk mengaitkan informasi dengan Objek Aliran. Teks dan grafis non-Aliran Objek dapat diasosiasikan dengan Objek Aliran.

![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar9.png)

#### Message Flow

Message Flow digunakan untuk menunjukkan aliran pesan antara dua partisipan yaitu siap mengirim dan menerimanya.

### ![Sedang Memuat](https://res.cloudinary.com/dkb5yr4fe/image/upload/v17066562142/post/16/Gambar10.png)Refrensi

- Li, Q., & Chen, Y. L. (2009). Modeling and Analysis of Enterprise and Information Systems: from requirements to realization. Higher Education Press.
- What is BPMN? (n.d.). Retrieved January 8, 2024, from [https://www.visual-paradigm.com/guide/bpmn/what-is-bpmn/](https://www.visual-paradigm.com/guide/bpmn/what-is-bpmn/)
- Object Management Group Business Process Model and Notation. Retrieved January 8, 2024, from [https://www.bpmn.org/](https://www.bpmn.org/)
