import { type Locator, type Page, expect } from '@playwright/test'
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

export class SignInRegisterPage {
  readonly page: Page
  readonly signIn: Locator
  readonly noAccountNoProblem: Locator
  readonly newCustomer: Locator
  readonly emailOrAccountNumberLabel: Locator
  readonly emailOrAccountNumberInputField: Locator
  readonly passwordLabel: Locator
  readonly passwordInputField: Locator
  readonly signInButton: Locator

  constructor(page: Page) {
    this.page = page
    this.signIn = page.getByRole('heading', { name: 'Sign in' })
    this.newCustomer = page.getByRole('link', { name: 'I\'m a new customer' })
    this.emailOrAccountNumberLabel = page.getByText('Email or account number')
    this.emailOrAccountNumberInputField = page.getByRole('textbox', { name: 'Email or account number' })
    this.passwordLabel = page.getByText('Password', { exact: true })
    this.passwordInputField = page.getByRole('textbox', { name: 'Password' })
    this.signInButton = page.getByRole('button', { name: 'Sign in' })
  }

  async signInUserAccount() {
    await this.emailOrAccountNumberInputField.fill(`${process.env.BASIC_AUTH_EMAIL}`)
    await this.passwordInputField.clear()
    await this.passwordInputField.fill(`${process.env.BASIC_AUTH_PASSWORD}`)
    await this.signInButton.click()
    await this.page.context().storageState({ path: authFile });
  }

}
