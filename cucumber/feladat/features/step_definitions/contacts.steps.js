import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../page_objects/LoginPage.js';
import { DashBoardPage } from '../../page_objects/DashBoardPage.js';

let contactData;

Given('a contact named {string} exists', async function (contact) {
    const dashBoardPage = new DashBoardPage(this.page)
  await dashBoardPage.goto();
  await dashBoardPage.isContactInList(contact)
});

When('the user creates a new contact with the following data:', async function (dataTable) {
    const dashBoardPage = new DashBoardPage(this.page)
  const contactData = dataTable.rowsHash();
  await dashBoardPage.createContact(contactData);
});

When('the user edits the contact with the following new data:', async function (dataTable) {
    const dashBoardPage = new DashBoardPage(this.page)
  const newData = dataTable.rowsHash();
  await dashBoardPage.editContact(contactData.name, newData);
  contactData = newData;
});

When('the user deletes the contact', async function () {
    const dashBoardPage = new DashBoardPage(this.page)
  await dashBoardPage.deleteContact(contactData.name);
});

Then('the new contact should appear in the list', async function (dataTable) {
    const dashBoardPage = new DashBoardPage(this.page)
  const contactData = dataTable.rowsHash();
  const exists = await dashBoardPage.isContactInList(contactData);
  expect(exists).toBe(true);
});

Then('the updated contact should appear in the list', async function (dataTable) {
    const dashBoardPage = new DashBoardPage(this.page)
  const exists = await dashBoardPage.isContactInList(dataTable);
  expect(exists).toBe(true);
});

Then('the contact should no longer appear in the list', async function () {
    const dashBoardPage = new DashBoardPage(this.page)
  const exists = await dashBoardPage.isContactInList(contactData.name);
  expect(exists).toBe(false);
});
