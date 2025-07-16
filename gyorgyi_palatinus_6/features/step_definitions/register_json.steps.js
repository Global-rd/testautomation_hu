// This file contains step definitions for registering a user 
// using credentials loaded from a JSON file.

const{ Given, When, Then, Before, After} = require('@cucumber/cucumber');
const{ expect, chromium} = require('@playwright/test');
const {allure} = require('allure-js-commons');

const fs = require('fs');
let users = [];


Given('user credentials are loaded from a JSON file', async function () {
    const path = require('path');
    const filePath = path.resolve(__dirname, '../../fixtures/users.json');

    const raw = fs.readFileSync(filePath, "utf-8" );
    users = JSON.parse(raw).users;
    
});

When('I attempt logins for each user in the JSON file',{ timeout: 30000 }, async function () {

    for (const user of users) {
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/addUser');
        await this.page.fill('#firstName', user.firstName);
        await this.page.fill('#lastName', user.lastName);
        await this.page.fill('#email', user.email);
        await this.page.fill('#password', user.password);
        await this.page.click('button[type="submit"]');
        await this.page.waitForTimeout(1000);
        
    }  
});

Then('I should be redirected to the contact list page', async function () {
    
    await this.page.waitForSelector('h1');
    const heading = await this.page.locator('h1').innerText();
    expect(heading).toContain('Contact List');

})




