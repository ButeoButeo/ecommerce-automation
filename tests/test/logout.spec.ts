import { test, expect } from '../../fixtures/pom.fixture'

  test('Log out', async ({ page , landingPage  }) => {
    //const landingPage = new  LandingPage(page);
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myAccount.click();
    await landingPage.logout.click();
    await expect(page).toHaveURL(/signoff=yes/); // Ensure logged out
  }); 
