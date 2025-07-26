describe("Új számla nyitása regisztráció után", () => {
  let newAccountNumber;

  beforeEach(() => {
    cy.registerUser();
  });

  it("Sikeres számlanyitás, mentés, majd 2900$ átutalás a számlára", () => {
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

    // Kinyerjük a számlaszámot a részletek oldalról
    cy.get("#accountId", { timeout: 10000 })
      .should("exist")
      .should(($el) => {
        expect($el.text().trim()).to.match(/^\d+$/);
      })
      .invoke("text")
      .then((accountNumber) => {
        newAccountNumber = accountNumber.trim();

        cy.writeFile("cypress/fixtures/account.json", {
          accountNumber: newAccountNumber,
        });

        cy.log("Mentett számlaszám: " + newAccountNumber);

        //
        // Átutalás a frissen létrehozott számlára
        //
        cy.contains("Transfer Funds").click();

        // Beírjuk az összeget
        cy.get("#amount").clear().type("2900");

        // fromAccountId → olyan számlát keresünk, ami nem az új
        cy.get("select#fromAccountId")
          .find("option")
          .then((options) => {
            const availableAccounts = [...options].map((opt) => opt.value);
            const fromAccount = availableAccounts.find(
              (acc) => acc !== newAccountNumber
            );

            expect(fromAccount).to.exist;
            cy.get("select#fromAccountId").select(fromAccount);
          });

        // toAccountId → az új számla
        cy.get("select#toAccountId").select(newAccountNumber);

        // Küldés
        cy.get("input[type='submit'][value='Transfer']").click();

        // Ellenőrzés
        cy.contains("Transfer Complete!").should("be.visible");
        
        // Vissza a főoldalra
        cy.contains("Accounts Overview").click();
        
        // Kattintás az új számlaszámra (amit mentettünk korábban)
        cy.contains(newAccountNumber).click();
        
        cy.get("#balance")
            .should("be.visible")
            .should("have.text", "$3000.00");
      });
  });
});