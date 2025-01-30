import { type Locator, type Page, expect } from '@playwright/test'

export class LandingPage {
  readonly page: Page
  readonly myAccount: Locator
  readonly register: Locator
  readonly newCustomer: Locator
  //navigation menu bar
  readonly womens: Locator
    //sub-navigation menu bar
    readonly accessories: Locator
      //acessory sub-menu accessories items page
      readonly valentinoBag: Locator
      //acessory sub-menu Dress items page
      readonly dress: Locator
      //pagination menu bar
      readonly pagination1Page: Locator
      readonly pagination2Page: Locator
      readonly previous: Locator
  //search field
  readonly search: Locator
  //log out button
  readonly logout: Locator
  constructor(page: Page) {
    this.page = page
    this.myAccount = page.locator('.gui-dropdown-toggle');
    this.register = page.getByRole('link', { name: 'Register' })
    this.newCustomer = page.getByRole('link', { name: 'I\'m a new customer' })
    //navigation menu bar
    this.womens = page.getByRole('link', { name: 'Womens', exact: true })
      //sub-navigation menu bar
      this.accessories = page.getByRole('banner').getByRole('link', { name: 'Accessories' })
      //acessory sub-menu bag items page
      this.valentinoBag = page.getByText('Valentino Bags Alexia Grey')
      //acessory sub-menu dress items page
      this.dress = page.getByText('Phase Eight Veronica Pink')
      //pagination menu bar
      this.pagination1Page = page.locator('.pagination__items > li').first()
      this.pagination2Page = page.getByRole('link', { name: '2', exact: true })
      this.previous = page.getByRole('link', { name: 'Previous' }).nth(1)
    //search field
    this.search = page.getByRole('textbox', { name: 'Search' })
    //log out button
    this.logout = page.getByRole('link', { name: 'Sign Out' })
  }
  async visitPage() {
    await this.page.setExtraHTTPHeaders({
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-GB,en-NZ;q=0.9,en-AU;q=0.8,en;q=0.7,en-US;q=0.6',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      "hostname": "playwright-chrome",
      "image": "dgtlmoon/sockpuppetbrowser:latest",
      "restart": "unless-stopped",
      "ignoreHTTPSErrors": "true",
      "extraHTTPHeaders": "'Upgrade-Insecure-Requests': '1'"
    });
    await this.page.goto('');
    await this.page.getByRole('button', { name: 'Accept All Cookies' }).click();
    await expect(this.page).toHaveURL('https://www.fashionworld.co.uk')
  }
  async visitPageWithoutCookiesBanner() {
    await this.page.goto('');
    await expect(this.page).toHaveURL('https://www.fashionworld.co.uk')
  }
}
