import { type Locator, type Page, expect } from '@playwright/test'

export class TechnologyIPadsTabletsPage {
  readonly page: Page
  // technology filter
  readonly tech : Locator
  readonly tabletsiPads : Locator
  readonly screenSize : Locator
  readonly tabletTypeIpad : Locator
  readonly onSale  : Locator
  readonly colourBlue : Locator
  readonly review : Locator
  readonly firstProductFromList : Locator
  constructor(page: Page) {
    this.page = page
   // technology filter
   this.tabletsiPads = page.getByRole('link', { name: 'iPads & Tablets' })
   this.screenSize = page.getByRole('link', { name: 'refine via Screen Size 5 - 10' })
   this.tabletTypeIpad =  page.getByRole('link', { name: 'refine via Tablet Type iPad' })
   this.onSale = page.getByRole('link', { name: 'refine via On Sale Yes' })
   this.colourBlue = page.getByRole('link', { name: 'refine via Colour Blue' })
   this.review = page.getByRole('link', { name: 'refine via Reviews 5 Star' })
   this.firstProductFromList = page.locator('.js-product-title-anchor').first()
  }

}
