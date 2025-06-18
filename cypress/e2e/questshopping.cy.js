describe('6.Feladat Önálló end-to-end (E2E) teszt: Vásárlás vendégként + hibaellenőrzés', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Vendégként való vásárlás és hibaellenőrzés', () => {
    cy.get('#filter_keyword').type('shampoo{enter}');
    cy.get(':nth-child(2) > .fixed_wrapper > .fixed > .prdocutname').click();
    cy.get('#myTab > :nth-child(2) > a').click();
    cy.get('#current_reviews > .content').should('be.visible');

    // Termék neve, ára és darabszám mentése külön változóba
    let productName;
    let productPrice;
    let productQuantity;

    cy.get('.bgnone').then($product => {
      productName = $product.text();
      cy.wrap(productName).as('productName'); // Terméknév mentése aliasként
    });
    cy.get('.total-price').then($price => {
      productPrice = $price.text();
      cy.wrap(productPrice).as('productPrice'); // ár mentés aliasként plusz 
    });
    cy.get('#product_quantity').then($quantity => {
      productQuantity = $quantity.text(); 
      cy.wrap(productQuantity).as('productQuantity'); // Darabszám mentés aliasként
    });

    cy.get('.cart').click();
    cy.get('#cart_checkout1 > .fa').click();
    cy.get('#accountFrm_accountguest').click();
    cy.get('#accountFrm > fieldset > .btn').click();

    cy.get('#guestFrm_firstname').type('Hello');
    cy.get('#guestFrm_lastname').type('YourLastName');
    cy.get('#guestFrm_email').type('valid@gmail.com');
    cy.get('#guestFrm_address_1').type('xxx');
    cy.get('#guestFrm_country_id').select('Hungary');
    cy.get('#guestFrm_city').type('BPX');
    cy.get('#guestFrm_zone_id').select('Budapest');
    cy.get('#guestFrm_postcode').type('3534');

    cy.get('.col-md-12 > .btn-orange').click();

    cy.get('#checkout_btn').click();

    cy.get('.mb40 > :nth-child(4) > a').click();

    // Invocie oldalon az adatok ellenőrzése
    cy.get(':nth-child(2) > address').should('contain', 'YourLastName')
      .and('contain', 'xxx')
      .and('contain', 'Hungary')
      .and('contain', 'BPX')
      .and('contain', 'Budapest')
      .and('contain', '3534');

    // Ellenőrizzük, hogy a termék neve, ára és darabszáma megfelelően mentésre került
    cy.get('@productName').then(productName => {
      cy.get('tbody > :nth-child(2) > :nth-child(2) > a').should('contain', productName);
    });
    cy.get('@productPrice').then(productPrice => {
      cy.get('tbody > :nth-child(2) > :nth-child(6)').should('contain', productPrice);
    });
    cy.get('@productQuantity').then(productQuantity => {
      cy.get('tbody > :nth-child(2) > :nth-child(4)').should('contain', productQuantity);
    });
  });
});
