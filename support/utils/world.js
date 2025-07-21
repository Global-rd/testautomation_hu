const { setWorldConstructor, World } = require("@cucumber/cucumber");
const playwright = require("playwright-core");

class CustomWorld extends World{
    constructor(options) {
        super(options);
    }

    async initBrowserSession(){
        this.browser = await playwright.chromium.launch({headless: true});
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async closeBrowserSession() {
        await this.page?.close();
        await this.context?.close();
        await this.browser?.close();
    }
}

setWorldConstructor(CustomWorld);