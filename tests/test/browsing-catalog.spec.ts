import { test, expect } from '../../fixtures/pom.fixture'

test.describe.parallel(' Medium Priority Tests - Browsing the Catalog', () => { 
//Justification: Smooth catalog browsing is critical for user engagement and product discovery.
  test('Category Navigation', async ({ page,landingPage}) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.womens.hover(); // Navigate to "Women" category 
    await landingPage.accessories.click({ force: true }); // Navigate to sub-menu "accessories" category 
    await expect(page).toHaveURL(/.*womens\/\accessories/); // Ensure the URL corresponds to the "Women/accessories" category
    await expect(landingPage.valentinoBag).toBeVisible(); // Verify product list is displayed
  });   

  test(' Search Functionality', async ({ page,landingPage}) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.search.fill('dress'); // Fill search bar
    await landingPage.search.press('Enter'); // Submit search
    await expect(page).toHaveURL(/.*womens.*dress/); // Ensure URL includes the search term
    await expect(landingPage.dress).toBeVisible(); // Verify dress item is displayed
    await expect(landingPage.dress).toContainText('Dress'); // Ensure search results is relevant
  }); 

  test(' Pagination ', async ({ page,landingPage}) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.womens.click(); // Navigate to a category
    await expect(page).toHaveURL(/.*womens/); // Ensure URL includes navigate to a category
    await landingPage.myBag.hover();
    await expect(landingPage.pagination.nth(1)).toHaveClass('js-facet-selection pagination__item_active'); // Verify pagination 1 is the current page
    await expect(landingPage.previous).not.toBeVisible(); // Verify pagination is visible
    await landingPage.pagination.nth(2).click(); // Click next page button
    await expect(landingPage.pagination.nth(2)).toBeEnabled(); // Verify pagination 2 is enabled
    await page.waitForLoadState('domcontentloaded'); // Wait for page to load
    await expect(landingPage.pagination.nth(2)).toHaveClass('js-facet-selection pagination__item_active'); 
    await landingPage.previous.waitFor()
    await expect(landingPage.previous).toBeVisible(); // Verify pagination previous is visible
    await landingPage.pagination.nth(1).click(); // Click page 1 button
    await expect(landingPage.pagination.nth(1)).toBeEnabled(); // Verify pagination 1 is enabled
    await page.reload(); // Reload page
    await page.waitForLoadState('networkidle'); // Wait for page to load
    await landingPage.previous.click(); // Click previous page button
    await landingPage.pagination.nth(1).click()
    await expect(landingPage.pagination.nth(1)).toBeEnabled(); // Verify pagination 1 is enabled
    await page.waitForLoadState('domcontentloaded'); // Wait
    await landingPage.pagination.nth(2).scrollIntoViewIfNeeded(); // Scroll to pagination 1
    await page.reload(); // Reload page
    await expect(landingPage.pagination.nth(1)).toHaveClass('js-facet-selection pagination__item_active'); // Verify pagination 1 is the current page
    await page.reload(); // Reload page
    await expect(landingPage.previous).not.toBeVisible(); // Verify pagination is visible
 });

  test('Filter Products', async ({ page,landingPage}) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.tech.hover(); // Navigate to a category tech
    await landingPage.tabletsiPads.click()
    await expect(page).toHaveURL(/.*tech/); // Ensure URL includes navigate to a category tech
    await landingPage.screenSize.click()
    await landingPage.tabletTypeIpad.click()
    await landingPage.onSale.click()
    await landingPage.colourBlue.click()
    await landingPage.review.click()
    await expect(page).toHaveURL(/.*Colour--Blue/); // Ensure URL includes navigate to a category tech
  });

  test('Sorting Products ', async ({page,landingPage}) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.womens.hover(); // Navigate to "Women" category 
    await landingPage.accessories.click({ force: true }); // Navigate to sub-menu "accessories" category
    await expect(page).toHaveURL(/.*womens\/\accessories/); // Ensure the URL corresponds to the "
    await landingPage.sortByLowestPrice.selectOption('Lowest Price'); // Sort by "Price: Low to High"
    await landingPage.myAccount.click();
    await expect(page).toHaveURL(/.*sort=Lowest/); // Ensure the URL corresponds
    const prices = await page.locator('.product-price').allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('£', '')));
    for (let i = 1; i < numericPrices.length; i++) {
      expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]); // Ensure prices are sorted
    }
  });

});
