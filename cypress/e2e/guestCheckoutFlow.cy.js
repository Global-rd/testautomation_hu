describe("Guest checkout flow", () => {

    it("Visit Automation Test Store", () => {
    cy.visit("/");
    cy.get("#customer_menu_top").should("be.visible"); //asszert az oldal betöltésére
    cy.get("#filter_keyword").type("shampoo").type("{enter}"); //kereső mezőbe írás
    cy.contains('h4', "Products meeting the search criteria").should("be.visible"); //assert a találati oldal megjelenítésére
    cy.contains('a', "Curls to straight Shampoo").click(); //első találatra kattintás
    cy.get('a[href="#review"]').click(); //review fülre kattintás
    cy.get('#current_reviews > .content').invoke('text').its('length').should('be.gt', 0); //assert, hogy van review szöveg
    cy.get('a.cart').click(); //kosárba helyezés
    cy.contains('span.maintext', "Shopping Cart").should("be.visible"); //assert, hogy a kosár oldal megjelenik
    cy.get('.contentpanel').contains('td', 'Curls to straight Shampoo').should('be.visible'); //assert, hogy a termék szerepel a kosárban
    cy.get('#cart_checkout1').click(); //Checkout gomb kattintás
    cy.get('#accountFrm_accountguest').check(); // vendégként történő fizetés kiválasztása
    cy.get('button[type="submit"]').contains("Continue").click(); // tovább
    cy.contains('button', 'Continue').click(); // üres beküldés
    cy.contains("First Name must be greater than 3 and less than 32 characters!").should('be.visible');    // hibaüzenetek ellenőrzése
    cy.contains("Last Name must be greater than 3 and less than 32 characters!").should('be.visible');
    cy.contains("E-Mail Address does not appear to be valid!").should('be.visible');
    cy.contains("Address 1 must be greater than 3 and less than 128 characters!").should('be.visible');
    cy.contains("City must be greater than 3 and less than 128 characters!").should('be.visible');
    cy.contains("Please select a region / state!").should('be.visible');
    cy.contains("Zip/postal code must be between 3 and 10 characters!").should('be.visible');
    cy.get('#guestFrm_firstname').type("John"); // vendég adatok kitöltése
    cy.get('#guestFrm_lastname').type("Doe");
    cy.get('#guestFrm_email').type("aa@aa.aa");
    cy.get('#guestFrm_address_1').type("High St");
    cy.get('#guestFrm_city').type("Huntingdon");
    cy.get('#guestFrm_zone_id').select("Cambridgeshire"); 
    cy.get('#guestFrm_postcode').type("PE28 4TL");
    cy.contains('button', 'Continue').click();
    cy.contains('span.maintext', "Checkout Confirmation").should("be.visible"); //assert, hogy a checkout megerősítő oldal megjelenik
    cy.get('#checkout_btn').click(); // megerősítés gomb kattintás
    cy.contains('span.maintext', "Your Order Has Been Processed!").should("be.visible"); // assert a megerősítő oldalra 
    cy.contains('a', 'invoice page').click(); // kattintás az invoice oldalra
    cy.contains("John Doe").should("be.visible"); // high level assert az invoce oldalon lévő adatokra
    cy.contains("High St").should("be.visible");
    cy.contains("aa@aa.aa").should("be.visible");
    cy.contains("Huntingdon PE28 4TL").should("be.visible");
    cy.contains("Cambridgeshire").should("be.visible");
    cy.contains("United Kingdom").should("be.visible");
    cy.contains("Curls to straight Shampoo").should("be.visible");
    cy.contains("PCND004").should("be.visible");
    });
});