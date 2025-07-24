import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, expect } from '@playwright/test';
import { LoginPage } from '../../page_objects/LoginPage.js';
import { DashBoardPage } from '../../page_objects/DashBoardPage.js';

// setDefaultTimeout(60 * 1000);
let page, browser;

Before(async function () {

    browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();

    page = await context.newPage();

});

Given('the user is on the login page', async function () {
    const loginpage = new LoginPage(this.page)
    await loginpage.goto();
});

When('the user logs in with the following credentials:', async function (dataTable) {
    const loginpage = new LoginPage(this.page)
    const data = dataTable.rowsHash();
    await loginpage.login(data.email, data.password)
});

Then('the user should be logged in successfully', async function () {
    const dashBoardPage = new DashBoardPage(this.page)
  await expect(dashBoardPage.logoutButton).toBeVisible()
});

Then('the user should see an error message for invalid credentials', async function () {
    const loginpage = new LoginPage(this.page)
  await expect(loginpage.errorMessage).toHaveText("Incorrect username or password")
});

After(async function () {

    await browser.close();

})
