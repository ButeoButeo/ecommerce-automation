import { test as baseTest } from '@playwright/test'
import { LandingPage} from '../pages/Landing.page'
import { RegistrationPage} from '../pages/Registration.page'
type Pages = {
  landingPage: LandingPage
  registrationPage: RegistrationPage
}
const test = baseTest.extend<Pages>({
    landingPage: async ({ page }, use) => {
    await use(new LandingPage(page))
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page))
  },
})
export const describe = test.describe
export const expect = test.expect
export { test }
