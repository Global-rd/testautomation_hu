const { setWorldConstructor } = require("@cucumber/cucumber");
const { chromium } = require("playwright");

class CustomWorld {
  async launchBrowser() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    await this.page?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
