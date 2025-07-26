let newAccountNumber;

beforeEach(() => {
  cy.registerUser();
});

it("Nem engedélyezett azonos számlára utalás – hibakezelés", () => {
  cy.contains("Open New Account").click();
  cy.get("#type").select("SAVINGS");

  cy.get("#fromAccountId", { timeout: 10000 })
    .should("be.visible")
    .find("option")
    .should("have.length.greaterThan", 0);

  cy.get("input[type='button'][value='Open New Account']").click();

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
      cy.log(`📄 Új számlaszám: ${newAccountNumber}`);
    });

  cy.then(() => {
    cy.contains("Transfer Funds").click();
    cy.get("#amount").clear().type("50");

    cy.get("select#fromAccountId")
      .should("contain", newAccountNumber)
      .select(newAccountNumber);

    cy.get("select#toAccountId")
      .should("contain", newAccountNumber)
      .select(newAccountNumber);

    cy.get("input[type='submit'][value='Transfer']").click();

    cy.get("#rightPanel", { timeout: 5000 }).then(($panel) => {
        const text = $panel.text();
        cy.log("📋 UI válasz tartalma:", text);

        if (text.includes("Transfer Complete")) {
            cy.screenshot("hiba_azonos_szamla_utalas");
            throw new Error("❌ A rendszer engedélyezte az azonos számlára történő utalást.");
        } else {
            expect(
            text.toLowerCase().includes("error") ||
            text.toLowerCase().includes("cannot") ||
            text.toLowerCase().includes("same account")
            ).to.be.true;
            cy.log("✅ A rendszer megfelelően visszautasította az utalást.");
  }
  });
});
});
//ez biztos ilyen becsapós kérdés volt, de nekem simán engedte ezt, így gondoltam ez a teszt fusson hibásra