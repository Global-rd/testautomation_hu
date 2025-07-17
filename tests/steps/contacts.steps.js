const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

Given("the user is logged in and on the Contact List page", async function () {
  // Navigate to login page
  await this.page.goto("/");

  // Login with valid credentials
  await this.page.fill("#email", process.env.EMAIL);
  await this.page.fill("#password", process.env.PASSWORD);
  await this.page.click("button#submit");

  // Wait for navigation to complete and verify we're on the contact list page
  await this.page.waitForURL("/contactList", { timeout: 10000 });
  await this.page.waitForLoadState("domcontentloaded");
});

// Load test data from JSON file
const loadTestData = () => {
  const dataPath = path.join(__dirname, "../../fixtures/contacts.json");
  const rawData = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(rawData);
};

// This function can be used for both Given and When steps
const createNewContact = async function () {
  // Load contact data from JSON file
  const testData = loadTestData();
  const contactData = testData.newContact;

  // Click add contact button
  await this.page.click("#add-contact");

  // Fill in contact details from JSON data
  await this.page.fill("#firstName", contactData.firstName);
  await this.page.fill("#lastName", contactData.lastName);
  await this.page.fill("#birthdate", contactData.birthdate);
  await this.page.fill("#email", contactData.email);
  await this.page.fill("#phone", contactData.phone);
  await this.page.fill("#street1", contactData.street1);
  await this.page.fill("#street2", contactData.street2);
  await this.page.fill("#city", contactData.city);
  await this.page.fill("#stateProvince", contactData.stateProvince);
  await this.page.fill("#postalCode", contactData.postalCode);
  await this.page.fill("#country", contactData.country);

  // Submit the contact and wait for navigation
  await Promise.all([
    this.page.waitForURL("/contactList", { timeout: 15000 }),
    this.page.click("#submit"),
  ]);

  // Wait for the page to fully load
  await this.page.waitForLoadState("networkidle", { timeout: 10000 });

  // Store contact info for verification AND for subsequent edit/delete operations
  this.newContact = {
    firstName: contactData.firstName,
    lastName: contactData.lastName,
    email: contactData.email,
  };

  // Also set this as testContact for edit/delete operations
  this.testContact = this.newContact;
};

Given("a contact already exists in the system", async function () {
  // First create a contact to ensure we have one to edit/delete
  await createNewContact.call(this);

  // Wait for the contact to appear in the list
  const contactText = `${this.newContact.firstName} ${this.newContact.lastName}`;
  await this.page.waitForSelector(
    `.contactTable tr:has-text("${contactText}")`,
    {
      timeout: 15000,
    }
  );
});

// Scenario 1: Create a new contact
When("the user creates a new contact with valid information", createNewContact);

Then(
  "the contact is successfully added to the contact list",
  async function () {
    // Verify we're back on the contact list page
    await expect(this.page).toHaveURL("/contactList");

    // Wait for the contact to appear in the list
    const contactText = `${this.newContact.firstName} ${this.newContact.lastName}`;
    await this.page.waitForSelector(
      `.contactTable tr:has-text("${contactText}")`,
      {
        timeout: 15000,
      }
    );

    // Verify success message or that we're on the correct page
    await expect(this.page.locator("h1")).toContainText("Contact List");
  }
);

Then("the contact appears in the contact list", async function () {
  // Verify the new contact appears in the list
  await expect(this.page.locator(".contactTable")).toContainText(
    this.newContact.firstName
  );
  await expect(this.page.locator(".contactTable")).toContainText(
    this.newContact.lastName
  );
  await expect(this.page.locator(".contactTable")).toContainText(
    this.newContact.email
  );
});

// Scenario 2: Edit an existing contact
When("the user edits the contact information", async function () {
  // Load edit data from JSON file
  const testData = loadTestData();
  const editData = testData.editContact;

  // If this.newContact doesn't exist, we need to ensure we have a contact to edit
  if (!this.newContact) {
    // Load the newContact data to know which contact to look for
    this.newContact = testData.newContact;
  }

  // Wait for the contact row to be visible before clicking
  const contactSelector = `tr:has-text("${this.newContact.firstName} ${this.newContact.lastName}")`;
  await this.page.waitForSelector(contactSelector, { timeout: 10000 });

  // Find and click on the contact to edit
  await this.page.click(contactSelector);

  // Verify we're on the contact details page
  await expect(this.page).toHaveURL("/contactDetails");

  // Click edit button
  await this.page.click("#edit-contact");

  // Verify we're on the edit contact page
  await expect(this.page).toHaveURL("/editContact");

  await this.page.waitForTimeout(2000);

  // Update contact information
  await this.page.fill("#firstName", editData.firstName);
  await this.page.fill("#lastName", editData.lastName);
  await this.page.fill("#email", editData.email);

  // Submit changes
  await this.page.click("#submit");

  // Store what we expect to see
  this.updatedContact = {
    firstName: editData.firstName,
    lastName: editData.lastName,
    email: editData.email,
  };
});

