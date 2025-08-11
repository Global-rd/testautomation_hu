describe("Loan request", () => {
  beforeEach(() => {
    cy.loginOnUI();
    cy.intercept("POST", "/parabank/services_proxy/bank/requestLoan*").as(
      "loanRequest"
    );
  });

  it("Will allow loan request with only Loan Amount filled", () => {
    cy.contains("Request Loan").click();
    cy.get("#amount").type("1000");
    cy.get("#downPayment").clear(); 
    cy.get('input[value="Apply Now"]').click();
    cy.wait("@loanRequest").its("response.statusCode").should("eq", 200); 
    cy.contains('Congratulations').should('be.visible');
  });

  it("Will allow loan request with only Down Payment field filled", () => {
    cy.contains("Request Loan").click();
    cy.get("#amount").clear(); 
    cy.get("#downPayment").type("1000");
    cy.get('input[value="Apply Now"]').click();
    cy.wait("@loanRequest").its("response.statusCode").should("eq", 200); 
    cy.contains('Congratulations').should('be.visible');
  });
});
