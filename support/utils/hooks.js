const {Before, After, Status} = require("@cucumber/cucumber");
const { readFileSync} = require("fs");

Before(async function() {
    await this.initBrowserSession();
})

Before({ tags: "@login" }, async function () {
    await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/login');

    const rawData = readFileSync('./support/data/users.json');
    const validUser = JSON.parse(rawData).validUsers[0];

    await this.page.fill('#email', validUser.username);
    await this.page.fill('#password', validUser.password);
    await this.page.locator('#submit').click();

    await this.page.waitForURL('https://thinking-tester-contact-list.herokuapp.com/contactList');
})

After(async function(testCase) {
    if (testCase.result.status === Status.FAILED) {
        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/${testCase.pickle.name}.png`
        });
        this.attach(screenshot, "image/png");
    }
    await this.closeBrowserSession();
})

After({ tags: "@login" }, async function () {
    while (true) {
        const contactRows = this.page.locator(".contactTableBodyRow");

        const count = await contactRows.count();

        if(count === 0){
            break;
        }

        await contactRows.first().click();
        await this.page.waitForURL("**/contactDetails");
        this.page.once('dialog', dialog => dialog.accept());
        await this.page.locator("#delete").click();
        await this.page.waitForURL("**/contactList");
    }
});