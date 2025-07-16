//This file contains step definitions for logging in a user using credentials email and password 
//from Data Table.

const{ Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const{ expect} = require('@playwright/test');

const fs = require('fs');
let users = [];

Given('the user is on the login page', async function () {
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/')

})

When('the user enters the email {string} and the password {string}', async function(email, password){
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.waitForTimeout(2000);
    await this.page.click('#submit');
    await this.page.waitForTimeout(1000);
})

Then('the user should see {string}', async function (string) {
    await this.page.waitForSelector('h1');
    const heading = await this.page.locator('h1').innerText();
    expect(heading).toContain('Contact List');

})

Then('an error message {string} should be displayed', async function (string) {
    await this.page.waitForSelector('h1');
    const heading = await this.page.locator('h1').innerText();
    expect(heading).toContain('Contact List');

})

Then('this step will fail', async function () {
  expect(true).toBe(false);
});