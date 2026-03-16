# Context untuk Claude

## 🛠️ Stack Teknologi
- **Framework Utama:** Astro v6 (Pages Router di `src/pages/`)
- **Bahasa:** TypeScript (Strict mode dianjurkan)
- **Styling:** Tailwind CSS v4 (menggunakan vite plugin `@tailwindcss/vite`)
- **Konten:** MDX & Markdown (di-handle lewat Content Collections API)

## 📁 Struktur Direktori & Konvensi
- Komponen UI global (Astro/UI Framework) ada di `src/components/`. Jika menggunakan React/Solid Svelte (non-Astro), gunakan **named export**.
- Layout halaman ada di `src/layouts/`.
- File routing ada di `src/pages/` (termasuk folder dinamis seperti `[slug].astro`).
- **PENTING:** Jangan asal membuat folder `/content`. Semua sumber dokumen konten ada di `src/content/`.

## 🗃️ Content Collections (Data Layer)
*Claude harus merujuk pada skema yang ada di `src/content.config.ts` saat membuat konten baru atau melakukan data fetching:*

1. **Blog (`src/content/blog/`)**
   - Wajib memiliki di *frontmatter*: `title`, `description`, `pubDate`.
   - `category` hanya boleh salah satu dari: `'craft'`, `'notes'`, atau `'family'`.
   - Properti opsional: `tags`, `draft` (boolean), `cover`, `coverAlt`, `updatedDate`.
   - Format file: `.md` atau `.mdx`.

2. **Work / Portfolio (`src/content/work/`)**
   - Wajib memiliki di *frontmatter*: `title`, `description`, `year`.
   - `type` hanya boleh salah satu dari: `'illustration'`, `'commission'`, `'generative'`, atau `'other'`.
   - Properti pendukung lain: `cover`, `coverAlt`, `tags`, `tools` (array of strings), `featured` (boolean), `order` (angka, urut dari yang terkecil), dan `externalUrl`.

## 🎨 Styling & Desain
- Gunakan *utility classes* bawaan Tailwind v4 sebisa mungkin sebelum menulis *custom CSS*.
- **Brand Colors:** Patuhi variabel CSS utama `--color-primary: #1a56db` untuk elemen aksen (tombol, tautan aktif).
- Layout bersifat *mobile-first responsiveness* (`sm:`, `md:`, `lg:` dsb. dari Tailwind).

## ⚠️ Aturan Tambahan (Hal yang tidak perlu diubah)
- Layout utama dan arsitektur file-based routing sudah final, **jangan suggest restrukturisasi arsitektur secara besar-besaran**.
- Saat meng-import collections, gunakan API terbaru Astro: `import { getCollection, getEntry } from 'astro:content';`.
- Untuk *dynamic routing* post tunggal (detail blog/work), gunakan function `export async function getStaticPaths()` yang me-return array object berisikan `{ params, props }`.
