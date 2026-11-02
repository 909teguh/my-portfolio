import fs from 'node:fs';
import { COVER_ROOT, generateThumb, newestCoverPath } from './work-thumbs.mjs';

/**
 * Vite plugin (dev only): membuat ulang thumbnail setiap kali cover diunggah
 * lewat Keystatic ke public/images/work/portfolio/<slug>/cover.*.
 */
export function workThumbsWatcher() {
  return {
    name: 'work-thumbs-watcher',
    apply: 'serve',
    configureServer(server) {
      fs.mkdirSync(COVER_ROOT, { recursive: true });
      const timers = new Map();

      const watcher = fs.watch(COVER_ROOT, { recursive: true }, (_event, filename) => {
        if (!filename) return;

        const relative = filename.toString().replace(/\\/g, '/');
        if (relative.startsWith('thumbs/')) return;

        const match = relative.match(/^([^/]+)\/cover\.(jpe?g|png|webp|avif)$/i);
        if (!match) return;

        const slug = match[1];
        clearTimeout(timers.get(slug));
        timers.set(
          slug,
          setTimeout(async () => {
            const sourcePath = newestCoverPath(slug);
            if (!sourcePath) return;

            try {
              await generateThumb(sourcePath, slug);
              console.log(`[work-thumbs] ${slug}.webp diperbarui`);
              server.ws.send({ type: 'full-reload', path: '*' });
            } catch (error) {
              console.error(`[work-thumbs] gagal membuat thumbnail ${slug}:`, error);
            }
          }, 500)
        );
      });

      server.httpServer?.on('close', () => watcher.close());
    },
  };
}
