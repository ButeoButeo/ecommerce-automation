import { type Locator, type Page } from '@playwright/test'

export class FormStep4ApplyPage {
  readonly page: Page
  // 4th registration form "Apply"
  readonly thankYouForYourApplication: Locator
  readonly doNoApplyCredit: Locator
  readonly continue4Button: Locator
  // last success registration message
  readonly congratulations: Locator
  readonly acceptCreditAgrement: Locator
  readonly successRegistrationMsg: Locator
  readonly agree: Locator
  //Last step
  readonly tick: Locator
  readonly lastContinueButton: Locator
  readonly continueToMyAccount: Locator
  readonly signinButton: Locator
  
  constructor(page: Page) {
    this.page = page
    // 4th registration form "Apply"
    this.thankYouForYourApplication = page.getByRole('heading', { name: 'Thank you for your' })
    this.doNoApplyCredit = page.locator('label').filter({ hasText: 'No Do not apply credit' })
    this.continue4Button = page.getByRole('link', { name: 'Apply' });
    // last success registration message
    this.congratulations = page.getByText('Congratulations! Your credit');
    this.acceptCreditAgrement = page.getByRole('link', { name: 'Accept credit agreement' });
    this.successRegistrationMsg = page.getByText('Thanks for Registering Your')
    this.agree = page.locator('label').filter({ hasText: 'Tick here to confirm you have' })
    //last step
    this.tick = page.locator('label').filter({ hasText: 'Tick here if you don\'t want' })
    this.lastContinueButton = page.getByRole('link', { name: 'Continue' })
    this.continueToMyAccount = page.getByRole('link', { name: 'My Account' })
    this.signinButton = page.getByRole('button', { name: 'Sign in' })
  }

}
