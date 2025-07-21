const {Given, When, Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");
Given('User is logged in and on the contacts page', async function () {
    await expect(this.page).toHaveURL('https://thinking-tester-contact-list.herokuapp.com/contactList');
});
When('User clicks the Add New Contact button', async function () {
    await this.page.locator("#add-contact").click();
    await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/addContact");
});

When('User clicks the Save button', async function () {
    await this.page.locator("#submit").click();
    await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/contactList");
});

When('User fills in the contact form with {string}, {string}, {string} and {string}', async function (firstName, lastName, email, phoneNumber) {
    await this.page.fill("#firstName", firstName);
    await this.page.fill("#lastName", lastName);
    await this.page.fill("#email", email);
    await this.page.fill("#phone", phoneNumber);
});

Then('the contact {string} should appear in the contact list', async function(email){
    const contactTable = this.page.locator("#myTable");
    const emailCell = contactTable.locator(`td:has-text("${email}")`);

    await expect(emailCell.first()).toBeVisible();
})
Given('a contact with the name {string} exists', async function (username) {
    await this.page.locator("#add-contact").click();
    await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/addContact");

    await this.page.fill("#firstName", username);
    await this.page.fill("#lastName", "Last");

    await this.page.locator("#submit").click();

    await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/contactList");
});
When('User finds the contact {string} and clicks to edit', async function (username) {
    const contactTable = this.page.locator("#myTable");
    await contactTable.locator(`td:has-text("${username}")`).first().click();

    await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/contactDetails");
});

When('User updates the phone number to {string} and saves', async function (phone) {
    await this.page.locator("#edit-contact").click();
    await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/editContact");
    await this.page.fill("#phone", phone);
    await this.page.locator("#submit").click();
    await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/contactDetails");
    await this.page.locator("#return").click();
    await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/contactList");
});
Then('the contact {string} should have the phone number {string}', async function (name, expectedPhone) {
    const row = this.page.locator('.contactTableBodyRow', { hasText: name }).first();
    const phoneCell = row.locator('td').nth(4);
    await expect(phoneCell).toHaveText(expectedPhone);
});
When('User clicks and confirms delete', async function () {
    this.page.once('dialog', dialog => dialog.accept());
    await this.page.locator("#delete").click();
    await this.page.waitForURL("**/contactList");
});
Then('the contact {string} should not appear in the contact list', async function (username) {
    const contactTable = this.page.locator("#myTable");
    const emailCell = contactTable.locator(`td:has-text("${username}")`);

    await expect(emailCell.first()).not.toBeVisible();
});