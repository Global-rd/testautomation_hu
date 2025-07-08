const { When, Then, Given } = require('@cucumber/cucumber');
const { generateFakeContact } = require('../fixtures/contactData.js');
const testUsers = require('../fixtures/testUsers');
const testContacts = require('../fixtures/testContacts');


Given('The user is logged in', async function () {
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    await this.page.fill('#email', testUsers.validUser.email);
    await this.page.fill('#password', testUsers.validUser.password);
    await this.page.click('#submit');
    await this.page.waitForSelector('text=Contact List');
});

When('The user add a new contact with the following data:', async function (dataTable) {
    const data = dataTable.rowsHash();
    await this.page.click('#add-contact');

    await this.page.fill('#firstName', data.firstName);
    await this.page.fill('#lastName', data.lastName);
    await this.page.fill('#birthdate', data.birthdate);
    await this.page.fill('#email', data.email);
    await this.page.fill('#phone', data.phone);
    await this.page.fill('#street1', data.address);
    await this.page.fill('#city', data.city);
    await this.page.fill('#stateProvince', data.state);
    await this.page.fill('#postalCode', data.postalCode);
    await this.page.fill('#country', data.country);
    await this.page.click('button[type=submit]');
});

Then('The user should see the new contact listed', async function () {
    await this.page.waitForSelector('.contactTableBodyRow');
});

When('The user edit the phone in the contact', async function () {
    const contactRow = this.page.locator(`text=${testContacts.email}`).first();
    await contactRow.click();
    await this.page.click('#edit-contact');
    await this.page.fill('#phone', testContacts.phone2);
    await this.page.click('button[type=submit]');
});

Then('The phone in contact should be changed', async function () {
    const text = await this.page.locator('#phone').textContent();
    expect(text).toBe(testContacts.phone2);
});

When('The user delete the contact with email', async function () {
    const contactRow = this.page.locator(`text=${testContacts.email}`).first();
    await contactRow.click();
    await this.page.click('#delete');
});

Then('The user should not see that contact anymore', async function () {
    const contact = this.page.locator('.contactTableBodyRow');
    const email_visible = await contact.isVisible().catch(() => false);
    if (email_visible) throw new Error('Contact still visible!');
});
