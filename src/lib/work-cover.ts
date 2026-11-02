import type { CollectionEntry } from 'astro:content';

/**
 * URL thumbnail untuk gallery. File thumbnail dibuat otomatis oleh
 * `scripts/generate-work-thumbs.mjs` / watcher di `scripts/work-thumbs-watcher.mjs`.
 */
export function workThumb(entry: CollectionEntry<'work'>): string {
  const cover = entry.data.cover;
  if (!cover) return '';

  // Kompatibilitas kalau cover sudah menunjuk langsung ke thumbnail.
  if (cover.includes('/thumbs/')) return cover;

  return `/images/work/portfolio/thumbs/${entry.id}.webp`;
}
