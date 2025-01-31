import { test, expect } from '../../fixtures/pom.fixture'

test.describe.serial('High Priority Tests - Adding Products to Bag',() => {
  test('A runs first - Add Single Product to Bag', async ({ page, landingPage }) => {
    //const landingPage = new  LandingPage(page);
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.tech.hover(); // Navigate to a category tech
    await landingPage.tabletsiPads.click()
    await landingPage.firstProductFromList.click()// Navigate to a product page
    await page.waitForLoadState();
    //await landingPage.addToBag.waitFor()
    await landingPage.addToBag.click({ force: true }) // Add product to bag
    await landingPage.successMsgAddBag.waitFor()
    await expect(landingPage.successMsgAddBag).toBeVisible()
    await landingPage.closeSuccessMsg.click()
    await landingPage.myBag.click()
    await landingPage.checkBagNumberOfItemsAddes(1) // Verify item count in bag 
  });

  test('B runs second - Invalid  Promo Code', async ({ page, landingPage }) => {
    const validPromoCode = 'ENJOY'; // Replace with an actual valid promo code
    const expiredPromoCode = 'HURRY'; // Replace with an expired promo code
    const invalidPromoCode = 'INVALIDCODE'; // Replace with an invalid promo code
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myBag.click()
    await landingPage.checkOut.click()
    await landingPage.promoCode.waitFor()
    await landingPage.AddPromoCode(`${invalidPromoCode}`); // Enter the valid promo code, Apply promo code
    await landingPage.promoCodeerror.waitFor()
    await expect(landingPage.promoCodeerror).toBeVisible()
    const promoerror = await landingPage.promoCodeerror.textContent()
    expect(promoerror).toBe("Sorry, we don’t recognise the code 'INVALIDCODE'. Please check your code and try again, or try another code.")// Validate invalid code error message
    await landingPage.AddPromoCode(`${expiredPromoCode}`); // Enter the expired promo code, Apply promo code
    await landingPage.promoCodeExpired.waitFor()
    const promoerrorexpired = await landingPage.promoCodeExpired.textContent()
    expect(promoerrorexpired).toBe("Sorry, the code 'HURRY' has now expired. Please try another code.")// Validate invalid code error message
    await landingPage.AddPromoCode(`${validPromoCode}`); // Enter the valid promo code, Apply promo code
    await expect(landingPage.promoCodeerror).not.toBeVisible()
    await expect(landingPage.promoCodeValidAdded).toBeVisible()
  });

  test('C runs third - Remove/delete items from bag', async ({ page, landingPage }) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myBag.click()
    await landingPage.removeItemFromBag.click()// Remove product
    await landingPage.removePromoCodeFromBag.click(); //remoce promo code
    await page.waitForLoadState('networkidle')
    await landingPage.checkBagNumberOfItemsAddes(0)// Verify bag is empty
    await landingPage.closeBag.click()
  });
  test('D Log out', async ({ page , landingPage  }) => {
    //const landingPage = new  LandingPage(page);
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myAccount.click();
    await landingPage.logout.click();
    await expect(page).toHaveURL(/signoff=yes/); // Ensure logged out
  }); 

});
