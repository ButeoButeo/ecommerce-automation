import { type Locator, type Page, expect } from '@playwright/test'

export class FormStep3AddressPage {
  readonly page: Page
  // 3rd registration form
  readonly houseNumberOrName: Locator
  readonly postCode: Locator
  readonly findAdressButton: Locator
  readonly adressFound: Locator
  readonly years: Locator
  readonly continue3Button: Locator

  constructor(page: Page) {
    this.page = page
    // 3rd registration form
    this.houseNumberOrName = page.getByRole('textbox', { name: 'House number or name:' })
    this.postCode = page.getByRole('textbox', { name: 'Postcode:' })
    this.findAdressButton = page.getByRole('link', { name: 'Find address' })
    this.adressFound = page.getByLabel('Address', { exact: true }).locator('div').filter({ hasText: 'oakeswell health centre' }).nth(3)
    this.years = page.getByLabel('Years:');
    this.continue3Button = page.getByRole('link', { name: 'Continue' });
  }

  // 3rd registration form
  async selectYearsNumber(numberyears: string) {
    await this.years.selectOption(`${numberyears}`);      
  }

}
