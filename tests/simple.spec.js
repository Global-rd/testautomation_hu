const { test, expect } = require("@playwright/test");

test.describe("Contact List Application", () => {
  test("should load the contact list homepage", async ({ page }) => {
    await page.goto("/");

    // Check page title
    await expect(page).toHaveTitle('Contact List App');

    // Check main heading exists
    await expect(page.locator("h1")).toBeVisible();

    // Check login form is present
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
  });

  test("should display login form elements", async ({ page }) => {
    await page.goto("/");

    // Check all login form elements are present
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#submit")).toBeVisible();

    // Check placeholder text
    await expect(page.locator("#email")).toHaveAttribute(
      "placeholder",
      "Email"
    );
    await expect(page.locator("#password")).toHaveAttribute(
      "placeholder",
      "Password"
    );
  });
});