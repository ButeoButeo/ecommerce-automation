import { test as baseTest } from '@playwright/test'
import { LandingPage} from '../pages/Landing.page'
import { SignInRegisterPage} from '../pages/SignInRegister.page'
import { FormStep1DetailsPage} from '../pages/registration-new-costumer/FormStep1Details.page'
import { FormStep2DetailsPage} from '../pages/registration-new-costumer/FormStep2Account.page'
import { FormStep3DetailsPage} from '../pages/registration-new-costumer/FormStep3Address.page'

type Pages = {
  storageStateManager: string
  landingPage: LandingPage
  signInRegisterPage: SignInRegisterPage
  formStep1DetailsPage: FormStep1DetailsPage
  formStep2DetailsPage: FormStep2DetailsPage
  formStep3DetailsPage: FormStep3DetailsPage
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
  formStep2DetailsPage: async ({ page }, use) => {
    await use(new FormStep2DetailsPage(page))
  },
  formStep3DetailsPage: async ({ page }, use) => {
    await use(new FormStep3DetailsPage(page))
  },
})
export const describe = test.describe
export const expect = test.expect
export { test }
