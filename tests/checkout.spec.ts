import { test, expect } from "@playwright/test";

test("All Details of Checkout Are Displayed and Functionality is Correct", async ({ page }) => {
    await page.goto("http://localhost:4200/checkout");
    await expect(page).toHaveURL(/\/checkout/);

    await test.step("Handle Checking Out With Empty Cart", async () => {
        await expect(page.getByTestId('checkout-container')).not.toBeVisible();
        await expect(page.getByText('Your cart is empty.')).toBeVisible();
    });
    
    await test.step("Added Products Are Correctly Displayed in Checkout", async () => {
        await page.getByRole('link', { name: 'Browse', exact: true }).click();

        await page.locator('[href^="/product"]').first().click();
        await page.getByTestId('add-btn').click();
        const product1 = (await page.getByTestId('product-name').textContent())?.trim() || '1';
        const product1Price = (await page.getByTestId('product-price').textContent())?.trim() || '1';
        const product1AmountText = (await page.getByTestId('quantity').textContent())?.trim() || '1';
        await page.getByText('Add to Cart').click();

        await page.getByRole('link', { name: 'Browse', exact: true }).click();
        await page.getByRole("combobox").first().selectOption({ index: 3 });

        await page.locator('[href^="/product"]').first().click();
        const product2 = (await page.getByTestId('product-name').textContent())?.trim() || '1';
        const product2Price = (await page.getByTestId('product-price').textContent())?.trim() || '1';
        const product2AmountText = (await page.getByTestId('quantity').textContent())?.trim() || '1';
        await page.getByText('Add to Cart').click();

        await page.getByTestId('cart-btn').click();

        const totalPrice = (await page.getByTestId('total-price').textContent())?.trim() || '1';

        await page.getByRole('link', { name: 'Proceed to Checkout' }).click();
        await expect(page).toHaveURL(/\/checkout/);

        await expect(page.getByTestId('checkout-container')).toBeVisible();

        await expect(page.getByText(product1, { exact : true })).toBeVisible();
        await expect(page.getByText(product2, { exact : true })).toBeVisible();
        await expect(page.getByText('Price: ' + product1Price, { exact : true })).toBeVisible();
        await expect(page.getByText('Price: ' + product2Price, { exact : true })).toBeVisible();
        await expect(page.getByText('Quantity: ' + product1AmountText, { exact : true })).toBeVisible();
        await expect(page.getByText('Quantity: ' + product2AmountText, { exact : true })).toBeVisible();

        await expect(page.getByTestId('checkout-total')).toHaveText('Total: ' + totalPrice);
    });

    await test.step("Text Fields Are Visible and Mandatory Submission Rules Are Followed", async () => {
        await expect(page.getByTestId('name-input')).toBeVisible();
        await expect(page.getByTestId('email-input')).toBeVisible();
        await expect(page.getByTestId('phone-input')).toBeVisible();
        await expect(page.getByTestId('address-input')).toBeVisible();
        await expect(page.getByTestId('place-order-btn')).toBeVisible();

        await page.getByTestId('place-order-btn').click();
        await expect(page.getByTestId('checkout-container')).toBeVisible();

        await page.getByTestId('name-input').fill((new Date()).toString());
        await page.getByTestId('place-order-btn').click();
        await expect(page.getByTestId('checkout-container')).toBeVisible();

        await page.getByTestId('email-input').fill("Playwright Test");
        await page.getByTestId('place-order-btn').click();
        await expect(page.getByTestId('checkout-container')).toBeVisible();

        await page.getByTestId('phone-input').fill("987654321");
        await page.getByTestId('place-order-btn').click();
        await expect(page.getByTestId('checkout-container')).toBeVisible();

        await page.getByTestId('address-input').fill("123 Test Street");
        await page.getByTestId('place-order-btn').click();
        await expect(page.getByTestId('checkout-container')).toBeVisible();

        //await expect(page.getByTestId('checkout-container')).not.toBeVisible();
    });
    // await test.step("Submitted Checkout is Added to Order Database", async () => {

    // });
});

