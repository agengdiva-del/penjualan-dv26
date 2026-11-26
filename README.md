# DIVA® Cat — PT. Global Warna Indonesia

Aplikasi penjualan produk cat resmi **PT. Global Warna Indonesia** lengkap dengan katalog warna interaktif, simulasi ruangan, dan kalkulator estimasi kebutuhan cat otomatis. Aplikasi ini telah dikonfigurasi dengan **Capacitor Android** dan **GitHub Actions** sehingga siap dikompilasi menjadi file `.apk` Android secara otomatis di GitHub.

## Cara Build File `.apk` Otomatis di GitHub

1. **Push kode ini ke GitHub** (branch `main` atau `master`):
   ```bash
   git init
   git add .
   git commit -m "Setup DIVA Cat Android APK"
   git branch -M main
   git remote add origin https://github.com/<username>/<nama-repo>.git
   git push -u origin main
   ```
2. Buka tab **Actions** di repositori GitHub Anda.
3. Workflow **Build Android APK** akan berjalan otomatis (atau klik **Run workflow** secara manual).
4. Setelah selesai, buka hasil run tersebut lalu download artifact **DIVA-Cat-Android-APK** untuk mendapatkan file **`DIVA-Cat-debug.apk`**.
5. Salin file `.apk` ke HP Android Anda dan instal (aktifkan *Install from Unknown Sources* jika diminta).

> **Opsional (Rilis Tag):** Jika Anda melakukan push tag versi seperti `git tag v1.0.0 && git push origin v1.0.0`, file `DIVA-Cat-debug.apk` juga akan otomatis terlampir di halaman **GitHub Releases**.

> **Opsional (Backend AI Color Matching untuk APK):** Fitur offline (katalog 164 produk cat, katalog warna, keranjang, kalkulator otomatis, simulasi ruangan) berjalan langsung di dalam APK. Jika ingin fitur **AI Color Matching** di Screen 18 juga terhubung ke server Gemini API dari APK, tambahkan Repository Variable `VITE_API_BASE_URL` di **Settings → Secrets and variables → Actions → Variables** GitHub dengan URL server backend Anda.

## Build APK Secara Lokal (Jika Android SDK Terpasang)

```bash
npm install
npm run android:apk
```

File APK hasil build lokal berada di:
`android/app/build/outputs/apk/debug/app-debug.apk`
