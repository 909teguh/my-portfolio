// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import keystatic from '@keystatic/astro';
import { workThumbsWatcher } from './scripts/work-thumbs-watcher.mjs';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://yourdomain.com', // ganti dengan domain Anda
  vite: {
    plugins: [tailwindcss(), workThumbsWatcher()]
  },
  integrations: [mdx(), react(), sitemap(), keystatic()],
});