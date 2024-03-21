import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('search iPhone', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.mx/');
  await page.locator('input[class=\'nav-search-input\']').fill('iPhone');
  await page.keyboard.press('Enter');

  // relative xpath method, expect for assertion (toBeVisible) - wait
  await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible();

  const titles = await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li//h2').allInnerTexts();

  console.log('total: ', titles.length);
  console.log('All titles: ', titles);
  for(let title of titles) {
    console.log(title);
  }
});

test('test locators', async ({ page }) => {
  await page.goto('https://example.com');
});
