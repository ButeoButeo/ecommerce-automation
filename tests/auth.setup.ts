import { test as setup, expect } from '../fixtures/pom.fixture';

setup('authenticate', async ({ page, landingPage, signInRegisterPage }) => {
    await landingPage.visitPage()
    await landingPage.navigateToLogIn()
    await signInRegisterPage.signInUserAccount()

    // Verify successful sign-in by checking for a specific element on the dashboard
    await expect(page).toHaveURL(`${process.env.URL_AFTER_SIGNIN}`); // Replace with the actual URL pattern after sign-in
    await expect(landingPage.myAccount).toBeVisible();
    await landingPage.myAccount.click();
    await expect(landingPage.logout).toBeVisible();
})