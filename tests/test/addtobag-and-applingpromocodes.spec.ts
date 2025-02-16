import { test, expect } from '../../fixtures/pom.fixture'
import * as promocodes from '../../promocodes.config';
import * as errormsg from '../../errormsg.config';

test.describe.serial('High Priority Tests - Adding Products to Bag',() => {
  test('A runs first - Add Single Product to Bag', async ({ page, landingPage, technologyIPadsTabletsPage, myBagPage, navigationMainMenuPage }) => {
    //const landingPage = new  LandingPage(page);
    await landingPage.visitPageWithoutCookiesBanner();
    await navigationMainMenuPage.tech.hover(); // Navigate to a category tech
    await navigationMainMenuPage.tabletsiPads.click()
    await technologyIPadsTabletsPage .firstProductFromList.click()// Navigate to a product page
    await page.waitForLoadState('domcontentloaded');
    //await landingPage.addToBag.waitFor()
    await myBagPage.addToBag.click({ force: true }) // Add product to bag
    await myBagPage.successMsgAddBag.waitFor()
    await expect(myBagPage.successMsgAddBag).toBeVisible()
    await myBagPage.closeSuccessMsg.click()
    await myBagPage.myBag.click()
    await myBagPage.checkBagNumberOfItemsAdded(1) // Verify item count in bag 
  });

  test('B runs second - Invalid  Promo Code', async ({ page, landingPage, myBagPage }) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myBag.click()
    await myBagPage.checkOut.click()
    await myBagPage.promoCode.waitFor()

    // Test invalid promo code
    await myBagPage.addPromoCode(promocodes.INVALID_PROMO_CODE); // Enter the valid promo code, Apply promo code
    await myBagPage.promoCodeerror.waitFor()
    await expect(myBagPage.promoCodeerror).toBeVisible()
    const promoerror = await myBagPage.promoCodeerror.textContent()
    expect(promoerror).toBe(errormsg.INVALID_PROMO_CODE_ERROR)// Validate invalid code error message

    // Test expired promo code
    await myBagPage.addPromoCode(promocodes.EXPIRED_PROMO_CODE); // Enter the expired promo code, Apply promo code
    await myBagPage.promoCodeExpired.waitFor()
    const promoerrorexpired = await myBagPage.promoCodeExpired.textContent()
    expect(promoerrorexpired).toBe("Sorry, the code 'HURRY' has now expired. Please try another code.")// Validate invalid code error message
    await myBagPage.addPromoCode(errormsg.EXPIRED_PROMO_CODE_ERROR); // Enter the valid promo code, Apply promo code

    // Test valid promo code
    await myBagPage.addPromoCode(promocodes.VALID_PROMO_CODE); // Enter the valid promo code, Apply promo code
    await expect(myBagPage.promoCodeerror).not.toBeVisible()
    await expect(myBagPage.promoCodeValidAdded).toBeVisible()
  });

  test('C runs third - Remove/delete items from bag', async ({ page, landingPage, myBagPage  }) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myBag.click()
    await myBagPage.removeItemFromBag.click()// Remove product
    await myBagPage.removePromoCodeFromBag.click(); //remoce promo code
    await page.waitForLoadState('domcontentloaded')
    await myBagPage.checkBagNumberOfItemsAdded(0)// Verify bag is empty
    await myBagPage.closeBag.click()
  });
  
  test('D Log out', async ({ page , landingPage  }) => {
    //const landingPage = new  LandingPage(page);
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myAccount.click();
    await landingPage.logout.click();
    await expect(page).toHaveURL(/signoff=yes/); // Ensure logged out
  }); 

});
