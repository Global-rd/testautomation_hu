describe("Exercise 1: New account opening", () => {
  beforeEach(() => {
    cy.loginToParaBank();
  });

  it("should open a new account after registration", () => {
    // Step 1: Navigate to "Open New Account"
    cy.get('a[href="openaccount.htm"]').click();

    // Verify we're on the Open New Account page
    cy.get("#openAccountForm").should("be.visible");
    cy.get("h1").should("contain", "Open New Account");

    // Step 2: Select account type (default is usually CHECKING)
    cy.get("#type").select("CHECKING");

    // Step 3: Select funding account (choose existing account)
    cy.get("#fromAccountId").select(0);

    // Step 4: Submit the form to open new account
    cy.get('input[value="Open New Account"]').click();

    // Step 5: Verify account creation success
    cy.get("#openAccountResult").should("be.visible");
    cy.get("h1").should("contain", "Account Opened!");

    // Get the new account number for verification
    cy.get("#newAccountId")
      .invoke("text")
      .then((newAccountId) => {
        cy.log(`New Account ID: ${newAccountId}`);

        // Step 6: Navigate to Accounts Overview to verify account
        cy.get('a[href="overview.htm"]').click();

        // Verify account appears in Accounts Overview UI
        cy.get("#accountTable").should("be.visible");
        cy.get("#accountTable tbody tr").should("contain", newAccountId);

        // Step 7: Click on the new account to see details
        cy.get(`a[href*="${newAccountId}"]`).click();

        // Verify account details page
        cy.get("#accountDetails").should("be.visible");
        cy.get("#accountId").should("contain", newAccountId);
        cy.get("#accountType").should("contain", "CHECKING");

        // Step 8: Verify starting balance in UI
        cy.get("#balance").should("be.visible");
        cy.get("#balance")
          .invoke("text")
          .then((balance) => {
            cy.log(`Account Balance: ${balance}`);
            // Verify balance is displayed in correct format
            const balanceAmount = parseFloat(balance.replace(/[$,]/g, ""));
            expect(balanceAmount).to.equal(3000);
            expect(balance).to.match(/\$3,000\.00/);
          });
      });

    // Step 9: Verify via API call (Network tab monitoring)
    // Intercept account details API call
    cy.intercept("GET", "*/services_proxy/bank/accounts/*").as(
      "getAccountDetails"
    );

    // Refresh page to trigger API call
    cy.reload();

    // Wait for and verify API response
    cy.wait("@getAccountDetails").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);

      // Verify API response structure
      const responseBody = interception.response.body;
      expect(responseBody).to.have.property("balance");

      expect(responseBody.balance).to.be.a("number");
      expect(responseBody.balance).to.equal(3000);
    });
  });
});
