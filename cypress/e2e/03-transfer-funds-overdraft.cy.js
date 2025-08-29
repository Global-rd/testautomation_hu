describe("Exercise 3: Transfer funds - Overdraft behaviour", () => {
  beforeEach(() => {
    cy.loginToParaBank();
  });

  it("should handle overdraft when transfer amount exceeds account balance", () => {
    // Step 1: Navigate to "Accounts Overview" to check current balance
    cy.get('a[href="overview.htm"]').click();
    cy.get("#accountTable").should("be.visible");

    let currentBalance = 0;
    let transferAmount = 0;

    // Get the first account's current balance
    cy.get("#accountTable tbody tr:first td:eq(1)")
      .invoke("text")
      .then((balanceText) => {
        // Step 2: Navigate to Transfer Funds
        cy.visit("transfer.htm");
        cy.get("h1").should("contain", "Transfer Funds");

        // Parse current balance (remove $ and , symbols)
        currentBalance = parseFloat(balanceText.replace(/[$,]/g, ""));
        cy.log(`Current Account Balance: $${currentBalance}`);

        // Calculate transfer amount that will cause overdraft
        transferAmount = currentBalance + 100; // Transfer $100 MORE than available
        cy.log(`Transfer Amount: $${transferAmount} (Overdraft by $100)`);

        // Step 3: Fill transfer form to create overdraft scenario
        cy.get("#amount").type(transferAmount.toString());

        // Select source account (the one we checked balance for)
        cy.get("#fromAccountId").select(0); // First account

        // Select different destination account
        cy.get("#toAccountId option").should("have.length.greaterThan", 1);
        cy.get("#toAccountId").select(1); // Second account (different from source)

        cy.intercept("POST", "*/services_proxy/bank/transfer?*").as("transfer");

        // Step 4: Submit transfer (this should cause overdraft)
        cy.get('input[value="Transfer"]').click();

        // Step 5: Verify transfer completion
        cy.wait("@transfer").then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
          cy.get("#showResult").should("be.visible");
          cy.get("h1").should("contain", "Transfer Complete");

          // Step 6: Verify starting account goes negative in UI
          // Navigate back to Account Overview
          cy.get('a[href="overview.htm"]').click();
          cy.get("#accountTable").should("be.visible");

          // Find the source account and verify it shows negative balance
          cy.get("#accountTable tbody tr:first td:eq(1)").should(
            "contain",
            "-"
          ); // Should contain minus sign
          cy.get("#accountTable tbody tr:first td:eq(1)")
            .invoke("text")
            .then((newBalanceText) => {
              cy.log(`New Balance after Overdraft: ${newBalanceText}`);

              // Parse the negative balance
              const newBalance = parseFloat(
                newBalanceText.replace(/[$,]/g, "")
              );

              // Verify balance is negative
              expect(newBalance).to.be.lessThan(0);

              // Verify the math: new balance should be (original - transfer amount)
              const expectedBalance = currentBalance - transferAmount;
              expect(newBalance).to.equal(expectedBalance);

              // Verify negative balance format in UI
              expect(newBalanceText).to.match(/-\$[\d,]+\.\d{2}/); // Format: -$100.00
            });
        });

        // Step 7: Verify API response contains negative balance
        // Set up API intercept to capture account balance call
        cy.intercept("GET", "/parabank/services_proxy/bank/accounts/*").as(
          "getAccountBalance"
        );

        // Click on the overdrafted account to trigger API call
        cy.get("#accountTable tbody tr:first td:first a").click();

        // Wait for and verify API response
        cy.wait("@getAccountBalance").then((interception) => {
          expect(interception.response.statusCode).to.equal(200);

          const responseBody = interception.response.body;
          expect(responseBody).to.have.property("balance");
          expect(responseBody).to.have.property("id");

          // REQUIREMENT: API response should contain negative balance
          expect(responseBody.balance).to.be.a("number");
          expect(responseBody.balance).to.be.lessThan(0);

          // Verify the exact negative amount matches our calculation
          const expectedBalance = currentBalance - transferAmount;
          expect(responseBody.balance).to.equal(expectedBalance);

          cy.log(
            `API Response - Balance: ${responseBody.balance}, Account ID: ${responseBody.id}`
          );
        });
      });
  });
});
