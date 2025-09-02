require('dotenv').config();
const { BeforeAll, AfterAll, Before, After, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const users = require('../../fixtures/users.json');

let browser;

async function registerUserIfNeeded(baseURL) {
  if (process.env.REGISTER_ON_START !== '1') return;

  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;
  const firstName = process.env.USER_FIRST_NAME || 'Test';
  const lastName = process.env.USER_LAST_NAME || 'User';

  if (!email || !password) {
    console.warn('[register] USER_EMAIL vagy USER_PASSWORD hiányzik – kihagyom a regisztrációt.');
    return;
  }

  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();

  try {
    console.log('[register] Regisztráció próbálkozás:', email);
    await page.goto('/addUser', { waitUntil: 'load' });

    const fillByLabel = async (labelRegex, value) => {
      const loc = page.getByLabel(labelRegex);
      if ((await loc.count()) > 0) {
        await loc.fill(value);
        return true;
      }
      return false;
    };

    await fillByLabel(/first name/i, firstName) || await page.fill('#firstName, [name="firstName"]', firstName).catch(() => {});
    await fillByLabel(/last name/i, lastName) || await page.fill('#lastName, [name="lastName"]', lastName).catch(() => {});
    await fillByLabel(/email/i, email) || await page.fill('#email, [name="email"]', email).catch(() => {});
    await fillByLabel(/password/i, password) || await page.fill('#password, [name="password"]', password).catch(() => {});

    const submit = page.getByRole('button', { name: /submit|sign.*up|create/i });
    if ((await submit.count()) > 0) await submit.click(); else await page.click('#submit').catch(() => {});

    await page.waitForLoadState('networkidle');

    const error = page.locator('#error');
    if (await error.isVisible().catch(() => false)) {
      const txt = (await error.textContent().catch(() => ''))?.trim();
      console.warn('[register] Hibaüzenet:', txt);
    } else {
      console.log('[register] Regisztráció lefutott (vagy user már létezett).');
    }
  } catch (e) {
    console.warn('[register] Kivétel (nem végzetes):', e.message);
  } finally {
    await page.close().catch(() => {});
    await context.close().catch(() => {});
  }
}

BeforeAll(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });

  const baseURL = process.env.BASE_URL || 'https://thinking-tester-contact-list.herokuapp.com';
  await registerUserIfNeeded(baseURL);
});

AfterAll(async function () {
  await browser?.close();
});

Before(async function () {
  this.context = await browser.newContext({
    baseURL: this.baseURL,
    recordVideo: process.env.RECORD_VIDEO ? { dir: 'reports/videos' } : undefined,
  });
  this.page = await this.context.newPage();
});

// UI login before @contacts scenarios
Before({ tags: '@contacts' }, async function () {
  const email = process.env.USER_EMAIL || users.valid.email;
  const password = process.env.USER_PASSWORD || users.valid.password;

  await this.page.goto('/');
  await this.page.fill('#email', email);
  await this.page.fill('#password', password);
  await this.page.click('#submit');
  await this.page.waitForURL('**/contactList', { timeout: 30000 });
});

After(async function ({ result, pickle }) {
  if (result && result.status === Status.FAILED) {
    const safeName = pickle.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const screenshotDir = 'reports/screenshots';
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
    const screenshotPath = `${screenshotDir}/${safeName}.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log('Screenshot saved:', screenshotPath);
  }
  await this.page?.close();
  await this.context?.close();
});
