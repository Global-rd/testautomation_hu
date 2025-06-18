describe("Vendég vásárlás és hibaellenőrzés", () => {
  it("Vásárlási folyamat vendégként", () => {
    // 1. Keresés funkció használata
    // Timestamp létrehozása, hogy minden futásnál egyedi emailt és azonosítót tudjunk létrehozni
    const now = new Date();
    const shortTimestamp = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}_${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}`;
    const valueWithTimestamp = `TestUser_${shortTimestamp}`;

    cy.visit("/");
    cy.get('input[name="filter_keyword"]').type("shampoo{enter}");

    // 2. Termék kiválasztása, részletező oldal és review ellenőrzése
    cy.contains(".fixed_wrapper .prdocutname", /shampoo/i)
      .first()
      .click();
    cy.get(".productname").should("contain", "Shampoo");

    cy.get("#myTab")
      .contains("li", /Reviews/i)
      .click();
    cy.get("#current_reviews").then(($reviewSection) => {
      if (
        $reviewSection.text().includes("There are no reviews for this product.")
      ) {
        cy.log("Nincs review ennél a terméknél");
      } else {
        cy.log("Review található ennél a terméknél");
      }
    });

    // 3. Termék kosárba helyezése
    cy.get(".cart").click();

    // 4. Tovább a kosár oldalra → Checkout
    cy.get("#cart_checkout1").click();

    // 5. Próbálj fizetni vendégként (bejelentkezés nélkül)
    cy.get('button[title="Continue"]').click();
    // 6. Ellenőrizd, hogy rendelői adatok kötelezőek
    cy.get('button[title="Continue"]').click();
    cy.contains("First Name must be between 1 and 32 characters!").should(
      "be.visible"
    );
    cy.contains("Last Name must be between 1 and 32 characters!").should(
      "be.visible"
    );
    cy.contains("Email Address does not appear to be valid!").should(
      "be.visible"
    );

    // Töltsd ki a szükséges adatokat
    cy.get('input[name="firstname"]').type("Pelda");
    cy.get('input[name="lastname"]').type("Bela");
    cy.get('input[id="AccountFrm_email"]').type(
      valueWithTimestamp + "@gmail.com"
    );
    cy.get('input[name="address_1"]').type("Test Address ASD 1");
    cy.get('input[name="city"]').type("Test City");
    cy.get('select[name="zone_id"]').select("Aberdeen");
    cy.get('input[id="AccountFrm_postcode"]').type("123456");
    cy.get('input[name="loginname"]').type(valueWithTimestamp);
    cy.get('input[name="password"]').type("peldabela12");
    cy.get('input[name="confirm"]').type("peldabela12");
    cy.get('input[name="agree"]').check();

    cy.get('button[title="Continue"]').click();

    // 7. Rendelés véglegesítése és invoice ellenőrzése
    cy.get('button[title="Confirm Order"]').click();

    // Invoice/Order visszaigazoló oldal ellenőrzése
    cy.url().should("include", "success");
    cy.contains(" Your Order Has Been Processed!").should("be.visible");

    //Klikkelj a számla linkre
    cy.get(".contentpanel").contains("a", "invoice page").click();

    // Ellenőrizd, hogy a számlán a helyes adatok szerepelnek
    cy.contains("Pelda").should("be.visible");
    cy.contains("Bela").should("be.visible");
    cy.contains(valueWithTimestamp + "@gmail.com").should("be.visible");
    cy.contains("Test Address ASD 1").should("be.visible");
    cy.contains("Aberdeen").should("be.visible");
    cy.contains("United Kingdom").should("be.visible");
    cy.get(".invoice_products > tbody")
      .contains(/Shampoo/i)
      .should("be.visible");
  });
});
