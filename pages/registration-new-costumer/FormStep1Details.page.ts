import { type Locator, type Page, expect } from '@playwright/test'

export class FormStep1DetailsPage {
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
    this.password = page.getByRole('textbox', { name: 'Password' })
    this.continueWithEmails = page.getByRole('link', { name: 'Continue with emails' });
    this.firstNameValidationError = page.getByText('Please enter a valid first');
    this.lastNameValidationError = page.getByText('Please enter a valid last')
    this.emailFormatValidationError = page.getByText('Please enter your email')
    this.passwordValidationError = page.getByText('Please use at least 12')
    this.phoneNumberValidationError = page.getByText('This phone number is not')

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

}
