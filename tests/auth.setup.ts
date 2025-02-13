import { test as setup, expect } from '../fixtures/pom.fixture';

setup('authenticate', async ({ page, landingPage, signInRegisterPage }) => {
    await landingPage.visitPage()
    await landingPage.navigateToLogIn()
    await signInRegisterPage.signInUserAccount()
    await landingPage.myAccount.click()
});