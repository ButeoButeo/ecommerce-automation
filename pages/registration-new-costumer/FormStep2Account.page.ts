import { type Locator, type Page, expect } from '@playwright/test'

export class FormStep2AccountPage {
  readonly page: Page
  // 2nd registration form
  readonly payLater : Locator
  readonly continueButton: Locator
 
  constructor(page: Page) {
    this.page = page
    // 2nd registration form
    this.payLater = page.getByText('Pay later')
    this.continueButton = page.getByRole('link', { name: 'Continue' })
  }
  
}
