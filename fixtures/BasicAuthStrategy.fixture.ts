import { LogInPage } from '../src/Login.page'
import fs from 'fs'
import path from 'path'

import { AuthStrategy, AuthStrategyConfig } from '../fixtures/AuthStrategy'
import { LandingPage } from '../pages/Landing.page'

export class BasicAuthStrategyFixture extends AuthStrategy {
  constructor(config: AuthStrategyConfig) {
    super(config)
  }

  public async setup() {
    const projectName = this.testInfo.project.name
    const workerIndex = this.testInfo.workerIndex

    const uniqueId = `${Date.now()}-${projectName}`
    const workertNameId = `${workerIndex}`

    const id = `basic-auth-${workertNameId}`
    const fileName = path.resolve(
      this.testInfo.project.outputDir,
      `.auth/${id}.json`
    )

    if (fs.existsSync(fileName)) {
      await this.use(fileName)
      return
    }

    const page = await this.browser.newPage({
      storageState: undefined,
      baseURL: process.env.BASE_URL,
    })

    const loginPage = new LogInPage(page)
    const landingPage = new LandingPage(page)

    await loginPage.doLogIn({
      email: process.env.BASIC_AUTH_EMAIL,
      password: process.env.BASIC_AUTH_PASSWORD,
    })

    await landingPage.search.click()
    await page.context().storageState({ path: fileName })
    await page.close()
    await this.use(fileName)
  }
}
