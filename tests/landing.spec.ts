import { expect, test } from '../fixtures/pom.fixture'


test('Landing', async ({
  page,
  landingPage
}) => {
  await page.waitForTimeout(3000)
  await landingPage.visitPage()
})
