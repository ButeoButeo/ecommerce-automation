import { test as setup, expect } from '@playwright/test';
import path from 'path';



const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Accept All Cookies' }).click();
    await page.locator('.gui-dropdown-toggle').click();
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('textbox', { name: 'Email or account number' }).fill(`${process.env.BASIC_AUTH_EMAIL}`)
    await page.getByRole('textbox', { name: 'Password' }).clear()
    await page.getByRole('textbox', { name: 'Password' }).fill(`${process.env.BASIC_AUTH_PASSWORD}`)
    await page.getByRole('button', { name: 'Sign in' }).click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(20000)

  await page.context().storageState({ path: authFile });
});