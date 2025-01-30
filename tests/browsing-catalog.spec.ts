import { test, expect } from '../fixtures/pom.fixture'
/* import { test, expect } from '@playwright/test'
import { LandingPage } from '../pages/Landing.page' */

test.use({ authUser: 'signup-run-use-same-user' })
//test('Browsing the Catalog', () => { 
//Justification: Smooth catalog browsing is critical for user engagement and product discovery.
  test('Category Navigation', async ({ page , landingPage  }) => {
    //const landingPage = new  LandingPage(page);
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.womens.hover(); // Navigate to "Women" category 
    await landingPage.accessories.click({ force: true }); // Navigate to sub-menu "accessories" category 
    await expect(page).toHaveURL(/.*womens\/\accessories/); // Ensure the URL corresponds to the "Women/accessories" category
    await expect(landingPage.valentinoBag).toBeVisible(); // Verify product list is displayed
 // });

 // test('Search Functionality', async ({ page , landingPage  }) => {
    //const landingPage = new  LandingPage(page);
    await page.getByAltText('Fashion World').click();
    //await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.search.fill('dress'); // Fill search bar
    await landingPage.search.press('Enter'); // Submit search
    await expect(page).toHaveURL(/.*womens.*dress/); // Ensure URL includes the search term
    await expect(landingPage.dress).toBeVisible(); // Verify dress item is displayed
    await expect(landingPage.dress).toContainText('Dress'); // Ensure search results is relevant
//  });

 // test('Pagination', async ({ page , landingPage   }) => {
    //const landingPage = new  LandingPage(page);
    await page.getByAltText('Fashion World').click();
    //await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.womens.click(); // Navigate to a category
    await expect(page).toHaveURL(/.*womens/); // Ensure URL includes navigate to a category
    await expect(landingPage.pagination1Page).toHaveClass('pagination__item pagination__item_pages'); // Verify pagination 1 is the current page
    await expect(landingPage.previous).not.toBeVisible(); // Verify pagination is visible
    await landingPage.pagination2Page.nth(1).click(); // Click next page button
    await page.waitForLoadState('networkidle'); // Wait for page to load
    await landingPage.previous.waitFor()
    await expect(landingPage.previous).toBeVisible(); // Verify pagination previous is visible
    await landingPage.previous.click(); // Click previous page button
    await page.waitForLoadState('networkidle'); // Wait for page to load
    await expect(landingPage.pagination1Page).toHaveClass('js-facet-selection pagination__item_active'); // Verify pagination 1 is the current page
    await expect(landingPage.previous).not.toBeVisible(); // Verify pagination is visible
 // });

 // test('Filter Products', async ({ page , landingPage   }) => {
    //const landingPage = new  LandingPage(page);
    await page.getByAltText('Fashion World').click();
    //await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.tech.hover(); // Navigate to a category tech
    await landingPage.tabletsiPads.click()
    await expect(page).toHaveURL(/.*tech/); // Ensure URL includes navigate to a category tech
    await landingPage.screenSize.click()
    await landingPage.tabletTypeIpad.click()
    await landingPage.onSale.click()
    await landingPage.colourBlue.click()
    await landingPage.review.click()
    await expect(page).toHaveURL(/.*Colour--Blue/); // Ensure URL includes navigate to a category tech
//  });

 // test('Sorting Products', async ({ page, landingPage }) => {
    //const landingPage = new  LandingPage(page);
    await page.getByAltText('Fashion World').click();
   // await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.womens.hover(); // Navigate to "Women" category 
    await landingPage.accessories.click({ force: true }); // Navigate to sub-menu "accessories" category
    await expect(page).toHaveURL(/.*womens\/\accessories/); // Ensure the URL corresponds to the "
    await landingPage.sortByLowestPrice.selectOption('Lowest Price'); // Sort by "Price: Low to High"
    await expect(page).toHaveURL(/.*sort=Lowest/); // Ensure the URL corresponds
    const prices = await page.locator('.product-price').allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('£', '')));
    for (let i = 1; i < numericPrices.length; i++) {
      expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]); // Ensure prices are sorted
    }
//  });

 // test('Product Details', async ({ page }) => {
/*     await page.goto(`${baseURL}women`);
    await page.click('.product-item:first-child'); // Click the first product in the list
    await expect(page).toHaveURL(/.*product/); // Ensure the URL corresponds to a product page
    await expect(page.locator('.product-title')).toBeVisible(); // Verify product title is displayed
    await expect(page.locator('.product-price')).toBeVisible(); // Verify product price is displayed
    await expect(page.locator('.product-description')).toBeVisible(); // Verify product description is displayed
    await expect(page.locator('.product-images')).toBeVisible(); // Verify product images are displayed */
  //});

 // test('Responsive Design', async ({ page }) => {
/*     // Test for desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`${baseURL}women`);
    await expect(page.locator('.product-list')).toBeVisible(); // Verify product list is displayed

    // Test for mobile view
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${baseURL}women`);
    await expect(page.locator('.mobile-menu')).toBeVisible(); // Verify mobile menu is displayed
    await expect(page.locator('.product-list')).toBeVisible(); // Verify product list is displayed

    // Test for tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${baseURL}women`);
    await expect(page.locator('.product-list')).toBeVisible(); // Verify product list is displayed */
  //});
  //test('Adding Products to Bag - Add Single Product to Bag, Invalid  Promo Code and Log out', async ({ page, landingPage }) => {
    //const landingPage = new  LandingPage(page);
    await page.getByAltText('Fashion World').click();
   // await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.tech.hover(); // Navigate to a category tech
    await landingPage.tabletsiPads.click()
    await landingPage.firstProductFromList.click()// Navigate to a product page
    await landingPage.addToBag.waitFor()
    await landingPage.addToBag.click({ force: true }) // Add product to bag
    await expect(landingPage.successMsgAddBag).toBeVisible()
    await landingPage.closeSuccessMsg.click()
    await landingPage.myBag.click()
    await landingPage.checkBagNumberOfItemsAddes("1") // Verify item count in bag 

  const validPromoCode = 'HURRY'; // Replace with an actual valid promo code
  const expiredPromoCode = 'EXPIRED20'; // Replace with an expired promo code
  const invalidPromoCode = 'INVALIDCODE';
    await page.getByAltText('Fashion World').click();
    //await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myBag.click()
    await landingPage.checkOut.click()
    await landingPage.promoCode.waitFor()
    await landingPage.AddPromoCode(`${invalidPromoCode}`); // Enter the valid promo code, Apply promo code
    await landingPage.promoCodeerror.waitFor()
    await expect(landingPage.promoCodeerror).toBeVisible()
    const promoerror = await landingPage.promoCodeerror.textContent()
    await expect(promoerror).toBe("Sorry, we don’t recognise the code 'INVALIDCODE'. Please check your code and try again, or try another code.")// Validate invalid code error message


    await landingPage.myAccount.click();
    await landingPage.logout.click();
    await expect(page).toHaveURL(/.*signoff=yes/); // Ensure logged out


//});
});
