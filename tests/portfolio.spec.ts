import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const sections = ['home', 'work', 'about', 'skills', 'experience', 'education', 'achievements', 'contact'];
for (const width of [375, 768, 1024, 1440]) {
  for (const theme of ['dark', 'light']) {
    test(`${width}px ${theme}: layout, content, assets, accessibility`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addInitScript((value) => localStorage.setItem('pn-theme', value), theme);
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      const response = await page.goto('/');
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle('Prasad Nathe — Software Engineer');
      await expect(page.locator('h1')).toHaveText('Prasad Nathe');
      for (const id of sections) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      }
      await expect(page.getByText('CGPA 8.57 / 10')).toBeVisible();
      await expect(page.getByRole('heading', { name: '1st Runner-Up' })).toBeVisible();
      const images = await page.locator('img').evaluateAll((nodes) => nodes.every((node) => node.complete && node.naturalWidth > 0));
      expect(images).toBe(true);
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(accessibility.violations).toEqual([]);
      expect(errors).toEqual([]);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
      await page.screenshot({ path: `test-results/hero-${width}-${theme}.png` });
      await page.locator('#work').evaluate((element) => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await page.screenshot({ path: `test-results/work-${width}-${theme}.png` });
      await page.screenshot({ path: `test-results/portfolio-${width}-${theme}.png`, fullPage: true });
    });
  }
}

test('theme persists, primary links and active navigation work', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await page.reload();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('link', { name: 'Selected work' }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole('navigation', { name: 'Primary', exact: true }).getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('aria-current', 'location');
  const links = [
    ['GitHub', 'https://github.com/moto23/'],
    ['LinkedIn', 'https://www.linkedin.com/in/prasad-nathe-b91a15227/'],
    ['LeetCode profile', 'https://leetcode.com/u/prasadnathe17/'],
    ['Email', 'mailto:prasadnathe2018@gmail.com'],
    ['KnightForge Sahayak live site', 'https://knight-forge-sahayak.vercel.app/'],
    ['KnightForge Sahayak source code', 'https://github.com/moto23/KnightForge-Sahayak'],
    ['DevDynamics Dashboard live site', 'https://devdynamics-frontend.onrender.com/'],
    ['DevDynamics Dashboard source code', 'https://github.com/moto23/Devdynamics_Analytics'],
    ['StealthMode Courses Website live site', 'https://stealthmode-frontend.vercel.app/'],
    ['StealthMode Courses Website source code', 'https://github.com/moto23/StealthMode_Project'],
  ];
  for (const [name, url] of links) await expect(page.getByRole('link', { name, exact: name !== 'LeetCode profile' }).first()).toHaveAttribute('href', url);
});

test('mobile menu traps focus, navigates, closes on Escape and resize', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const open = page.getByRole('button', { name: 'Open menu' });
  await open.click();
  const dialog = page.getByRole('dialog');
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: 'Contact', exact: true })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(open).toBeFocused();
  await open.click();
  await dialog.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator('#experience')).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await open.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(dialog).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('storage denied, contact validation, copy denial, and keyboard skip', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage denied'); } });
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('Denied')) } });
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Open in mail' }).click();
  await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toBeFocused();
  await expect(page.getByText('Add your name.')).toBeVisible();
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByText(/Copy unavailable/)).toBeVisible();
  expect(errors).toEqual([]);
});

test('normal motion and direct section entry work without a blocking loader', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/#work');
  await expect(page.locator('#work h2')).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator('html')).not.toHaveClass(/has-cursor/);
  await page.locator('#home').scrollIntoViewIfNeeded();
  await expect(page.locator('h1')).toHaveCSS('opacity', '1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});


test('touch navigation has no cursor or magnetic movement', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).tap();
  await page.getByRole('dialog').getByRole('link', { name: 'Work', exact: true }).tap();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('canvas')).toHaveCount(0);
  expect(await page.evaluate(() => matchMedia('(pointer: coarse)').matches)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await context.close();
});
