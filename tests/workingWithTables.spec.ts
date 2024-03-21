import {test, expect} from '@playwright/test';

interface Country {
  name: string;
  capital: string;
  currency: string;
  languages: Array<string>;
}

test('workingWithTables', async ({page}) => {
  await page.goto(process.env.URL);
  const tableContainer =  page.locator('//table[@id="countries"]');

  const rows = await tableContainer.locator('//tr').all();

  console.log(rows.length);

  const countries: Country[] = [];

  for(let row of rows) {
    let country: Country = {
      name: await row.locator('//td[2]').innerText(),
      capital: await row.locator('//td[3]').innerText(),
      currency: await row.locator('//td[4]').innerText(),
      // @ts-ignore // typescript no detecta el archivo de configuración que creé para que tome las funciones del ES2021 (replaceAll)
      languages: (await row.locator('//td[5]').innerText()).replaceAll(' ', '').replace('\n', '').split(';')
    }
    countries.push(country);
  }
  for(let country of countries) {
    console.log(country);
  }
  const countrySpeaksPortuguese = countries.filter(country => country.languages.includes('Portuguese'))

  console.log("countries that speaks Portuguese:", countrySpeaksPortuguese);
});
