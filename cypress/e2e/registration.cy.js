describe("Registration Form", () => {
  beforeEach(() => {
    // Visit the registration page
    cy.visit("/index.php?rt=account/create");
  });
  //function for the error messages
  function checkValidationError(inputSelector, expectedMessage) {
    cy.get(inputSelector)
      //Finding the input's parent
      .parents(".form-group")
      //Every input has a help-block, which contains the error messages
      .find(".help-block")
      .and("contain", expectedMessage);
  }

  it("Displays error messages for invalid data", () => {
    // Try submitting the form with an invalid email
    cy.get("input#AccountFrm_email").type("invalid-email");
    cy.get('button[title="Continue"]').click();
    checkValidationError(
      "#AccountFrm_email",
      "Email Address does not appear to be valid!"
    );

    // Try submitting with an empty first name
    cy.get("input#AccountFrm_firstname").clear();
    cy.get('button[title="Continue"]').click();
    checkValidationError(
      "#AccountFrm_firstname",
      "First Name must be between 1 and 32 characters!"
    );

    // Try submitting with a missing last name
    cy.get("input#AccountFrm_lastname").clear();
    cy.get('button[title="Continue"]').click();
    checkValidationError(
      "#AccountFrm_lastname",
      "Last Name must be between 1 and 32 characters!"
    );
  });
});
