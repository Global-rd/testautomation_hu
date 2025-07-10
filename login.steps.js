const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I open the login page', async function () {
  await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
});

When('I login with valid credentials', async function () {
  await this.page.fill('#email', this.user.email);
  await this.page.fill('#password', this.user.password);
  await this.page.click('button[type=submit]');
});

When('I login with invalid credentials', async function () {
  await this.page.fill('#email', 'invalid@example.com');
  await this.page.fill('#password', 'wrongpass');
  await this.page.click('button[type=submit]');
});

Then('I should see the contact list page', async function () {
  await expect(this.page.locator('text=Contact List')).toBeVisible();
});

Then('I should see an error message', async function () {
  await expect(this.page.locator('text=Incorrect email or password')).toBeVisible();
});
