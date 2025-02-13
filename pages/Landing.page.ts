import { type Locator, type Page, expect } from '@playwright/test'

export class LandingPage {
  readonly page: Page
  readonly myAccount: Locator
  readonly register: Locator
  readonly newCustomer: Locator
  //navigation menu bar
  readonly womens: Locator
  readonly fashionWorldLogo: Locator
    //sub-navigation menu bar
    readonly accessories: Locator
      //acessory sub-menu accessories items page
      readonly valentinoBag: Locator
      //acessory sub-menu Dress items page
      readonly dress: Locator
      //pagination menu bar
      readonly pagination1Page: Locator
      readonly pagination2Page: Locator
      readonly previous: Locator
  //search field
  readonly search: Locator
  //log out button
  readonly logout: Locator
  // technology filter
  readonly tech : Locator
  readonly tabletsiPads : Locator
  readonly screenSize : Locator
  readonly tabletTypeIpad : Locator
  readonly onSale  : Locator
  readonly colourBlue : Locator
  readonly review : Locator
  readonly firstProductFromList : Locator
  //sorting products
  readonly sortByLowestPrice : Locator
  // Item detais Bag
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
    this.myAccount = page.locator('.gui-dropdown-toggle');
    this.register = page.getByRole('link', { name: 'Register' })
    this.newCustomer = page.getByRole('link', { name: 'I\'m a new customer' })
    //navigation menu bar
    this.womens = page.getByRole('link', { name: 'Womens', exact: true })
    this.fashionWorldLogo = page.getByAltText('Fashion World')
      //sub-navigation menu bar
      this.accessories = page.getByRole('banner').getByRole('link', { name: 'Accessories' })
      //acessory sub-menu bag items page
      this.valentinoBag = page.getByText('Valentino Bags Alexia Grey')
      //acessory sub-menu dress items page
      this.dress = page.getByText('Phase Eight Veronica Pink')
      //pagination menu bar
      this.pagination1Page = page.getByRole('listitem').filter({ hasText: '1'}).nth(80)
      this.pagination2Page = page.getByRole('link', { name: '2', exact: true })
      this.previous = page.getByRole('link', { name: 'Previous' }).nth(1)
    //search field
    this.search = page.getByRole('textbox', { name: 'Search' })
    //log out button
    this.logout = page.getByRole('link', { name: 'Sign Out' })
    // technology filter
    this.tech = page.getByRole('link', { name: 'Technology' })
    this.tabletsiPads = page.getByRole('link', { name: 'iPads & Tablets' })
    this.screenSize = page.getByRole('link', { name: 'refine via Screen Size 5 - 10' })
    this.tabletTypeIpad =  page.getByRole('link', { name: 'refine via Tablet Type iPad' })
    this.onSale = page.getByRole('link', { name: 'refine via On Sale Yes' })
    this.colourBlue = page.getByRole('link', { name: 'refine via Colour Blue' })
    this.review = page.getByRole('link', { name: 'refine via Reviews 5 Star' })
    this.firstProductFromList = page.locator('.product__title.js-product-title').first()
    //sorting products
    this.sortByLowestPrice = page.getByLabel('Sort By:')
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
  async visitPage() {
    await this.page.goto('/');
    await this.page.getByRole('button', { name: 'Accept All Cookies' }).click();
    await expect(this.page).toHaveURL('https://www.fashionworld.co.uk')
  }
  async visitPageWithoutCookiesBanner() {
    await this.page.goto('/');
    await expect(this.page).toHaveURL('https://www.fashionworld.co.uk')
  }
  async navigateToLogIn() {
    await this.myAccount.click();
    await this.register.click();
  }
  async navigateToNewCustomer() {
    await this.myAccount.click();
    await this.register.click();
    await this.newCustomer.click();
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
