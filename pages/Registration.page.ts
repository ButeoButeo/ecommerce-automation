import { type Locator, type Page, expect } from '@playwright/test'

export class RegistrationPage {
  readonly page: Page
  // 1st registration form
  readonly email: Locator
  readonly titleLabel: Locator
  readonly firstName: Locator
  readonly lastName: Locator
  readonly day: Locator
  readonly month: Locator
  readonly year: Locator
  readonly phone: Locator
  readonly password: Locator
  readonly continueWithEmails: Locator
  readonly firstNameValidationError: Locator
  readonly lastNameValidationError: Locator
  readonly emailFormatValidationError: Locator
  readonly passwordValidationError: Locator
  readonly phoneNumberValidationError: Locator
  // 2nd registration form
  readonly payLater : Locator
  readonly continueButton: Locator
  // 3rd registration form
  readonly houseNumberOrName: Locator
  readonly postCode: Locator
  readonly findAdressButton: Locator
  readonly adressFound: Locator
  readonly years: Locator
  readonly continue3Button: Locator
  // 4th registration form "Apply"
  readonly thankYouForYourApplication: Locator
  readonly doNoApplyCredit: Locator
  readonly continue4Button: Locator
  // last success registration message
  readonly congratulations: Locator
  readonly acceptCreditAgrement: Locator
  readonly successRegistrationMsg: Locator
  readonly agree: Locator
  constructor(page: Page) {
    this.page = page
    this.email = page.getByRole('textbox', { name: 'Email:' });
    this.titleLabel = page.getByLabel('Title:');
    this.firstName = page.getByRole('textbox', { name: 'First name:' })
    this.lastName = page.getByRole('textbox', { name: 'Last name:' })
    this.day = page.getByLabel('Day')
    this.month = page.getByLabel('Month')
    this.year = page.getByLabel('Year')
    this.phone = page.getByRole('textbox', { name: 'Provide a contact number:' })
    this.password = page.getByRole('textbox', { name: 'Password:' })
    this.continueWithEmails = page.getByRole('link', { name: 'Continue with emails' });
    this.firstNameValidationError = page.getByText('Please enter a valid first');
    this.lastNameValidationError = page.getByText('Please enter a valid last')
    this.emailFormatValidationError = page.getByText('Please enter your email')
    this.passwordValidationError = page.getByText('Please use at least 12')
    this.phoneNumberValidationError = page.getByText('This phone number is not')
    // 2nd registration form
    this.payLater = page.getByText('Pay later')
    this.continueButton = page.getByRole('link', { name: 'Continue' })
    // 3rd registration form
    this.houseNumberOrName = page.getByRole('textbox', { name: 'House number or name:' })
    this.postCode = page.getByRole('textbox', { name: 'Postcode:' })
    this.findAdressButton = page.getByRole('link', { name: 'Find address' })
    this.adressFound = page.getByLabel('Address', { exact: true }).locator('div').filter({ hasText: 'oakeswell health centre' }).nth(3)
    this.years = page.getByLabel('Years:');
    this.continue3Button = page.getByRole('link', { name: 'Continue' });
    // 4th registration form "Apply"
    this.thankYouForYourApplication = page.getByRole('heading', { name: 'Thank you for your' })
    this.doNoApplyCredit = page.locator('label').filter({ hasText: 'No Do not apply credit' })
    this.continue4Button = page.getByRole('link', { name: 'Apply' });
    // last success registration message
    this.congratulations = page.getByText('Congratulations! Your credit');
    this.acceptCreditAgrement = page.getByRole('link', { name: 'Accept credit agreement' });
    this.successRegistrationMsg = page.getByText('Thanks for Registering Your')
    this.agree = page.locator('label').filter({ hasText: 'Tick here to confirm you have' })
  }
  /**
   * 
   * @param email 
   * @param title Mr, Miss, Mrs, Ms
   * @param firstName 
   * @param lastName 
   * @param day 
   * @param month 
   * @param year 
   * @param phone 
   * @param password 
   */
  async fillDetailsForm1(email: string,title: string, firstName: string, lastName: string, day: string, 
    month: string, year: string, phone: string, password: string) {
    await this.email.fill(`${email}`);
    await this.titleLabel.selectOption(`${title}`);
    await this.firstName.fill(`${firstName}`);
    await this.lastName.fill(`${lastName}`);
    await this.day.selectOption(`${day}`);
    await this.month.selectOption(`${month}`);
    await this.year.selectOption(`${year}`);
    await this.phone.fill(`${phone}`);
    await this.password.fill(`${password}`);
}
// 3rd registration form
async selectYearsNumber(numberyears: string) {
  await this.years.selectOption(`${numberyears}`);      
}

}
