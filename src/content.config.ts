import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Collection: blog
 * Mendukung empat format post:
 *   'long'   → artikel panjang (default sebelumnya)
 *   'quote'  → kutipan pendek dengan atribusi
 *   'image'  → gambar utama + caption + komentar singkat
 *   'link'   → link eksternal + komentar singkat
 */
const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),

        // Jenis post — menentukan cara render di feed maupun detail page
        postType: z.enum(['long', 'quote', 'image', 'link', 'short']).default('long'),

        // Kategori tulisan
        category: z.enum(['craft', 'notes', 'family']).default('notes'),

        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),

        // ── Field khusus postType: 'quote' ──
        // Isi kutipan ada di body MDX, field ini untuk atribusi
        quoteAttribution: z.string().optional(), // mis. "Austin Kleon"
        quoteSource: z.string().optional(),      // mis. "Steal Like an Artist"

        // ── Field khusus postType: 'image' ──
        image: z.string().optional(),
        imageAlt: z.string().optional(),
        imageCaption: z.string().optional(),

        // ── Field khusus postType: 'link' ──
        linkUrl: z.string().url().optional(),
        linkDomain: z.string().optional(), // mis. "medium.com" — opsional, bisa dihitung otomatis

        // ── Field untuk 'long' post (sama seperti sebelumnya) ──
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
    }),
});

/**
 * Collection: work
 */
const work = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        type: z.enum(['illustration', 'commission', 'generative', 'other']).default('illustration'),
        tags: z.array(z.string()).default([]),
        year: z.number(),
        tools: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        order: z.number().default(99),
        externalUrl: z.string().url().optional(),
    }),
});

/**
 * Collection: now
 */
const now = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/now' }),
    schema: z.object({
        lastUpdated: z.coerce.date(),
        projects: z.array(
            z.object({
                title: z.string(),
                desc: z.string(),
                status: z.enum(['aktif', 'pelan-pelan']).default('aktif'),
            })
        ).default([]),
        focus: z.array(
            z.object({
                area: z.string(),
                desc: z.string(),
            })
        ).default([]),
    }),
});

export const collections = { blog, work, now };
