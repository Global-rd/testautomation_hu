/// <reference types="cypress" />

describe('Keresés funkció teszt', () => {
  it('Keresés "shampoo" kulcsszóra', () => {
    cy.visit('https://automationteststore.com/');
    cy.get('#filter_keyword').type('shampoo');
    cy.get('.button-in-search[title="Go"]').click();
    cy.get('.fixed_wrapper .prdocutname', { timeout: 10000 }).should('exist');
    cy.url().should('include', 'search&keyword=shampoo');
    cy.contains('.prdocutname', /shampoo/i);
  });
});


describe('Termék részletező és review ellenőrzés', () => {
  it('Keresés után első termék részletező oldal és review ellenőrzése', () => {
    cy.visit('https://automationteststore.com/');
    cy.get('#filter_keyword').type('shampoo');
    cy.get('.button-in-search[title="Go"]').click();
    cy.get('.fixed_wrapper .prdocutname', { timeout: 10000 }).should('exist');

    // Első találat kiválasztása
    cy.get('.fixed_wrapper .prdocutname').first().click();

    // Reviews fülre kattintás
    cy.contains('a', 'Reviews').should('exist').click();

    // Review szekció ellenőrzése
    cy.get('#review', { timeout: 10000 }).should('exist').then($reviewSection => {
      if ($reviewSection.text().toLowerCase().includes('no reviews for this product')) {
        cy.log('Nincs korábbi review ehhez a termékhez.');
      } else {
        cy.get('#review .review').should('exist');
      }
    });
  });
});

describe('Kosárba helyezés ', () => {
  it('Termék kosárba helyezése', () => {
    cy.visit('https://automationteststore.com/');
    cy.get('#filter_keyword').type('shampoo');
    cy.get('.button-in-search[title="Go"]').click();
    cy.get('.fixed_wrapper .prdocutname', { timeout: 10000 }).should('exist');

    // Első találat kiválasztása
    cy.get('.fixed_wrapper .prdocutname').first().then($el => {
      const termekNev = $el.text().trim();
      cy.wrap($el).click();

      // Kosárba helyezés gomb megnyomása
      cy.get('a.cart').should('be.visible').click();

      // Ellenőrzés: a kosár oldal betöltött, és a termék neve szerepel a kosárban
      cy.get('.maintext').should('contain.text', 'Shopping Cart');
      cy.get('table.table-striped.table-bordered').should('contain.text', termekNev);
    });
  });
});


