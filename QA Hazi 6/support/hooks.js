const { Before, After, BeforeAll, AfterAll } = require("@cucumber/cucumber");
const { generateFakeContact } = require("./dataGenerator");
const { setDefaultTimeout } = require("@cucumber/cucumber");

// Set timeout to 10 seconds
setDefaultTimeout(10000);

Before(async function (scenario) {
  // Read tag info from scenario
  this.expectFailure = scenario.pickle.tags.some(
    (tag) => tag.name === "@expect-failure"
  );

  // Launch fresh browser
  await this.launchBrowser();

  // Create fake contact and attach to world
  this.fakeContact = generateFakeContact();
});

After(async function (scenario) {
  if (scenario.result?.status === "FAILED") {
    await this.page.screenshot({ path: `reports/${Date.now()}.png` });
  }
  await this.closeBrowser();
});
