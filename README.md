# POME QUESTURE — Eco Research Lab

Kemas kini kamera: 1 November 2026. Lihat [keputusan ujian kamera](CAMERA-RELEASE.md).

Permainan pembelajaran POME dan pemulihan sungai untuk murid sekolah menengah.

**Main:** https://wriizo212.github.io/pome-questure/

## Mula bermain

1. Pilih English atau Bahasa Melayu pada bar atas.
2. Tekan mula misi untuk mengikuti lima penyiasatan: kenali POME, sungai tercemar, bina sistem, kendalikan loji dan pemulihan sungai.
3. Teroka Eco Lab dan Makmal 3D untuk kawalan pam, injap, pengudaraan, keratan model, pemerhatian A/B dan laporan.
4. Tetikus, sentuhan dan papan kekunci tersedia. Kamera ialah pilihan dan tidak dimulakan secara automatik.
5. Aktiviti, nota dan kuiz terdahulu kekal tersedia dalam bahagian aktiviti tambahan.

Kemajuan disimpan pada pelayar/peranti ini. Tiada akaun murid diperlukan untuk lima misi penyiasatan. Rekod kemajuan tidak disegerakkan kepada guru atau peranti lain.

## Kamera dan grafik

Gunakan pautan HTTPS di atas, bukan fail HTML dalam WhatsApp. Benarkan kamera hanya jika mahu menggunakan gesture. Akses kamera dan prestasi sebenar bergantung pada peranti, pelayar dan kebenaran pengguna; sentuhan/tetikus masih tersedia jika kamera gagal.

Grafik Auto memilih tetapan berdasarkan peranti. Low mengurangkan beban; muat semula selepas menukar tahap grafik untuk menukar geometri peralatan yang telah dimuatkan. Tetapan kadar bingkai berasingan daripada tahap grafik. Kamera fizikal Android/iOS belum disahkan oleh ujian automatik komputer.

## Skop pembelajaran

Model loji dan nilai operasi ialah ilustrasi pembelajaran, bukan ukuran loji sebenar, pengesahan pematuhan atau bukti keselamatan air minuman. BOD ialah permintaan oksigen biokimia; DO ialah oksigen terlarut yang tersedia. Rawatan dan pemulihan ekosistem memerlukan masa. Aktiviti lama Bahasa Melayu dikekalkan; terjemahan seluruh kandungan lama tidak didakwa lengkap.

## Pakej hos

`index.html`, `assets/` dan lesen berkaitan perlu dihos bersama. Jangan kongsi `index.html` sahaja. CSS telah disediakan dalam pakej; fon, ikon dan model pengesanan kamera masih memerlukan sambungan internet. `build-manifest.json` mengenal pasti aset keluaran. Alamat fail HTML lama menghala ke laman utama terkini.

Lihat `RELEASE-VALIDATION.md` untuk keputusan ujian dan batas pengesahan keluaran.

## Kursor kamera dan dua tangan

- Pengesanan MediaPipe berjalan dalam Web Worker apabila disokong supaya kerja AI tidak menyekat paparan. Pelayar tanpa sokongan menggunakan mod keserasian yang lebih perlahan.
- Hanya satu bingkai AI diproses pada satu masa; bingkai tidak beratur sehingga gerakan menjadi lewat. Model wajah dimuatkan apabila diperlukan.
- Kursor dilukis pada sasaran 60 FPS. Kadar pengesanan AI (Hz) dipaparkan berasingan; ini bukan 60 inferens AI sesaat.
- Buka tapak tangan seketika untuk bersedia. Gunakan mana-mana tangan untuk menunjuk, cubit untuk memilih atau menyeret pelaras/injap, dan lepaskan jari selepas tindakan. Kehilangan penjejakan membatalkan pegangan.
- Dalam adegan pembelajaran 3D: dua tapak tangan terbuka atau dua cubitan mengawal zum; gerakkan kedua-dua tangan bersama untuk memutar. Dua jari (telunjuk + tengah) juga boleh memutar pandangan.
- Stage 3 mengekalkan zum dua tangan dan padanan cubit. Dalam mod jawapan jari kuiz (kursor dimatikan), 1–4 jari memilih jawapan dan 5 jari meneruskan soalan. Ibu jari dikira; gabungan jari yang berbeza disokong.
- Rangka kedua-dua tangan muncul pada pratonton kecil. Tangan utama dikekalkan apabila susunan hasil pengesanan bertukar.

Prestasi semua telefon/tablet tidak boleh dijamin. Rujuk `CAMERA-RELEASE.md` untuk ukuran tepat, perkakasan ujian dan batas kamera fizikal.
