const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const users = require('../../fixtures/users.json');

Given('the user is on the login page', async function () {
  await this.page.goto('/');
});

When('the user submits valid credentials for an existing account', async function () {
  const email = process.env.USER_EMAIL || users.valid.email;
  const password = process.env.USER_PASSWORD || users.valid.password;

  await this.page.waitForSelector('#email', { state: 'visible' });
  await this.page.fill('#email', email);
  await this.page.fill('#password', password);
  await this.page.click('#submit');
  await this.page.waitForLoadState('networkidle');
});

Then('the user is redirected to the Contact List page', async function () {
  await this.page.waitForURL('**/contactList', { timeout: 30000 });
  await expect(this.page).toHaveURL(/\/contactList$/);
});

When('the user submits a valid username and an incorrect password', async function () {
  const email = process.env.USER_EMAIL || users.valid.email;
  const badPassword = process.env.USER_BAD_PASSWORD || users.invalid.password;

  await this.page.waitForSelector('#email', { state: 'visible' });
  await this.page.fill('#email', email);
  await this.page.fill('#password', badPassword);
  await this.page.click('#submit');
  await this.page.waitForTimeout(1000);
});

Then('the user remains on the login page', async function () {
  await expect(this.page).toHaveURL(/\/$/);
});

Then('the error message {string} is displayed', async function (message) {
  const errorElement = this.page.locator('#error');
  await errorElement.waitFor({ state: 'visible', timeout: 10000 });
  await expect(errorElement).toHaveText(message);
});

// Convenience step for contacts.feature
Given('I am logged in', async function () {
  const email = process.env.USER_EMAIL || users.valid.email;
  const password = process.env.USER_PASSWORD || users.valid.password;

  await this.page.goto('/');
  await this.page.fill('#email', email);
  await this.page.fill('#password', password);
  await this.page.click('#submit');
  await this.page.waitForURL('**/contactList', { timeout: 30000 });
});
