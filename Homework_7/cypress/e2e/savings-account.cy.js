it("Opens a new savings account", () => {
    cy.loginOnUI();
    cy.intercept("POST", "/parabank/services_proxy/bank/createAccount*").as(
      "savingsAccountRequest"
    );
    cy.contains("Open New Account").click();
    cy.get("#type").select("SAVINGS");

    cy.get("#fromAccountId")
      .find("option")
      .first()
      .then(($opt) => {
        cy.wrap($opt.val()).as("savingsAccountId");
      });
    // now click submit
    cy.get('input[value="Open New Account"]').click();

    // API check
    cy.wait("@savingsAccountRequest")
      .its("response.body")
      .then((res) => {
		expect(res.status).to.eq(200);
		expect(res.body).to.have.property('type', 'SAVINGS');
        cy.wrap(res.body.id).as("savingsBodyId");
      });

    // UI check
    cy.contains("Accounts Overview").click();
    cy.get("@savingsBodyId").then((id) => {
      cy.contains(id).parent().should("exist");
    });
  });