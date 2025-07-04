const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I navigate to the login page", async function () {
  await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/");
});

When(
  "I login with email {string} and password {string}",
  async function (email, password) {
    await this.page.fill("#email", email);
    await this.page.fill("#password", password);

    if (this.expectFailure) {
      // Just click without waiting for navigation
      await this.page.click("#submit");
    } else {
      // Wait for navigation if login is expected to succeed
      await Promise.all([
        this.page.waitForNavigation({ waitUntil: "load" }),
        this.page.click("#submit"),
      ]);
    }
  }
);

Then("I should see the contact list page", async function () {
  await this.page.waitForSelector("text=Contact List", { timeout: 5000 });
  const url = this.page.url();
  expect(url).toContain("/contactList");
});

Then("I should see an error message", async function () {
  await this.page.waitForSelector("#error");
  const errorText = await this.page.textContent("#error");
  expect(errorText).toContain("Incorrect username or password");
});
