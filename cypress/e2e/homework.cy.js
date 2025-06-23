/// <reference types="cypress"/>

describe('4. Házi feladat spec', () => {
  it('2. Terméklista rendezés tesztje', () => {
    cy.visit('/index.php?rt=product/category&path=36'); // Makeup
    cy.get('#sort').select('pd.name-ASC');
    const products = [];
    cy.get('.thumbnails.grid a.prdocutname') // SIC
      .each(element => products.push(element.text().trim()))
      .then(() => {
        expect(products.slice(0, 3)).to.have.ordered.members(products.sort().slice(0, 3));
      })
  });

  it('3. Kosár funkciók tesztelése', () => {
    cy.visit('/');
    const prices = [];
    const products = [];

    cy.get('#latest').within(() => {
      const thumbnails = cy.get('.thumbnails > div');

      thumbnails.first().within(() => {
        cy.addToCart();
        cy.getPrice().then(price => prices.push(price));
        cy.getProductName().then(product => products.push(product));
      })
      .next().within(() => {
        cy.addToCart();
        cy.getPrice().then(price => prices.push(price));
        cy.getProductName().then(product => products.push(product));
      });
    });

    cy.visit('/index.php?rt=checkout/cart')
    cy.get('.cart-info table:first tr td:nth-child(2)').each((element, idx) => {
      expect(element.text().trim()).to.be.equal(products[idx]);
    })
    cy.get('.cart-info table:first tr td:nth-child(4)').each((element, idx) => {
      expect(Number(element.text().substring(1))).to.be.equal(prices[idx]);
    })
    cy.get('input[id^="cart_quantity"]').each((element, idx) => {
      expect(Number(element.val())).to.be.equal(1);
    })
    cy.get('#totals_table > tbody > :nth-child(1) > :nth-child(2)').then(element => {
      expect(Number(element.text().substring(1)))
        .to.equal(prices.reduce((acc, val) => acc += val));
    });
  });

  it('4. Termék kategóriák', () => {
    cy.visit('/');
    cy.get('#categorymenu .nav-pills > li > a:not(a.menu_home)')
      .should('have.length', 7);
  });

  it ('5. Regisztrációs űrlap hibakezelése', () => {
    cy.visit('/index.php?rt=account/create');

    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('agree to the Privacy Policy').should('exist');

    cy.get('#AccountFrm_agree').check();
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('Login name')
      .contains('First Name')
      .contains('Last Name')
      .contains('Email Address')
      .contains('Address 1')
      .contains('City')
      .contains('Zip/postal code')
      .contains('region / state')
      .contains('Password')
      .should('exist');

    cy.get('#AccountFrm_firstname')
      .type('123456789012345678901234567890123');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('First Name')
      .should('exist');

    cy.get('#AccountFrm_firstname')
      .clear()
      .type('12345678901234567890123456789012');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('First Name').should('not.exist');

    cy.get('#AccountFrm_lastname')
      .type('123456789012345678901234567890123');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('Last Name')
      .should('exist');

    cy.get('#AccountFrm_lastname')
      .clear()
      .type('12345678901234567890123456789012');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('Last Name').should('not.exist');

    cy.get('#AccountFrm_email')
      .type('user@example.com');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('Email')
      .should('not.exist');

    cy.get('#AccountFrm_address_1')
      .type('123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('Address 1')
      .should('exist');

    cy.get('#AccountFrm_address_1')
      .clear()
      .type('12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('Address 1').should('not.exist');
    
    cy.get('#AccountFrm_city')
      .type('12');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('City')
      .should('exist');

    cy.get('#AccountFrm_city')
      .type('3456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('City')
      .should('exist');

    cy.get('#AccountFrm_city')
      .clear()
      .type('12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('City').should('not.exist');

    cy.get('#AccountFrm_zone_id')
      .select(1);
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('region / state')
      .should('not.exist');

    cy.get('#AccountFrm_postcode')
      .type('12');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('Zip/postal code')
      .should('exist');

    cy.get('#AccountFrm_postcode')
      .type('345678901');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .should('be.visible')
      .contains('Zip/postal code')
      .should('exist');

    cy.get('#AccountFrm_postcode')
      .clear()
      .type('1234567890');
    cy.get('#AccountFrm').submit();

    cy.get('.alert')
      .contains('Zip/postal code')
      .should('not.exist');
  });
});