import { type Locator, type Page, expect } from '@playwright/test'

export class LandingPage {
  readonly page: Page
  readonly myAccount: Locator
  readonly register: Locator
  readonly newCustomer: Locator
  //Main Logo
  readonly fashionWorldLogo: Locator  
  //search field
  readonly search: Locator
  //log out button
  readonly logout: Locator
  // Item details Bag
  readonly myBag : Locator

  constructor(page: Page) {
    this.page = page
    this.myAccount = page.locator('.gui-dropdown-toggle');
    this.register = page.getByRole('link', { name: 'Register' })
    this.newCustomer = page.getByRole('link', { name: 'I\'m a new customer' })
    //Main Logo
    this.fashionWorldLogo = page.getByAltText('Fashion World')
    //search field
    this.search = page.getByRole('textbox', { name: 'Search' })
    //log out button
    this.logout = page.getByRole('link', { name: 'Sign Out' })
    // Item detais Bag
    this.myBag = page.getByRole('button', { name: 'My Bag' })
  }

  async visitPage() {
    await this.page.goto(`/`);
    await this.page.getByRole('button', { name: 'Accept All Cookies' }).isVisible();
    await this.page.getByRole('button', { name: 'Accept All Cookies' }).click();
    await expect(this.page).toHaveURL('https://www.fashionworld.co.uk')
  }

  async visitPageWithoutCookiesBanner() {
    await this.page.goto(`/`);
    await this.myAccount.hover();
    await expect(this.page).toHaveURL('https://www.fashionworld.co.uk')
  }

  async navigateToLogIn() {
    await this.myAccount.click();
    await this.register.click();
  }

  async navigateToNewCustomer() {
    await this.myAccount.click();
    await this.register.click();
    await this.newCustomer.click();
  }

}
