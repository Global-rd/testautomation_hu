const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Before(async function () {
  this.browser = await chromium.launch();
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  // Login, ha szükséges
});

After(async function (scenario) {
  if (scenario.result.status === 'failed') {
    await this.page.screenshot({ path: `reports/${Date.now()}.png` });
  }
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});