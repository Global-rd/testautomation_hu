const { Given, When, Then, Before } = require('@cucumber/cucumber');
const { expect, chromium } = require('@playwright/test');
const fs = require('fs');

let users = [];


Before(async function () {

  this.browser = await chromium.launch({ headless: false });

  this.context = await this.browser.newContext();

  this.page = await this.context.newPage();

});

Given('user credentials are loaded from a JSON file', async function () {
  const raw = fs.readFileSync('./users.json', 'utf-8');
  users = JSON.parse(raw);
});

When('I attempt logins for each user in the JSON file', async function () {
  for (const user of users) {
    console.log('Attempting login for user:', user.username);
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
    await this.page.fill('#username', user.username);
    await this.page.fill('#password', user.password);
    await this.page.click('#submit');

    if (user.expectSuccess) {
      await this.page.waitForSelector('h1', { timeout: 3000 });
      const heading = await this.page.locator('h1').innerText();
      expect(heading).toContain('Logged In Successfully');
    } else {
      await this.page.waitForSelector('#error', { timeout: 3000 });
      const errorText = await this.page.locator('#error').innerText();
      expect(errorText).toContain('is invalid!');
    }
  }
});
