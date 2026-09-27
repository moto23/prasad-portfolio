import { readFile } from 'node:fs/promises';

const content = await readFile(new URL('../src/data/content.ts', import.meta.url), 'utf8');
const urls = [...new Set([...content.matchAll(/"(https:\/\/[^"\s]+)"/g)].map((match) => match[1]))];
for (const url of urls) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(30000),
      headers: { 'User-Agent': 'Portfolio-Link-Check/1.0' },
    });
    console.log(`${response.status} ${url}`);
    await response.body?.cancel();
  } catch {
    console.log(`UNVERIFIED ${url} (request failed or timed out)`);
  }
}
