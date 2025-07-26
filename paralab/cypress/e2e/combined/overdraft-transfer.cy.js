let newAccountNumber;
let balanceAmount;

beforeEach(() => {
  cy.registerUser();
});

it("Overdraft teszt – nagyobb összeg utalása a számlánál, stabil kivárással és loggal", () => {
  // Új számla nyitása
  cy.contains("Open New Account").click();
  cy.get("#type").select("SAVINGS");

  cy.get("#fromAccountId", { timeout: 10000 })
    .should("be.visible")
    .find("option")
    .should("have.length.greaterThan", 0);

  cy.get("input[type='button'][value='Open New Account']").click();

  // Rákattintunk az új számlára
  cy.get("#newAccountId").click();

  // Számlaszám kivárása, validálása és logolása
  cy.get("#accountId", { timeout: 10000 })
    .should("be.visible")
    .should(($el) => {
      const text = $el.text().trim();
      expect(text).to.match(/^\d+$/);
      expect(text).to.not.equal("");
    })
    .invoke("text")
    .then((accountIdText) => {
      newAccountNumber = accountIdText.trim();

      cy.writeFile("cypress/fixtures/account.json", {
        accountNumber: newAccountNumber,
      });

      cy.log(`📄 Mentett számlaszám: ${newAccountNumber}`);
    });

  // Balance kivárása és logolása
  cy.get("#balance")
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      const cleaned = text.replace(/[^0-9.]/g, "");
      balanceAmount = parseFloat(cleaned);
      cy.log(`💰 Kezdeti egyenleg: $${balanceAmount}`);
    });

  // Transfer Funds – nagyobb összeg utalása
  cy.then(() => {
    const transferAmount = balanceAmount + 100;
    cy.log(`📤 Átutalni kívánt összeg: $${transferAmount}`);

    cy.contains("Transfer Funds").click();
    cy.get("#amount").clear().type(transferAmount.toString());

    // fromAccount kiválasztása – kivárással
    cy.get("select#fromAccountId")
      .should("contain", newAccountNumber)
      .select(newAccountNumber);

    // toAccount kiválasztása – másik saját számla
    cy.get("select#toAccountId")
      .find("option")
      .should("have.length.greaterThan", 1)
      .then((options) => {
        const allAccounts = [...options].map((opt) => opt.value);
        const toAccount = allAccounts.find((acc) => acc !== newAccountNumber);

        cy.log(`➡️ Célszámla (toAccount): ${toAccount}`);

        cy.get("select#toAccountId")
          .should("contain", toAccount)
          .select(toAccount);

        // Utalás indítása
        cy.get("input[type='submit'][value='Transfer']").click();

        // Sikeres visszajelzés
        cy.contains("Transfer Complete!").should("be.visible");
        cy.contains(`$${transferAmount.toFixed(2)}`).should("exist");

        //Accounts Overview → számlára kattintás
        cy.contains("Accounts Overview").click();
        cy.contains(newAccountNumber).click();

        // Balance újraellenőrzése és log
        cy.get("#balance", { timeout: 10000 })
            .should("be.visible")
            .should("not.be.empty")
            .invoke("text")
            .then((text) => {
                const cleaned = text.replace(/[^0-9.-]/g, "");
                const finalBalance = parseFloat(cleaned);
                cy.log(`📉 Új egyenleg: $${finalBalance}`);
                expect(finalBalance).to.be.lessThan(0);
             });
      });
  });
});