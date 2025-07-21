const {Given, When, Then, Before, After} = require("@cucumber/cucumber");
const {chromium} = require("playwright-core");
const {expect} = require("@playwright/test");
const { readFileSync} = require("fs");

Before(async function() {
    this.browser = await chromium.launch({headless: true});
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
})

After(async function() {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
})
Given('User is on the login page', async function () {
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/login');
});

When('User enters valid username and valid password', async function () {
    const rawData = readFileSync('./support/data/users.json');
    const validUser = JSON.parse(rawData).validUsers[0];

    await this.page.fill('#email', validUser.username);
    await this.page.fill('#password', validUser.password);
});
When('User clicks the Login button', async function () {
    await this.page.locator('#submit').click();
});
Then('User should be redirected to the contact list', async function () {
    await expect(this.page).toHaveURL('https://thinking-tester-contact-list.herokuapp.com/contactList');
});
When('User enters valid username and invalid password', async function () {
    const rawData = readFileSync('./support/data/users.json');
    const validUser = JSON.parse(rawData).invalidPwdUsers[0];

    await this.page.fill('#email', validUser.username);
    await this.page.fill('#password', validUser.password);
});
Then('User should remain on the login page', async function () {
    await expect(this.page).toHaveURL('https://thinking-tester-contact-list.herokuapp.com/login');
});
Then('User should see an Incorrect username or password error message', async function () {
    const errorMessage = await this.page.locator('#error');
    await expect(errorMessage).toHaveText('Incorrect username or password');
});