Then("the contact information is updated successfully", async function () {
  // Verify we're back on the contact list page
  await expect(this.page).toHaveURL("/contactDetails");
});

Then(
  "the updated information is displayed in the contact details",
  async function () {
    // Verify the updated contact appears in the list
    await expect(this.page.locator("#contactDetails")).toContainText(
      this.updatedContact.firstName
    );
    await expect(this.page.locator("#contactDetails")).toContainText(
      this.updatedContact.lastName
    );
    await expect(this.page.locator("#contactDetails")).toContainText(
      this.updatedContact.email
    );
  }
);

// Scenario 3: Delete a contact
When("the user deletes the contact", async function () {
  // If this.testContact doesn't exist, load it from test data
  const testData = loadTestData();

  // Wait for the contact to be visible
  const contactSelector = `tr:has-text("${testData.editContact.firstName} ${testData.editContact.lastName}")`;
  await this.page.waitForSelector(contactSelector, { timeout: 10000 });

  // Find and click on the contact to delete
  await this.page.click(contactSelector);

  // Verify we're on the contact details page
  await expect(this.page).toHaveURL("/contactDetails");

  this.page.on("dialog", async (dialog) => {
    console.log("Dialog message:", dialog.message());
    await dialog.accept(); // Click OK
  });

  // Click delete button
  await this.page.click("#delete");
});

Then("the contact is removed from the contact list", async function () {
  // Verify we're on the contact list page
  await expect(this.page).toHaveURL("/contactList");
});

Then("the contact no longer appears in the list", async function () {
  // Wait for table body to be present
  await this.page.waitForSelector(".contactTable", { timeout: 10000 });

  const testData = loadTestData();
  // Verify the contact is no longer in the list
  await expect(this.page.locator(".contactTable")).not.toContainText(
    testData.editContact.firstName
  );
  await expect(this.page.locator(".contactTable")).not.toContainText(
    testData.editContact.lastName
  );
});

// Scenario 4: Create multiple contacts with different data (Scenario Outline)
When(
  "the user creates a contact with {string}, {string}, {string}, and {string}",
  async function (firstName, lastName, email, phone) {
    // Click add contact button
    await this.page.click("#add-contact");

    // Fill in contact details
    await this.page.fill("#firstName", firstName);
    await this.page.fill("#lastName", lastName);
    await this.page.fill("#email", email);
    await this.page.fill("#phone", phone);

    // Submit the contact
    await this.page.click("#submit");

    // Store contact info for verification
    this.currentContact = { firstName, lastName, email, phone };
  }
);

Then(
  "the contact {string} appears in the contact list",
  async function (fullName) {
    // Wait for the table body to exist first
    await this.page.waitForSelector(".contactTable", { timeout: 10000 });

    // Verify the contact appears in the list
    await expect(this.page.locator(".contactTable")).toContainText(fullName);
  }
);

Then(
  "the contact email {string} is displayed correctly",
  async function (email) {
    // Verify the email appears in the list
    await expect(this.page.locator(".contactTable")).toContainText(email);
  }
);

// Scenario 5: Create contact with comprehensive data (Data Table)
When(
  "the user creates a contact with the following information:",
  async function (dataTable) {
    // Click add contact button
    await this.page.click("#add-contact");

    // Convert data table to object
    const contactData = {};
    const rows = dataTable.hashes();
    rows.forEach((row) => {
      contactData[row.Field] = row.Value;
    });

    // Fill in all contact details
    for (const [field, value] of Object.entries(contactData)) {
      await this.page.fill(`#${field}`, value);
    }

    // Submit the contact
    await this.page.click("#submit");

    // Store contact info for verification
    this.currentContact = contactData;
  }
);

Then("all contact details are saved correctly", async function () {
  // Wait for the contact to appear
  await this.page.waitForSelector(
    `text="${this.currentContact.firstName} ${this.currentContact.lastName}"`,
    { timeout: 10000 }
  );

  // Verify all the stored contact details appear in the list
  await expect(this.page.locator(".contactTable")).toContainText(
    this.currentContact.firstName
  );
  await expect(this.page.locator(".contactTable")).toContainText(
    this.currentContact.lastName
  );
  await expect(this.page.locator(".contactTable")).toContainText(
    this.currentContact.email
  );
});
