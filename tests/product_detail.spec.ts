import { test, expect } from "@playwright/test";

test("All Details of Product Are Displayed and Functionality is Correct", async ({ page }) => {
    await page.goto("http://localhost:4200/browse");
    await page.locator('[href^="/product"]').first().click();
    await expect(page).toHaveURL(/\/product/);

    await test.step("All Details of Product Are Displayed", async () => {
        await expect(page.getByTestId('product-name').first()).toBeVisible();
        await expect(page.getByTestId('product-name').first()).not.toBeEmpty();

        await expect(page.getByTestId('product-description').first()).toBeVisible();
        await expect(page.getByTestId('product-description').first()).not.toBeEmpty();

        await expect(page.getByTestId('product-price').first()).toBeVisible();
        await expect(page.getByTestId('product-price').first()).not.toBeEmpty();

        await expect(page.getByTestId('product-stock').first()).toBeVisible();
        await expect(page.getByTestId('product-stock').first()).not.toBeEmpty();

        await expect(page.getByTestId('quantity').first()).toBeVisible();
        await expect(page.getByTestId('quantity').first()).toHaveText('1');

        await expect(page.getByTestId('remove-btn').first()).toBeVisible();
        await expect(page.getByTestId('add-btn').first()).toBeVisible();
        await expect(page.getByText('Add to Cart').first()).toBeVisible();

    });
    
    await test.step("Functionality is Working and Correctly Displayed", async () => {
        await page.getByTestId('add-btn').first().click()
        await expect(page.getByTestId('quantity').first()).toHaveText('2');
        await page.getByTestId('remove-btn').first().click()
        await expect(page.getByTestId('quantity').first()).toHaveText('1');
        await page.getByText('Add to Cart').first().click();
        await expect(page.getByTestId('total-items').first()).toBeVisible();
        await expect(page.getByTestId('total-items').first()).toHaveText('1');
        await page.getByText('Add to Cart').first().click();
        await expect(page.getByTestId('total-items').first()).toHaveText('2');
    });
});

