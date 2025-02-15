import { test as baseTest } from '@playwright/test'
import { LandingPage} from '../pages/Landing.page'
import { SignInRegisterPage} from '../pages/SignInRegister.page'
import { FormStep1DetailsPage} from '../pages/registration-new-costumer/FormStep1Details.page'
import { FormStep2AccountPage} from '../pages/registration-new-costumer/FormStep2Account.page'
import { FormStep3AddressPage} from '../pages/registration-new-costumer/FormStep3Address.page'
import { FormStep4ApplyPage} from '../pages/registration-new-costumer/FormStep4Apply.page'
import { TechnologyIPadsTabletsPage} from '../pages/products-pages/TechnologyIPadsTablets.page'
import { WomensAccessoriesPage} from '../pages/products-pages/WomensAccessories.page'
import { MyBagPage} from '../pages/MyBag.page'
import { NavigationMainMenuPage} from '../pages/NavigationMainMenu.page'

type Pages = {
  storageStateManager: string
  landingPage: LandingPage
  signInRegisterPage: SignInRegisterPage
  formStep1DetailsPage: FormStep1DetailsPage
  formStep2AccountPage: FormStep2AccountPage
  formStep3AddressPage: FormStep3AddressPage
  formStep4ApplyPage: FormStep4ApplyPage
  technologyIPadsTabletsPage: TechnologyIPadsTabletsPage
  womensAccessoriesPage: WomensAccessoriesPage
  myBagPage: MyBagPage
  navigationMainMenuPage: NavigationMainMenuPage
}

const test = baseTest.extend<Pages/* , Options */>({
    landingPage: async ({ page }, use) => {
    await use(new LandingPage(page))
  },
  signInRegisterPage: async ({ page }, use) => {
  await use(new SignInRegisterPage(page))
  },
  formStep1DetailsPage: async ({ page }, use) => {
  await use(new FormStep1DetailsPage(page))
  },
  formStep2AccountPage: async ({ page }, use) => {
    await use(new FormStep2AccountPage(page))
  },
  formStep3AddressPage: async ({ page }, use) => {
    await use(new FormStep3AddressPage(page))
  },
  formStep4ApplyPage: async ({ page }, use) => {
    await use(new FormStep4ApplyPage(page))
  },
  technologyIPadsTabletsPage: async ({ page }, use) => {
    await use(new TechnologyIPadsTabletsPage(page))
  },
  womensAccessoriesPage: async ({ page }, use) => {
    await use(new WomensAccessoriesPage(page))
  },
  myBagPage: async ({ page }, use) => {
    await use(new MyBagPage(page))
  },
  navigationMainMenuPage: async ({ page }, use) => {
    await use(new NavigationMainMenuPage(page))
  },
})
export const describe = test.describe
export const expect = test.expect
export { test }
