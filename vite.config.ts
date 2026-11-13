import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { DEFAULT_SITE_URL, pages, type PageMeta } from './src/data/seo.ts';

const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = (process.env.SITE_URL ?? (vercel ? `https://${vercel}` : DEFAULT_SITE_URL)).replace(/\/+$/, '');

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function withMeta(html: string, page: PageMeta) {
  const url = `${site}${page.path}`;
  const title = escape(page.title);
  const description = escape(page.description);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${description}`)
    .replace(/(<meta (?:property="og|name="twitter):title" content=")[^"]*/g, `$1${title}`)
    .replace(/(<meta (?:property="og|name="twitter):description" content=")[^"]*/g, `$1${description}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`);
}

/** Writes per-route pages, a sitemap and robots.txt. */
function seo(): Plugin[] {
  let out = 'dist';
  return [
    { name: 'hills-site-url', transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', site) },
    {
      name: 'hills-static-meta',
      apply: 'build',
      configResolved(config) {
        out = config.build.outDir;
      },
      closeBundle() {
        const html = readFileSync(join(out, 'index.html'), 'utf8');
        for (const page of pages.filter((p) => p.path !== '/')) {
          mkdirSync(join(out, page.path), { recursive: true });
          writeFileSync(join(out, page.path, 'index.html'), withMeta(html, page));
        }
        const today = new Date().toISOString().slice(0, 10);
        const urls = pages.map((p) => `  <url><loc>${site}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n');
        writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
        writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
      },
    },
  ];
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/gsap')) return 'gsap';
          if (id.includes('node_modules/react')) return 'react';
          return undefined;
        },
      },
    },
  },
});
