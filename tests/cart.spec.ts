import { test, expect } from "@playwright/test";

test("Cart Functionality is Working and Displayed Correctly", async ({ page }) => {
  await page.goto("http://localhost:4200/browse");
  await page.locator('[href^="/product"]').first().click();
  await expect(page).toHaveURL(/\/product/);

  const productName = (await page.getByTestId('product-name').textContent())?.trim() || '';
  const productPriceText = (await page.getByTestId('product-price').textContent())?.trim() || '';
  const numericPrice = parseFloat(productPriceText.replace(/[^\d.]/g, ''));

  await page.getByTestId('add-btn').click();
  const productAmountText = (await page.getByTestId('quantity').textContent())?.trim() || '1';
  const numericAmount = parseInt(productAmountText);

  await page.getByText('Add to Cart').click();

  await test.step("Cart is Correctly Shown when Toggled", async () => {
    await expect(page.getByTestId('total-items')).toHaveText(numericAmount.toString());
    await expect(page.getByTestId('cart-dropdown')).toBeHidden();

    await page.getByTestId('cart-btn').click();
    await expect(page.getByTestId('cart-dropdown')).toBeVisible();

    await page.getByTestId('cart-btn').click();
    await expect(page.getByTestId('cart-dropdown')).toBeHidden();
  });

  await test.step("Cart is Correctly Showing Product Data", async () => {
    await page.getByTestId('cart-btn').click();

    await expect(page.getByTestId('cart-dropdown')).toContainText(productName);
    await expect(page.getByTestId('cart-dropdown')).toContainText(productPriceText);
    await expect(page.getByTestId('cart-dropdown').getByRole('img')).toBeVisible();
    await expect(page.getByTestId('cart-dropdown')).toContainText(productAmountText);

    const expectedTotal = (numericPrice * numericAmount).toFixed(2);
    const totalText = await page.getByTestId('total-price').textContent();
    expect(totalText?.replace(/[^\d.]/g, '')).toContain(expectedTotal);
  });

  await test.step("Functionality is Working and Correctly Displayed", async () => {
    await expect(page.getByTestId('cart-dropdown').getByRole('button', { name: '+' })).toBeVisible();
    await expect(page.getByRole('button', { name: '−' })).toBeVisible();

    await page.getByTestId('cart-dropdown').getByRole('button').getByText('+').click();
    await expect(page.getByTestId('cart-dropdown').getByText((numericAmount+1).toString(), { exact: true })).toBeVisible();

    const expectedTotal = (numericPrice * (numericAmount+1)).toFixed(2);
    const totalText = await page.getByTestId('total-price').textContent();
    expect(totalText?.replace(/[^\d.]/g, '')).toContain(expectedTotal);

    await page.getByRole('button', { name: '−' }).click();
    await page.getByRole('button', { name: '−' }).click();
    await page.getByRole('button', { name: '−' }).click();

    await expect(page.getByTestId('cart-dropdown')).not.toContainText(productName);
    await expect(page.getByTestId('cart-dropdown')).not.toContainText(productPriceText);
    await expect(page.getByTestId('cart-dropdown').getByRole('img')).not.toBeVisible();
    await expect(page.getByTestId('cart-dropdown')).not.toContainText(productAmountText);
    await expect(page.getByTestId('cart-dropdown')).toContainText("Your cart is empty.");
  });

  await test.step("Checkout Button correctly Works", async () => {
    await expect(page.getByRole('link', { name: 'Proceed to Checkout' })).not.toBeVisible();
    await page.getByText('Add to Cart').click();
    await expect(page.getByRole('link', { name: 'Proceed to Checkout' })).toBeVisible();
    await page.getByRole('link', { name: 'Proceed to Checkout' }).click();
    await expect(page).toHaveURL(/\/checkout/);
  });
});
