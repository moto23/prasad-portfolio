import { readFile, writeFile } from 'node:fs/promises';

const input = process.argv[2];
if (!input) throw new Error('Pass the verified production URL as the only argument.');
const url = new URL(input);
if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/') {
  throw new Error('Use an HTTPS site origin with no credentials, query, hash, or path.');
}
const origin = url.origin;
const file = new URL('../index.html', import.meta.url);
let html = await readFile(file, 'utf8');
html = html.replace(/\s*<link rel="canonical"[^>]*>/g, '').replace(/\s*<meta property="og:url"[^>]*>/g, '');
html = html.replace('<meta property="og:type" content="website" />', `<meta property="og:type" content="website" />\n    <link rel="canonical" href="${origin}/" />\n    <meta property="og:url" content="${origin}/" />`);
html = html.replace(/(<meta property="og:image" content=")[^"]+/, `$1${origin}/social.png`);
await writeFile(file, html);
await writeFile(new URL('../public/robots.txt', import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(new URL('../public/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`);
console.log(`Production metadata set to ${origin}`);
