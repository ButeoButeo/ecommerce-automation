import {expect, test } from "../../fixtures/pom.fixture"
import { faker } from '@faker-js/faker';

const email = faker.internet.email();
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const password = faker.internet.password();

//Justification: This is a critical feature as it allows users to create accounts, which is the entry point for personalizing their shopping experience and securing their data.
test.describe(' Authentication-registration', async () => {

  test.beforeEach(async ({ landingPage }) => {
    await landingPage.visitPage();
    await landingPage.navigateToNewCustomer()
  })

  test('TC Scenario 1: - validation for mandatory fields first name and last name', async ({formStep1DetailsPage}) => {
    //step 1 - validation for mandatory fields first name and last name
    await formStep1DetailsPage.continueWithEmails.click();
    await formStep1DetailsPage.validateMandatoryFields()
  });  

  test('TC Scenario 2: - validation invalid Email Format', async ({formStep1DetailsPage}) => {
    await formStep1DetailsPage.fillDetailsForm1("Invalid-email" , 'Mr', firstName, lastName, '1', 'January', '1990', '1234567890', 'P@ssw0rd123');
    await formStep1DetailsPage.continueWithEmails.click();
    //step 2 - validation invalid Email Format
    await formStep1DetailsPage.validateInvalidEmailFormat()
    //step 4 - validation for password strength
    await formStep1DetailsPage.validatePasswordStrength()
  });  

  test('TC Scenario 3: - validate phone number format', async ({formStep1DetailsPage}) => {
    await formStep1DetailsPage.fillDetailsForm1(email , 'Mr', firstName, lastName, '1', 'January', '1990', '1234567890', password);
    await formStep1DetailsPage.continueWithEmails.click();
    //step 5 - validate phone number format
    await formStep1DetailsPage.validatePhoneNumberFormat()
  });  

  test('TC Scenario 4: - successful submission of the first step registration form', async ({page, landingPage, formStep1DetailsPage, formStep2DetailsPage, formStep3DetailsPage}) => {
    // step 6 - successful submission of the first step registration form
    await formStep1DetailsPage.fillDetailsForm1(email, 'Mr', firstName, lastName,  '1', 'January', '1990', '07512345678','Aa123456789@2025');
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
    //step 12 - validate successful registration
    await formStep3DetailsPage.doNoApplyCredit.click();
    await formStep2DetailsPage.continueButton.click();
    await formStep3DetailsPage.agree.click(); 
    await formStep3DetailsPage.acceptCreditAgrement.click();
    await formStep3DetailsPage.successRegistrationMsg.hover() 
    const successMesg = await formStep3DetailsPage.successRegistrationMsg.innerText();
    await expect(formStep3DetailsPage.successRegistrationMsg).toContainText('Thanks for Registering Your');
    await formStep3DetailsPage.lastContinueButton.click();
    await expect(landingPage.myAccount).toBeVisible(); 
    await landingPage.myAccount.click();
  });
});  




