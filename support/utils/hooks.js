const {Before, After} = require("@cucumber/cucumber");

Before(async function() {
    await this.initBrowserSession();
})

After(async function() {
    await this.closeBrowserSession();
})