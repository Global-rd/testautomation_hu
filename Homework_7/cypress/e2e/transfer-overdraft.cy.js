describe("Transfer Funds", () => {
  beforeEach(() => {
    cy.loginOnUI();
  })

  it("Will allow overdraft and reflects negative balance", () => {
    cy.intercept("POST", "/parabank/services_proxy/bank/transfer*").as(
      "transfer"
    );

    cy.contains('Transfer Funds').click();

	cy.url().should('include', '/parabank/transfer.htm');
    cy.get("#fromAccountId")
      .find("option")
      .then(($opts) => {
        const fromAccount = $opts.eq(0).val();
        const toAccount = $opts.eq(1).val();
        cy.get("#fromAccountId").select(fromAccount);
        cy.get("#toAccountId").select(toAccount);
        cy.get('input[value="Transfer"]').click();
      })

    cy.get('input[id="amount"]').type("4000");
    cy.get('input[value="Transfer"]').click();

	cy.contains('Transfer Complete!').should('be.visible');

    cy.contains('Accounts Overview').click();
	cy.get('#accountTable')
	    .contains('a', fromAccount)
		.parents('tr')
		.find('td')
        .eq(1)
        .should("contain.text", "-$");
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