import { test, expect } from "@playwright/test";

test("Filters products by category, price, or search", async ({ page }) => {
  await page.goto("http://localhost:4200/browse");

  var productCards = await page.locator('[href^="/product"]').count();
  await expect(productCards).toBeGreaterThan(0);

  await test.step("Check All Product Categories", async () => {
    const categoryDropdown = page.getByRole("combobox").first();
    await expect(categoryDropdown).toBeVisible();

    await categoryDropdown.selectOption({ index: 1 });
    productCards = await page.locator('[href^="/product"]').count();
    await expect(productCards).toBeGreaterThan(0);

    await categoryDropdown.selectOption({ index: 2 });
    productCards = await page.locator('[href^="/product"]').count();
    await expect(productCards).toBeGreaterThan(0);

    await categoryDropdown.selectOption({ index: 3 });
    productCards = await page.locator('[href^="/product"]').count();
    await expect(productCards).toBeGreaterThan(0);

    await categoryDropdown.selectOption({ index: 4 });
    productCards = await page.locator('[href^="/product"]').count();
    await expect(productCards).toBeGreaterThan(0);

    await categoryDropdown.selectOption({ index: 5 });
    productCards = await page.locator('[href^="/product"]').count();
    await expect(productCards).toBeGreaterThan(0);

    await categoryDropdown.selectOption({ index: 0 });
  });

  await test.step("Check All Price Options", async () => {
    const pricesBox = page.getByRole("combobox").nth(1);
    await expect(pricesBox).toBeVisible();

    await pricesBox.selectOption({ index: 1 });
    productCards = await page.locator('[href^="/product"]').count();
    await expect(productCards).toBeGreaterThan(0);

    await pricesBox.selectOption({ index: 2 });
    productCards = await page.locator('[href^="/product"]').count();
    await expect(productCards).toBeGreaterThan(0);

    await pricesBox.selectOption({ index: 3 });
    productCards = await page.locator('[href^="/product"]').count();
    await expect(productCards).toBe(0);

    await pricesBox.selectOption({ index: 4 });
    productCards = await page.locator('[href^="/product"]').count();
    await expect(productCards).toBe(0);

    await pricesBox.selectOption({ index: 0 });
  });

  await test.step("Check All Valid Search", async () => {
    const searchbar = page.getByRole("textbox");
    await expect(searchbar).toBeVisible();

    await searchbar.fill("Hoodie");
    var allH3Texts = await page
      .locator('[href^="/product"]')
      .locator("h3")
      .allTextContents();
    let allTextsAreSame = true;
    if (allH3Texts.length > 1) {
      for (let i = 1; i < allH3Texts.length; i++) {
        if (!allH3Texts[i].includes("Hoodie")) {
          allTextsAreSame = false;
          break;
        }
      }
    }
    await expect(allTextsAreSame).toBe(true);

    await searchbar.fill("Shirt");
    allH3Texts = await page
      .locator('[href^="/product"]')
      .locator("h3")
      .allTextContents();
    allTextsAreSame = true;
    if (allH3Texts.length > 1) {
      for (let i = 1; i < allH3Texts.length; i++) {
        if (!allH3Texts[i].includes("Shirt")) {
          allTextsAreSame = false;
          break;
        }
      }
    }
    await expect(allTextsAreSame).toBe(true);

    await searchbar.fill("Shoe");
    allH3Texts = await page
      .locator('[href^="/product"]')
      .locator("h3")
      .allTextContents();
    allTextsAreSame = true;
    if (allH3Texts.length > 1) {
      for (let i = 1; i < allH3Texts.length; i++) {
        if (!allH3Texts[i].includes("Shoe")) {
          allTextsAreSame = false;
          break;
        }
      }
    }
    await expect(allTextsAreSame).toBe(true);
  });

  await page.locator('[href^="/product"]').first().click();
  await expect(page).toHaveURL(/\/product/);

});
