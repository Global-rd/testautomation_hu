const { Before, After } = require('@cucumber/cucumber');
const fs = require('fs');

Before(async function () {
    await this.init();
});

After(async function (scenario) {
    if (scenario.result.status === 'FAILED') {
        await this.page.screenshot({ path: `reports/${scenario.pickle.name}.png` });
    }
    await this.close();
});
