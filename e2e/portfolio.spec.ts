import { test, expect } from '@playwright/test';

test('portfolio homepage loads', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText('Mohammed Al-Dokimi');
  await expect(page.getByRole('link', { name: 'Get in touch' })).toBeVisible();
});

test('contact page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/contact');
  await expect(page.locator('h1')).toContainText('Contact');
});
