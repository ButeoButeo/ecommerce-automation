import { type Locator, type Page, expect } from '@playwright/test'

export class NavigationMainMenuPage {
  readonly page: Page
  //navigation menu bar
  readonly womens: Locator
  readonly tech : Locator
      //sub-navigation menu bar
      readonly accessories: Locator
      readonly tabletsiPads : Locator
      
  constructor(page: Page) {
    this.page = page
    //Main navigation menu bar
    this.tech = page.getByRole('link', { name: 'Technology' })
    this.womens = page.getByRole('link', { name: 'Womens', exact: true })
        //sub-navigation menu bar
        this.accessories = page.getByRole('banner').getByRole('link', { name: 'Accessories' })
        this.tabletsiPads = page.getByRole('link', { name: 'iPads & Tablets' })
    }
}
