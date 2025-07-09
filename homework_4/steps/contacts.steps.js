const { When, Then, Given } = require('@cucumber/cucumber');
const { generateFakeContact } = require('../fixtures/contactData.js');
const testUsers = require('../fixtures/testUsers');
const testContacts = require('../fixtures/testContacts');
const assert = require('assert');


Given('The user is logged in', async function () {
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    await this.page.fill('#email', testUsers.validUser.email);
    await this.page.fill('#password', testUsers.validUser.password);
    await this.page.click('#submit');
    await this.page.waitForSelector('text=Contact List');
});

Given('New contact from config', async function () {
    await this.page.click('#add-contact');
    await this.page.waitForSelector('text=Add Contact');
    await this.page.waitForSelector('#submit');

    await this.page.fill('#firstName', testContacts.contactOne.firstName);
    await this.page.fill('#lastName', testContacts.contactOne.lastName);
    await this.page.fill('#birthdate', testContacts.contactOne.birthdate);
    await this.page.fill('#email', testContacts.contactOne.email);
    await this.page.fill('#phone', testContacts.contactOne.phone);
    await this.page.fill('#street1', testContacts.contactOne.street);
    await this.page.fill('#city', testContacts.contactOne.city);
    await this.page.fill('#stateProvince', testContacts.contactOne.state);
    await this.page.fill('#postalCode', testContacts.contactOne.zipCode);
    await this.page.fill('#country', testContacts.contactOne.country);

    await this.page.click('#submit');
    await this.page.waitForSelector('text=Contact List');
});

When('The user add a new contact with the following data:', async function (dataTable) {
    const [data] = dataTable.hashes();
    await this.page.click('#add-contact');
    await this.page.waitForSelector('text=Add Contact');
    await this.page.waitForSelector('#submit');

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

    await this.page.click('#submit');
    await this.page.waitForSelector('text=Contact List');
});

Then('The user should see the new contact listed:', async function (dataTable) {
    const [data] = dataTable.hashes();
    const email = data.email;
    await this.page.waitForSelector('.contactTableBodyRow');

    const row = this.page.locator(`tr.contactTableBodyRow:has-text("${email}")`).first();
    await row.waitFor({ state: 'visible' });

    const isVisible = await row.isVisible();
    assert.ok(isVisible, `The contact with the ${email} email is not visible.`);
});

When('The user edit the phone in the contact', async function () {
    const contactRow = this.page.locator(`text=${testContacts.contactOne.email}`).first();
    await contactRow.click();
    await this.page.waitForSelector('h1:has-text("Contact Details")', { state: 'visible' });

    await this.page.click('#edit-contact');
    await this.page.waitForFunction(() => {
        const input = document.querySelector('#firstName');
        return input && input.value.trim().length > 0;
    });

    await this.page.fill('#phone', testContacts.contactOne.phone2);
    await this.page.click('button[type=submit]');
});

Then('The phone in contact should be changed', async function () {
    await this.page.waitForSelector('span#phone', { state: 'visible' });

    const phoneText = await this.page.locator('#phone').textContent();
    assert.strictEqual(phoneText.trim(), testContacts.contactOne.phone2);

});

When('The user delete the contact with email', async function () {
    const contactRow = this.page.locator(`text=${testContacts.contactOne.email}`).first();
    await contactRow.click();
    await this.page.waitForSelector('#delete');
        
    this.page.once('dialog', async dialog => {
        await dialog.accept();
    });

    await this.page.click('#delete');
    await this.page.waitForSelector('.contacts');

});

Then('The user should not see that contact anymore', async function () {
    const rows = await this.page.locator('tr.contactTableBodyRow').allTextContents();
    const exists = rows.some(text => text.includes(testContacts.contactOne.email));
    assert.strictEqual(exists, false, `The contact with email ${testContacts.contactOne.email} is still visible.`);
});
