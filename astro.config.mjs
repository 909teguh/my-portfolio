// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

import keystatic from '@keystatic/astro';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'middleware' }),
  site: 'https://yourdomain.com', // ganti dengan domain Anda
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx(), react(), sitemap(), keystatic()],
});