// -----  Custom reusable helpers -----

Cypress.Commands.add("loginViaUI", () => {
  cy.visit("/");
  cy.get('input[name="username"]').type(Cypress.env("username"));
  cy.get('input[name="password"]').type(Cypress.env("password"), {
    log: false,
  });
  cy.get('input[type="submit"]').click();
  cy.contains("Accounts Overview"); // simple assertion that login worked
});

Cypress.Commands.add("loginViaAPI", () => {
  // Direct form‑encoded POST request, cookies saved automatically
  cy.request({
    method: "POST",
    url: "/parabank/login.htm",
    form: true,
    body: {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    },
  }).then((resp) => {
    expect(resp.status).to.eq(200);
  });
});

Cypress.Commands.add("getAccount", (accountId) => {
  return cy.request(`/parabank/services/bank/accounts/${accountId}`);
});
