describe('Teljes E2E vásárlás vendégként', () => {
  it('Keresés, review ellenőrzés, vásárlás vendégként + hibák', () => {

    // Főoldal betöltése és keresés
    cy.visit('https://automationteststore.com');
    cy.get('#filter_keyword').type('shampoo{enter}');

    // Kiválasztjuk az első találatot
    cy.get('.fixed_wrapper .prdocutname').eq(1).click();

    // Ellenőrizzük, hogy termékoldalon vagyunk, mentjük a termékadatokat
    let productName, productModel, unitPrice, totalPrice, productQty = 1;

    cy.url().should('include', 'product/product');
    cy.get('h1').should('exist');

    cy.get('h1.productname').invoke('text').then(text => {
    productName = text.trim();
    });

    cy.get('.productinfo li').contains('Model:').invoke('text').then(text => {
        productModel = text.replace('Model:', '').trim();
    });

    cy.get('.productfilneprice').invoke('text').then(text => {
    unitPrice = text.trim();
    totalPrice = unitPrice; // 1 db esetén a total megegyezik
    });

    // Ellenőrizzük, hogy van-e Review
    cy.get('a[href="#review"]').invoke('text').then(text => {
    expect(text.trim()).to.match(/^Reviews \(\d+\)$/);
    });

    // Review fülre kattintás.
    cy.get('a[href="#review"]').click();

    // Várjuk meg, hogy megjelenjen a review szekció
    cy.get('#review').should('be.visible');

    // Review tartalom ellenőrzése
    cy.get('#review .content').then($panel => {
    const content = $panel.text().trim();
    if (content.includes('No reviews for this product.')) {
        cy.log('Nincs review ehhez a termékhez');
    } else {
        cy.wrap($panel).should('not.be.empty');
    }
    });

    // Kosárba helyezés
    cy.get('a.cart').click();

    // Tovább a kosárhoz
    cy.get('a.dropdown-toggle[href*="rt=checkout/cart"]').click();

    // Checkout
    cy.get('#cart_checkout1').click();

    // Folytatás vendégként
    cy.get('#accountFrm_accountguest').click();
    cy.get('button[title="Continue"]').click();

    // Checkout üres űrlappal
    cy.get('button[title="Continue"]').click();

    // Legalább egy hibaellenőrzés
    cy.get('input[name="firstname"]')
      .parents('div.has-error')
      .find('.help-block')
      .should('contain.text', 'First Name must be greater than 3 and less than 32 characters!');

    // Kitöltjük az adatokat vendégként
    const firstName = 'Vendég';
    const lastName = 'Teszt';
    const email = 'guest@example.com';
    const address1 = 'Teszt utca 1';
    const city = 'Budapest';
    const postcode = '1234';
    const country = 'Hungary';

    cy.get('#guestFrm_firstname').type(firstName);
    cy.get('#guestFrm_lastname').type(lastName);
    cy.get('#guestFrm_email').type(email);
    cy.get('#guestFrm_address_1').type(address1);
    cy.get('#guestFrm_city').type(city);
    cy.get('#guestFrm_postcode').type(postcode);
    cy.get('#guestFrm_country_id').select(country);
    cy.get('#guestFrm_zone_id').select(1);

    // Checkout kitöltött űrlappal
    cy.get('button[title="Continue"]').click();

    // Rendelés véglegesítése
    const shippingMethod = 'Flat Shipping Rate';
    const paymentMethod = 'Cash On Delivery';

    cy.get('#checkout_btn').click();

    // Invoice page-re navigálás
    cy.contains('a', 'invoice page').should('be.visible').click();

    // Invoice page-n adatok helyességének ellenőrzése.

    // E-mail, fizetés, szállítás
    cy.get('.table-striped td').eq(0).should('contain.text', email);
    cy.get('.table-striped td').eq(0).should('contain.text', shippingMethod);
    cy.get('.table-striped td').eq(0).should('contain.text', paymentMethod);

    // Címek
    cy.get('.table-striped td').eq(1).should('contain.text', `${firstName} ${lastName}`)
    .and('contain.text', address1)
    .and('contain.text', city)
    .and('contain.text', postcode)
    .and('contain.text', country);

    cy.get('.table-striped td').eq(2).should('contain.text', `${firstName} ${lastName}`)
    .and('contain.text', address1)
    .and('contain.text', city)
    .and('contain.text', postcode)
    .and('contain.text', country);

    // Termékadatok
    cy.get('.invoice_products tbody tr').eq(1).within(() => {
        cy.get('td').eq(1).should('contain.text', productName);
        cy.get('td').eq(2).should('contain.text', productModel);
        cy.get('td').eq(3).should('contain.text', productQty);
        cy.get('td').eq(4).should('contain.text', unitPrice);
        cy.get('td').eq(5).should('contain.text', totalPrice);
    });
    });
});