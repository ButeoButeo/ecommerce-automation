import { test, expect } from '../fixtures/pom.fixture';

test.describe('Authentication Registration', () => {
//Justification: This is a critical feature as it allows users to create accounts, which is the entry point for personalizing their shopping experience and securing their data.
  test.only('TC Scenario 1: - Validation for Mandatory Fields', async ({ page, registrationPage, landingPage }) => {
    //step 1 - visit landing page and click on register
    await landingPage.visitPage();
    await landingPage.myAccount.click();
    await landingPage.register.click();
    await landingPage.newCustomer.click();
    //step 2 - validation for mandatory fields first name and last name
    await registrationPage.continueWithEmails.click();
    await expect(registrationPage.email).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(registrationPage.titleLabel).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(registrationPage.day).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(registrationPage.month).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(registrationPage.year).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(registrationPage.phone).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(registrationPage.password).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(registrationPage.firstNameValidationError).toHaveText('Please enter a valid first name.');
    await expect(registrationPage.lastNameValidationError).toHaveText('Please enter a valid last name.');
    await expect(registrationPage.firstName).toHaveCSS('border-color', 'rgb(212, 0, 0)');
    await expect(registrationPage.lastName).toHaveCSS('border-color', 'rgb(212, 0, 0)');
    //step 3 - validation invalid Email Format
    await registrationPage.fillDetailsForm1('aasdas@dass', 'Mr', 'John', 'Doe', '1', 'January', '1990', '1234567890', 'P@ssw0rd123');
    await registrationPage.continueWithEmails.click();
    await expect(registrationPage.email).toHaveCSS('border-color', 'rgb(212, 0, 0)');
    await expect(registrationPage.emailFormatValidationError).toHaveText('Please enter your email address. This email address is not valid.');
    //step 4 - validation for password strength
    await expect(registrationPage.passwordValidationError).toHaveText('Please use at least 12 characters, including lowercase and uppercase letters.');
    await registrationPage.fillDetailsForm1('aasdas@dass.com', 'Mr', 'John', 'Doe', '1', 'January', '1990', '1234567890', 'Aa123456789@2025');
    await registrationPage.continueWithEmails.click();
    //step 5 - validate phone number format
    await expect(registrationPage.phoneNumberValidationError).toHaveText('This phone number is not valid.');
    await expect(registrationPage.phone).toHaveCSS('border-color', 'rgb(212, 0, 0)');
    // step 6 - successful submission of the first step registration form
    await registrationPage.fillDetailsForm1('Jeanne96@example.net', 'Mr', 'John', 'Doe', '1', 'January', '1990', '07512345678', 'Aa123456789@2025');
    await registrationPage.continueWithEmails.click();
    // step 7 - Submit the second step registration form "Account"
    await registrationPage.payLater.click();
    await registrationPage.continueButton.click();
    // step 8 - Submit the third step registration form "Address"
    await registrationPage.houseNumberOrName.fill('Brunswick Park Rd');
    await registrationPage.postCode.fill('WS109HP');
    await page.keyboard.press('Enter');
    // step 9 - validate address found
    await registrationPage.adressFound.hover()
    await expect(registrationPage.adressFound).toContainText('Brunswick Park Rd');
    await expect(registrationPage.adressFound).toBeVisible();
    //step 10 - select number of years
    await registrationPage.selectYearsNumber('11');
    await registrationPage.continue3Button.click();
    //step 11 - Submit the 4th step registration form "Apply"
    await registrationPage.doNoApplyCredit.click();
    await registrationPage.continueButton.click();
    //step 12 - validate successful registration
    await expect(registrationPage.successRegistrationMsg).toHaveText('Thanks for Registering Your Account');
    await expect(registrationPage.congratulations).toHaveText('Congratulations! Your credit account has been created');
    await registrationPage.acceptCreditAgrement.click();
  });





});