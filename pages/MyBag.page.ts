import { type Locator, type Page, expect } from '@playwright/test'

export class MyBagPage {
  readonly page: Page
  // Item details Bag
  readonly addToBag : Locator
  readonly successMsgAddBag : Locator
  readonly closeSuccessMsg : Locator
  readonly myBag : Locator
  readonly checkOut:Locator
  readonly removeItemFromBag:Locator
  readonly closeBag:Locator
  readonly removePromoCodeFromBag:Locator
  // promo codes 
  readonly promoCode : Locator
  readonly addCodeButton : Locator
  readonly promoCodeerror : Locator
  readonly promoCodeValidAdded : Locator
  readonly promoCodeExpired : Locator
  constructor(page: Page) {
    this.page = page
    // Item detais Bag
    this.addToBag = page.getByTitle('Add to bag')
    this.successMsgAddBag = page.getByRole('heading', { name: 'Great choice, you deserve it !' })
    this.closeSuccessMsg = page.locator('#postAddToBagModal .gui-btn').first()
    this.myBag = page.getByRole('button', { name: 'My Bag' })
    this.checkOut = page.getByRole('link', { name: 'Continue to Checkout' })
    this.removeItemFromBag = page.getByTitle('Remove item from bag')
    this.closeBag = page.getByRole('button', { name: 'Close' })
    this.removePromoCodeFromBag =  page.locator('a').filter({ hasText: 'Remove' }).first(),
    // promo codes 
    this.promoCode = page.locator('#claimcode')
    this.addCodeButton = page.locator('.promo-details-btn')
    this.promoCodeerror = page.getByText('Sorry, we don’t recognise the')
    this.promoCodeValidAdded = page.getByText('Promotion Code')
    this.promoCodeExpired = page.getByText('Sorry, the code \'HURRY\' has')
  }
  async checkBagNumberOfItemsAdded(numberItems:number) {
    const bagItems = await this.page.getByText(`${numberItems} Item(s)`, { exact: true }).textContent()
    expect(bagItems).toBe(`${numberItems} Item(s)`)
  }
  async addPromoCode(code:string) {
    await this.promoCode.fill(`${code}`)// Enter the valid promo code
    await this.addCodeButton.click() // Apply promo code
  }

}
