const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { generateFakeContact } = require("../../support/dataGenerator");

Given("I am logged in", async function () {
  await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/");
  await this.page.fill("#email", "testGabor@exampleJuly5.com");
  await this.page.fill("#password", "Test1234!");
  await this.page.click("#submit");

  await expect(this.page.locator("text=Contact List")).toBeVisible({
    timeout: 15000,
  });
});

When(
  "I create a new contact with the following data:",
  async function (dataTable) {
    const [row] = dataTable.hashes();
    const timestamp = Date.now();

    const uniqueEmail = row.email.replace("@", `+${timestamp}@`);
    const uniqueFirstName = `${row.firstName}${timestamp}`;
    const uniqueLastName = `${row.lastName}${timestamp}`;

    this.createdContact = {
      firstName: uniqueFirstName,
      lastName: uniqueLastName,
      email: uniqueEmail,
      phone: row.phone,
      address: {
        street: "Main Street 1",
        city: "Budapest",
        state: "BP",
        zip: "1111",
        country: "Hungary",
      },
    };

    await this.page.click("text=Add a New Contact");
    await this.page.setDefaultTimeout(1000);
    await this.page.fill("#firstName", uniqueFirstName);
    await this.page.fill("#lastName", uniqueLastName);
    await this.page.fill("#email", uniqueEmail);
    await this.page.fill("#phone", row.phone);
    await this.page.fill("#street1", "Main Street 1");
    await this.page.fill("#city", "Budapest");
    await this.page.fill("#stateProvince", "BP");
    await this.page.fill("#postalCode", "1111");
    await this.page.fill("#country", "Hungary");

    await this.page.click('button[type="submit"]');
    await expect(this.page.locator("text=Contact List")).toBeVisible({
      timeout: 15000,
    });
    await expect(this.page.locator("table")).toBeVisible({ timeout: 15000 });
  }
);

Then("I should see the new contact in the list", async function () {
  const { firstName, email } = this.createdContact;
  const contactRow = this.page
    .locator("#myTable")
    .filter({
      hasText: firstName,
    })
    .filter({ hasText: email });

  await expect(contactRow).toBeVisible({ timeout: 10000 });
  await contactRow.click();
});

Given("a contact exists", async function () {
  const contact = generateFakeContact();

  this.createdContact = {
    ...contact,
    address: {
      street: "Main Street 1",
      city: "Budapest",
      state: "BP",
      zip: "1111",
      country: "Hungary",
    },
  };

  await this.page.click("text=Add a New Contact");
  await this.page.setDefaultTimeout(1000);
  // Wait for the create form to load (visible + interactive)
  const firstNameField = this.page.locator("#firstName");
  await expect(firstNameField).toBeVisible({ timeout: 10000 });
  await expect(firstNameField).toBeEnabled();

  await this.page.fill("#firstName", contact.firstName);
  await this.page.fill("#lastName", contact.lastName);
  await this.page.fill("#email", contact.email);
  await this.page.fill("#phone", contact.phone);
  await this.page.fill("#street1", "Main Street 1");
  await this.page.fill("#city", "Budapest");
  await this.page.fill("#stateProvince", "BP");
  await this.page.fill("#postalCode", "1111");
  await this.page.fill("#country", "Hungary");
  // Click Submit
  const submitButton = this.page.locator("#submit");
  await expect(submitButton).toBeEnabled({ timeout: 10000 });
  await submitButton.click();

  await this.page.setDefaultTimeout(1000);
  await expect(this.page.locator("text=Contact List")).toBeVisible({
    timeout: 15000,
  });

  await this.page.setDefaultTimeout(1000);
  await expect(this.page.locator("table")).toBeVisible({ timeout: 15000 });

  const contactRow = this.page
    .locator("#myTable")
    .filter({ hasText: contact.firstName })
    .filter({ hasText: contact.email });

  await expect(contactRow).toHaveCount(1, { timeout: 15000 });
});

When(
  "I edit the contact with {string} to {string}",
  async function (field, value) {
    const { firstName, email } = this.createdContact;

    const contactRow = this.page
      .locator("#myTable")
      .filter({ hasText: firstName })
      .filter({ hasText: email });

    // Wait for exactly one matching contact row and click it
    await expect(contactRow).toHaveCount(1, { timeout: 10000 });
    await contactRow.first().click();

    // Wait for "Edit" button to become visible and clickable
    const editButton = this.page.locator("#edit-contact");
    await expect(editButton).toBeVisible({ timeout: 10000 });
    await expect(editButton).toBeEnabled();
    await editButton.click();

    // Wait for the edit form to load (visible + interactive)
    const firstNameField = this.page.locator("#firstName");
    await expect(firstNameField).toBeVisible({ timeout: 10000 });
    await expect(firstNameField).toBeEnabled();

    const fieldMap = {
      firstName: "#firstName",
      lastName: "#lastName",
      email: "#email",
      phone: "#phone",
      city: "#city",
      street: "#street1",
      state: "#stateProvince",
      zip: "#postalCode",
      country: "#country",
    };

    // Fill the form with updated data
    for (const [key, selector] of Object.entries(fieldMap)) {
      let currentValue;
      if (key === field) {
        currentValue = value;
      } else if (key in this.createdContact) {
        currentValue = this.createdContact[key];
      } else if (key in this.createdContact.address) {
        currentValue = this.createdContact.address[key];
      } else {
        continue;
      }

      const input = this.page.locator(selector);
      await expect(input).toBeVisible();
      await expect(input).toBeEnabled();
      await input.fill(currentValue);
    }

    // Click Submit
    const submitButton = this.page.locator("#submit");
    await expect(submitButton).toBeEnabled({ timeout: 10000 });
    await submitButton.click();
    await this.page.setDefaultTimeout(1000);

    // Wait for return to contact details page
    await expect(this.page.locator("text=Contact Details")).toBeVisible({
      timeout: 15000,
    });

    //Click Return to Contact List
    const returnButton = this.page.locator("#return");
    await expect(returnButton).toBeEnabled({ timeout: 10000 });
    await returnButton.click();

    //// Wait for return to contact list page
    await expect(this.page.locator("text=Contact List")).toBeVisible({
      timeout: 15000,
    });

    // Wait for the table to be present and ready
    const table = this.page.locator("#myTable");
    await expect(table).toBeVisible({ timeout: 15000 });

    // Update memory model
    if (field in this.createdContact) {
      this.createdContact[field] = value;
    } else if (field in this.createdContact.address) {
      this.createdContact.address[field] = value;
    }
  }
);

Then("the contact should be updated", async function () {
  await expect(this.page.locator("text=Contact List")).toBeVisible({
    timeout: 15000,
  });
  await expect(this.page.locator("#myTable")).toBeVisible({ timeout: 15000 });

  const contactRow = this.page
    .locator("#myTable")
    .filter({
      hasText: this.createdContact.firstName,
    })
    .filter({ hasText: this.createdContact.email });

  await expect(contactRow).toBeVisible({ timeout: 10000 });
});

When("I delete the contact", async function () {
  const { firstName, email } = this.createdContact;
  const contactRow = this.page
    .locator("#myTable")
    .filter({
      hasText: firstName,
    })
    .filter({ hasText: email });

  await contactRow.click();
  await this.page.click("text=Delete");
});

Then("the contact should be removed from the list", async function () {
  const { firstName, email } = this.createdContact;
  const contactRow = this.page
    .locator("#myTable")
    .filter({
      hasText: firstName,
    })
    .filter({ hasText: email });

  await expect(contactRow).toHaveCount(0, { timeout: 15000 });
});
