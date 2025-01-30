import { Browser, TestInfo, WorkerInfo } from '@playwright/test'

export type AuthStrategyConfig = {
  browser: Browser
  workerInfo: WorkerInfo
  testInfo: TestInfo
  use: (r: string) => Promise<void>
}

export abstract class AuthStrategy {
  workerInfo: WorkerInfo
  testInfo: TestInfo
  use: (r: string) => Promise<void>
  browser: Browser

  constructor(config: AuthStrategyConfig) {
    this.testInfo = config.testInfo
    this.workerInfo = config.workerInfo
    this.use = config.use
    this.browser = config.browser
  }
  abstract setup(): Promise<void>
}
