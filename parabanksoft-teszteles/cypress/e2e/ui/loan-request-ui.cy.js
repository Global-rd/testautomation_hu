beforeEach(() => {
  cy.registerUser();
});

it("Sikeres kölcsönkérés Loan Amount és Down Payment megadásával", () => {
  // számlanyitás
  cy.contains("Open New Account").click();
  cy.get("#type").select("SAVINGS");
  cy.get("#fromAccountId")
    .should("be.visible")
    .find("option")
    .should("have.length.greaterThan", 0);
  cy.get("input[type='button'][value='Open New Account']").click();

  // számlaszám mentése
  let newAccountNumber;
  cy.get("#newAccountId").click();
  cy.get("#accountId", { timeout: 10000 })
    .should("be.visible")
    .should("not.be.empty")
    .invoke("text")
    .then((accountNumber) => {
      newAccountNumber = accountNumber.trim();
      cy.writeFile("cypress/fixtures/account.json", {
        accountNumber: newAccountNumber,
      });
      cy.log("📄 Mentett számlaszám: " + newAccountNumber);

      // request Loan oldal
      cy.contains("Request Loan").click();

      // Mindkét mező kitöltése
      cy.get("#amount").type("1500");
      cy.get("#downPayment").type("300");

      // számlaválasztás
      cy.get("select#fromAccountId").select(newAccountNumber);

      // Gombra kattintás
      cy.get("input[type='button'][value='Apply Now']").click();

      // UI válasz ellenőrzése
      cy.get("#rightPanel", { timeout: 10000 }).then(($panel) => {
        const text = $panel.text();
        cy.log("💬 Loan válasz:", text);

        expect(text).to.include("Loan Request Processed");
        expect(text).to.include("Status:").and.to.include("Approved");
        expect(text).to.include("Congratulations, your loan has been approved.");
        expect(text).to.include("Your new account number");
      });
    });
});