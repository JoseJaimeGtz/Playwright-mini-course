import {test, expect} from '@playwright/test';
import { LoginPage } from './pageObjects/LoginPage';

test('purchase an item', async ({page}, testInfo) => {

  await page.goto(process.env.LOGIN_URL);
  const login = new LoginPage(page);
  await login.loginFill({
    username: process.env.USERNAME,
    password:process.env.PASSWORD
  });

  await testInfo.attach('login', {
    body: await page.screenshot(),
    contentType: 'image/png'
  });

  await page.waitForURL('https://www.saucedemo.com/inventory.html');
  const itemsContainer = await page.locator('#inventory_container .inventory_item').all();
  const randomIndex = Math.floor(Math.random() * itemsContainer.length);
  const randomItems = itemsContainer[randomIndex];
  const expectedName = await randomItems.locator('.inventory_item_name').innerText();
  const expectedDescription = await randomItems.locator('.inventory_item_desc').innerText();
  const expectedPrice = await randomItems.locator('.inventory_item_price').innerText();
  console.log(`Price: ${expectedPrice}, Name: ${expectedName}, Desc: ${expectedDescription}`);
  // random item selected
  await randomItems.getByRole('button', {name: 'Add to cart'}).click();
  await page.locator('a.shopping_cart_link').click();

  await page.waitForURL('https://www.saucedemo.com/cart.html');
  await expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible();
  const actualName = await page.locator('.inventory_item_name').innerText();
  const actualDescription = await page.locator('.inventory_item_desc').innerText();
  const actualPrice = await page.locator('.inventory_item_price').innerText();
  expect(actualName).toEqual(expectedName);
  expect(actualDescription).toEqual(expectedDescription);
  expect(actualPrice).toEqual(expectedPrice);
  await page.getByRole('button', {name: 'Checkout'}).click();

  await page.waitForURL('https://www.saucedemo.com/checkout-step-one.html');
  await page.getByRole('textbox', {name: 'First Name'}).fill('Naruto');
  await page.getByRole('textbox', {name: 'Last Name'}).fill('Uzumaki');
  await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('36699');
  await page.getByRole('button', {name: 'Continue'}).click();

  await page.waitForURL('https://www.saucedemo.com/checkout-step-two.html');
  const checkoutName = await page.locator('.inventory_item_name').innerText();
  const checkoutDescription = await page.locator('.inventory_item_desc').innerText();
  const checkoutPrice = await page.locator('.inventory_item_price').innerText();
  expect(checkoutName).toEqual(expectedName);
  expect(checkoutDescription).toEqual(expectedDescription);
  expect(checkoutPrice).toEqual(expectedPrice);
  await page.getByRole('button', {name: 'Finish'}).click();

  await page.waitForURL('https://www.saucedemo.com/checkout-complete.html');
  expect(page.getByRole('heading', {name: 'Thank you for your order!'}));
  expect(page.getByRole('img', {name: 'Pony Express'}));
  await page.getByRole('button', {name: 'Back Home'}).click();
});
