/// <reference types="cypress" />

describe('6. Önálló end-to-end teszt specs', () => {
  it('Vásárlás vendégként + hibaellenőrzés', () => {
    cy.visit('/');

    // Keressünk shampont.
    cy.get('#filter_keyword')
      .type('shampoo');
    cy.get('#search_form')
      .submit();

    // Kiválasztjuk az első terméket, és megnézzük a termék oldalát.
    let productName;
    let productPrice;
    cy.get('.oneprice, .pricenew')
      .last()
      .then(element => {
        productPrice = Number(element.text().trim().substring(1))
      })
    cy.get('.thumbnails.grid a.prdocutname')
      .last()
      .then(element => {
        productName = element.text().trim();
      })
      .click();

    // Meggyőződünk róla, hogy annak a termék oldalát nézzük, amit kiválasztottunk.
    cy.get('h1.productname')
      .then(element => expect(element.text().trim()).to.equal(productName));

    // Termék ára nem változott meg a találatok listájához képest.
    cy.get('.productprice')
      .then(element => {
        expect(Number(element.text().trim().substring(1))).to.equal(productPrice);
      });

    // Nyissuk meg a review oldalát a terméknek.
    cy.get('[href="#review"]').click();

    // Sajnos nem tudok véleményt hagyni az oldalon,
    // és ha hagynék is, nem jelenne meg azonnal,
    // így ezt a részét nem tudjuk tesztelni.

    // Cserébe azt nézzük meg, hogy van-e már vélemény a termékhez.
    cy.get('#current_reviews > .content')
      .should('exist')
      .and('have.length.greaterThan', 0);

    // Tegyük a terméket meggyőződéssel a kosárba
    cy.get('.cart').click();                                                    // Terméket kosárba teszi, és megjeleníti a kosarat.
    cy.get('#cart_checkout1').click();                                          // A kosárban a checkout gombra kattintunk.
    cy.get('#accountFrm_accountguest').click();                                 // Vendégként folytatjuk a vásárlást
    cy.get('#accountFrm :submit').click();                                      // Elküldjük a választásunk.

    // Fill out personal details.
    cy.get('#guestFrm_firstname').type('Cypress');
    cy.get('#guestFrm_lastname').type('Test-suite');
    cy.get('#guestFrm_email').type('cypress@example.com');
    cy.get('#guestFrm_address_1').type('127.0.0.2');
    cy.get('#guestFrm_city').type('HTTP');
    cy.get('#guestFrm_zone_id').select(1);
    cy.get('#guestFrm_postcode').type('8080');
    cy.get('#guestFrm :submit').click();

    // Ellenőrizzük a rendelésünket.
    // Hamarabb kezdtem el megoldani a feladatot, mint ahogy végig olvastam volna a kapott weboldalt.
    cy.get('.confirm_products tr:nth-child(1) td:nth-child(2)')
      .then(element => {
        expect(element.text().trim()).to.equal(productName);
      });
    cy.get('.confirm_products tr:nth-child(1) td:nth-child(3)')
      .then(element => {
        expect(Number(element.text().trim().substring(1))).to.equal(productPrice);
      });
    cy.get('.confirm_products tr:nth-child(1) td:nth-child(4)')
      .then(element => {
        expect(Number(element.text().trim())).to.equal(1);
      });
    cy.get('.confirm_products tr:nth-child(1) td:nth-child(5)')
      .then(element => {
        expect(Number(element.text().trim().substring(1))).to.equal(productPrice);
      });
    cy.get('#checkout_btn').click();                                            // Confirm our order.

    // Sikeres volt-e a rendelés?
    cy.contains('Your order has been successfully processed!').should('exist');

    // Nyissuk meg a számlánkat.
    cy.contains('invoice page').click();

    // Ellenőrizzük vissza a rendelésünket.
    // A szálltási cím megegyezik.
    cy.get('address')
      .contains('Cypress')
      .contains('Test-suite')
      .contains('127.0.0.2')
      .contains('HTTP')
      .contains('8080')
      .should('exist');
    // A termék neve, ára és választott mennyisége megeggyezik
    cy.get('.invoice_products :nth-child(2) > td:nth-child(2)')
      .then(element => {
        expect(element.text().trim()).equal(productName);
      });
    cy.get('.invoice_products :nth-child(2) > td:nth-child(4)')
      .then(element => {
        expect(Number(element.text().trim())).equal(1);
      });
    cy.get('.invoice_products :nth-child(2) > td:nth-child(5)')
      .then(element => {
        expect(Number(element.text().trim().substring(1))).equal(productPrice);
      });
    cy.get('.invoice_products :nth-child(2) > td:nth-child(6)')
      .then(element => {
        expect(Number(element.text().trim().substring(1))).equal(productPrice);
      });
  });
})