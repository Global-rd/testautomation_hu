const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");

const { chromium, expect } = require("@playwright/test");

const { Page } = require("playwright");

setDefaultTimeout(60 * 1000);

let page, browser;

Before(async function () {

    browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();

    page = await context.newPage();

});

After(async function () {
    await this.closeBrowserSession();
});

Given('I navigate to the login page', async function () {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
});

When('I enter username {string} and password {string}', async function (username, password) {

    await page.fill('#username', username);
    await page.fill('#password', password);
});

When('I click the login button', async function () {

    await page.click('#submit');
});

Then('I should be redirected to the secure area', async function () {

    await page.waitForURL('**/logged-in-successfully/');
    const content = await page.textContent('h1');
    expect(content).toContain('Logged In Successfully');
});