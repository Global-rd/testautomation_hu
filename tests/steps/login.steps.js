const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("the user is on the login page", async function () {
  await this.page.goto("/");
});

When(
  "the user submits valid credentials for an existing account",
  async function () {
    await this.page.waitForSelector("#email", { state: "visible" });
    await this.page.fill("#email", process.env.EMAIL);
    await this.page.waitForSelector("#password", { state: "visible" });
    await this.page.fill("#password", process.env.PASSWORD);
    await this.page.waitForSelector("button#submit", {
      state: "visible",
    });
    await this.page.click("button#submit");

    await this.page.waitForLoadState("networkidle");
  }
);

Then("the user is redirected to the Contact List page", async function () {
  await this.page.waitForURL("**/contactList", { timeout: 30000 });
  await expect(this.page).toHaveURL("/contactList");
});

When(
  "the user submits a valid username and an incorrect password",
  async function () {
    await this.page.waitForSelector("#email", { state: "visible" });
    await this.page.fill("#email", process.env.EMAIL);
    await this.page.waitForSelector("#password", { state: "visible" });
    await this.page.fill("#password", process.env.WRONG_PSW);
    await this.page.waitForSelector("button#submit", {
      state: "visible",
    });
    await this.page.click("button#submit");

    await this.page.waitForTimeout(2000);
  }
);

Then("the user remains on the login page", async function () {
  await expect(this.page).toHaveURL("/");
});

Then("the error message {string} is displayed", async function (message) {
  const errorElement = this.page.locator("#error");
  await errorElement.waitFor({ state: "visible", timeout: 10000 });
  await expect(errorElement).toHaveText(message);
});
