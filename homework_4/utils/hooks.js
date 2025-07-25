const { Before, After, AfterAll } = require('@cucumber/cucumber');
const testUsers = require('../fixtures/testUsers');
const { chromium } = require('playwright');

Before(async function () {
    await this.init();
});

After(async function (scenario) {
    if (scenario.result.status === 'FAILED') {
        await this.page.screenshot({ path: `reports/${scenario.pickle.name}.png` });
    }
    await this.close();
});

// Tesztadatok törlése

AfterAll({ timeout: 60000 }, async function () {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://thinking-tester-contact-list.herokuapp.com/');

    await page.fill('#email', testUsers.validUser.email);
    await page.fill('#password', testUsers.validUser.password);
    await page.click('#submit');
    await page.waitForSelector('.contacts');

    let rows = await page.$$('tr.contactTableBodyRow');
    console.log(`\nFound ${rows.length} contact rows to delete`);

    while (rows.length > 0) {
        await rows[0].click();
        await page.waitForSelector('#delete');
        
        page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await page.click('#delete');
        await page.waitForSelector('.contacts');

        rows = await page.$$('tr.contactTableBodyRow');
    }

    await browser.close();
    console.log('All contacts deleted');
});