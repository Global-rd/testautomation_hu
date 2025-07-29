/// <reference types="cypress" />

describe("Account creation flows", () => {
  beforeEach(() => {
    cy.loginViaUI();
  });

  it("opens a new CHECKING account with a $3000 starting balance", () => {
    cy.intercept("POST", "/parabank/services_proxy/bank/createAccount*").as(
      "createAccount"
    );

    cy.contains("Open New Account").click();
    cy.get("#type").select("CHECKING");

    cy.get("#fromAccountId")
      .find("option")
      .first()
      .then(($opt) => {
        // Keep the originating account id for later assertions
        cy.wrap($opt.val()).as("baseAccount");
      });

    cy.get('input[value="Open New Account"]').click();
    cy.wait("@createAccount")
      .its("response")
      .then(({ statusCode, body }) => {
        expect(statusCode).to.eq(200);
        expect(body.id).to.exist;
        expect(body.balance).to.eq(3000);
        cy.wrap(body.id).as("newAccountId");
      });

    // UI verification -- will fail
    cy.contains("Accounts Overview").click();
    cy.get("@newAccountId").then((id) => {
      cy.contains(id).parent().should("contain", "$3000");
    });

    // API verification
    cy.get("@newAccountId").then((id) => {
      cy.getAccount(id).its("body.balance").should("eq", 3000);
    });
  });

  it("opens a new SAVINGS account and appears on both layers", () => {
    cy.intercept("POST", "/parabank/services_proxy/bank/createAccount*").as(
      "createSavings"
    );

    cy.contains("Open New Account").click();
    cy.get("#type").should("be.visible");
    cy.get("#type option").should("have.length.greaterThan", 1); // <-- dropdown is ready
    cy.get("#type").select("SAVINGS");

    cy.get("#fromAccountId")
      .find("option")
      .first()
      .then(($opt) => {
        // Keep the originating account id for later assertions
        cy.wrap($opt.val()).as("saveAccount");
      });
    // now click submit
    cy.get('input[value="Open New Account"]').click();

    // API check
    cy.wait("@createSavings")
      .its("response.body")
      .then((body) => {
        expect(body.type).to.eq("SAVINGS");
        cy.wrap(body.id).as("savingsId");
      });

    // UI check
    cy.contains("Accounts Overview").click();
    cy.get("@savingsId").then((id) => {
      cy.contains(id).parent().should("exist");
    });
  });
});
