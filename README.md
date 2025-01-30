# ecommerce-automation
This project contains automated test cases for the e-commerce website using Playwright with the Page Object Model (POM). The test cases cover specified scenarios.

## Prerequisites
- Node.js installed on your machine.

# Framework setup and installation 
1. Clone the repository:
   ```bash
   git clone https://github.com/ButeoButeo/ecommerce-automation
   cd ecommerce-automation

## Setting up the local environment
Inside every application folder, there is a `.env.example` file that you can use as a template to create your own `.env` file.

You can use the following command to copy the file and create your own `.env` file:

```shell
cd ecommerce-automation
cp .env.example .env
```

For example, assuming we want to test the ecommerce-automation application, the `.env` file would look like this:

```dotenv
BASE_URL=https://www.fashionworld.co.uk/ # This will run the tests against the web application
BASIC_AUTH_EMAIL=your account email
BASIC_AUTH_PASSWORD=your password email
```
For security reasons the new browser may ask for a sended email code to login validation. In proper staging envirment this step should be asked to be disabled in order to run automation testing.

# Dependencies 

# Test execution 
npx playwright test or npm test

# Viewing reports - Generate allure reports
npx allure generate allure-results —clean && npx allure open
![alt text](/img/Screenshot2.png)

# Any other relevant information 
Download trace file from the allure-report and open in:
https://trace.playwright.dev/ to view the report
![alt text](/img/Screenshot1.png)
