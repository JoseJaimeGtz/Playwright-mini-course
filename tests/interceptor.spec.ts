import {test, expect} from '@playwright/test';
import {LoginPage} from "./pageObjects/LoginPage";

// ignore a request
test('purchase an item 2', async ({page}) => {
  page.on('request', req => {
    console.log(req.url());
  });

  await page.route(
    'https://www.saucedemo.com/static/media/*.jpg',
    (route) => route.abort()
  );
  // await page.route(
  //   '**/*.{jpg,png,jpge,svg,css}',
  //   (route) => route.abort()
  // );

  await page.goto(process.env.LOGIN_URL);
  const login = new LoginPage(page);
  await login.loginFill({
    username: process.env.USERNAME,
    password:process.env.PASSWORD
  });
  await page.screenshot({path:'./screenshots/ss.png', fullPage:true});
});

// modify a request
test('interceptor test', async ({page}) => {
  await page.route(
    'https://demoqa.com/BookStore/v1/Books',
    (route) => {
      route.fulfill({
        status: 304,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "books": [
            {
              "isbn": "9781449325862",
              "title": "El libro que nunca escribi",
              "subTitle": "A Working Introduction",
              "author": "Jaimesin",
              "publish_date": "2024-06-04T08:48:39.000Z",
              "publisher": "O'Yeah",
              "pages": 369,
              "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
              "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
            },
          ],
        }),
      });
    }
  );
  await page.goto('https://demoqa.com/books');
  await page.screenshot({path:'./screenshots/books.png', fullPage:true});
});