import {expect, test } from "../../fixtures/pom.fixture"
import { faker } from '@faker-js/faker';

test.describe('Sign-In Tests', () => {
  test.beforeEach(async ({ landingPage}) => {
    // Navigate to the sign-in page before each test
    await landingPage.visitPage()
    await landingPage.navigateToLogIn();
  });

  test('Successful Sign-In', async ({ page, signInRegisterPage, landingPage }) => {
    // Fill in the sign-in form
    await signInRegisterPage.emailOrAccountNumberInputField.fill(`${process.env.BASIC_AUTH_EMAIL}`)
    await signInRegisterPage.passwordInputField.clear()
    await signInRegisterPage.passwordInputField.fill(`${process.env.BASIC_AUTH_PASSWORD}`)
    
    // Submit the form
    await signInRegisterPage.signInButton.click()
    
    // Verify successful sign-in by checking for a specific element on the dashboard
    await expect(page).toHaveURL(`${process.env.URL_AFTER_SIGNIN}`);
    await landingPage.myAccount.click();
    await expect(landingPage.logout).toBeVisible();
  });

  test('Unsuccessful Sign-In with Invalid Credentials', async ({signInRegisterPage }) => {
    // Fill in the sign-in form with invalid credentials
    await signInRegisterPage.emailOrAccountNumberInputField.fill(faker.internet.exampleEmail())
    await signInRegisterPage.passwordInputField.clear()
    await signInRegisterPage.passwordInputField.fill(faker.internet.password())
    
    // Submit the form
    await signInRegisterPage.signInButton.click()
    
    // Verify error message is displayed
    await expect(signInRegisterPage.thereIsaProblem).toHaveText('There is a problem');
    await expect(signInRegisterPage.errorMessageUsernamePassword).toHaveText('It seems your username or password were incorrect, please try again.');
  });

  test('Sign-In with Empty Fields', async ({signInRegisterPage }) => {
    // Submit the form without filling in any fields
    await signInRegisterPage.signInButton.click()
    
    // Verify error messages are displayed for both fields
    await expect(signInRegisterPage.thereIsaProblem).toHaveText('There is a problem');
    await expect(signInRegisterPage.errorMessageEmailAddress).toHaveText('Enter a valid email address or account number');
    await expect(signInRegisterPage.errorMessagePassword).toHaveText('Enter a valid password');
    await expect(signInRegisterPage.inlineErrorMessageEmailField).toHaveText('Enter a valid email address or account number');
    await expect(signInRegisterPage.inlineErrorMessagePasswordField).toHaveText('Enter a valid password');
  });
});