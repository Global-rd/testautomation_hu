describe("Account creation flows", () => {
beforeEach(() => {
  cy.loginOnUI();
})

it("Creates a new account with $3000 balance", () => {
  cy.intercept("POST", "/parabank/services_proxy/bank/createAccount*").as("createAccount");

  cy.contains("Open New Account").click();
  cy.get("#type").select("CHECKING");
  cy.get("#fromAccountId")
    .find("option")
    .first()
    .then(($opt) => {
      cy.wrap($opt.val()).as("firstAccountId");
    });
  cy.get('input[value="Open New Account"]').click();
  cy.wait("@createAccount")
    .its("response")
    .then(({ statusCode, body }) => {
      expect(statusCode).to.eq(200);
      expect(body.id).to.exist;
      expect(body.balance).to.eq(3000);
    });

  // API verification
  cy.get("@firstAccountId").then((id) => {
    cy.getAccount(id).its("body.balance").should("eq", 3000);
    });
  })
})