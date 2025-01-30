import { test as baseTest } from '@playwright/test'
import { LandingPage} from '../pages/Landing.page'
import { RegistrationPage} from '../pages/Registration.page'

import { AuthUser } from './Fixtures.types'
import { storageStateManagerFixture } from './StorageStateManager.fixture'

type Pages = {
  authUser: AuthUser
  storageStateManager: string
  landingPage: LandingPage
  registrationPage: RegistrationPage
}

type Options = {
  workerStorageState: string
  workerInfo: string
  testInfo: string
}

const test = baseTest.extend<Pages, Options>({
  authUser: 'signup-run-use-same-user',
    landingPage: async ({ page }, use) => {
    await use(new LandingPage(page))
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page))
  },
  storageState: ({ storageStateManager }, use) => use(storageStateManager),

  storageStateManager: storageStateManagerFixture,
})
export const describe = test.describe
export const expect = test.expect
export { test }
