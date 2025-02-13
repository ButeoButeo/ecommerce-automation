import {expect, test } from "../../fixtures/pom.fixture"
test.describe.configure({ mode: 'parallel' });
//Justification: This is a critical feature as it allows users to create accounts, which is the entry point for personalizing their shopping experience and securing their data.
test.describe(' Authentication-registration', async () => {
  
  test('TC Scenario 1: - Navigate to crete new Customer', async ({ landingPage}) => {
    //step 1 - visit landing page and click on register
    await landingPage.visitPage();
    await landingPage.navigateToNewCustomer()
  });  

  test('TC Scenario 2: - Validation for Mandatory Fields in registration form 1 details', async ({landingPage , formStep1DetailsPage}) => {
    //step 2 - validation for mandatory fields first name and last name
    await landingPage.visitPage();
    await landingPage.navigateToNewCustomer()
    await formStep1DetailsPage.continueWithEmails.click();
    await expect(formStep1DetailsPage.email).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(formStep1DetailsPage.titleLabel).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(formStep1DetailsPage.day).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(formStep1DetailsPage.month).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(formStep1DetailsPage.year).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(formStep1DetailsPage.phone).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(formStep1DetailsPage.password).toHaveCSS('border-color', 'rgb(254, 254, 254)');
    await expect(formStep1DetailsPage.firstNameValidationError).toHaveText('Please enter a valid first name.');
    await expect(formStep1DetailsPage.lastNameValidationError).toHaveText('Please enter a valid last name.');
    await expect(formStep1DetailsPage.firstName).toHaveCSS('border-color', 'rgb(212, 0, 0)');
    await expect(formStep1DetailsPage.lastName).toHaveCSS('border-color', 'rgb(212, 0, 0)');
  });  

  test('TC Scenario 3: - Validation for Mandatory Fields in registration form 1 details', async ({landingPage , formStep1DetailsPage}) => {
    //step 3 - validation invalid Email Format
    await landingPage.visitPage();
    await landingPage.navigateToNewCustomer()
    await formStep1DetailsPage.fillDetailsForm1('aasdas@dass', 'Mr', 'John', 'Doe', '1', 'January', '1990', '1234567890', 'P@ssw0rd123');
    await formStep1DetailsPage.continueWithEmails.click();
    await expect(formStep1DetailsPage.email).toHaveCSS('border-color', 'rgb(212, 0, 0)');
    await expect(formStep1DetailsPage.emailFormatValidationError).toHaveText('Please enter your email address. This email address is not valid.');
    //step 4 - validation for password strength
    await expect(formStep1DetailsPage.passwordValidationError).toHaveText('Please use at least 12 characters, including lowercase and uppercase letters.');
  });  

  test('TC Scenario 4: - Validation for Mandatory Fields in registration form 1 details', async ({page, landingPage , formStep1DetailsPage, formStep2DetailsPage, formStep3DetailsPage}) => {
    await landingPage.visitPage();
    await landingPage.navigateToNewCustomer()
    await formStep1DetailsPage.fillDetailsForm1('aasdas@dass.com', 'Mr', 'John', 'Doe', '1', 'January', '1990', '1234567890', 'Aa123456789@2025');
    await formStep1DetailsPage.continueWithEmails.click();
    //step 5 - validate phone number format
    await expect(formStep1DetailsPage.phoneNumberValidationError).toHaveText('This phone number is not valid.');
    await expect(formStep1DetailsPage.phone).toHaveCSS('border-color', 'rgb(212, 0, 0)');
  });  

  test('TC Scenario 4: - Successful submission of the first step registration form', async ({page, landingPage , formStep1DetailsPage, formStep2DetailsPage, formStep3DetailsPage}) => {
    await landingPage.visitPage();
    await landingPage.navigateToNewCustomer()
    // step 6 - successful submission of the first step registration form
    await formStep1DetailsPage.fillDetailsForm1('Jeanne96@example.net', 'Mr', 'John', 'Doe', '1', 'January', '1990', '07512345678', 'Aa123456789@2025');
    await formStep1DetailsPage.continueWithEmails.click();
    // step 7 - Submit the second step registration form "Account"
    await formStep2DetailsPage.payLater.click();
    await formStep2DetailsPage.continueButton.click();
    // step 8 - Submit the third step registration form "Address"
    await formStep3DetailsPage.houseNumberOrName.fill('Brunswick Park Rd');
    await formStep3DetailsPage.postCode.fill('WS109HP');
    await page.keyboard.press('Enter');
    // step 9 - validate address found
    await formStep3DetailsPage.adressFound.hover()
    await expect(formStep3DetailsPage.adressFound).toBeVisible();
    //step 10 - select number of years
    await formStep3DetailsPage.selectYearsNumber('11');
    await formStep3DetailsPage.continue3Button.click();
    //step 11 - Submit the 4th step registration form "Apply"
    await formStep3DetailsPage.continue4Button.click();

    // We aren't able to complete the registration of new user account anymore, this was blocked by fashion world server
    /*  //step 12 - validate successful registration
    await registrationPage.doNoApplyCredit.click();
    await registrationPage.continueButton.click();
    await registrationPage.agree.click(); 
    await registrationPage.acceptCreditAgrement.click();
    await registrationPage.successRegistrationMsg.hover() 
    const successMesg = await registrationPage.successRegistrationMsg.innerText();
    await expect(registrationPage.successRegistrationMsg).toContainText('Thanks for Registering Your');
    await registrationPage.tick.click();
    //await registrationPage.lastContinueButton.click();
    await registrationPage.continueToMyAccount.click();
    await registrationPage.password.waitFor()
    await registrationPage.password.fill("Aa123456789@2025");
    await registrationPage.signinButton.click();
    await landingPage.myAccount.click();
    await expect(landingPage.logout).toBeVisible(); */

    // Alternative "Application unsuccessful" path     
    await page.getByRole('heading', { name: 'Application unsuccessful' }).hover();
    await expect(page.getByRole('heading', { name: 'Application unsuccessful' })).toBeVisible();
  });
});  




