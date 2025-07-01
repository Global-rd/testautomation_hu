const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const { loginWithRole } = require('../../support/utils/login.js');


Given('the user is on the login page', async function () {
  await this.page.goto('https://practicetestautomation.com/practice-test-login/');
});

When('they enter username {string} and password {string}', async function (username, password) {
  await this.page.fill('#username', username);
  await this.page.fill('#password', password);
  await this.page.click('#submit');
});

When('the user is logged in as {string}', async function (role) {
  await loginWithRole(this.page, role);
});


Then('they should be redirected to the logged-in page', async function () {
  await this.page.waitForSelector('h1');
  const heading = await this.page.locator('h1').innerText();
  expect(heading).toContain('Logged In Successfully');
});

Then('an error message should be displayed', async function () {
  await this.page.waitForSelector('#error');
  const errorText = await this.page.locator('#error').innerText();
  expect(errorText).toContain('Your username is invalid!');
});
