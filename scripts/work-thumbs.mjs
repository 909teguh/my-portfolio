import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

export const ROOT = process.cwd();
export const PUBLIC_DIR = path.join(ROOT, 'public');
export const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'work');
export const COVER_ROOT = path.join(PUBLIC_DIR, 'images', 'work', 'portfolio');
export const THUMB_DIR = path.join(COVER_ROOT, 'thumbs');

const THUMB_MAX = 900;

export function publicPathToFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]).replace(/^\/+/, '');
  return path.join(PUBLIC_DIR, clean);
}

export function thumbPathForSlug(slug) {
  return path.join(THUMB_DIR, `${slug}.webp`);
}

export function thumbUrlForSlug(slug) {
  return `/images/work/portfolio/thumbs/${slug}.webp`;
}

export async function generateThumb(sourcePath, slug) {
  fs.mkdirSync(THUMB_DIR, { recursive: true });
  await sharp(sourcePath)
    .rotate()
    .resize({ width: THUMB_MAX, height: THUMB_MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(thumbPathForSlug(slug));
}

export function readFrontmatterValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return '';
  return match[1].trim().replace(/^["']|["']$/g, '');
}

export function listWorkEntries() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const frontmatter = match ? match[1] : '';
      return {
        slug: path.basename(file, '.mdx'),
        file,
        cover: readFrontmatterValue(frontmatter, 'cover'),
      };
    });
}

export async function generateAllWorkThumbs() {
  const entries = listWorkEntries();
  let generated = 0;
  let skipped = 0;

  for (const entry of entries) {
    if (!entry.cover) {
      console.warn(`[work-thumbs] cover kosong: ${entry.file}`);
      skipped++;
      continue;
    }

    const sourcePath = publicPathToFile(entry.cover);
    if (!fs.existsSync(sourcePath)) {
      console.warn(`[work-thumbs] file tidak ditemukan: ${entry.file} -> ${sourcePath}`);
      skipped++;
      continue;
    }

    await generateThumb(sourcePath, entry.slug);
    generated++;
    console.log(`[work-thumbs] ${entry.slug}.webp`);
  }

  console.log(`\n[work-thumbs] ${generated} thumbnail dibuat, ${skipped} dilewati.`);
}

export function newestCoverPath(slug) {
  const dir = path.join(COVER_ROOT, slug);
  if (!fs.existsSync(dir)) return null;

  const files = fs
    .readdirSync(dir)
    .filter((file) => /^cover\.(jpe?g|png|webp|avif)$/i.test(file))
    .map((file) => {
      const filePath = path.join(dir, file);
      return { filePath, mtime: fs.statSync(filePath).mtimeMs };
    })
    .sort((a, b) => b.mtime - a.mtime);

  return files[0]?.filePath ?? null;
}
