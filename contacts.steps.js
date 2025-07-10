const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I create a new contact with name {string} and email {string}', async function (name, email) {
  await this.page.click('text=Add a New Contact');
  await this.page.fill('#firstName', name);
  await this.page.fill('#email', email);
  await this.page.click('button[type=submit]');
});

When('I edit contact {string} to name {string}', async function (oldName, newName) {
  const contactRow = this.page.locator(`text=${oldName}`).first();
  await contactRow.click();
  await this.page.fill('#firstName', newName);
  await this.page.click('button[type=submit]');
});

When('I delete contact {string}', async function (name) {
  const contactRow = this.page.locator(`text=${name}`).first();
  await contactRow.click();
  await this.page.click('button:text("Delete")');
});

Then('I should see {string} in the list', async function (name) {
  await expect(this.page.locator(`text=${name}`)).toBeVisible();
});

Then('I should not see {string} in the list', async function (name) {
  await expect(this.page.locator(`text=${name}`)).toHaveCount(0);
});
