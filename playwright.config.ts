"use strict";

import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv'
dotenv.config()

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 30000*10, // Increase timeout to 60 seconds
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  //retry locally
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'],['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true, // Set to false to run in headed mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retry-with-trace',
    launchOptions: {
      args: ['--disable-web-security', '--disable-http2'],
      
    },
    extraHTTPHeaders: { 'Upgrade-Insecure-Requests': '1' }
  },

  /* Configure projects for major browsers */
  projects: [
        // Setup project
        { name: 'setup', testMatch: /.*\.setup\.ts/ },
     {
      name: 'chromium',
      testDir: './tests/test',
      use: { ...devices['Desktop Chromium'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
       },
      //dependencies: ['setup'],
    }, 
    {
      name: 'chromium registration',
      testDir: './tests/authentication-registration',
      use: { ...devices['Desktop Chromium']},
    }
/*     {
      name: 'firefox',
      testDir: './tests/test',
      use: { ...devices['Desktop Firefox'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
       },
      dependencies: ['setup'],
    }, 
    {
      name: 'firefox registration',
      testDir: './tests/authentication-registration',
      use: { ...devices['Desktop Firefox']},

    },      
    {
      name: 'webkit',
      testDir: './tests/test',
      use: { ...devices['Desktop Safari'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
       },
      dependencies: ['setup'],
    }, 
    {
      name: 'webkit registration',
      testDir: './tests/authentication-registration',
      use: { ...devices['Desktop Safari']},
    },   */
  ],
});
