import { test, expect } from '../fixtures/pom.fixture'

test.use({ authUser: 'signup-run-use-same-user' })
test.describe('Browsing the Catalog', () => {
//Justification: Smooth catalog browsing is critical for user engagement and product discovery.
  test.only('Category Navigation', async ({ page, landingPage }) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.womens.hover(); // Navigate to "Women" category 
    await landingPage.accessories.click({ force: true }); // Navigate to sub-menu "accessories" category 
    await expect(page).toHaveURL(/.*womens\/\accessories/); // Ensure the URL corresponds to the "Women/accessories" category
    await expect(landingPage.valentinoBag).toBeVisible(); // Verify product list is displayed
  });

  test.only('Search Functionality', async ({ page, landingPage  }) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.search.fill('dress'); // Fill search bar
    await landingPage.search.press('Enter'); // Submit search
    await expect(page).toHaveURL(/.*womens.*dress/); // Ensure URL includes the search term
    await expect(landingPage.dress).toBeVisible(); // Verify dress item is displayed
    await expect(landingPage.dress).toContainText('Dress'); // Ensure search results is relevant
  });

  test.only('Pagination', async ({ page, landingPage  }) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.womens.click(); // Navigate to a category
    await expect(page).toHaveURL(/.*womens/); // Ensure URL includes navigate to a category
    await expect(landingPage.pagination1Page).toHaveClass('pagination__item pagination__item_pages'); // Verify pagination 1 is the current page
    await expect(landingPage.previous).not.toBeVisible(); // Verify pagination is visible
    await landingPage.pagination2Page.nth(1).click(); // Click next page button
    await page.waitForLoadState('networkidle'); // Wait for page to load
    await expect(landingPage.previous).toBeVisible(); // Verify pagination previous is visible
    await landingPage.previous.click(); // Click previous page button
    await page.waitForLoadState('networkidle'); // Wait for page to load
    await expect(landingPage.pagination1Page).toHaveClass('js-facet-selection pagination__item_active'); // Verify pagination 1 is the current page
    await expect(landingPage.previous).not.toBeVisible(); // Verify pagination is visible
  });

  test('Filter Products', async ({ page }) => {
/*     await page.goto(`${baseURL}women`);
    await page.click('button:has-text("Filter")'); // Open filter options
    await page.click('label:has-text("Size M")'); // Select "Size M" filter
    await page.click('label:has-text("Color Red")'); // Select "Color Red" filter
    await page.click('button:has-text("Apply Filters")'); // Apply filters
    await expect(page.locator('.product-item')).toHaveCount(5); // Verify filtered product count (adjust as needed)
    await expect(page.locator('.filter-tag')).toContainText('Size M'); // Ensure filter tags are visible
    await expect(page.locator('.filter-tag')).toContainText('Color Red'); */
  });

  test('Sorting Products', async ({ page }) => {
/*     await page.goto(`${baseURL}women`);
    await page.selectOption('select.sort-dropdown', 'price-low-to-high'); // Sort by "Price: Low to High"
    const prices = await page.locator('.product-price').allTextContents();
    const numericPrices = prices.map(price => parseFloat(price.replace('£', '')));
    for (let i = 1; i < numericPrices.length; i++) {
      expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i - 1]); // Ensure prices are sorted
    } */
  });

  test('Product Details', async ({ page }) => {
/*     await page.goto(`${baseURL}women`);
    await page.click('.product-item:first-child'); // Click the first product in the list
    await expect(page).toHaveURL(/.*product/); // Ensure the URL corresponds to a product page
    await expect(page.locator('.product-title')).toBeVisible(); // Verify product title is displayed
    await expect(page.locator('.product-price')).toBeVisible(); // Verify product price is displayed
    await expect(page.locator('.product-description')).toBeVisible(); // Verify product description is displayed
    await expect(page.locator('.product-images')).toBeVisible(); // Verify product images are displayed */
  });

  test('Responsive Design', async ({ page }) => {
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
  });
  test.skip('Log out', async ({ page, landingPage }) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myAccount.click();
    await landingPage.logout.click();
    await expect(page).toHaveURL(/signoff=yes/); // Ensure logged out
  });

});
