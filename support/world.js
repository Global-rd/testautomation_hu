const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const config = require('../playwright.config');
const fs = require("fs");
const path = require("path");

class CustomWorld extends World {
  async initBrowserSession() {
    this.browser = await chromium.launch({ headless: false, slowMo: 100 });
    this.context = await this.browser.newContext({
      baseURL: "https://thinking-tester-contact-list.herokuapp.com/",
      screenshot: { mode: "only-on-failure", fullPage: true },
    });
    this.page = await this.context.newPage();
  }
  async closeBrowserSession() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
  async takeScreenshot(name) {
    if (this.page) {
      const screenshotsDir = "test-results/screenshots";
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }

      await this.page.screenshot({
        path: path.join(screenshotsDir, `${name}.png`),
        fullPage: true,
      });
    }
  }
}

setWorldConstructor(CustomWorld);