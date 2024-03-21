import {Locator, Page} from '@playwright/test';

interface login {
  username: string;
  password: string;
}

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByRole('textbox', {name: 'Username'});
    this.password = page.getByRole('textbox', {name: 'Password'});
    this.loginButton = page.getByRole('button', {name: 'Login'});
  }

  async loginFill({ username, password }: login) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.page.screenshot({
      path: './screenshots/all-items.png',
      fullPage: true
    })
    await this.loginButton.click();
  }
}
