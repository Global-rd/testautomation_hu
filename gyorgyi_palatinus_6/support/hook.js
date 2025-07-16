const {Before, After} = require('@cucumber/cucumber');
const {allure} = require('allure-cucumberjs'); 
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');


Before(async function () {

    await this.initBrowserSession();
    
});

After(async function (scenario) {
    
  //console.log(scenario);
  

    if (scenario.result.status === 'FAILED') {      
      const screenshotBuffer = await this.page.screenshot({ fullPage: true });

      const screenshotPath = path.resolve(
        'screenshots',
        `${scenario.pickle.name.replace(/\s+/g, '_')}.png`
      );
      fs.writeFileSync(screenshotPath, screenshotBuffer);
      console.log(`❌ Screenshot saved to ${screenshotPath}`);
    }
    await this.closeBrowserSession();
})