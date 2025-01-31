import { test, expect } from '../../fixtures/pom.fixture'

test.describe('Adding Products to Bag', () => {
  test.only('run first -Adding Products to Bag - Add Single Product to Bag', async ({ page, landingPage }) => {
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
  //test('Add Multiple Products to Bag', async ({ page }) => {
/*     const products = [`${baseURL}products/product-1`, `${baseURL}products/product-2`];
    for (const product of products) {
      await page.goto(product);
      await page.click('button:has-text("Add to Bag")');
    }
    await expect(page.locator('.shopping-bag-icon .item-count')).toHaveText('2'); // Verify item count in bag */
 // });

 // test('Out-of-Stock Products', async ({ page }) => {
/*     await page.goto(`${baseURL}products/out-of-stock-product`);
    await expect(page.locator('button:has-text("Add to Bag")')).toBeDisabled(); // Ensure "Add to Bag" button is disabled
    await expect(page.locator('.stock-status')).toHaveText('Out of Stock'); // Verify out-of-stock status is displayed */
  //});

 // test('Quantity Updates in Bag', async ({ page }) => {
/*     await page.goto(`${baseURL}products/product-1`);
    await page.click('button:has-text("Add to Bag")');
    await page.goto(`${baseURL}shopping-bag`);
    await page.fill('input.quantity', '2'); // Update quantity
    await page.click('button:has-text("Update")');
    await expect(page.locator('.item-quantity')).toHaveText('2'); // Verify updated quantity */
 // });

 // test('Price Calculation in Bag', async ({ page }) => {
/*     await page.goto(`${baseURL}products/product-1`);
    await page.click('button:has-text("Add to Bag")');
    await page.goto(`${baseURL}shopping-bag`);
    const pricePerItem = await page.locator('.item-price').innerText();
    const totalPrice = await page.locator('.total-price').innerText();
    expect(Number(totalPrice)).toBeCloseTo(Number(pricePerItem) * 1); // Verify total price matches price per item times quantity */
 // });

  //test('Bag Persistence Across Sessions', async ({ page, browser }) => {
/*     await page.goto(`${baseURL}products/product-1`);
    await page.click('button:has-text("Add to Bag")');

    // Close and reopen browser context to simulate a new session
    const newContext = await browser.newContext();
    const newPage = await newContext.newPage();
    await newPage.goto(baseURL);
    await newPage.click('text=Login');
    await newPage.fill('#email', validEmail);
    await newPage.fill('#password', validPassword);
    await newPage.click('button:has-text("Login")');

    await newPage.click('.shopping-bag-icon'); // Open shopping bag
    await expect(newPage.locator('.item-name')).toContainText('Product 1'); // Verify product persists in bag */
 // });

 // test('Remove Product from Bag', async ({ page }) => {
/*     await page.goto(`${baseURL}products/product-1`);
    await page.click('button:has-text("Add to Bag")');
    await page.goto(`${baseURL}shopping-bag`);
    await page.click('button:has-text("Remove")'); // Remove product
    await expect(page.locator('.shopping-bag-icon .item-count')).toHaveText('0'); // Verify bag is empty */
 // });
  const validPromoCode = 'HURRY'; // Replace with an actual valid promo code
  const expiredPromoCode = 'EXPIRED20'; // Replace with an expired promo code
  const invalidPromoCode = 'INVALIDCODE';
  test('run second - Invalid  Promo Code', async ({ page, landingPage }) => {
    //const landingPage = new  LandingPage(page);
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myBag.click()
    await landingPage.checkOut.click()
    await landingPage.promoCode.waitFor()
    await landingPage.AddPromoCode(`${invalidPromoCode}`); // Enter the valid promo code, Apply promo code
    await landingPage.promoCodeerror.waitFor()
    await expect(landingPage.promoCodeerror).toBeVisible()
    const promoerror = await landingPage.promoCodeerror.textContent()
    expect(promoerror).toBe("Sorry, we don’t recognise the code 'INVALIDCODE'. Please check your code and try again, or try another code.")// Validate invalid code error message

  });

  test('rum foufth - Remove/delete item from bag', async ({ page, landingPage }) => {
    await landingPage.visitPageWithoutCookiesBanner();
    await landingPage.myBag.click()
    await landingPage.removeItemFromBag.click()
    await page.waitForLoadState('networkidle')
    await landingPage.closeBag.click()
  });


 // test('Promo Code Expiry', async ({ page }) => {
/*     await page.fill('input[name="promoCode"]', expiredPromoCode); // Enter an expired promo code
    await page.click('button:has-text("Apply")'); // Apply promo code
    const errorMessage = await page.locator('.promo-error').textContent(); // Replace with actual selector
    expect(errorMessage).toContain('Promo code has expired'); // Verify appropriate error message for expiry */
 // });

 // test('Stacking Promo Codes', async ({ page }) => {
   // await page.fill('input[name="promoCode"]', validPromoCode); // Enter the first valid promo code
/*     await page.click('button:has-text("Apply")'); // Apply promo code
    const discount1 = await page.locator('.promo-discount').textContent(); // Verify first discount
    expect(discount1).toContain('10%');

    await page.fill('input[name="promoCode"]', 'EXTRA5'); // Enter another valid promo code
    await page.click('button:has-text("Apply")'); // Attempt to apply another promo code
    const stackingError = await page.locator('.promo-error').textContent(); // Replace with actual selector
    expect(stackingError).toContain('Cannot stack promo codes'); // Verify error if stacking is not supported */
 // });

 // test('Promo Code Removal', async ({ page }) => {
/*     await page.fill('input[name="promoCode"]', validPromoCode); // Enter a valid promo code
    await page.click('button:has-text("Apply")'); // Apply promo code
    await page.click('.remove-promo'); // Remove the applied promo code (replace selector with actual)
    const discount = await page.locator('.promo-discount').textContent(); // Verify discount removal
    expect(discount).toBe(''); // Ensure no discount is applied after removal */
 // });

});
