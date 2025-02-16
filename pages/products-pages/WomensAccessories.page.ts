import { type Locator, type Page, expect } from '@playwright/test'

export class WomensAccessoriesPage {
    readonly page: Page
    //acessory sub-menu accessories items page
    readonly valentinoBag: Locator
    readonly firstItemFromList: Locator
    //acessory sub-menu Dress items page
    readonly dress: Locator
    readonly firstDressFromList: Locator
    //pagination menu bar
    readonly pagination: Locator
    readonly previous: Locator
    //sorting products
    readonly sortByLowestPrice : Locator
  constructor(page: Page) {
    this.page = page
    //acessory sub-menu bag items page
    this.valentinoBag = page.getByText('Valentino Bags Alexia Grey')
    this.firstItemFromList = page.locator('.js-product-title').first()
    //acessory sub-menu dress items page
    this.dress = page.getByText('Phase Eight Veronica Pink')
    this.firstDressFromList = page.locator('.js-product-title-anchor').first()
    //pagination menu bar
    this.pagination = page.locator('.js-product-pagination').locator('li')
    this.previous = page.getByRole('link', { name: 'Previous' }).nth(1)
    //sorting products
    this.sortByLowestPrice = page.getByLabel('Sort By:')
  }
}
