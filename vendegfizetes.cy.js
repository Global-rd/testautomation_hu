/// <reference types="cypress" />

describe('Vendég fizetés teszt', () => {
  it('Vendégként rendelés leadása', () => {
    cy.visit('https://automationteststore.com/');
    cy.get('#filter_keyword').type('shampoo');
    cy.get('.button-in-search[title="Go"]').click();
    cy.get('.fixed_wrapper .prdocutname', { timeout: 10000 }).should('exist');

    // Első találat kiválasztása és kosárba helyezése
    cy.get('.fixed_wrapper .prdocutname').first().then($el => {
      const termekNev = $el.text().trim();
      cy.wrap($el).click();
      cy.get('a.cart').should('be.visible').click();

      // Kosár oldal, checkout indítása
      cy.get('#cart_checkout1').click();

      // Vendégként fizetés választása
      cy.get('input#accountFrm_accountguest').check();
      cy.get('button[title="Continue"]').click();

      // Kötelező mezők kitöltése
      cy.get('#guestFrm_firstname').type('Teszt');
      cy.get('#guestFrm_lastname').type('Vendeg');
      cy.get('#guestFrm_email').type('teszt.vendeg@example.com');
      cy.get('#guestFrm_address_1').type('Teszt utca 1');
      cy.get('#guestFrm_city').type('Tesztváros');
      cy.get('#guestFrm_zone_id').select(1);
      cy.get('#guestFrm_postcode').type('1234');
      cy.get('#guestFrm_country_id').select('Hungary');
      cy.get('button[title="Continue"]').click();

      // Megrendelés véglegesítése
      cy.get('button[title="Confirm Order"]').click();

   // Invoice oldalra lépés és ellenőrzés
    cy.get('.contentpanel a[href*="invoice"]').should('exist').then($link => {
    const invoiceUrl = $link.prop('href');
    cy.visit(invoiceUrl);

  // Ellenőrzések az invoice oldalon
  cy.get('body').should('contain.text', termekNev);
  cy.get('body').should('contain.text', 'Teszt Vendeg');
  cy.get('body').should('contain.text', 'teszt.vendeg@example.com');
  cy.get('body').should('contain.text', 'Teszt utca 1');
});
    });
  });
});