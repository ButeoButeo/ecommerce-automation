import { test as baseTest } from '@playwright/test'
import { LandingPage} from '../pages/Landing.page'
import { SignInRegisterPage} from '../pages/SignInRegister.page'
import { FormStep1DetailsPage} from '../pages/registration-new-costumer/FormStep1Details.page'
import { FormStep2AccountPage} from '../pages/registration-new-costumer/FormStep2Account.page'
import { FormStep3AddressPage} from '../pages/registration-new-costumer/FormStep3Address.page'
import { FormStep4ApplyPage} from '../pages/registration-new-costumer/FormStep4Apply.page'

type Pages = {
  storageStateManager: string
  landingPage: LandingPage
  signInRegisterPage: SignInRegisterPage
  formStep1DetailsPage: FormStep1DetailsPage
  formStep2AccountPage: FormStep2AccountPage
  formStep3AddressPage: FormStep3AddressPage
  formStep4ApplyPage: FormStep4ApplyPage
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
})
export const describe = test.describe
export const expect = test.expect
export { test }
