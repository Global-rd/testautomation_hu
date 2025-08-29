describe("Exercise 6: Transfer funds - Prevent same-account transfer", () => {
  beforeEach(() => {
    cy.loginToParaBank();
  });

  it("should throw an error when attempting to transfer from/to accounts, whether on the UI or API layer", () => {
    // Step 1: Navigate to Transfer Funds
    cy.visit("transfer.htm");
    cy.get("h1").should("contain", "Transfer Funds");

    // Step 2: Get available accounts and select the same account for both dropdowns
    cy.get("#fromAccountId option").should("have.length.greaterThan", 0);
    cy.get("#toAccountId option").should("have.length.greaterThan", 0);

    // Step 2: Fill transfer form
    cy.get("#amount").type("200");

    // Step 3: Select source account (from)
    cy.get("#fromAccountId").select(0); // First account

    // Step 4: Select the same account (to)
    cy.get("#toAccountId").select(0);

    // Step 5: Set up API intercept to monitor transfer attempts
    cy.intercept("POST", "*/services_proxy/bank/transfer?*").as("transfer");

    // Step 6: Submit transfer
    cy.get('input[value="Transfer"]').click();

    // Step 7: Verify transfer failure
    cy.wait("@transfer").then((interception) => {
      expect(interception.response.statusCode).to.equal(400);
      cy.get("#showResult").should("be.visible");
      cy.get("h1").should(
        "contain",
        "The source and destination accounts cannot be the same!"
      );
    });
  });
});
