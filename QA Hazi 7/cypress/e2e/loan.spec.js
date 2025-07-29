describe("Loan request", () => {
  beforeEach(() => {
    cy.loginViaUI();
    cy.intercept("POST", "/parabank/services_proxy/bank/requestLoan*").as(
      "loan"
    );
  });

  it("allows loan request with only Loan Amount field filled", () => {
    cy.contains("Request Loan").click();
    cy.get("#amount").type("1000");
    cy.get("#downPayment").clear(); // leaving blank on purpose
    cy.get('input[value="Apply Now"]').click();
    //API Status code check
    cy.wait("@loan").its("response.statusCode").should("eq", 200); // will fail because of "An internal error has occurred and has been logged."
    //UI error message check
    cy.contains(/loan application result/i).should("be.visible");
  });

  it("allows loan request with only Down Payment field filled", () => {
    cy.contains("Request Loan").click();
    cy.get("#amount").clear(); // leaving blank on purpose
    cy.get("#downPayment").type("1000");
    cy.get('input[value="Apply Now"]').click();
    //API Status code check
    cy.wait("@loan").its("response.statusCode").should("eq", 200); // will fail because of "An internal error has occurred and has been logged."
    //UI error message check
    cy.contains(/Congratulations, your loan has been approved./i).should(
      "be.visible"
    );
  });
});
