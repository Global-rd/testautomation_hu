/// <reference types="cypress" />

describe("Transfer Funds scenarios", () => {
  beforeEach(() => {
    cy.loginViaUI();
  });

  it("allows overdraft and shows negative balance", () => {
    cy.intercept("POST", "/parabank/services_proxy/bank/transfer*").as(
      "transfer"
    );

    cy.contains("Transfer Funds").click();

    // Capture first two different account IDs
    cy.get("#fromAccountId")
      .find("option")
      .then(($opts) => {
        const from = $opts.eq(0).val();
        const to = $opts.eq(1).val();
        cy.get("#fromAccountId").should("be.visible");
        cy.get("#fromAccountId option").should("have.length.greaterThan", 1); // <-- dropdown is ready
        cy.get("#fromAccountId").select(from);
        cy.get("#toAccountId").select(to);
        cy.wrap({ from, to }).as("acc");
      });

    cy.get('input[id="amount"]').type("4000");
    cy.get('input[value="Transfer"]').click();

    // Will fail -- API response for transfer does not contain the new balance
    cy.wait("@transfer")
      .its("response.body")
      .then((body) => {
        expect(body.newBalance).to.be.lessThan(0);
      });

    // UI should now display a negative balance on the source account
    cy.contains("Accounts Overview").click();
    cy.get("@acc").then(({ from }) => {
      cy.contains(from)
        .closest("tr")
        .find("td")
        .eq(1) // adjust this index if needed
        .should("contain.text", "-$");
    });
  });

  it("blocks transfer where source and destination are the same", () => {
    cy.intercept("POST", "/parabank/services_proxy/bank/transfer*").as(
      "transfer"
    );
    cy.contains("Transfer Funds").click();
    cy.get("#fromAccountId")
      .find("option")
      .first()
      .then(($opt) => {
        const id = $opt.val();
        cy.get("#fromAccountId").select(id);
        cy.get("#toAccountId").select(id);
      });

    cy.get('input[id="amount"]').type("50");
    cy.get('input[value="Transfer"]').click();

    // API error --- will fail because the transfer is not allowed
    cy.wait("@transfer")
      .its("response")
      .then(({ statusCode }) => {
        expect(statusCode).to.eq(400);
      });

    // Expected validation error in UI --- will fail because the transfer is not allowed
    cy.contains(/cannot transfer to the same account/i).should("be.visible");
  });
});
