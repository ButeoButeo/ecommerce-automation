import { test, expect } from '../../fixtures/pom.fixture'

test.describe(' Medium Priority Tests - Browsing the Catalog', () => { 
//Justification: Smooth catalog browsing is critical for user engagement and product discovery.
  test('Category Navigation', async ({ page,landingPage, womensAccessoriesPage, navigationMainMenuPage}) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await navigationMainMenuPage.womens.hover(); // Navigate to "Women" category 
    await navigationMainMenuPage.accessories.click({ force: true }); // Navigate to sub-menu "accessories" category 
    await expect(page).toHaveURL(/.*womens\/\accessories/); // Ensure the URL corresponds to the "Women/accessories" category
    await expect(womensAccessoriesPage.firstItemFromList).toBeVisible(); // Verify product list is displayed
  });   

  test(' Search Functionality', async ({ page,landingPage, womensAccessoriesPage}) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.search.fill('dress'); // Fill search bar
    await landingPage.search.press('Enter'); // Submit search
    await expect(page).toHaveURL(/.*womens.*dress/); // Ensure URL includes the search term
    await expect(womensAccessoriesPage.firstDressFromList).toBeVisible(); // Verify dress item is displayed
    await expect(womensAccessoriesPage.firstDressFromList).toContainText('Dress'); // Ensure search results is relevant
  }); 

  test(' Pagination ', async ({ page,landingPage, womensAccessoriesPage, navigationMainMenuPage}) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await navigationMainMenuPage.womens.click(); // Navigate to a category
    await expect(page).toHaveURL(/.*womens/); // Ensure URL includes navigate to a category
    await landingPage.myBag.hover();
    await expect(womensAccessoriesPage.pagination.nth(1)).toHaveClass('js-facet-selection pagination__item_active'); // Verify pagination 1 is the current page
    await expect(womensAccessoriesPage.previous).not.toBeVisible(); // Verify pagination is visible
    await womensAccessoriesPage.pagination.nth(2).click(); // Click next page button
    await expect(womensAccessoriesPage.pagination.nth(2)).toBeEnabled(); // Verify pagination 2 is enabled
    await page.waitForLoadState('domcontentloaded'); // Wait for page to load
    await womensAccessoriesPage.pagination.nth(2).waitFor();
    await expect(womensAccessoriesPage.pagination.nth(2)).toHaveClass('js-facet-selection pagination__item_active'); 
    await womensAccessoriesPage.previous.waitFor()
    await expect(womensAccessoriesPage.previous).toBeVisible(); // Verify pagination previous is visible
    await womensAccessoriesPage.pagination.nth(1).click(); // Click page 1 button
    await expect(womensAccessoriesPage.pagination.nth(1)).toBeEnabled(); // Verify pagination 1 is enabled
    await page.reload(); // Reload page
    await page.waitForLoadState('networkidle'); // Wait for page to load
    await womensAccessoriesPage.previous.click(); // Click previous page button
    await womensAccessoriesPage.pagination.nth(1).click()
    await expect(womensAccessoriesPage.pagination.nth(1)).toBeEnabled(); // Verify pagination 1 is enabled
    await page.waitForLoadState('domcontentloaded'); // Wait
    await womensAccessoriesPage.pagination.nth(2).scrollIntoViewIfNeeded(); // Scroll to pagination 1
    await page.reload(); // Reload page
    await expect(womensAccessoriesPage.pagination.nth(1)).toHaveClass('js-facet-selection pagination__item_active'); // Verify pagination 1 is the current page
    await page.reload(); // Reload page
    await expect(womensAccessoriesPage.previous).not.toBeVisible(); // Verify pagination is visible
 });

  test('Filter Products', async ({ page,landingPage, technologyIPadsTabletsPage, navigationMainMenuPage}) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await navigationMainMenuPage.tech.hover(); // Navigate to a category tech
    await navigationMainMenuPage.tabletsiPads.click()
    await expect(page).toHaveURL(/.*tech/); // Ensure URL includes navigate to a category tech
    await technologyIPadsTabletsPage.screenSize.click()
    await technologyIPadsTabletsPage.tabletTypeIpad.click()
    await technologyIPadsTabletsPage.onSale.click()
    await technologyIPadsTabletsPage.colourBlue.click()
    await technologyIPadsTabletsPage.review.click()
    await expect(page).toHaveURL(/.*Colour--Blue/); // Ensure URL includes navigate to a category tech
  });

  test('Sorting Products ', async ({page,landingPage, womensAccessoriesPage, navigationMainMenuPage}) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await navigationMainMenuPage.womens.hover(); // Navigate to "Women" category 
    await navigationMainMenuPage.accessories.click({ force: true }); // Navigate to sub-menu "accessories" category
    await expect(page).toHaveURL(/.*womens\/\accessories/); // Ensure the URL corresponds to the "
    await womensAccessoriesPage.sortByLowestPrice.sortBy('Lowest Price'); // Sort by "Price: Low to High"
    await landingPage.myAccount.click();
    await landingPage.myBag.hover()
    await expect(page).toHaveURL(/.*sort=Lowest/); // Ensure the URL corresponds
    const prices = await page.locator('.product-price').allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('£', '')));
    for (let i = 1; i < numericPrices.length; i++) {
      expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]); // Ensure prices are sorted
    }
  });

});
