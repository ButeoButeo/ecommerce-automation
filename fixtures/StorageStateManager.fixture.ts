import { Browser, TestInfo, WorkerInfo } from '@playwright/test'

import { AuthUser } from '../fixtures/Fixtures.types'

import { BasicAuthStrategyFixture } from '../fixtures/BasicAuthStrategy.fixture'
import { SameUserAfterSignupStrategyFixture } from './SameUserAfterSignupStrategy.fixture'

const AuthStrategies: {
  [key in AuthUser]:
    | typeof BasicAuthStrategyFixture
    | typeof SameUserAfterSignupStrategyFixture
} = {
  basic: BasicAuthStrategyFixture,
  'signup-run-use-same-user': SameUserAfterSignupStrategyFixture,
}

export const storageStateManagerFixture = async (
  { browser, authUser }: { browser: Browser; authUser: AuthUser },
  use: (r: string) => Promise<void>,
  testInfo: TestInfo,
  workerInfo: WorkerInfo
) => {
  const Auth = AuthStrategies[authUser]

  if (!Auth) {
    throw new Error(`Unknown auth strategy: ${authUser}`)
  }

  const strategy = new Auth({ browser, workerInfo, testInfo, use })
  await strategy.setup()
}
