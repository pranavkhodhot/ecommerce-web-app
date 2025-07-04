import { test, expect } from '@playwright/test';

test('Homepage loads and hero section displays correctly', async ({ page }) => {
  await test.step('Navigate to homepage and check hero section', async () => {
    await page.goto('/');
    await expect(page.locator('text=Discover Your Style')).toBeVisible();
  });

  await test.step('Click "See What\'s Featured" and check products section', async () => {
    const featuredBtn = page.locator('text=See What\'s Featured');
    await featuredBtn.click();
    await expect(page.locator('#products')).toBeVisible();
  });

  await test.step('Scroll and verify footer is visible', async () => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  await test.step('Go to browse page via CTA and verify', async () => {
    const browseButton = page.locator('text=Shop All Products');
    await browseButton.click();
    await expect(page).toHaveURL(/\/browse/);
    await expect(page.getByRole('heading', { name: 'Browse Products' })).toBeVisible();

  });
});

