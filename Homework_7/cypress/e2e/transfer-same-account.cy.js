  it("Will not allow same account transfer ", () => {
    cy.intercept("POST", "/parabank/services_proxy/bank/transfer*").as(
      "transferRequest"
    );
    cy.contains("Transfer Funds").click();
    cy.get("#fromAccountId")
      .find("option")
      .first()
      .then(($opt) => {
        const accountID = $opt.val();
        cy.get("#fromAccountId").select(accountID);
        cy.get("#toAccountId").select(accountID);
      });

    cy.get('input[id="amount"]').type("1000");
    cy.get('input[value="Transfer"]').click();

    // This will fail because the transfer is not allowed
    cy.contains("Transfer Complete!").should("not.exist");
    cy.wait("@transferRequest")
      .its("response")
      .then(({ statusCode }) => {
        expect(statusCode).to.eq(400);
      });

    // Will fail because the transfer should not be allowed
    cy.contains(/cannot transfer to the same account/i).should("be.visible");
  });