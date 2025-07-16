const{ Given, When, Then, Before, After} = require('@cucumber/cucumber');
const{ expect, chromium} = require('@playwright/test');
const {allure} = require('allure-js-commons');

const fs = require('fs');
let users = [];

Given('the user is logged in', async function() {

        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/');
        await this.page.fill('#email', 'johnsuper@example.com');
        await this.page.fill('#password', 'Password123');
        await this.page.click('#submit');
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector('h1');
        const heading = await this.page.locator('h1').innerText();
        expect(heading).toContain('Contact List')
});


When('the user fills out the contact form with valid data', async function() {

    
    await this.page.click('#add-contact');
    await this.page.waitForSelector('h1');
    const heading= await this.page.locator('h1').innerText();
    expect(heading).toContain('Add Contact');
    await this.page.fill('#firstName', 'Jane');
    await this.page.fill('#lastName', 'Smith');
    await this.page.fill('#email','janes@example.com');
    await this.page.fill('#phone', '1234567890');
    await this.page.fill('#street1', '123 Main St');
    await this.page.fill('#city', 'Springfield');
    await this.page.fill('#stateProvince', 'IL');
    await this.page.fill('#postalCode', '62701');
    await this.page.fill('#country', 'USA');
    await this.page.click('#submit');
    await this.page.waitForTimeout(2000);
})

Then('the user should see the new contact in the contact list', async function () {
    
    await this.page.waitForSelector('h1');
    const heading = await this.page.locator('h1').innerText();
    expect(heading).toContain('Contact List');

})

Given('the user is in the contact details from the contact {string} and {string}', async function (firstName, lastName) {
    const contactName = `${firstName} ${lastName}`;
    const contactRow = this.page.locator('tr.contactTableBodyRow', { hasText: contactName });
    await contactRow.first().click();
    await this.page.waitForSelector('h1');
    const heading = await this.page.locator('h1').innerText();
    expect(heading).toContain('Contact Details');
})

When('the user edits the email to {string}', async function (newEmail) { 
    await this.page.click('#edit-contact');
    await this.page.waitForTimeout(1000);
    const replaceEmail = `${newEmail}`;
    await this.page.click('#email');
    await this.page.fill('#email', replaceEmail);
    await this.page.click('#submit');
    
})

Then('the user should see the updated contact in the contact list', async function () {
    await this.page.click('#return');
    await this.page.waitForSelector('h1');
    const heading = await this.page.locator('h1').innerText();
    expect(heading).toContain('Contact List');

})

Given('the user is in the contact detail from {string} and {string}', async function (firstName, lastName) {
    const contactName = `${firstName} ${lastName}`;
    const contactRow = this.page.locator('tr.contactTableBodyRow', { hasText: contactName });
    await contactRow.first().click();
    await this.page.waitForSelector('h1');
    const heading = await this.page.locator('h1').innerText();
    expect(heading).toContain('Contact Details');
})

When('the user deletes one contact', async function () {
    
    this.page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('Are you sure'); 
        await dialog.accept();
    });

    await this.page.click('#delete');
});


Then('the contact list has been updated', async function () {
    await this.page.waitForSelector('h1');
    const heading = await this.page.locator('h1').innerText();
    expect(heading).toContain('Contact Details');
    
});
