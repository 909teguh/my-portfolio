import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Collection: blog
 * Untuk tulisan / artikel di halaman /blog
 */
const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),

        // Kategori tulisan — pilih salah satu sesuai topik
        // 'craft'   → tentang proses ilustrasi, teknik, tool
        // 'notes'   → refleksi sehari-hari, engineering, hidup
        // 'family'  → catatan sebagai ayah & suami
        category: z.enum(['craft', 'notes', 'family']).default('notes'),

        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),

        // Opsional: gambar cover untuk OG image & header artikel
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
    }),
});

/**
 * Collection: work
 * Untuk karya ilustrasi & proyek di halaman /work
 */
const work = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),

        // Gambar utama karya — diproses oleh Astro Image (path string di v6)
        cover: z.string().optional(),
        coverAlt: z.string().optional(),

        // Jenis karya
        // 'illustration' → karya ilustrasi personal
        // 'commission'   → karya pesanan / klien
        // 'generative'   → coding + seni generatif
        // 'other'        → lainnya
        type: z.enum(['illustration', 'commission', 'generative', 'other']).default('illustration'),

        tags: z.array(z.string()).default([]),
        year: z.number(),

        // Tools yang digunakan, misal: ['Procreate', 'Figma', 'p5.js']
        tools: z.array(z.string()).default([]),

        // Tampilkan di homepage sebagai karya pilihan
        featured: z.boolean().default(false),

        // Urutan tampil di halaman /work (angka kecil = tampil lebih awal)
        order: z.number().default(99),

        // Link eksternal, misal Behance, Instagram post, dll.
        externalUrl: z.string().url().optional(),
    }),
});

export const collections = { blog, work };