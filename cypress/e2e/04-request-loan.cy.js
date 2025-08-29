describe("Exercise 4: Request Loan - partial mandatory field", () => {
  beforeEach(() => {
    cy.loginToParaBank();
    cy.openLoanRequestForm();
  });

  it("should throw an error for submitting both fields empty", () => {
    // Step 1:
    // Select source account
    cy.get("#fromAccountId").select(0); // First account

    cy.intercept("POST", "*/services_proxy/bank/requestLoan?*").as(
      "requestLoan"
    );

    // Step 2:
    cy.get('input[value="Apply Now"]').click();

    // Wait for and verify API response
    cy.wait("@requestLoan").then((interception) => {
      expect(interception.response.statusCode).to.equal(400);

      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("title", "Bad Request");
      expect(responseBody).to.have.property("status", 400);
    });
  });
  it("should submit the form with the Loan Amount field filled", () => {
    // Step 1:
    // Select source account
    cy.get("#amount").type("350");
    cy.get("#fromAccountId").select(0); // First account

    cy.intercept("POST", "*/services_proxy/bank/requestLoan?*").as(
      "requestLoan"
    );

    // Step 2:
    cy.get('input[value="Apply Now"]').click();

    // Wait for and verify API response
    cy.wait("@requestLoan").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);

      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("approved", true);
      cy.get("#requestLoanResult").should("be.visible");
    });
  });
  it("should submit the form with the Down Payment field filled", () => {
    // Step 1:
    // Select source account
    cy.get("#downPayment").type("150");
    cy.get("#fromAccountId").select(0); // First account

    cy.intercept("POST", "*/services_proxy/bank/requestLoan?*").as(
      "requestLoan"
    );

    // Step 2:
    cy.get('input[value="Apply Now"]').click();

    // Wait for and verify API response
    cy.wait("@requestLoan").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);

      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("approved", true);
      cy.get("#requestLoanResult").should("be.visible");
    });
  });
  it("should submit the form with both fields filled in", () => {
    // Step 1:
    // Fill in both fields and select source account
    cy.get("#amount").type("400");
    cy.get("#downPayment").type("200");
    cy.get("#fromAccountId").select(0); // First account

    cy.intercept("POST", "*/services_proxy/bank/requestLoan?*").as(
      "requestLoan"
    );

    // Step 2:
    cy.get('input[value="Apply Now"]').click();

    // Wait for and verify API response
    cy.wait("@requestLoan").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);

      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("approved", true);
      cy.get("#requestLoanResult").should("be.visible");
    });
  });
});
