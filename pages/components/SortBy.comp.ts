import { type Locator, type Page} from '@playwright/test'

export class SortByPage {
    readonly page: Page
    readonly sortByLowestPrice : Locator

  constructor(page: Page) {
    this.page = page
    this.sortByLowestPrice = page.getByLabel('Sort By:')
  }

    async sortBy(option:string) {
        await this.sortByLowestPrice.selectOption(`${option}`); // Sort by "Recommended", "Best Seller", "On Sale","New In", "Highest Price", "Lowest Price", "Ratings - High to Low"   
    }
  
}