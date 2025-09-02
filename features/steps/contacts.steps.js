const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

async function openFirstContactRow(page) {
  await page.waitForSelector('.contactTable .contactTableBodyRow, table .contactTableBodyRow', { timeout: 15000 });
  const firstRow = page.locator('.contactTable .contactTableBodyRow, table .contactTableBodyRow').first();
  await firstRow.click(); 
}

async function ensureOnList(page) {
  if (!page.url().includes('/contactList')) {
    await page.goto('/contactList');
  }
  await page.waitForSelector('.contactTable .contactTableBodyRow, table .contactTableBodyRow', { timeout: 15000 });
}


When('I create a new contact:', async function (dataTable) {
  await ensureOnList(this.page);

  const obj = Object.fromEntries(dataTable.rows().map(([k, v]) => [k, v]));
  this.newContact = {
    firstName: obj.firstName?.trim(),
    lastName:  obj.lastName?.trim(),
    email:     obj.email?.trim(),
    phone:     obj.phone?.trim(),
  };

  const addBtn = this.page.getByRole('button', { name: /add a new contact/i }).first();
  if (await addBtn.count()) {
    await addBtn.click();
  } else {
    await this.page.click('text=Add a New Contact');
  }

  if (obj.firstName) await this.page.getByLabel(/first name/i).fill(obj.firstName);
  if (obj.lastName)  await this.page.getByLabel(/last name/i).fill(obj.lastName);
  if (obj.email)     await this.page.getByLabel(/email/i).fill(obj.email);
  if (obj.phone)     await this.page.getByLabel(/phone/i).fill(obj.phone);

  const submit = this.page.getByRole('button', { name: /submit/i });
  if (await submit.count()) await submit.click(); else await this.page.click('#submit');

  await this.page.waitForLoadState('networkidle');
  await this.page.waitForURL('**/contactList', { timeout: 10000 }).catch(async () => {
    const back = this.page.getByRole('link', { name: /contact list/i });
    if (await back.count()) await back.click();
    else await this.page.goto('/contactList');
  });
});

Then('I should see the contact {string} in the list', async function (fullName) {
  await ensureOnList(this.page);
  const [first, ...rest] = fullName.trim().split(/\s+/);
  const last = rest.join(' ');

  const table = this.page.locator('.contactTable, table').first();
  await expect(table).toBeVisible({ timeout: 10000 });
  await expect(table).toContainText(first, { timeout: 10000 });
  await expect(table).toContainText(last,  { timeout: 10000 });
});

Given('I have a random contact created', async function () {
  await ensureOnList(this.page);

  const firstName = faker.person.firstName();
  const lastName  = faker.person.lastName();
  const email     = faker.internet.email({ firstName, lastName }).toLowerCase();
  const phone     = faker.phone.number('##########');

  const addBtn = this.page.getByRole('button', { name: /add a new contact/i }).first();
  if (await addBtn.count()) {
    await addBtn.click();
  } else {
    await this.page.click('text=Add a New Contact');
  }
  await this.page.getByLabel(/first name/i).fill(firstName);
  await this.page.getByLabel(/last name/i).fill(lastName);
  await this.page.getByLabel(/email/i).fill(email);
  await this.page.getByLabel(/phone/i).fill(phone);

  const submit = this.page.getByRole('button', { name: /submit/i });
  if (await submit.count()) await submit.click(); else await this.page.click('#submit');

  await ensureOnList(this.page);

  this._currentContact = { firstName, lastName, email, phone };
  this.newContact = { firstName, lastName, email, phone };

  const table = this.page.locator('.contactTable, table').first();
  await expect(table).toBeVisible({ timeout: 10000 });
  await expect(table).toContainText(firstName, { timeout: 10000 });
  await expect(table).toContainText(lastName,  { timeout: 10000 });
});

When('I update the contact last name to {string}', async function (newLast) {
  await ensureOnList(this.page);

  await openFirstContactRow(this.page);

  const editBtn = this.page.getByRole('button', { name: /edit/i }).first();
  if (await editBtn.count()) await editBtn.click(); else await this.page.click('text=Edit');

  await this.page.getByLabel(/last name/i).fill(newLast);

  const submit = this.page.getByRole('button', { name: /submit/i });
  if (await submit.count()) await submit.click(); else await this.page.click('#submit');

  await this.page.waitForLoadState('networkidle');
  await this.page.waitForURL('**/contactList', { timeout: 10000 }).catch(async () => {
    const back = this.page.getByRole('link', { name: /contact list/i });
    if (await back.count()) await back.click();
    else await this.page.goto('/contactList');
  });

  if (this._currentContact) this._currentContact.lastName = newLast;
  if (this.newContact) this.newContact.lastName = newLast;
});

Then('I should see the contact with last name {string} in the list', async function (last) {
  await ensureOnList(this.page);

  const { firstName } = this._currentContact || {};
  if (!firstName) throw new Error('No current contact in context');

  const table = this.page.locator('.contactTable, table').first();
  await expect(table).toBeVisible({ timeout: 10000 });

  await expect(table).toContainText(`${firstName} ${last}`, { timeout: 10000 });
});

When('I delete that contact', async function () {
  await ensureOnList(this.page);

  await openFirstContactRow(this.page);

  this.page.once('dialog', d => d.accept().catch(() => {}));

  const deleteBtn = this.page.getByRole('button', { name: /delete/i }).first();
  if (await deleteBtn.count()) await deleteBtn.click(); else await this.page.click('text=Delete');

  await this.page.waitForLoadState('networkidle');
  await this.page.waitForURL('**/contactList', { timeout: 10000 }).catch(async () => {
    const back = this.page.getByRole('link', { name: /contact list/i });
    if (await back.count()) await back.click();
    else await this.page.goto('/contactList');
  });
});

Then('I should not see that contact in the list', async function () {
  await ensureOnList(this.page);

  const { firstName, lastName } = this._currentContact || {};
  if (!firstName || !lastName) throw new Error('No current contact in context');

  const table = this.page.locator('.contactTable, table').first();
  await expect(table).toBeVisible({ timeout: 10000 });

  await expect(table).not.toContainText(`${firstName} ${lastName}`, { timeout: 10000 });
});
