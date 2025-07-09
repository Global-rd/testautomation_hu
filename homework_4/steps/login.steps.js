const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const testUsers = require('../fixtures/testUsers');


Given('The user navigate to the login page', async function () {
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
});

When('The user is logging with valid credentials', async function () {
    await this.page.fill('#email', testUsers.validUser.email);
    await this.page.fill('#password', testUsers.validUser.password);
    await this.page.click('#submit');
});

When('The user is logging with username {string} and password {string}', async function (email, password) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('#submit');
});

Then('The user should see the contact list page', async function () {
    await this.page.waitForSelector('text=Click on any contact to view the Contact Details');
    const title = await this.page.textContent('h1');
    assert.strictEqual(title, 'Contact List');
});

Then('The user should see an error message', async function () {
  const error = this.page.locator('#error');
  await error.waitFor({ state: 'visible' });
  const text = await error.textContent();
  assert.strictEqual(text.trim(), 'Incorrect username or password');
});
